(function () {
  function closestLink(target) {
    if (!target || !target.closest) {
      return null;
    }
    return target.closest("a[href]");
  }

  function cleanText(value) {
    return (value || "").replace(/\s+/g, " ").trim().slice(0, 120);
  }

  function trackEvent(name, params) {
    if (typeof window.gtag !== "function") {
      return;
    }
    window.gtag("event", name, params);
  }

  document.addEventListener("click", function (event) {
    var link = closestLink(event.target);
    if (!link) {
      return;
    }

    var href = link.href || "";
    var isPlayStore = href.indexOf("play.google.com/store/apps/details") !== -1;
    if (!isPlayStore) {
      return;
    }

    trackEvent("play_store_click", {
      event_category: "conversion",
      event_label: cleanText(link.textContent || link.getAttribute("aria-label")),
      link_url: href,
      page_location: window.location.href,
      page_title: document.title
    });
  });
})();
