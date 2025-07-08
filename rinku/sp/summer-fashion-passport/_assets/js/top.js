document.addEventListener("DOMContentLoaded", function() {
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
});

document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("popupModal");
  const modalLogo = modal.querySelector(".modal-logo img");
  const modalImage = modal.querySelector(".modal-image img");
  const closeBtn = modal.querySelector(".close-btn");

  document.querySelectorAll(".swiper-slide").forEach(slide => {
    slide.addEventListener("click", () => {
      const logoImg = slide.querySelector(".logo img").getAttribute("src");
      const mainImg = slide.querySelector(".image img").getAttribute("src");

      modalLogo.setAttribute("src", logoImg);
      modalImage.setAttribute("src", mainImg);

      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Đóng khi click ra ngoài
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});