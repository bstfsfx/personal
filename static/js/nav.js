// Top navigation: mobile drawer, overlay, scroll lock, active section highlight

(function () {
    const toggle = document.querySelector('.nav-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('nav-overlay');
    const body = document.body;

    function setDrawer(open) {
        if (!toggle || !drawer || !overlay) return;
        body.classList.toggle('nav-open', open);
        drawer.classList.toggle('open', open);
        overlay.classList.toggle('open', open);
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
        drawer.setAttribute('aria-hidden', String(!open));
    }

    function isOpen() {
        return body.classList.contains('nav-open');
    }

    if (toggle) {
        toggle.addEventListener('click', () => setDrawer(!isOpen()));
    }

    if (overlay) {
        overlay.addEventListener('click', () => setDrawer(false));
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) setDrawer(false);
    });

    document.querySelectorAll('.mobile-drawer a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => setDrawer(false));
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isOpen()) setDrawer(false);
    });

    const sectionIds = ['about', 'case-studies', 'contact'];
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const hash = '#' + entry.target.id;
                document.querySelectorAll('.nav-links a, .drawer-links a').forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === hash);
                });
            });
        }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

        sections.forEach(section => observer.observe(section));
    }
})();
