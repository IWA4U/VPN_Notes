(function () {
    const devtools = {
        isOpen: false,
        orientation: undefined
    };

    const threshold = 160;

    const emitEvent = (isOpen, orientation) => {
        window.dispatchEvent(new CustomEvent('devtoolschange', {
            detail: {
                isOpen,
                orientation
            }
        }));
    };

    const main = ({ emitEvents = true } = {}) => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';

        if (!(heightThreshold && widthThreshold) &&
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) ||
                widthThreshold || heightThreshold)) {
            if (!devtools.isOpen || devtools.orientation !== orientation) {
                emitEvent(true, orientation);
            }

            devtools.isOpen = true;
            devtools.orientation = orientation;
        } else {
            if (devtools.isOpen) {
                emitEvent(false, undefined);
            }

            devtools.isOpen = false;
            devtools.orientation = undefined;
        }
    };

    main({ emitEvents: false });
    setInterval(main, 500);
})();

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }

    if (e.metaKey && e.altKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }

    if (e.metaKey && e.altKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }

    if (e.metaKey && e.altKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }

    if (e.metaKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
});

window.addEventListener('devtoolschange', function (e) {
    if (e.detail.isOpen) {
        document.body.innerHTML = '<h1 style="text-align: center; margin-top: 20%;">Доступ запрещен</h1>';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeText = themeToggle.querySelector('.theme-text');

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark');
        themeText.textContent = 'Светлая тема';
    } else {
        themeText.textContent = 'Тёмная тема';
    }

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeText.textContent = 'Светлая тема';
        } else {
            localStorage.setItem('theme', 'light');
            themeText.textContent = 'Тёмная тема';
        }
    });

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.querySelector('.modal-close');

    document.querySelectorAll('.image-frame').forEach(frame => {
        frame.addEventListener('click', function () {
            const img = this.querySelector('img');
            const src = img.src;
            const alt = img.alt;

            modal.classList.add('active');
            modalImg.src = src;
            modalCaption.textContent = alt;
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== "#") {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    if (modalImg) {
        modalImg.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
});

window.addEventListener('resize', function () { });