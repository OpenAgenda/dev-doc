var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(["disableCookies"]);
_paq.push(['enableLinkTracking']);
(function() {
  var u="//matomo.openagenda.com/";
  _paq.push(['setTrackerUrl', u+'matomo.php']);
  _paq.push(['setSiteId', '3']);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
})();

window.$crisp=[];
window.CRISP_WEBSITE_ID="ec7a439d-5932-4856-9fb6-4f235c9fba52";
(function(){
    d=document;s=d.createElement("script");
    s.src="https://client.crisp.chat/l.js";
    s.async=1;
    d.getElementsByTagName("head")[0].appendChild(s);
})();
