/* Vykreslování karet článků z window.CLANKY (viz clanky.js) */
(function () {
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cardHtml(c, base) {
    var url = base + c.slug + ".html";
    var img = base + c.obrazek;
    return (
      '<article class="blog_card">' +
      '<a href="' +
      url +
      '"><img src="' +
      img +
      '" alt="' +
      esc(c.title) +
      '" /></a>' +
      '<div class="blog_content">' +
      '<span class="blog_date">' +
      esc(c.datum) +
      "</span>" +
      "<h3>" +
      esc(c.title) +
      "</h3>" +
      "<p>" +
      esc(c.excerpt) +
      "</p>" +
      '<a href="' +
      url +
      '" class="btn-readmore">Číst více...' +
      '<svg viewBox="0 0 192 512" aria-hidden="true"><path d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"/></svg>' +
      "</a>" +
      "</div>" +
      "</article>"
    );
  }

  window.renderClanky = function (targetId, limit, base) {
    var el = document.getElementById(targetId);
    if (!el) return;

    base = base || "blog/";

    var data = (window.CLANKY || []).slice().sort(function (a, b) {
      return String(b.iso || "").localeCompare(String(a.iso || ""));
    });

    if (limit && limit > 0) {
      data = data.slice(0, limit);
    }

    if (!data.length) {
      el.innerHTML = '<p class="blog_empty">Zatím tu nejsou žádné články.</p>';
      return;
    }

    el.innerHTML = data
      .map(function (c) {
        return cardHtml(c, base);
      })
      .join("");
  };
})();
