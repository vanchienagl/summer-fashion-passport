import data from './data.js';

function renderSwiperFromData(categoryKey, dataList) {
  const container = document.getElementById(`swiper_${categoryKey}`);
  if (!container) return;

  // Create template HTML Swiper
  const swiperId = `js-swiper-${categoryKey}`;
  const html = `
    <div class="sec-item__swiper">
      <div class="swiper ${swiperId}">
        <div class="swiper-wrapper">
          ${dataList.map((item, index) => `
            <div class="swiper-slide">
              <div class="logo">
                <img src="${item.logo}" width="360" height="280" alt="${item.brand}" loading="lazy" decoding="async">
              </div>
              <div class="image">
                <img src="${item.image}" width="750" height="900" alt="" loading="lazy" decoding="async">
              </div>
              <div class="popup-data" style="display: none"
                data-logo="${item.logo}"
                data-image="${item.image}"
                data-name='${item.name}'
                data-desc='${item.desc}'
                data-brand='${item.brand}'
              ></div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <div class="swiper-pagination-wrap">
        <div class="swiper-pagination"></div>
        <div class="swiper-controls">
          <button class="btn-toggle-autoplay is-pause"></button>
        </div>
      </div>
    </div>
  `;
  container.innerHTML = html;

  // Get the correct swiper element according to the assigned class
  const swiperEl = container.querySelector(`.${swiperId}`);

  // Initialize Swiper instance
  const swiperInstance = new Swiper(swiperEl, {
    loop: true,
    spaceBetween: 10,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: container.querySelector('.swiper-pagination'),
      clickable: true,
    },
    navigation: {
      nextEl: container.querySelector('.swiper-button-next'),
      prevEl: container.querySelector('.swiper-button-prev'),
    },
    breakpoints: {
      0: { slidesPerView: 3 },
      641: { slidesPerView: 5 },
    },
  });

  // Attach play/pause event
  const btnToggle = container.querySelector('.btn-toggle-autoplay');
  btnToggle?.addEventListener('click', () => {
    if (btnToggle.classList.contains('is-pause')) {
      swiperInstance.autoplay.stop();
      btnToggle.classList.remove('is-pause');
      btnToggle.classList.add('is-play');
    } else {
      swiperInstance.autoplay.start();
      btnToggle.classList.remove('is-play');
      btnToggle.classList.add('is-pause');
    }
  });

  // Attach popup open event
  container.querySelectorAll('.swiper-slide').forEach(slide => {
    slide.addEventListener('click', () => {
      const data = slide.querySelector('.popup-data');
      if (!data) return;

      const logo = data.dataset.logo;
      const image = data.dataset.image;
      const name = data.dataset.name;
      const desc = data.dataset.desc;
      const brand = data.dataset.brand;

      showModalPopup({ logo, image, name, desc, brand });
    });
  });
}

function showModalPopup({ logo, image, name, desc, brand }) {
  const modal = document.getElementById("popupModal");
  if (!modal) return;

  modal.querySelector('.modal-logo.is-sp img').src = logo;
  modal.querySelector('.modal-logo.is-sp img').alt = brand;
  modal.querySelector('.modal-logo.is-pc img').src = logo;
  modal.querySelector('.modal-logo.is-pc img').alt = brand;
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

// Initialize all
document.addEventListener("DOMContentLoaded", function () {
  // Call function for each category
  renderSwiperFromData('t_shirt', data.t_shirt);
  renderSwiperFromData('casual_fashion', data.casual_fashion);
  renderSwiperFromData('shoes', data.shoes);
  renderSwiperFromData('fashion_items', data.fashion_items);
  renderSwiperFromData('summer_goods', data.summer_goods);

  // Initialize modal close
  setupModalClose();
});