(function () {
  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i += 1) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add('is-visible');
            io.unobserve(entries[i].target);
          }
        }
      },
      { threshold: 0.14 }
    );

    for (var r = 0; r < revealEls.length; r += 1) {
      io.observe(revealEls[r]);
    }
  } else {
    for (var f = 0; f < revealEls.length; f += 1) {
      revealEls[f].classList.add('is-visible');
    }
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-navlink[href^="#"]'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href').replace('#', '');
      var target = document.getElementById(id);
      return { link: link, id: id, target: target };
    })
    .filter(function (item) {
      return !!item.target;
    });

  function updateActiveNav() {
    var threshold = window.scrollY + window.innerHeight * 0.32;
    var activeId = '';
    for (var i = 0; i < sections.length; i += 1) {
      if (sections[i].target.offsetTop <= threshold) {
        activeId = sections[i].id;
      }
    }

    for (var n = 0; n < sections.length; n += 1) {
      var isActive = sections[n].id === activeId;
      sections[n].link.classList.toggle('is-active', isActive);
      if (isActive) {
        sections[n].link.setAttribute('aria-current', 'location');
      } else {
        sections[n].link.removeAttribute('aria-current');
      }
    }
  }

  updateActiveNav();
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav);

  function pushEvent(eventName, destination) {
    if (!eventName) {
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      event_category: 'engagement',
      event_label: eventName,
      destination: destination || 'unknown'
    });
  }

  var trackEls = document.querySelectorAll('[data-track]');
  for (var t = 0; t < trackEls.length; t += 1) {
    trackEls[t].addEventListener('click', function () {
      var destination = this.getAttribute('data-destination') || this.getAttribute('href') || 'unknown';
      var eventName = this.getAttribute('data-track');
      var legacyName = this.getAttribute('data-track-legacy');

      pushEvent(eventName, destination);
      if (legacyName) {
        pushEvent(legacyName, destination);
      }
    });
  }
})();
