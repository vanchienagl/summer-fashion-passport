
const breakPoint=640;let swiperTest
let swiperStatus
window.addEventListener('load',()=>{if(window.innerWidth>breakPoint){swiperCreate()
swiperStatus=true}else{swiperStatus=false}})
window.addEventListener('resize',()=>{if(window.innerWidth<=breakPoint&&swiperStatus){swiperTest.destroy(false,true)
swiperStatus=false}else if(window.innerWidth>breakPoint&&!swiperStatus){swiperCreate()
swiperStatus=true}})
const swiperCreate=()=>{swiperTest=new Swiper(".mySwiper",{direction:"vertical",slidesPerView:3,loop:true,autoplay:{delay:2500,disableOnInteraction:false,},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",},keyboard:{enabled:true,},})}