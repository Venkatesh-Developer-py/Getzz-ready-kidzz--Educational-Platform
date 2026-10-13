(function () {
  function loadHTML(url, id, cb) {
    fetch(url)
      .then(function (r) {
        return r.text();
      })
      .then(function (html) {
        var el = document.getElementById(id);
        if (el) {
          el.innerHTML = html;
          if (cb) cb();
        }
      })
      .catch(function (e) {
        console.warn("Failed to load " + url, e);
      });
  }

  function initNavbar() {
    var toggle = document.getElementById("menuToggle");
    var mobileMenu = document.getElementById("mobileMenu");

    if (toggle && mobileMenu) {
      toggle.addEventListener("click", function () {
        toggle.classList.toggle("active");
        mobileMenu.classList.toggle("open");
        toggle.setAttribute(
          "aria-expanded",
          mobileMenu.classList.contains("open") ? "true" : "false"
        );
      });
    }

    document.querySelectorAll(".mobile-accordion").forEach(function (item) {
      var btn = item.querySelector(".mobile-acc-btn");

      btn.addEventListener("click", function () {
        document.querySelectorAll(".mobile-accordion").forEach(function (acc) {
          if (acc !== item) {
            acc.classList.remove("open");
          }
        });

        item.classList.toggle("open");
      });
    });

    document.querySelectorAll("#mobileMenu a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (mobileMenu) mobileMenu.classList.remove("open");
        if (toggle) toggle.classList.remove("active");
      });
    });
  }

  function initSlider() {
    var slides = document.querySelectorAll(".slide");
    if (!slides.length) return;

    var i = 0;
    setInterval(function () {
      slides[i].classList.remove("active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("active");
    }, 3000);
  }

  loadHTML("navbar.html", "navbar", initNavbar);
  loadHTML("footer.html", "footer", null);

  document.addEventListener("DOMContentLoaded", initSlider);
})();