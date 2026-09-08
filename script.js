document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- nav scroll style ---- */
  const siteNav = document.getElementById('site-nav');
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 40;
    siteNav.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('show', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  /* ---- mobile menu ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const hamIcon = document.getElementById('ham-icon');
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamIcon.innerHTML = isOpen
      ? '<line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/>'
      : '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
  });
  document.querySelectorAll('[data-scroll]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = a.getAttribute('data-scroll');
      const target = document.getElementById(targetId);
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      hamIcon.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
      if(target){
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.querySelectorAll('#nav-links .nav-cta').forEach(a => {
    a.addEventListener('click', () => {
      setTimeout(() => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        hamIcon.innerHTML = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
      }, 150);
    });
  });

  /* ---- active section highlight ---- */
  const sections = document.querySelectorAll('main section[id]');
  const navA = document.querySelectorAll('#nav-links a[data-scroll]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navA.forEach(a => a.classList.toggle('active', a.getAttribute('data-scroll') === entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => navObserver.observe(s));

  /* ---- scroll reveal ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- terminal typing sequence ---- */
  const typedLineEl = document.getElementById('typed-line');
  const outputEl = document.getElementById('term-output');
  const cursor = document.getElementById('typed-cursor');

  const sequence = [
    { cmd: 'whoami', out: 'Malik Nikhil — Full-Stack Developer' },
    { cmd: 'cat role.txt', out: 'MERN Stack · REST APIs · RBAC & Security' },
    { cmd: 'ls stack/', out: 'react.js  node.js  express.js  mongodb  mysql  java' },
    { cmd: './status --check', out: 'Open to internship role ✔' },
  ];

  let seqIndex = 0;

  function typeLine(text, cb){
    let i = 0;
    typedLineEl.textContent = '';
    const iv = setInterval(() => {
      typedLineEl.textContent += text[i];
      i++;
      if(i >= text.length){
        clearInterval(iv);
        setTimeout(cb, 350);
      }
    }, 45);
  }

  function runSequence(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      outputEl.innerHTML = sequence.map(s => `<div class="term-line"><span class="term-prompt">$</span><span class="term-out">${s.cmd}</span></div><div class="term-line" style="padding-left:16px;">${s.out}</div>`).join('');
      typedLineEl.textContent = '';
      cursor.style.display = 'none';
      return;
    }
    const step = sequence[seqIndex];
    typeLine(step.cmd, () => {
      const row = document.createElement('div');
      row.className = 'term-line';
      row.style.paddingLeft = '16px';
      row.style.color = 'var(--text)';
      row.textContent = step.out;
      outputEl.appendChild(row);
      typedLineEl.textContent = '';
      seqIndex = (seqIndex + 1) % sequence.length;
      if(seqIndex === 0){
        setTimeout(() => { outputEl.innerHTML=''; runSequence(); }, 2200);
      } else {
        setTimeout(runSequence, 500);
      }
    });
  }
  runSequence();

  /* ---- copy email ---- */
  const copyBtn = document.getElementById('copy-email-btn');
  const copyTip = document.getElementById('copy-tip');
  copyBtn.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText('nikhilmalik048@gmail.com');
    }catch(e){ /* clipboard unavailable — still show intent */ }
    copyTip.classList.add('show');
    setTimeout(() => copyTip.classList.remove('show'), 1400);
  });

  /* ---- phone icon: copy fallback ---- */
  const phoneBtn = document.getElementById('phone-btn');
  const phoneTip = document.getElementById('phone-tip');
  if(phoneBtn && phoneTip){
    phoneBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try{
        await navigator.clipboard.writeText('+917769911643');
      }catch(err){ /* clipboard unavailable — tooltip still shows intent */ }
      phoneTip.classList.add('show');
      setTimeout(() => phoneTip.classList.remove('show'), 1400);
    });
  }

  /* ---- hero mail icon: copy fallback (no navigation, avoids blocked-content pages) ---- */
  const heroMailBtn = document.getElementById('hero-mail-btn');
  const heroMailTip = document.getElementById('hero-mail-tip');
  if(heroMailBtn && heroMailTip){
    heroMailBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try{
        await navigator.clipboard.writeText('nikhilmalik048@gmail.com');
      }catch(err){ /* clipboard unavailable — tooltip still shows intent */ }
      heroMailTip.classList.add('show');
      setTimeout(() => heroMailTip.classList.remove('show'), 1400);
    });
  }