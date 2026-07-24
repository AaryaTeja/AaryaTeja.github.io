(function () {
  'use strict';

  // Set at parse time, before the browser gets a chance to restore the previous
  // scroll position on reload. Anything later is too late.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function init() {
    const root = document.getElementById('ap-root');
    if (!root) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = matchMedia('(pointer: coarse)').matches;
    const $ = (s) => document.getElementById(s);
    const all = (s) => Array.from(document.querySelectorAll(s));
    const lerp = (a, b, n) => a + (b - a) * n;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    // ---- INTRO LOADER ----
    const loader = $('ap-loader'), loadnum = $('ap-loadnum');
    let started = false;
    const startReveals = () => { if (!started) { started = true; document.body.style.overflow = ''; } };
    if (loader && loadnum) {
      document.body.style.overflow = 'hidden';
      let p = 0;
      const tick = () => {
        p += (100 - p) * 0.06 + 0.6;
        if (p >= 99.4) {
          loadnum.textContent = '100';
          setTimeout(() => { loader.style.transform = 'translateY(-101%)'; startReveals(); }, 320);
          return;
        }
        loadnum.textContent = String(Math.floor(p));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } else { startReveals(); }

    // ---- SMOOTH (MOMENTUM) SCROLL ----
    // Skipped on touch: the fixed-main + transform trick fights native scrolling.
    const main = $('ap-main');
    let spacer = null, current = 0, target = 0, vel = 0, lastCurrent = 0;
    let wheelVelocity = 0, wheelActive = false;
    if (main && !reduce && !coarse) {
      spacer = document.createElement('div');
      spacer.setAttribute('aria-hidden', 'true');
      document.body.appendChild(spacer);
      const setH = () => { spacer.style.height = main.offsetHeight + 'px'; };
      main.style.position = 'fixed';
      main.style.top = '0'; main.style.left = '0'; main.style.width = '100%';
      main.style.willChange = 'transform';
      setH();
      new ResizeObserver(setH).observe(main);
      window.addEventListener('resize', setH);
      setTimeout(setH, 400); setTimeout(setH, 1200);

      const maxScroll = () => Math.max(0, spacer.offsetHeight - window.innerHeight);
      const wheelPixels = (e) => {
        if (e.deltaMode === 1) return e.deltaY * 18;          // lines
        if (e.deltaMode === 2) return e.deltaY * window.innerHeight; // pages
        return e.deltaY;                                      // pixels
      };

      window.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.defaultPrevented) return;
        if (e.target.closest && e.target.closest('#ap-panel')) return;

        e.preventDefault();
        if (!wheelActive) target = window.scrollY || window.pageYOffset || 0;
        target = clamp(target, 0, maxScroll());
        wheelVelocity = clamp(wheelVelocity + wheelPixels(e) * 0.18, -95, 95);
        wheelActive = true;
      }, { passive: false });
    }

    // ---- ALWAYS OPEN AT THE TOP ----
    // scrollRestoration handles most of it, but Chrome can still restore after load,
    // and a bfcache restore (back button) never re-runs init at all. The momentum
    // scroll keeps its own offset, so reset that too or the page snaps back down.
    let userScrolled = false;
    const armScrollGuard = () => {
      userScrolled = false;
      ['wheel', 'touchmove', 'keydown'].forEach(ev =>
        window.addEventListener(ev, () => { userScrolled = true; }, { passive: true, once: true }));
    };
    const toTop = (force) => {
      if (location.hash) return;             // don't fight a real deep link
      if (userScrolled && !force) return;    // `load` can fire late; never yank a reader back
      window.scrollTo(0, 0);
      current = 0; target = 0; vel = 0; wheelVelocity = 0; wheelActive = false;
      if (main && spacer) main.style.transform = 'translate3d(0, 0, 0)';
    };
    armScrollGuard();
    toTop(true);
    window.addEventListener('load', () => toTop(false));
    window.addEventListener('pageshow', (e) => { if (e.persisted) { armScrollGuard(); toTop(true); } });

    // ---- CURSOR FOLLOWER ----
    const cursor = coarse ? null : $('ap-cursor');
    // The dot replaces the native pointer, so only hide the real one once it exists.
    if (cursor) document.documentElement.classList.add('ap-cursor-hidden');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;
    let hovering = false;
    let seenPointer = false;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      // Snap on the first move so the dot doesn't glide in from screen centre.
      if (!seenPointer) { seenPointer = true; cx = mx; cy = my; }
    });
    all('[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => hovering = true);
      el.addEventListener('mouseleave', () => hovering = false);
    });

    // ---- PROJECT ROW HOVER ----
    all('.ap-project').forEach(row => {
      const title = row.querySelector('.ap-ptitle'), arrow = row.querySelector('.ap-parrow');
      row.addEventListener('mousemove', (e) => {
        const r = row.getBoundingClientRect();
        const rel = (e.clientX - r.left) / r.width - 0.5;
        if (title) title.style.transform = `translateX(${rel * 26 + 18}px)`;
        if (arrow) arrow.style.transform = 'translate(6px,-6px)';
      });
      row.addEventListener('mouseenter', () => { row.style.paddingLeft = '28px'; });
      row.addEventListener('mouseleave', () => {
        row.style.paddingLeft = '8px';
        if (title) title.style.transform = 'translateX(0)';
        if (arrow) arrow.style.transform = 'translate(0,0)';
      });
    });

    // ---- MAGNETIC BUTTONS ----
    all('[data-magnetic]').forEach(el => {
      el.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1)';
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.35}px, ${dy * 0.45}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
    });

    // ---- STACK CARD TILT ----
    all('[data-tilt]').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = 'perspective(700px) rotateX(0) rotateY(0)'; });
    });

    // ---- REVEALS + HERO PARALLAX + MARQUEE ----
    const reveals = all('[data-reveal]');
    const headline = $('ap-headline');
    const outline = document.querySelector('[data-outline]');
    const marquee = $('ap-marquee');
    let mq = 0;
    const doReveal = (el) => {
      if (el.dataset.shown) return;
      el.dataset.shown = '1';
      el.style.opacity = '1';
      if (el.getAttribute('data-reveal') === 'clip') { el.style.clipPath = 'inset(0 0 0 0)'; }
      else { el.style.transform = 'translateY(0)'; }
    };

    // How hard each frame pulls toward the target, per 60fps frame.
    // Lower = floatier and longer to settle. SCROLL_EASE is the main dial.
    const SCROLL_EASE = 0.105;
    const CURSOR_EASE = 0.3;
    const WHEEL_FRICTION = 0.86;

    // Frame-rate independent easing. A raw lerp runs twice as fast on a 120Hz
    // display as on 60Hz; this keeps the feel identical on both.
    let lastT = 0;
    const eased = (base, dt) => 1 - Math.pow(1 - base, dt / 16.667);

    const raf = (now) => {
      const dt = lastT ? Math.min(now - lastT, 100) : 16.667;   // cap after tab-switch stalls
      lastT = now;
      const kScroll = eased(SCROLL_EASE, dt);
      const kCursor = eased(CURSOR_EASE, dt);

      // smooth scroll
      if (main && spacer) {
        if (wheelActive) {
          const max = Math.max(0, spacer.offsetHeight - window.innerHeight);
          target = clamp(target + wheelVelocity * (dt / 16.667), 0, max);
          wheelVelocity *= Math.pow(WHEEL_FRICTION, dt / 16.667);
          if (Math.abs(wheelVelocity) < 0.08 || target <= 0 || target >= max) {
            wheelVelocity = 0;
            wheelActive = false;
          }
          window.scrollTo(0, target);
        } else {
          target = window.scrollY || window.pageYOffset || 0;
        }
        lastCurrent = current;
        current = lerp(current, target, kScroll);
        if (Math.abs(target - current) < 0.04) current = target;
        vel = clamp(current - lastCurrent, -140, 140);
        main.style.transform = `translate3d(0, ${-current}px, 0)`;
      }
      // cursor
      if (cursor) {
        // Snappier than the scroll — as the only pointer it has to stay under the hand.
        cx = lerp(cx, mx, kCursor); cy = lerp(cy, my, kCursor);
        cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
        const s = hovering ? 46 : 14;
        cursor.style.width = s + 'px'; cursor.style.height = s + 'px';
      }
      // hero cursor parallax
      if (headline && !coarse) {
        const ox = (mx / window.innerWidth - 0.5);
        const oy = (my / window.innerHeight - 0.5);
        headline.style.transform = `translate(${ox * 26}px, ${oy * 14}px)`;
        if (outline) outline.style.transform = `translate(${ox * -34}px, ${oy * -10}px)`;
      }
      // marquee drift + velocity
      if (marquee) {
        mq -= (0.6 + Math.abs(vel) * 0.34) * (dt / 16.667);
        const half = marquee.scrollWidth / 2;
        if (half && mq <= -half) mq += half;
        marquee.style.transform = `translateX(${mq}px)`;
      }
      // reveals
      const vh = window.innerHeight;
      for (const el of reveals) {
        if (el.dataset.shown) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.88 && r.bottom > 0) doReveal(el);
      }
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // ---- CONTACT PANEL ----
    // A static site can't deliver mail itself, so the POST goes to FormSubmit, which
    // relays it to CONTACT_EMAIL. Chosen because it needs no account: the very first
    // submission triggers a one-time confirmation email to CONTACT_EMAIL — click that
    // link once and every later send lands in the inbox silently.
    // The /ajax/ endpoint returns JSON instead of redirecting, so the visitor stays put.
    const CONTACT_EMAIL = 'aaryateja.addala@gmail.com';
    const FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;

    const panel = $('ap-panel'), backdrop = $('ap-backdrop');
    const form = $('ap-form'), statusEl = $('ap-f-status'), submitBtn = $('ap-f-submit');
    let lastFocused = null;

    const focusables = () => Array.from(
      panel.querySelectorAll('button, input, textarea, a[href]')
    ).filter(el => el.offsetParent !== null || el === document.activeElement);

    const openPanel = () => {
      lastFocused = document.activeElement;
      panel.classList.add('is-open'); backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => $('ap-f-name').focus(), 380);
    };
    const closePanel = () => {
      panel.classList.remove('is-open'); backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };
    const isOpen = () => panel.classList.contains('is-open');

    all('[data-open-panel]').forEach(el => el.addEventListener('click', openPanel));
    $('ap-panel-close').addEventListener('click', closePanel);
    backdrop.addEventListener('click', closePanel);
    document.addEventListener('keydown', (e) => {
      if (!isOpen()) return;
      if (e.key === 'Escape') { closePanel(); return; }
      if (e.key !== 'Tab') return;
      // Keep focus inside the dialog while it's open.
      const f = focusables();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    const setStatus = (msg, kind) => {
      statusEl.textContent = msg;
      statusEl.className = kind ? 'is-' + kind : '';
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('ap-f-name'), email = $('ap-f-email'), msg = $('ap-f-msg');
      [name, email, msg].forEach(el => el.classList.remove('ap-invalid'));

      if ($('ap-f-hp').value) return;                       // bot filled the honeypot
      const bad = [], missing = [];
      if (!name.value.trim()) { bad.push(name); missing.push('your name'); }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        bad.push(email);
        missing.push(email.value.trim() ? 'a valid email' : 'your email');
      }
      if (!msg.value.trim()) { bad.push(msg); missing.push('a message'); }
      if (bad.length) {
        bad.forEach(el => el.classList.add('ap-invalid'));
        const list = missing.length > 1
          ? missing.slice(0, -1).join(', ') + ' and ' + missing[missing.length - 1]
          : missing[0];
        setStatus(`Please add ${list}.`, 'error');
        bad[0].focus();
        return;
      }

      submitBtn.disabled = true;
      setStatus('Sending…', 'ok');
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: name.value.trim(),
            email: email.value.trim(),
            message: msg.value.trim(),
            _subject: `Portfolio message from ${name.value.trim()}`,
            _template: 'table',
            _captcha: 'false'
          })
        });
        const data = await res.json().catch(() => ({}));
        // FormSubmit answers { success: "true" | true, message: "..." }.
        if (!res.ok || String(data.success) !== 'true') {
          throw new Error(data.message || 'HTTP ' + res.status);
        }
        form.reset();
        setStatus("Sent — thanks. I'll get back to you shortly.", 'ok');
      } catch (err) {
        setStatus(`Couldn't send that. Email me directly at ${CONTACT_EMAIL}.`, 'error');
      } finally {
        submitBtn.disabled = false;
      }
    });

    const getAnchorTop = (el) => {
      if (main && spacer && main.contains(el)) return el.offsetTop;
      return el.getBoundingClientRect().top + window.scrollY;
    };

    const scrollToAnchor = (el) => {
      const y = Math.max(0, getAnchorTop(el) - 20);
      target = y;
      wheelVelocity = 0;
      wheelActive = false;
      window.scrollTo({ top: y, behavior: spacer ? 'auto' : (reduce ? 'auto' : 'smooth') });
    };

    // smooth anchor scroll
    all('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href').slice(1);
        const tgt = id ? document.getElementById(id) : null;
        if (!tgt) return;
        e.preventDefault();
        scrollToAnchor(tgt);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
