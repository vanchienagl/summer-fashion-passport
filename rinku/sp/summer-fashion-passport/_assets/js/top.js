import data from './data.js';
console.log(data);

function renderSwiperFromData(categoryKey, dataList) {
  const container = document.getElementById(`swiper_${categoryKey}`);
  if (!container) return;

  const swiperId = `js-swiper-${categoryKey}`;
  const html = `
    <div class="sec-item__swiper">
      <div class="swiper ${swiperId}">
        <div class="swiper-wrapper">
          ${dataList.map(item => `
            <div class="swiper-slide" data-id="${item.id}">
              <div class="logo">
                <img src="${item.logo}" width="360" height="280" alt="${item.brand}" loading="lazy" decoding="async">
              </div>
              <div class="image">
                <img src="${item.image}" width="750" height="900" alt="${item.brand}" loading="lazy" decoding="async">
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-pagination"></div>
    </div>
  `;
  container.innerHTML = html;

  // Swiper setup
  const swiperContainer = container.querySelector(`.${swiperId}`);
  const swiperPagination = container.querySelector('.swiper-pagination');
  const swiperNext = container.querySelector('.swiper-button-next');
  const swiperPrev = container.querySelector('.swiper-button-prev');

  new Swiper(swiperContainer, {
    loop: true,
    spaceBetween: 10,
    pagination: {
      el: swiperPagination,
      clickable: true,
    },
    navigation: {
      nextEl: swiperNext,
      prevEl: swiperPrev,
    },
    breakpoints: {
      0: { slidesPerView: 3 },
      641: { slidesPerView: 5 },
    },
  });

  // Click => open popup
  container.querySelectorAll('.swiper-slide').forEach(slide => {
    slide.addEventListener('click', () => {
      const itemId = parseInt(slide.dataset.id);
      const item = dataList.find(i => i.id === itemId);
      if (item) {
        showModalPopup({
          logo: item.logo,
          image: item.image,
          name: item.name,
          desc: item.desc,
        });
      }
    });
  });
}

function showModalPopup({ logo, image, name, desc }) {
  const modal = document.getElementById("popupModal");
  if (!modal) return;

  modal.querySelector('.modal-logo.is-sp img').src = logo;
  modal.querySelector('.modal-logo.is-pc img').src = logo;
  modal.querySelector('.modal-image img').src = image;

  const nameContainer = modal.querySelector('.modal-name');
  nameContainer.innerHTML = name;

  const descContainer = modal.querySelector('.modal-description .txt');
  descContainer.innerHTML = desc;

  modal.classList.add('is-show');
}

function setupModalClose() {
  const modal = document.getElementById("popupModal");
  const closeBtn = modal.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => modal.classList.remove('is-show'));
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove('is-show');
    }
  });
}

// Khởi tạo toàn bộ
document.addEventListener("DOMContentLoaded", function () {
  // Gọi hàm cho từng danh mục
  renderSwiperFromData('t_shirt', data.t_shirt);
  renderSwiperFromData('casual_fashion', data.casual_fashion);
  renderSwiperFromData('shoes', data.shoes);
  renderSwiperFromData('fashion_items', data.fashion_items);
  renderSwiperFromData('summer_goods', data.summer_goods);

  // Khởi tạo đóng modal
  setupModalClose();
});