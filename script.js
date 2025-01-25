// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"], .nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Align the scrolled element to the start of the viewport
            });
        }
    });
});

// เลือกลิงก์ทั้งหมดใน Navigation Bar
const navLinks = document.querySelectorAll(".nav-link");
// เลือก Section ทั้งหมดที่ตรงกับลิงก์
const sections = document.querySelectorAll("section");

// ฟังก์ชันตรวจจับ Section ปัจจุบัน
window.addEventListener("scroll", () => {
    let currentSection = null;

    // ตรวจสอบว่าอยู่ใน Section ใด
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 70; // ชดเชยระยะห่างจาก Sticky Bar
        const sectionHeight = section.offsetHeight;

        // หากผู้ใช้อยู่ภายใน Section นี้
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    // อัปเดต Active State ของลิงก์
    navLinks.forEach((link) => {
        link.classList.remove("active"); // ลบสถานะ Active ทุกลิงก์
        if (link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active"); // เพิ่ม Active ให้ลิงก์ที่ตรงกับ Section ปัจจุบัน
        }
    });
});

// เลือกทุกข้อความหรือองค์ประกอบที่ต้องการให้มีเอฟเฟกต์เฟดเข้า
const elements = document.querySelectorAll('.fade-in');

// กำหนด options สำหรับ IntersectionObserver
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // trigger เมื่อ 10% ขององค์ประกอบแสดงในมุมมอง
};

// ฟังก์ชันที่จะทำให้ข้อความค่อย ๆ เฟดเข้ามา
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // เพิ่มคลาส visible เมื่อเข้ามาในมุมมอง
        } else {
            entry.target.classList.remove('visible'); // เมื่อออกจากมุมมองให้ลบคลาส visible
        }
    });
}, options);

// สังเกตทุกองค์ประกอบ
elements.forEach(element => {
    observer.observe(element);
});

// JavaScript to add more snowflakes randomly
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const numSnowflakes = 30; // เพิ่มจำนวนหิมะ

    for (let i = 0; i < numSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = '❄'; // ใช้ตัวอักษรหิมะ

        // Randomize snowflake size, position, and animation duration
        snowflake.style.fontSize = `${Math.random() * 0.8 + 0.5}rem`; // ขนาดหิมะระหว่าง 0.5-1rem
        snowflake.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        snowflake.style.animationDuration = `${Math.random() * 10 + 10}s`; // ความเร็วในการตก
        snowflake.style.animationDelay = `${Math.random() * 3}s`; // การดีเลย์การตกหิมะ

        snowflakesContainer.appendChild(snowflake);
    }
}

createSnowflakes();

// ตรวจจับการเลื่อนและควบคุมการแสดงปุ่ม
window.addEventListener("scroll", () => {
    const homeButton = document.querySelector(".home-button");

    if (window.scrollY > 100) { // แสดงปุ่มเมื่อเลื่อนลงเกิน 100px
        homeButton.classList.remove("hidden");
    } else {
        homeButton.classList.add("hidden");
    }
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const offset = 70; // ชดเชยความสูงของ Sticky Bar (กำหนดตามความสูงจริง)
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth' // เลื่อนแบบ Smooth Scroll
            });
        }
    });
});
// Function to animate progress bars when visible
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.hobby-progress');

    progressBars.forEach(bar => {
        const progressValue = bar.getAttribute('data-progress');
        const barRect = bar.getBoundingClientRect();

        if (barRect.top < window.innerHeight && barRect.bottom > 0) {
            bar.style.width = `${progressValue}%`;
        } else {
            bar.style.width = '0'; // รีเซ็ตเมื่อพ้นหน้าจอ
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', animateProgressBars);

// Initial check on load
animateProgressBars();
document.addEventListener("DOMContentLoaded", () => {
    const skillsTitle = document.querySelector("#skills h2");
    const contactTitle = document.querySelector("#contact h2");

    // สร้าง Observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    skillsTitle.classList.add("animate");
                } else {
                    skillsTitle.classList.remove("animate");
                }
            });
        },
        { threshold: 0.5 } // เรียกเมื่อ 50% ของหัวข้ออยู่ในมุมมอง
    );

    // สังเกตหัวข้อ Skills
    observer.observe(skillsTitle);
});
document.addEventListener("DOMContentLoaded", () => {
    const phoneDisplay = document.getElementById("phone-display");
    const revealButton = document.getElementById("reveal-phone");
    let resetTimeout;

    // Function to reveal the phone number
    function revealPhone() {
        phoneDisplay.classList.remove("hidden");
        phoneDisplay.classList.add("visible");
        revealButton.style.display = "none"; // Hide the button
        clearTimeout(resetTimeout); // Reset timeout if any
        resetTimeout = setTimeout(hidePhone, 60000); // Hide after 1 minute
    }

    // Function to hide the phone number
    function hidePhone() {
        phoneDisplay.classList.remove("visible");
        phoneDisplay.classList.add("hidden");
        revealButton.style.display = "inline-block"; // Show the button again
    }

    // Intersection Observer to hide the phone number when scrolling back
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    hidePhone(); // Reset phone number visibility
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    // Observe the Contact section
    const contactSection = document.getElementById("contact");
    observer.observe(contactSection);

    // Add click event listener to the reveal button
    revealButton.addEventListener("click", revealPhone);
});

