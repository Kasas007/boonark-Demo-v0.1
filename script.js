
    if (document.getElementById('nextBtn')) {
        const slides = document.querySelectorAll('.featured-slide');
        const dots = document.querySelectorAll('.dot');
        const menuSection = document.getElementById('menu');

        const bgImages = [
            '/images/menu/appetizer1.jpg',
            '/images/menu/main1.jpg',
            '/images/menu/main2.jpg',
            '/images/menu/dessert1.jpg',
            '/images/menu/drink1.jpg'
        ];

        let current = 0;
        let timer;

        function goTo(n) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = (n + slides.length) % slides.length;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
            menuSection.style.backgroundImage = `url('${bgImages[current]}')`;
        }

        function startAuto() {
            timer = setInterval(() => goTo(current + 1), 4000);
        }

        function resetAuto() {
            clearInterval(timer);
            startAuto();
        }

        document.getElementById('nextBtn').addEventListener('click', () => { goTo(current + 1); resetAuto(); });
        document.getElementById('prevBtn').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
        dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

        startAuto();
    }

    window.addEventListener('scroll', () => {
        const nav = document.getElementById('mainNav');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    });


    // components/navbar.js
    class NavBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-expand navbar-dark fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand fw-bold fs-4 text-warning" href="index.html">
                    Boonark
                </a>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">หน้าหลัก</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="aboutme.html">เกี่ยวกับเรา</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="menu.html">เมนูอาหาร</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="calendar.html">ตารางเวลา</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="checkticket.html">เช็คคูปอง</a>
                    </li>
                    <li class="nav-item ms-2">
                        <button class="btn btn-warning fw-bold px-4 rounded-pill">จองเลย</button>
                    </li>
                </ul>
            </div>
        </nav>
        `;
    }
    }
    customElements.define('nav-bar', NavBar);


    class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="site-footer">
            <div class="container">
                <div class="row gy-4">
                    <div class="col-md-4">
                        <h5 class="footer-brand">Boonark</h5>
                        <p class="footer-desc">ร้านอาหารที่คัดสรรวัตถุดิบคุณภาพทุกวัน<br>รสชาติที่คุณจะไม่ลืม</p>
                    </div>
                    <div class="col-md-4">
                        <h6 class="footer-title">เมนู</h6>
                        <ul class="footer-links">
                            <li><a href="index.html">หน้าหลัก</a></li>
                            <li><a href="menu.html">เมนูอาหาร</a></li>
                            <li><a href="calendar.html">ตารางเวลา</a></li>
                            <li><a href="aboutme.html">เกี่ยวกับเรา</a></li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <h6 class="footer-title">ติดต่อเรา</h6>
                        <ul class="footer-links">
                            <li>📍 123 ถนนสุขุมวิท กรุงเทพฯ</li>
                            <li>📞 02-xxx-xxxx</li>
                            <li>✉️ hello@boonark.com</li>
                            <li>🕐 เปิด 10:00 – 22:00 ทุกวัน</li>
                        </ul>
                    </div>
                </div>
                <hr class="footer-divider">
                <p class="footer-copy">© 2026 Boonark. All rights reserved.</p>
            </div>
        </footer>
        `;
    }
    }
    customElements.define('site-footer', Footer);