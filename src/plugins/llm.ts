import path from 'node:path';
import fs from 'node:fs';

export default async function pluginLlmsTxt(context, { exclusionList }) {
    return {
      name: "llms-txt-plugin",
      loadContent: async () => {
        const { siteDir, siteConfig } = context;
        const contentDir = path.join(siteDir, 'docs');
        const allMdx: string[] = [];

        // recursive function to get all mdx files
        const getMdxFiles = async (dir: string) => {
          const entries = await fs.promises.readdir(dir, { withFileTypes: true });

          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            
            if (entry.isDirectory()) {
              await getMdxFiles(fullPath);
            } else if (entry.name.endsWith(".md")) {
              const content = await fs.promises.readFile(fullPath, 'utf8');

              // extract title from frontmatter if it exists
              const titleMatch = content.match(
                /^---\n(?:.*\n)*?title:\s*["']?([^"'\n]+)["']?\n(?:.*\n)*?---\n/
              );
              const title = titleMatch ? titleMatch[1] : '';

              // Get the relative path for URL construction
              const relativePath = path.relative(contentDir, fullPath);

              if (exclusionList.includes(relativePath.replace(/\.md(x|)$/, ""))) {
                continue;
              }

              // Convert file path to URL path by:
              // 1. Removing numeric prefixes (like 100-, 01-, etc.)
              // 2. Removing the .mdx extension
              let urlPath = relativePath
                .replace(/^\d+-/, "")
                .replace(/\/\d+-/g, "/")
                .replace(/\.md(x|)$/, "");

              // Construct the full URL
              const fullUrl = `${siteConfig.url}${siteConfig.baseUrl}${urlPath}`;

              // strip frontmatter
              const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, "");

              // combine title and content with URL
              const contentWithTitle = title
                ? `# ${title}\n\nURL: ${fullUrl}\n${contentWithoutFrontmatter}`
                : contentWithoutFrontmatter;

              allMdx.push(contentWithTitle);
            }
          }
        };

        await getMdxFiles(contentDir);
        return { allMdx };
      },
      postBuild: async ({ content, routes, outDir }) => {
        const { allMdx } = content as { allMdx: string[] };

        // Write concatenated MDX content
        const concatenatedPath = path.join(outDir, "llms-full.txt");
        await fs.promises.writeFile(concatenatedPath, allMdx.join("\n---\n\n"));

        // we need to dig down several layers:
        // find PluginRouteConfig marked by plugin.name === "docusaurus-plugin-content-docs"
        const docsPluginRouteConfig = routes.filter(
          (route) => route.plugin.name === "docusaurus-plugin-content-docs"
        )[0];

        // docsPluginRouteConfig has a routes property has a record with the path "/" that contains all docs routes.
        const allDocsRouteConfig = docsPluginRouteConfig.routes?.filter((route) => route.path === '/')[0];

        // A little type checking first
        if (!allDocsRouteConfig?.props?.version) {
          return;
        }

        // this route config has a `props` property that contains the current documentation.
        const currentVersionDocsRoutes = (
          allDocsRouteConfig.props.version as Record<string, unknown>
        ).docs as Record<string, Record<string, unknown>>;

        // for every single docs route we now parse a path (which is the key) and a title
        const docsRecords = Object.entries(currentVersionDocsRoutes)
          .filter(([path]) => !exclusionList.includes(path))
          .map(([path, record]) => {
            return `- [${record.title}](${path}): ${record.description}`;
          });

        // Build up llms.txt file
        const llmsTxt = `# ${context.siteConfig.title}\n\n## Docs\n\n${docsRecords.join("\n")}`;

        // Write llms.txt file
        const llmsTxtPath = path.join(outDir, "llms.txt");
        await fs.promises.writeFile(llmsTxtPath, llmsTxt);
      },
    };
  }