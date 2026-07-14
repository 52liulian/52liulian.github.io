document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initCustomCursor();
    initFullpageScroll();
    initNavLinks();
    initThemeToggle();
});

function initTypewriter() {
    var texts = [
        "echo '坚持跑步 · 热爱音乐 · 喜欢摄影'",
        "echo '持续学习，保持热爱'"
    ];
    var typewriterText = document.querySelector('.typewriter-text');
    var currentTextIndex = 0;
    var currentCharIndex = 0;
    var isDeleting = false;

    function type() {
        var currentText = texts[currentTextIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typewriterText.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        if (!isDeleting && currentCharIndex === currentText.length) {
            setTimeout(function() {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
        }

        var speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }

    type();
}

function initCustomCursor() {
    var cursorGlow = document.getElementById('cursor-glow');
    var cursorRing = document.getElementById('cursor-ring');

    document.addEventListener('mousemove', function(e) {
        var x = e.clientX;
        var y = e.clientY;

        cursorGlow.style.left = x + 'px';
        cursorGlow.style.top = y + 'px';

        cursorRing.style.left = x + 'px';
        cursorRing.style.top = y + 'px';
    });

    var links = document.querySelectorAll('a, button');
    links.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        link.addEventListener('mouseleave', function() {
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    document.body.style.cursor = 'none';
}

function initFullpageScroll() {
    var fullpageContainer = document.querySelector('.fullpage-container');
    if (!fullpageContainer) return;

    var isScrolling = false;
    var scrollTimeout;

    fullpageContainer.addEventListener('wheel', function(e) {
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        isScrolling = true;

        var scrollAmount = e.deltaY > 0 ? window.innerHeight : -window.innerHeight;
        var currentScroll = fullpageContainer.scrollTop;
        var newScroll = currentScroll + scrollAmount;

        newScroll = Math.max(0, Math.min(newScroll, fullpageContainer.scrollHeight - window.innerHeight));

        fullpageContainer.scrollTo({
            top: newScroll,
            behavior: 'smooth'
        });

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
        }, 800);
    }, { passive: false });
}

function initNavLinks() {
    var navLinks = document.querySelectorAll('.nav-link');
    var fullpageContainer = document.querySelector('.fullpage-container');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                fullpageContainer.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    if (fullpageContainer) {
        fullpageContainer.addEventListener('scroll', function() {
            var scrollPosition = fullpageContainer.scrollTop + window.innerHeight / 2;
            
            document.querySelectorAll('.fullpage-section').forEach(function(section, index) {
                var sectionTop = section.offsetTop;
                var sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                    });
                    navLinks[index]?.classList.add('active');
                }
            });
        });
    }
}

function initThemeToggle() {
    var themeToggle = document.getElementById('theme-toggle');
    var html = document.documentElement;
    var currentTheme = localStorage.getItem('theme') || 'dark';

    function applyTheme(theme) {
        if (theme === 'dark') {
            html.style.setProperty('--bg-color', '#0a0a0a');
            html.style.setProperty('--text-color', '#ffffff');
            html.style.setProperty('--text-secondary', '#888888');
            html.style.setProperty('--accent-color', '#747bff');
            html.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.05)');
            html.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.1)');
            html.style.setProperty('--nav-bg', 'rgba(10, 10, 10, 0.8)');
            html.style.setProperty('--nav-border', 'rgba(255, 255, 255, 0.1)');
            themeToggle.querySelector('.toggle-icon').textContent = '🌙';
        } else {
            html.style.setProperty('--bg-color', '#ffffff');
            html.style.setProperty('--text-color', '#000000');
            html.style.setProperty('--text-secondary', '#666666');
            html.style.setProperty('--accent-color', '#747bff');
            html.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.03)');
            html.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
            html.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.8)');
            html.style.setProperty('--nav-border', 'rgba(0, 0, 0, 0.1)');
            themeToggle.querySelector('.toggle-icon').textContent = '☀️';
        }
        localStorage.setItem('theme', theme);
    }

    applyTheme(currentTheme);

    themeToggle.addEventListener('click', function() {
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        currentTheme = newTheme;
        applyTheme(newTheme);
    });
}

