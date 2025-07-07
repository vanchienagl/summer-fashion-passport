console.log('top.js');

const swiper = new Swiper('.js-swiper-01', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 11,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});