import data from './data.js';
console.log(data);

document.addEventListener("DOMContentLoaded", function () {
  const swipers = ['.js-swiper-01', '.js-swiper-02'];

  swipers.forEach(selector => {
    new Swiper(selector, {
      loop: true,
      spaceBetween: 10,
      pagination: {
        el: selector + ' ~ .swiper-pagination', // chọn pagination nằm sau swiper
      },
      navigation: {
        nextEl: selector + ' ~ .swiper-button-next',
        prevEl: selector + ' ~ .swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 3,
        },
        641: {
          slidesPerView: 5,
        },
      },
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("popupModal");
  const closeBtn = modal.querySelector(".close-btn");

  const logoImgSp = modal.querySelector(".modal-logo.is-sp img");
  const logoImgPc = modal.querySelector(".modal-logo.is-pc img");
  const mainImg = modal.querySelector(".modal-image img");

  // Chỉ gán click event cho các slide trong từng Swiper
  const allSwipers = document.querySelectorAll(".js-swiper-01, .js-swiper-02");

  allSwipers.forEach(swiperEl => {
    swiperEl.querySelectorAll(".swiper-slide").forEach(slide => {
      slide.addEventListener("click", () => {
        const logoSrc = slide.querySelector(".logo img")?.getAttribute("src") || "";
        const imageSrc = slide.querySelector(".image img")?.getAttribute("src") || "";

        // Cập nhật cả 2 logo và hình ảnh chính
        logoImgSp.setAttribute("src", logoSrc);
        logoImgPc.setAttribute("src", logoSrc);
        mainImg.setAttribute("src", imageSrc);

        modal.classList.add("is-show");
      });
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("is-show");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("is-show");
    }
  });
});