document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    // Открытие/закрытие меню
    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        menuBtn.innerText = sidebar.classList.contains('active') ? '✕' : '☰';
    }

    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Плавный скролл (всегда в начало секции)
    const links = document.querySelectorAll('.nav-list a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if (sidebar.classList.contains('active')) toggleMenu();

                const headerHeight = 80;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: "smooth"
                });
            }
        });
    });

    // Анимация появления блоков
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('article').forEach(section => {
        observer.observe(section);
    });
});
