(function () {
  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  var heroAssetByVariant = {
    v1: {
      primary: '/assets/da/openai/hero-pcb-routing-map.png',
      secondary: '/assets/da/openai/hero-measurement-rig.png',
      primaryCaption: 'Routage PCB actif — voie signal, couche signal, décision',
      secondaryCaption: 'Banc de mesure — timing, calibration, signal utile'
    },
    v2: {
      primary: '/assets/da/openai/proof-prototype-bench.png',
      secondary: '/assets/da/openai/proof-soldering-macro.png',
      primaryCaption: 'Prototype prêt à valider — preuve de terrain',
      secondaryCaption: 'Contrôle local — soudures, continuité, stabilité'
    },
    v3: {
      primary: '/assets/da/openai/hero-pcb-routing-map.png',
      secondary: '/assets/da/openai/oscilloscope-waveform-panel.png',
      primaryCaption: 'Routage multi-couches, topologie mesurable',
      secondaryCaption: 'Fenêtre waveform — signature de validation'
    },
    v4: {
      primary: '/assets/da/openai/control-rack-detail.png',
      secondary: '/assets/da/openai/hero-measurement-rig.png',
      primaryCaption: 'Infrastructure labo en situation réelle',
      secondaryCaption: 'Mesure instrumentée — rétention et fiabilité'
    },
    v5: {
      primary: '/assets/da/openai/impact-montage-prototype-test-deploy.png',
      secondary: '/assets/da/openai/hands-calibrating-board.png',
      primaryCaption: 'Montage preuve d’impact — passage bench à scène',
      secondaryCaption: 'Main d’atelier, calibration, ajustements'
    },
    v6: {
      primary: '/assets/da/openai/texture-pcb-seamless-tile.png',
      secondary: '/assets/da/openai/overlay-via-glow-particles.png',
      primaryCaption: 'Texture technique — signal, route, densité visuelle',
      secondaryCaption: 'Particle overlay — détails vias et micro-défauts'
    },
    v7: {
      primary: '/assets/da/openai/proof-prototype-bench.png',
      secondary: '/assets/da/openai/control-rack-detail.png',
      primaryCaption: 'Cadence production — preuve de bench réelle',
      secondaryCaption: 'Pointes de route technique et instrumentation'
    },
    v8: {
      primary: '/assets/da/openai/overlay-blueprint-grid.png',
      secondary: '/assets/da/openai/proof-soldering-macro.png',
      primaryCaption: 'Fond blueprint — cadre d’industrial design',
      secondaryCaption: 'Soudures macro — détail d’assemblage'
    },
    v9: {
      primary: '/assets/da/openai/hero-pcb-routing-map.png',
      secondary: '/assets/da/openai/hands-calibrating-board.png',
      primaryCaption: 'Bus de traces et architecture signal',
      secondaryCaption: 'Ajustement terrain — boucle de calibration'
    },
    v10: {
      primary: '/assets/da/openai/hero-measurement-rig.png',
      secondary: '/assets/da/openai/oscilloscope-waveform-panel.png',
      primaryCaption: 'Mesure visuelle instantanée',
      secondaryCaption: 'Courbe et métrique — validation signal'
    },
    v11: {
      primary: '/assets/da/openai/overlay-via-glow-particles.png',
      secondary: '/assets/da/openai/hero-pcb-routing-map.png',
      primaryCaption: 'Vias glow — lecture micro-électrique',
      secondaryCaption: 'Routage principal avec repères visuels'
    },
    v12: {
      primary: '/assets/da/openai/hero-pcb-routing-map.png',
      secondary: '/assets/da/openai/proof-prototype-bench.png',
      primaryCaption: 'Carnet de labo actuel — traces, vias, direction',
      secondaryCaption: 'Test terrain et preuve de résultat'
    }
  };

  var variant = document.documentElement && document.documentElement.getAttribute('data-da-variant');
  var heroAssets = heroAssetByVariant[variant] || heroAssetByVariant.v12;
  var heroPrimaryFigure = document.querySelector('[data-hero-asset="primary"]');
  var heroSecondaryFigure = document.querySelector('[data-hero-asset="secondary"]');

  if (heroPrimaryFigure && heroSecondaryFigure) {
    var heroPrimaryImage = heroPrimaryFigure.querySelector('[data-hero-image]');
    var heroSecondaryImage = heroSecondaryFigure.querySelector('[data-hero-image]');
    var heroPrimaryCaption = heroPrimaryFigure.querySelector('figcaption');
    var heroSecondaryCaption = heroSecondaryFigure.querySelector('figcaption');

    if (heroPrimaryImage) {
      heroPrimaryImage.src = heroAssets.primary;
    }
    if (heroSecondaryImage) {
      heroSecondaryImage.src = heroAssets.secondary;
    }
    if (heroPrimaryCaption) {
      heroPrimaryCaption.textContent = heroAssets.primaryCaption || 'Vue planifiée';
    }
    if (heroSecondaryCaption) {
      heroSecondaryCaption.textContent = heroAssets.secondaryCaption || 'Vue labo';
    }
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
