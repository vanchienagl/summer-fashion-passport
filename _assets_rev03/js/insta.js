(function ($,window,undefined) {

  Insta = function () {

    this.$win = $(window);
    this.$body = $('body');
    this.instaCenterName;
    this.instaCenterNameJa;
    this.instaUrl;

    this.InstaApiUrl;
    this.instaData;
    this.instaItemLimit = 0;

    this.$instaArea;
    this.$modal;
    this.$modalCol;
    this.$modalBtn;
    this.$modalBg;
    this.$modalClose;

    this.modalFlg = false;

    this.init();
  };

  Insta.prototype = {

    init: function () {
      var s = this
      // console.log('>>>>>>>>>>> Insta')
      if ($('.js-instaArea')[0]) {
        this.$instaArea = $('.js-instaArea');
        // this.instaCenterName = this.$instaArea.data('insta-centername') || $('.header-logo').find('a').attr('href').replace(/\/(.*?)\//, '$1');
        this.instaCenterName = this.$instaArea.data('insta-centername');
        this.instaCenterNameJa = this.$instaArea.data('insta-centername-ja');
        this.instaUrl = this.$instaArea.data('insta-url');
        // this.instaItemLimit = Number(this.$instaArea.data('insta-limit')) || 8;
        this.instaItemLimit = Number(this.$instaArea.data('insta-limit')) || 12;
        this.InstaApiUrl = '/external/api/instagram.php?location_dir=' + this.instaCenterName + '&count=' + this.instaItemLimit;
        // console.log(this.InstaApiUrl)
        this.ajax();
      };

    },

    ajax: function () {
      var s = this;

      $.ajax({
        type: 'GET',
        scriptCharset: 'utf-8',
        dataType: 'json',
        url: s.InstaApiUrl,
        success: function (data) {
          var json;
          if(typeof data == 'string'){
            console.log('Insta : Data Type String');
            json = JSON.parse(data);
          }else{
            console.log('Insta : Data Type Object');
            json = data;
          }
          console.log(json);
          if (json && json.data && json.data.length > 0) {
            s.instaData = json.data;
            s.createInstaList('success');
          }else{
            console.log('API Notfound');
          };
        },
        error: function (XMLHttpRequest,textStatus,errorThrown) {
          if(errorThrown) console.log(errorThrown.message);
          s.createInstaList('error');
        }
      });
    },

    createInstaList: function (state) {
      var s = this, html = '';

      if (state === 'success') {
        var counter = 0;

        for (key in this.instaData) {
          if (counter < this.instaItemLimit) {
            html += this.createInstaListItem(key);
            counter++;
          };
        };

        html = '<div class="js-instaArea-items is-limit' + this.instaItemLimit + '"><ul class="js-instaArea-items-inr">' + html + '</ul></div>';

        this.$instaArea.append(html);
        // console.log(this);
        // console.log(this.instaCenterName);

        this.$body.append('<div class="js-modal"><div class="js-modal-inr"><div class="js-modal-close-wrap"><a href="" class="js-modal-close"><img src="/_assets_rev03/images/common/btn-close.png" alt="Close" width="35" height="35"></a></div><div class="js-modal-col"></div></div><div class="js-modal-bg"></div></div>');

        this.$modal = $('.js-modal');
        this.$modalCol = this.$modal.find('.js-modal-col');
        this.$modalBtn = $('.js-modal-btn');
        this.$modalBg = this.$modal.find('.js-modal-bg');
        this.$modalClose = this.$modal.find('.js-modal-close');

        this.$modalBtn.each(function () {
          var key = $(this).attr('data-key');
          $(this).on('click',function (e) {
            e.preventDefault();
            s.modal(key,'open');
            // $('.wrapper--snow').snowfall('clear');
          });
        })

        this.$modalClose.add(this.$modalBg).on('click',function (e) {
          e.preventDefault();
          s.modal('','close');
          // $('.wrapper--snow').snowfall('clear');
          // if($(window).innerWidth()<980){
          // 	$('.wrapper--snow').snowfall({
          // 		image:"/_assets_rev03/images/common/sale/202012/img_flake.png",
          // 		flakeCount: 40,
          // 		minSize: 6,
          // 		maxSize: 15,
          // 		minSpeed: 1,
          // 		maxSpeed:2
          // 	})
          // } else {
          // 	$('.wrapper--snow').snowfall({
          // 		image:"/_assets_rev03/images/common/sale/202012/img_flake.png",
          // 		flakeCount: 60,
          // 		minSize: 10,
          // 		maxSize: 20,
          // 		minSpeed: 1,
          // 		maxSpeed: 3
          // 	})
          // }
        });
      } else if (state === 'error') {

        html = '<p>現在エラーが発生しています。<br>';
        html += 'しばらく時間をおいてから再度読み込みしてください。</p>';
        html += '<p><strong>' + this.instaCenterNameJa + 'プレミアム・アウトレット【公式アカウント】はこちら</strong></p>';
        html += '<p><a href="' + this.instaUrl + '" target="_blank" rel="noopener">' + this.instaUrl + '</a></p>';
        html = '<div class="js-instaArea-error">' + html + '</div>';

        this.$instaArea.append(html);
      };
    },

    createInstaListItem: function (key) {
      var html = '';

      if (this.instaData[key]['media_url']) {
        if (this.instaData[key]['thumbnail_url']) {
          html += '<li class="js-instaArea-item">';
          html += '<button data-key="' + key + '" aria-label="写真を見る" class="js-instaArea-item-a js-modal-btn">';
          html += '<div class="js-instaArea-item-img">';
          html += '<img src="'+this.instaData[key]['thumbnail_url']+'" loading="lazy" alt="">';
          html += '</div>';
          html += '</button>';
          html += '</li>';
        } else {
          html += '<li class="js-instaArea-item">';
          html += '<button data-key="' + key + '" aria-label="写真を見る" class="js-instaArea-item-a js-modal-btn">';
          html += '<div class="js-instaArea-item-img">';
          html += '<img src="' + this.instaData[key]['media_url'] + '" loading="lazy" alt="">';
          html += '</div>';
          html += '</button>';
          html += '</li>';
        }
      };

      return html;
    },

    createInstaModalItem: function (key) {
      var html = '',
        link = 'https://www.instagram.com/' + this.instaData[key]['username'] + '/';

      if (this.instaData[key]['thumbnail_url']) {
        html += '<div class="js-modal-img">';


        html += '<video controls><source src="' + this.instaData[key]['media_url'] + '"><p>動画を再生するにはvideoタグをサポートしたブラウザが必要です。</p></video>';
        html += '</div>';
        html += '<div class="js-modal-txt">';
        html += '<h2 class="js-modal-ttl">';
        html += '<a href="' + link + '" class="js-instaArea-item-a">';
        html += this.instaCenterName.toUpperCase() + ' PREMIUM OUTLETS.';
        html += '</a>';
        html += '</h2>';
        if (this.instaData[key]['caption'] && this.instaData[key]['caption'] !== '') {
          html += '<p>';
          html += this.instaData[key]['caption'];
          html += '</p>';
        }
        html += '</div>';
      } else {
        html += '<div class="js-modal-img">';
        html += '<img src="' + this.instaData[key]['media_url'] + '" alt="">';
        html += '</div>';
        html += '<div class="js-modal-txt">';
        html += '<h2 class="js-modal-ttl">';
        html += '<a href="' + link + '" class="js-instaArea-item-a">';
        html += this.instaCenterName.toUpperCase() + ' PREMIUM OUTLETS.';
        html += '</a>';
        html += '</h2>';
        if (this.instaData[key]['caption'] && this.instaData[key]['caption'] !== '') {
          html += '<p>';
          html += this.instaData[key]['caption'];
          html += '</p>';
        }
        html += '</div>';
      }

      return html;
    },

    modal: function (key,event) {
      var s = this;

      if (event === 'open' && !this.modalFlg) {
        this.modalFlg = true;
        this.$modalCol.append(this.createInstaModalItem(key));
        this.$modal.addClass('is-on');
      } else if (event === 'close' && this.modalFlg) {
        this.$modal.removeClass('is-on');
        setTimeout(function () {
          s.modalFlg = false;
          s.$modalCol.empty();
        },400);
      };
    },

    exchanged: function () {
      var s = this;
    }

  };

  window.Insta = new Insta();

  if (!window.console) { window.console = {}; window.console.log = function (str) { return str; }; }


})(jQuery,this);
try { document.execCommand('BackgroundImageCache',false,true); } catch (e) { };
