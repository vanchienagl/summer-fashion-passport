class Common{
    constructor(){
        this.accordion();
        this.modal();
    }
    modal(){
        MicroModal.init({
            disableScroll : true,
        }
        );
    }
    accordion(){
        const _this = this;
        const $accordionBtn = $('.js--accordion');
        $accordionBtn.on('click', function(e){
            const content = $('.detail__contents-wrap');
            content.toggleClass('is_open');
            $accordionBtn.toggleClass('is_open');
            if(content.hasClass('is_open')){
                const h = content.get(0).scrollHeight;
                content.css('height', h);
            }else{
                content.css('height', '');
            }
        });
    }
}
window.addEventListener("DOMContentLoaded", function() {
    console.log('load >>>>>>>')
    new Common();
});