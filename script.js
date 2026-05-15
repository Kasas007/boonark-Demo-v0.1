    const BASE_URL = 'http://localhost:3001';
    // สไลด์โชว์ในหน้าเมนู home page
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
    // เปลี่ยนสี navbar เมื่อ scroll
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('mainNav');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    });


    // components navbar and footer
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
                        <button class="btn btn-warning fw-bold px-4 rounded-pill" id="bookNowBtn"><a href="booking.html" class="text-decoration-none text-black">จองเลย</a></button>
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



    document.addEventListener('DOMContentLoaded', async function () {
        try {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) return;
        
       
        const response = await axios.get(`${BASE_URL}/courses`);
        console.log('Course Data:', response.data);

        const courses = {};
        response.data.forEach(c => {
            if (!courses[c.course_date]) courses[c.course_date] = [];
            courses[c.course_date].push({ name: c.course_name, slots: c.slots, price: c.course_price });
        });
        

        const fcEvents = [];
        Object.entries(courses).forEach(([date, list]) => {
            list.forEach(c => {
                fcEvents.push({
                    title: c.name,
                    start: date,
                    className: 'ticketed',
                    extendedProps: { price: c.price },
                });
            });
        });

        function selectCourse(ev, dayEl, dateStr) {
            const panel = document.getElementById('booking-action');

            if (window._selectedBooking && window._selectedBooking.date === dateStr) {
                document.querySelectorAll('.fc-day-selected').forEach(el => el.classList.remove('fc-day-selected'));
                panel.style.display = 'none';
                window._selectedBooking = null;
                return;
            }

            document.querySelectorAll('.fc-day-selected').forEach(el => el.classList.remove('fc-day-selected'));
            if (dayEl) dayEl.classList.add('fc-day-selected');

            const dateObj = new Date(dateStr + 'T00:00:00');
            const thDate = dateObj.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
            
            document.getElementById('booking-course-name').textContent = `คอร์ส: ${ev.title}`;
            document.getElementById('booking-course-date').textContent = thDate;
            document.getElementById('booking-course-price').textContent = `${ev.extendedProps.price} บาท/คน`;

            panel.style.display = 'flex';
            panel.style.animation = 'none';
            panel.offsetHeight;
            panel.style.animation = '';
            panel.scrollIntoView({ behavior: 'smooth', block: 'end' });

            window._selectedBooking = { date: dateStr, course: ev.title };
        }

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'th',
            firstDay: 1,
            initialDate: '2026-05-01',
            headerToolbar: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            height: 'auto',
            events: fcEvents,
            eventDidMount: function(info) {
                info.el.setAttribute('title', info.event.title);
            },
            dateClick: function(info) {
                const events = calendar.getEvents().filter(e => e.startStr === info.dateStr);
                if (events.length === 0) return;
                selectCourse(events[0], info.dayEl, info.dateStr);
            },
            eventClick: function(info) {
                selectCourse(info.event, info.el.closest('.fc-daygrid-day'), info.event.startStr);
            }
            
        });

        calendar.render();

        const nextBtn = document.getElementById('booking-next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                if (!window._selectedBooking) return;
                const { date, course } = window._selectedBooking;
                window.location.href = `checkticket.html?date=${date}&course=${encodeURIComponent(course)}`;
            });
        }
         } catch (error) {
            console.error('Error fetching course data:', error);
        }
    });



