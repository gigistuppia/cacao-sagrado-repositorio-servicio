// ====== PHONE VALIDATION (libphonenumber-js) ======
function esTelefonoValido(numero) {
  try {
    // Intentar como número argentino primero
    const parsed = window.libphonenumber.parsePhoneNumber(numero, 'AR');
    if (parsed.isValid()) return true;
  } catch (_) {}
  try {
    // Intentar como número internacional (con + adelante)
    const parsed = window.libphonenumber.parsePhoneNumber(numero);
    return parsed.isValid();
  } catch (_) {
    return false;
  }
}

// ====== NAVBAR SCROLL EFFECT ======
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ====== MOBILE MENU ======
const navClose = document.getElementById('nav-close');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navClose.addEventListener('click', () => {
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ====== SMOOTH SCROLL ======
// Scrolls past the section's top padding so the title appears
// just below the navbar with breathing room, maximizing visible content.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();

    const sectionPaddingTop = parseInt(getComputedStyle(target).paddingTop) || 0;
    const breathingRoom     = 24; // px gap between navbar bottom and section title
    const scrollTop = target.getBoundingClientRect().top
                    + window.scrollY
                    + sectionPaddingTop
                    - navbar.offsetHeight
                    - breathingRoom;

    window.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
  });
});

// ====== FADE-IN ANIMATIONS ======
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    setTimeout(() => entry.target.classList.add('visible'), i * 80);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

// ====== CARD 3D TILT EFFECT ======
const isTouchDevice = window.matchMedia('(hover: none)').matches;

if (!isTouchDevice) {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'box-shadow 0.3s ease, border-bottom-color 0.3s ease, transform 0.12s ease';
    });

    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const cx    = rect.width  / 2;
      const cy    = rect.height / 2;
      const rotX  = ((y - cy) / cy) * -7;
      const rotY  = ((x - cx) / cx) *  7;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'box-shadow 0.4s ease, border-bottom-color 0.3s ease, transform 0.5s ease';
      card.style.transform  = '';
    });
  });
}

// ====== OTRO FIELD TOGGLE ======
function toggleOtro(select) {
  const otroInput = document.getElementById('como-otro');
  if (select.value === 'otro') {
    otroInput.style.display = 'block';
    otroInput.focus();
  } else {
    otroInput.style.display = 'none';
    otroInput.value = '';
  }
}

// ====== EMAIL GMAIL VALIDATION ======
document.addEventListener('DOMContentLoaded', () => {

  const telefonoInput = document.getElementById('telefono');
  const telefonoError = document.getElementById('telefono-error');

  telefonoInput.addEventListener('input', () => {
    if (telefonoInput.value.trim() && !esTelefonoValido(telefonoInput.value)) {
      telefonoError.style.display = 'block';
      telefonoInput.setCustomValidity('Teléfono inválido');
    } else {
      telefonoError.style.display = 'none';
      telefonoInput.setCustomValidity('');
    }
  });
});

// ====== PAGE TRANSITION ======
document.querySelectorAll('a[href="galeria.html"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.href;
    document.body.classList.add('page-out');
    setTimeout(() => { window.location.href = href; }, 350);
  });
});

// ====== TESTIMONIOS CAROUSEL ======
(function () {
  const slides  = document.querySelectorAll('.testimonio-slide');
  const dots    = document.querySelectorAll('.testimonio-dot');
  const btnPrev = document.querySelector('.testimonio-arrow-prev');
  const btnNext = document.querySelector('.testimonio-arrow-next');
  if (!slides.length) return;

  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Swipe táctil
  const track = document.querySelector('.testimonio-track');
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
})();

// ====== FORM SUBMIT ======
function handleSubmit(e) {
  e.preventDefault();

  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn     = form.querySelector('button[type="submit"]');

  const nombre    = document.getElementById('nombre').value.trim();
  const personasVal = document.getElementById('personas').value;
  const telefono  = document.getElementById('telefono').value.trim();
  const comoVal   = document.getElementById('como').value;
  const comoOtro  = document.getElementById('como-otro').value.trim();
  const mensaje   = document.getElementById('mensaje').value.trim();

  const personasLabels = {
    'solo':  'Solo yo',
    '2-3':   '2 a 3 personas',
    '4-6':   '4 a 6 personas',
    '7+':    '7 o más personas'
  };
  const personasTexto = personasVal ? (personasLabels[personasVal] || personasVal) : 'No especificado';

  // Validate phone
  if (!esTelefonoValido(telefono)) {
    document.getElementById('telefono-error').style.display = 'block';
    document.getElementById('telefono').focus();
    return;
  }

  const comoLabels = {
    instagram:     'Instagram',
    recomendacion: 'Recomendación',
    busqueda:      'Búsqueda en internet',
    otro:          comoOtro || 'Otro'
  };
  const comoTexto = comoVal ? (comoLabels[comoVal] || comoVal) : 'No especificado';

  const asunto = `Nueva consulta — ${nombre} | Ceremonia del Cacao`;
  const cuerpo =
`Hola! Me contacto desde el sitio de Ceremonia del Cacao.

Mis datos:
• Nombre: ${nombre}
• Teléfono: ${telefono}
• Personas que asistirían: ${personasTexto}
• ¿Cómo nos encontró?: ${comoTexto}

Mensaje:
${mensaje || 'Sin mensaje adicional.'}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=cacaoceremonialarg@gmail.com&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

  window.open(gmailUrl, '_blank');

  // Reset form
  form.querySelectorAll('input, select, textarea').forEach(el => (el.value = ''));
  document.getElementById('como-otro').style.display = 'none';
  document.getElementById('telefono-error').style.display = 'none';
  success.classList.add('show');
  setTimeout(() => success.classList.remove('show'), 5000);
}
