
/*
  File: script.js
  Deskripsi: Seluruh kode interaksi dan logika website PixPuri
  Struktur: Navbar scroll, toggle menu, filter produk, animasi reveal, form kontak, dsb.
*/

(function(){
  'use strict';

  // ===== Navbar scroll effect =====
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', function(){
    if(window.scrollY > 60){
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== Toggle menu mobile =====
  navToggle.addEventListener('click', function(){
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // ===== Close menu on link click =====
  navLinks.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ===== Reveal animation on scroll =====
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});

  revealEls.forEach(function(el){
    revealObserver.observe(el);
  });

  // ===== Filter produk katalog =====
  var filterBar = document.getElementById('filterBar');
  var filterBtns = filterBar.querySelectorAll('.filter-btn');
  var productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');

      var filterValue = btn.getAttribute('data-filter');

      productCards.forEach(function(card){
        if(filterValue === 'all' || card.getAttribute('data-category') === filterValue){
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(function(){
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ===== Form kontak WhatsApp =====
  var contactForm = document.getElementById('contactForm');
  var toast = document.getElementById('toast');
  var toastMsg = document.getElementById('toastMsg');

  // Tampilkan notifikasi toast
  function showToast(message){
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(function(){
      toast.classList.remove('show');
    }, 3500);
  }

  // Kirim form ke WhatsApp
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    var name = document.getElementById('formName').value.trim();
    var wa = document.getElementById('formWA').value.trim();
    var product = document.getElementById('formProduct').value;
    var message = document.getElementById('formMessage').value.trim();

    if(!name || !wa || !product){
      showToast('Mohon lengkapi semua field yang wajib diisi.');
      return;
    }

    var waMessage = 'Halo PrintKarya Digital!\n\n';
    waMessage += '*Formulir Permintaan*\n';
    waMessage += '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n';
    waMessage += 'Nama: ' + name + '\n';
    waMessage += 'No. WA: ' + wa + '\n';
    waMessage += 'Produk: ' + product + '\n';
    if(message){
      waMessage += 'Keterangan:\n' + message + '\n';
    }
    waMessage += '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n';
    waMessage += 'Terima kasih, saya menunggu informasi lebih lanjut.';

    var encodedMessage = encodeURIComponent(waMessage);
    var waURL = 'https://wa.me/6282133938687?text=' + encodedMessage;

    window.open(waURL, '_blank');
    showToast('Mengarahkan ke WhatsApp...');
    contactForm.reset();
  });

})();
