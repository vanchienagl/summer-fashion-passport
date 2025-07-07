$(document).ready(function(){
  $('.recruit__list .recruit__list--title').matchHeight();
  $('.js-carousel').slick({
	  dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 641,
      settings: {
        slidesToShow: 1,
      }
    }]
  });
});