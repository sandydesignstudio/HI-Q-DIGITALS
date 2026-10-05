var I = {
    "logo": "img/logo.png",
    "signage": "img/signage.jpg",
    "ceiling": "img/ceiling.jpg",
    "kiosk1": "img/kiosk1.jpg",
    "kiosk2": "img/kiosk2.jpg",
    "a1": "img/a1.jpg",
    "a2": "img/a2.jpg",
    "interactive": "img/interactive.jpg",
    "videowall": "img/videowall.jpg",
    "led": "img/led.jpg"
};

var M = {
    "home": [
        "Digital Signage & Print Solutions Chennai | Hi-Q Digitals",
        "Chennai's complete visual communication partner. Samsung & Panasonic authorised digital displays, interactive kiosks, LED videowalls, UV and eco solvent printing. 20+ years, one vendor, every format."
    ],
    "digital": [
        "Samsung & Panasonic Digital Signage, Kiosks & Videowalls | Hi-Q Digitals Chennai",
        "Samsung and Panasonic commercial displays, interactive kiosks, LED videowalls, and cloud CMS software. Authorised partner, Chennai. 3-year warranty."
    ],
    "print": [
        "UV Printing, Eco Solvent & Acrylic Signage Chennai | Hi-Q Digitals",
        "In-house UV printing, eco solvent printing, acrylic sign boards, vinyl, canvas, and floor graphics. Greenguard certified inks. Chennai signage manufacturer since 2005."
    ],
    "industries": [
        "Digital Signage for FMCG, Restaurants & Corporates | Hi-Q Digitals Chennai",
        "Digital display and signage solutions for FMCG brands, restaurant chains, industrial estates, and corporate cafeterias across Chennai and Tamil Nadu."
    ],
    "contact": [
        "Contact Hi-Q Digitals | Get a Quote | Chennai",
        "Get a free site assessment and quote from Hi-Q Digitals. Call or WhatsApp 98407 40470."
    ]
};

document.querySelectorAll('[data-i]').forEach(function (e) { e.src = I[e.dataset.i] });

var io;
try {
    io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
        })
    }, { threshold: .1 })
} catch (e) { }

function route() {
    var h = (location.hash || '#/home').replace('#/', ''),
        a = h.split(':'),
        p = M[a[0]] ? a[0] : 'home';

    document.querySelectorAll('.pg').forEach(function (x) {
        x.classList.toggle('on', x.id === 'pg-' + p)
    });

    document.querySelectorAll('nav a').forEach(function (x) {
        x.classList.toggle('on', x.dataset.p === p)
    });

    document.title = M[p][0];
    document.querySelector('meta[name=description]').content = M[p][1];
    document.getElementById('nav').classList.remove('open');

    document.querySelectorAll('#pg-' + p + ' .rv').forEach(function (x) {
        if (io) io.observe(x); else x.classList.add('in')
    });

    var t = a[1] && document.getElementById(a[1]);
    if (t) { setTimeout(function () { t.scrollIntoView({ behavior: 'smooth' }) }, 50) }
    else window.scrollTo(0, 0);

    if (typeof startHeroCarousel === 'function') {
        startHeroCarousel();
    }
}

window.addEventListener('hashchange', route);
route();

function showSuccessModal() {
    var modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'flex';
}

function closeSuccessModal() {
    var modal = document.getElementById('successModal');
    if (modal) modal.style.display = 'none';
}

document.getElementById('form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var form = ev.target;
    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = 'Sending Requirement...';

    var d = new FormData(form);
    var payload = {
        name: d.get('n') || 'N/A',
        company: d.get('c') || 'N/A',
        phone: d.get('p') || 'N/A',
        email: d.get('e') || 'N/A',
        business: d.get('b') || 'N/A',
        looking_for: d.get('i') || 'N/A',
        locations: d.get('l') || 'N/A',
        message: d.get('m') || 'N/A',
        _subject: 'New Website Quote Request from ' + (d.get('n') || 'Customer')
    };

    fetch('https://formsubmit.co/ajax/info@hiqdigitals.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
        btn.disabled = false;
        btn.innerHTML = originalText;
        form.reset();
        document.getElementById('ok').style.display = 'block';
        showSuccessModal();
    })
    .catch(function (err) {
        btn.disabled = false;
        btn.innerHTML = originalText;
        form.reset();
        document.getElementById('ok').style.display = 'block';
        showSuccessModal();
    });
});

/* Automatic Hero Carousel Logic */
var currentHeroSlide = 0;
var heroInterval = null;

function setHeroSlide(index) {
    var carousels = document.querySelectorAll('.hero-carousel');
    carousels.forEach(function (carousel) {
        var slides = carousel.querySelectorAll('.carousel-slide');
        var dots = carousel.querySelectorAll('.dot');
        if (!slides.length) return;

        index = (index + slides.length) % slides.length;
        currentHeroSlide = index;

        slides.forEach(function (slide, idx) {
            slide.classList.toggle('active', idx === index);
        });

        dots.forEach(function (dot, idx) {
            dot.classList.toggle('active', idx === index);
        });
    });
}

function nextHeroSlide() {
    setHeroSlide(currentHeroSlide + 1);
}

function startHeroCarousel() {
    stopHeroCarousel();
    heroInterval = setInterval(nextHeroSlide, 3500);
}

function stopHeroCarousel() {
    if (heroInterval) clearInterval(heroInterval);
}

document.querySelectorAll('.hero-carousel').forEach(function (el) {
    el.addEventListener('mouseenter', stopHeroCarousel);
    el.addEventListener('mouseleave', startHeroCarousel);
});

startHeroCarousel();