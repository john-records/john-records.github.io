// Site-wide search, backed by a Pagefind index built across johnrecords.org
// and the Autobiography of a Yogi book (separate repo, same origin). Loaded
// with a plain <script src> tag from every page on both sites, so it must
// stay a classic script with no build step — the dynamic import() below is
// the only ES2020+ feature it needs.
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var openers = document.querySelectorAll("[data-gsearch-open]");
    var overlay = document.getElementById("gsearch-overlay");
    var input = document.getElementById("gsearch-input");
    var results = document.getElementById("gsearch-results");
    if (!overlay || !input || !results || !openers.length) return;

    var pagefindPromise = null;
    function loadPagefind() {
      if (!pagefindPromise) {
        pagefindPromise = import("/pagefind/pagefind.js").then(function (mod) {
          if (mod.init) mod.init();
          return mod;
        });
      }
      return pagefindPromise;
    }

    function open() {
      overlay.classList.remove("hidden");
      loadPagefind();
      window.setTimeout(function () { input.focus(); }, 0);
    }
    function close() {
      overlay.classList.add("hidden");
    }

    for (var i = 0; i < openers.length; i++) {
      openers[i].addEventListener("click", open);
    }
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !overlay.classList.contains("hidden")) close();
    });

    var seq = 0;
    input.addEventListener("input", function () {
      var q = input.value.trim();
      var mySeq = ++seq;
      if (!q) {
        results.innerHTML = "";
        return;
      }
      loadPagefind()
        .then(function (pf) { return pf.search(q); })
        .then(function (search) {
          if (mySeq !== seq) return null;
          return Promise.all(search.results.slice(0, 20).map(function (r) { return r.data(); }));
        })
        .then(function (datas) {
          if (!datas || mySeq !== seq) return;
          if (!datas.length) {
            results.innerHTML = '<div class="gsearch-empty">No results.</div>';
            return;
          }
          results.innerHTML = datas
            .map(function (d) {
              var title = (d.meta && d.meta.title) || d.url;
              return (
                '<a class="gsearch-hit" href="' + d.url + '">' +
                '<span class="gsearch-hit-title"></span>' +
                '<span class="gsearch-hit-excerpt">' + d.excerpt + "</span>" +
                "</a>"
              ).replace(
                '<span class="gsearch-hit-title"></span>',
                '<span class="gsearch-hit-title">' + escapeHtml(title) + "</span>"
              );
            })
            .join("");
        });
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = results.querySelector(".gsearch-hit");
        if (first) window.location.href = first.getAttribute("href");
      }
    });

    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
  });
})();