// Language switch functionality
const languageSwitch = document.querySelector('.language-switch');
const elementsToTranslate = document.querySelectorAll('[data-en], [data-th]');

let currentLang = 'en'; // Default language

function updateLanguage(newLang) {
    currentLang = newLang;
    // Update button text
    languageSwitch.textContent = newLang === 'en' ? 'TH' : 'EN';
    languageSwitch.setAttribute('data-lang', newLang);
    
    // Update all translatable elements
    elementsToTranslate.forEach(element => {
        const text = element.getAttribute(`data-${newLang}`);
        if (text) {
            if (element.tagName.toLowerCase() === 'input' || 
                element.tagName.toLowerCase() === 'textarea') {
                element.placeholder = text;
            } else {
                // Preserve any icons in the element
                const icons = element.querySelectorAll('i');
                element.style.transition = 'opacity 0.5s ease-in-out'; // Smooth transition
                element.style.opacity = 0; // Start transition
                setTimeout(() => {
                    element.textContent = text;
                    icons.forEach(icon => element.prepend(icon));
                    element.style.opacity = 1; // End transition
                }, 500); // Duration of the transition
            }
        }
    });

    // Store language preference
    localStorage.setItem('preferredLanguage', newLang);
}

// Initialize language from localStorage or default to English
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        updateLanguage(savedLang);
    }
});

// Language switch event listener
languageSwitch.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'th' : 'en';
    updateLanguage(newLang);
});

// Function to enlarge images when clicked
document.querySelectorAll('img').forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <img src="${image.src}" alt="${image.alt}" class="modal-image">
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal when clicking the close button or outside the image
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-button') || e.target === modal) {
                modal.remove();
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let lang = "en"; // เปลี่ยนเป็น "th" ถ้าต้องการแสดงภาษาไทยเริ่มต้น
    let aboutText = document.getElementById("about-text");

    if (aboutText) {
        aboutText.innerHTML = aboutText.getAttribute(`data-${lang}`);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const aboutText = document.getElementById("about-text");
    const languageSwitch = document.querySelector('.language-switch');

    // ค่าภาษาเริ่มต้น (ดึงจาก LocalStorage)
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';

    // ฟังก์ชันเปลี่ยนภาษา พร้อมเอฟเฟกต์
    function updateText() {
        const textEn = `My name is <strong><span class='highlight-name'>Theerapong Weaha</span></strong>. I am a Computer Science student at Kasetsart University, passionate about Business Analysis and problem-solving. I come from Hat Yai District, Songkhla Province.`;

        const textTh = `สวัสดีครับ ผม <strong><span class='highlight-name'>ธีระพงศ์ เวหะ</span></strong> นักศึกษาวิทยาการคอมพิวเตอร์ ม.เกษตรศาสตร์ ศรีราชา มีความสนใจด้านการวิเคราะห์ธุรกิจและการแก้ปัญหาด้วยเทคโนโลยี ผมมาจากอำเภอหาดใหญ่ จังหวัดสงขลา`;

        if (aboutText) {
            // ทำให้ข้อความค่อยๆ จางหายไปก่อนเปลี่ยนภาษา
            aboutText.style.opacity = 0;

            setTimeout(() => {
                aboutText.innerHTML = currentLang === "th" ? textTh : textEn;
                aboutText.style.opacity = 1; // ค่อยๆ แสดงกลับมา
            }, 500); // หน่วงเวลา 300ms ก่อนเปลี่ยนเนื้อหา
        }

        // อัปเดตภาษาใน `<html lang="">`
        document.documentElement.setAttribute("lang", currentLang);

        // อัปเดตปุ่มเปลี่ยนภาษา
        if (languageSwitch) {
            languageSwitch.textContent = currentLang === 'en' ? 'TH' : 'EN';
        }

        // เก็บค่าภาษาไว้ใน LocalStorage
        localStorage.setItem('preferredLanguage', currentLang);
    }

    // โหลดค่าภาษาครั้งแรก
    updateText();

    // ฟังก์ชันเปลี่ยนภาษาเมื่อกดปุ่ม
    if (languageSwitch) {
        languageSwitch.addEventListener('click', () => {
            currentLang = currentLang === "en" ? "th" : "en";
            updateText();
        });
    }
});
