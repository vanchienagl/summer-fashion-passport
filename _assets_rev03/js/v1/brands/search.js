(function ($, window, undefined) {
  var tm = TweenMax;
  shopSearchApp = function () {
    console.log('new-------------------------')
    this.isInit = false;
    this._init();
  };
  shopSearchApp.prototype = {
    win: $(window),
    _init: function () {
      if (this.isInit) return false;
      this.isInit = true;
      this._head = $('.result__heading');
      this._body = $('.result__body');
      this.switchItems = $('#js-search-switch');
      this.switchItemsSlider = $('#js-search-switch--slider');
      this.switchItem = $(this.switchItems).children('li');
      this.switchItemSlider = $(this.switchItemsSlider).children('li');
      this.win = this.win;
      this.winW = this.win.width();
      this.winH = this.win.height();
      this.hitshops = 0;
      this.hit = $('.result__body').length;
      this.win.on('load', $.proxy(this.onLoad, this));
      this.win.bind('resize onorientationchange', $.proxy(this.onResize, this));
    },
    onLoad: function (e) {
      var scope = this;
      if ($('#legend-ico-shop').size() > 0) {
        $('#legend-ico-shop .legend-ico-shop__grid:even').addClass('legend-ico-shop__grid--clear');
      }
      if (COMMON.isSite) {
        this.hitshops = $('.result__body').length;
      } else {
        this.hitshops = $('#content-search-init1 .result__body').length;
      }
      $('#hitshop-search-all1').html(this.hitshops);
      $('#hitshop-search-all2').html(this.hitshops);
      this.onRateInitJA();
      this.onRateInitEN();
      var init1 = $('#target-search-init1').height();
      var init2 = $('#target-search-init2').height();
      var pos1 = (this.winH - init1) * 0.5;
      var pos2 = (this.winH - init2) * 0.5;
      $('#target-search-init1').css({
        top: pos1 + 'px'
      });
      $('#target-search-init2').css({
        top: pos2 + 'px'
      });
      this.onLoadCheck();
      this.onSwithInit();
      this.onSwithInitSlider();
      if ($('body').hasClass('lang_ja')) {
        if ($.cookie('log')) {
          if ($.cookie('logTab')) {
            var _logTab = $.cookie('logTab');
            if (_logTab == 'tab1-content') {
              $('#tab2-content').removeClass('active');
              $('#nav-tab2-content').removeClass('active');
            }
            if (_logTab == 'tab2-content') {
              $('#tab1-content').removeClass('active');
              $('#nav-tab1-content').removeClass('active');
            }
            if (_logTab == 'tab3') {
              $('#tab3').removeClass('active');
              $('#nav-tab3').removeClass('active');
            }
            $('#' + _logTab).addClass('active');
            $('#nav-' + _logTab).addClass('active');
          }
          if ($.cookie('logCatID')) {
            var json = $.cookie('logCatID');
            var _logCatID = JSON.parse(json);
          }
          if ($.cookie('logCatClass')) {
            var json = $.cookie('logCatClass');
            var _logCatClass = JSON.parse(json);
          }
          if ($.cookie('logRefine')) {
            var json = $.cookie('logRefine');
            var _logRef = JSON.parse(json);
          } else {
            var _logRef = '';
          }
          if ($.cookie('logRefineID')) {
            var json = $.cookie('logRefineID');
            var _logRefID = JSON.parse(json);
          }
          var _active = _logCatClass.length;
          var _activeRef = _logRefID.length;
          if (_active > 0) {
            $('#' + _logTab + ' .result__body').css({
              display: 'none'
            });
            $('#' + _logTab + ' .result__heading').css({
              display: 'none'
            });
            $('.category-all').prop('checked', false);
            $('.category-all').parents('li').removeClass('active');
          } else {
            if (_activeRef > 0) {
              $('#' + _logTab + ' .result__body').css({
                display: 'none'
              });
              $('#' + _logTab + ' .result__heading').css({
                display: 'none'
              });
              $('#' + _logTab + ' ' + _logRef).show();
            }
          }
          for (i = 0; i < _active; i++) {
            $(_logCatID[i]).addClass('active');
            $(_logCatID[i]).find('input').prop('checked', true);
            $('#' + _logTab + ' ' + _logCatClass[i] + _logRef).show();
          }
          if (_activeRef > 0) {
            $('#' + _logTab + ' ' + _logRefID).addClass('active');
            $('#' + _logTab + ' ' + _logRefID).find('input').prop('checked', true);
          }
          $('.nav-tabs li').click(function () {
            $.removeCookie('log');
            $.removeCookie('logTab');
            $.removeCookie('logCatID');
            $.removeCookie('logCatClass');
            $.removeCookie('logRefine');
            $.removeCookie('logRefineID');
          });
        }
      }
      if (COMMON.isSite) {
        var _alp_a = $('#content-search-init1 .result__body.search-a').length;
        var _kana_a = $('#content-search-init2 .result__body.search-kana-a').length;
        $('.category-all').prop('checked', false);
        $('#search-alph1').prop('checked', true);
        $('#search-a').addClass('active');
        $('#search-kana1').prop('checked', true);
        $('#content-search-init1 .result__body').not('.search-a').css({
          display: 'none'
        });
        $('#content-search-init2 .result__body').not('.search-kana-a').css({
          display: 'none'
        });
        $('#hitshop-search-init1').html(_alp_a + '/');
        $('#hitshop-search-init2').html(_kana_a + '/');
      } else {}
      this.onResize();
    },
    onResize: function () {
      this.winW = $(window).width();
      this.winH = $(window).height();
      if (this.winH > this.winW) {
        if (COMMON.isSite) {
          $('.anchorscroll').css({
            opacity: 0,
            zIndex: 0
          });
        } else {
          $('.anchorscroll').css({
            opacity: 1,
            zIndex: 10000000
          });
        }
      } else {
        $('.anchorscroll').css({
          opacity: 0,
          zIndex: 0
        });
      }
    },
    onRateInitEN: function () {
      if ($(".search-a").size() === 0) {
        $('#btn-a').remove();
      }
      if ($(".search-b").size() === 0) {
        $('#btn-b').remove();
      }
      if ($(".search-c").size() === 0) {
        $('#btn-c').remove();
      }
      if ($(".search-d").size() === 0) {
        $('#btn-d').remove();
      }
      if ($(".search-e").size() === 0) {
        $('#btn-e').remove();
      }
      if ($(".search-f").size() === 0) {
        $('#btn-f').remove();
      }
      if ($(".search-g").size() === 0) {
        $('#btn-g').remove();
      }
      if ($(".search-h").size() === 0) {
        $('#btn-h').remove();
      }
      if ($(".search-i").size() === 0) {
        $('#btn-i').remove();
      }
      if ($(".search-j").size() === 0) {
        $('#btn-j').remove();
      }
      if ($(".search-k").size() === 0) {
        $('#btn-k').remove();
      }
      if ($(".search-l").size() === 0) {
        $('#btn-l').remove();
      }
      if ($(".search-m").size() === 0) {
        $('#btn-m').remove();
      }
      if ($(".search-n").size() === 0) {
        $('#btn-n').remove();
      }
      if ($(".search-o").size() === 0) {
        $('#btn-o').remove();
      }
      if ($(".search-p").size() === 0) {
        $('#btn-p').remove();
      }
      if ($(".search-q").size() === 0) {
        $('#btn-q').remove();
      }
      if ($(".search-r").size() === 0) {
        $('#btn-r').remove();
      }
      if ($(".search-s").size() === 0) {
        $('#btn-s').remove();
      }
      if ($(".search-t").size() === 0) {
        $('#btn-t').remove();
      }
      if ($(".search-u").size() === 0) {
        $('#btn-u').remove();
      }
      if ($(".search-v").size() === 0) {
        $('#btn-v').remove();
      }
      if ($(".search-w").size() === 0) {
        $('#btn-w').remove();
      }
      if ($(".search-x").size() === 0) {
        $('#btn-x').remove();
      }
      if ($(".search-y").size() === 0) {
        $('#btn-y').remove();
      }
      if ($(".search-z").size() === 0) {
        $('#btn-z').remove();
      }
      $('#content-search-init1 .result .search-a:first').attr('id', 'target-a');
      $('#content-search-init1 .result .search-b:first').attr('id', 'target-b');
      $('#content-search-init1 .result .search-c:first').attr('id', 'target-c');
      $('#content-search-init1 .result .search-d:first').attr('id', 'target-d');
      $('#content-search-init1 .result .search-e:first').attr('id', 'target-e');
      $('#content-search-init1 .result .search-f:first').attr('id', 'target-f');
      $('#content-search-init1 .result .search-g:first').attr('id', 'target-g');
      $('#content-search-init1 .result .search-h:first').attr('id', 'target-h');
      $('#content-search-init1 .result .search-i:first').attr('id', 'target-i');
      $('#content-search-init1 .result .search-j:first').attr('id', 'target-j');
      $('#content-search-init1 .result .search-k:first').attr('id', 'target-k');
      $('#content-search-init1 .result .search-l:first').attr('id', 'target-l');
      $('#content-search-init1 .result .search-m:first').attr('id', 'target-m');
      $('#content-search-init1 .result .search-n:first').attr('id', 'target-n');
      $('#content-search-init1 .result .search-o:first').attr('id', 'target-o');
      $('#content-search-init1 .result .search-p:first').attr('id', 'target-p');
      $('#content-search-init1 .result .search-q:first').attr('id', 'target-q');
      $('#content-search-init1 .result .search-r:first').attr('id', 'target-r');
      $('#content-search-init1 .result .search-s:first').attr('id', 'target-s');
      $('#content-search-init1 .result .search-t:first').attr('id', 'target-t');
      $('#content-search-init1 .result .search-u:first').attr('id', 'target-u');
      $('#content-search-init1 .result .search-v:first').attr('id', 'target-v');
      $('#content-search-init1 .result .search-w:first').attr('id', 'target-w');
      $('#content-search-init1 .result .search-x:first').attr('id', 'target-x');
      $('#content-search-init1 .result .search-y:first').attr('id', 'target-y');
      $('#content-search-init1 .result .search-z:first').attr('id', 'target-z');
    },
    onRateInitJA: function () {
      if ($("#content-search-init2 .search-kana-a").size() === 0) {
        $('#btn-kana-a').remove();
      }
      if ($("#content-search-init2 .search-kana-ka").size() === 0) {
        $('#btn-kana-ka').remove();
      }
      if ($("#content-search-init2 .search-kana-sa").size() === 0) {
        $('#btn-kana-sa').remove();
      }
      if ($("#content-search-init2 .search-kana-ta").size() === 0) {
        $('#btn-kana-ta').remove();
      }
      if ($("#content-search-init2 .search-kana-na").size() === 0) {
        $('#btn-kana-na').remove();
      }
      if ($("#content-search-init2 .search-kana-ha").size() === 0) {
        $('#btn-kana-ha').remove();
      }
      if ($("#content-search-init2 .search-kana-ma").size() === 0) {
        $('#btn-kana-ma').remove();
      }
      if ($("#content-search-init2 .search-kana-ya").size() === 0) {
        $('#btn-kana-ya').remove();
      }
      if ($("#content-search-init2 .search-kana-ra").size() === 0) {
        $('#btn-kana-ra').remove();
      }
      if ($("#content-search-init2 .search-kana-wa").size() === 0) {
        $('#btn-kana-wa').remove();
      }
      if ($("#content-search-init2 .search-kana-symbol").size() === 0) {
        $('#btn-kana-symbol').remove();
      }
      $('#content-search-init2 .result .search-kana-a:first').attr('id', 'target-kana-a');
      $('#content-search-init2 .result .search-kana-ka:first').attr('id', 'target-kana-ka');
      $('#content-search-init2 .result .search-kana-sa:first').attr('id', 'target-kana-sa');
      $('#content-search-init2 .result .search-kana-ta:first').attr('id', 'target-kana-ta');
      $('#content-search-init2 .result .search-kana-na:first').attr('id', 'target-kana-na');
      $('#content-search-init2 .result .search-kana-ha:first').attr('id', 'target-kana-ha');
      $('#content-search-init2 .result .search-kana-ma:first').attr('id', 'target-kana-ma');
      $('#content-search-init2 .result .search-kana-ya:first').attr('id', 'target-kana-ya');
      $('#content-search-init2 .result .search-kana-ra:first').attr('id', 'target-kana-ra');
      $('#content-search-init2 .result .search-kana-wa:first').attr('id', 'target-kana-wa');
      $('#content-search-init2 .result .search-symbol:first').attr('id', 'target-symbol');
    },
    onLog: function (_logTab, _logCatID, _logCatClass, _logRefClass, _logRefineID) {
      $('.result__body__shop-name').find('a').each(function (i) {
        $(this).click(function () {
          var jsonCatID = JSON.stringify(_logCatID);
          var jsonCatClass = JSON.stringify(_logCatClass);
          var jsonlogRefClass = JSON.stringify(_logRefClass);
          var jsonlogRefID = JSON.stringify(_logRefineID);
          $.cookie('log', 'flag');
          $.cookie('logTab', _logTab);
          $.cookie('logCatID', jsonCatID);
          $.cookie('logCatClass', jsonCatClass);
          $.cookie('logRefine', jsonlogRefClass);
          $.cookie('logRefineID', jsonlogRefID);
        });
      });
    },
    onSwithInit: function () {
      var scope = this;
      $(this.switchItem).click(function () {
        $('#tab2-content .search-categories__items li').not('.sprite-brands-btn_all').removeClass('active');
        $('#tab2-content .search-categories__items li').not('.sprite-brands-btn_all').find('input').prop('checked', false);
        $('#tab2-content .category-all').prop('checked', true);
        $('#tab2-content .category-all').parents('li').addClass('active');
        var _id = $(this).attr('id');
        $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
        $('#nav-' + _id).siblings('.nav-search-init').removeClass('active');
        $('#nav-' + _id).find('input.category-all').prop('checked', true);
        var _reset = $('#nav-' + _id).siblings('.nav-search-init').find('input');
        var _all = $('#nav-' + _id).siblings('.nav-search-init').find('input.category-all');
        $(_reset).prop('checked', false);
        $(_all).prop('checked', true);
        $('#nav-' + _id).addClass('active');
        $('.result__body').show();
        shopSearch.onHitShop();
        $('.anchorscroll #target-' + _id).addClass('active');
        $('.anchorscroll #target-' + _id).siblings('ul').removeClass('active');
        if (_id == 'search-init1') {
          scope.onRateInitEN();
        } else if (_id == 'search-init2') {
          scope.onRateInitJA();
        }
        $('#content-' + _id).addClass('active');
        $('#content-' + _id).siblings('.content-search-init').removeClass('active');
        scope.onInitState();
        var _hitshops = scope.hitshops;
        scope.onHitShop(_hitshops);
      });
    },
    onSwithInitSlider: function () {
      var scope = this;
      $(this.switchItemSlider).click(function () {
        var _id = $(this).attr('id');
        console.log(_id);
        $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
        $('#nav-' + _id).siblings('.nav-search-init').hide();
        $('#nav-' + _id).show();
        scope.onInitState();
        var _hitshops = scope.hitshops;
        scope.onHitShop(_hitshops);
        $('#nav-' + _id + ' .slides').slick({
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        });
      });
    },
    onInitState: function () {
      if ($('#nav-search-init1').is(':visible')) {
        $('#target-search-init2').hide();
        $('#target-search-init1').show();
      }
      if ($('#nav-search-init2').is(':visible')) {
        $('#target-search-init1').hide();
        $('#target-search-init2').show();
      }
    },
    onLoadCheck: function () {
      var scope = this;
      $('#tab1-content .search-categories__items li').each(function () {
        if ($(this).find('input').prop('checked') == true) {
          $(this).addClass('active');
          var isthis = $(this);
          scope.onSearchFilter('tab1-content', isthis);
        } else {
          $(this).removeClass('active');
        }
      });
      $('#tab1-content .search-refine__items input').each(function () {
        if ($(this).prop('checked') == true) {
          $(this).parents('li').addClass('active');
          var isthis = $(this);
          scope.onSearchFilter('tab1-content', isthis);
        } else {
          $(this).parents('li').removeClass('active');
        }
      });
      $('#tab2-content .search-categories__items li').each(function () {
        if ($(this).find('input').prop('checked') == true) {
          $(this).addClass('active');
          var isthis = $(this);
          scope.onSearchFilter('tab2-content', isthis);
        } else {
          $(this).removeClass('active');
        }
      });
      $('#tab2-content .search-refine__items input').each(function () {
        if ($(this).prop('checked') == true) {
          $(this).parents('li').addClass('active');
          var isthis = $(this);
          scope.onSearchFilter('tab2-content', isthis);
        } else {
          $(this).parents('li').removeClass('active');
        }
      });
      var _hitShop1 = $('#content-search-init1 .result__body:visible').length;
      scope.onHitShop(_hitShop1);
    },
    onHitShop: function (_switch) {
      var _hitShop1 = $('#content-search-init1 .result__body:visible').length;
      var _hitShop2 = $('#content-search-init2 .result__body:visible').length;
      if (_switch) {
        $('#hitshop-search-init1').html(_switch + '/');
      } else {
        $('#hitshop-search-init1').html(_hitShop1 + '/');
      }
      if (_switch) {
        $('#hitshop-search-init2').html(_switch + '/');
      } else {
        $('#hitshop-search-init2').html(_hitShop2 + '/');
      }
    },
    onSearchFilter: function (_tab, _index) {
      console.log('_tab:',_tab)
      console.log('_index:',_index)

      if(_index === '#refine4'){
        $('.search-refine__items-pets').addClass('active');
        $('#refine4').prop("checked", true);
      }
      $('#' + _tab + ' .result__body').css({
        display: 'none'
      });
      $('#' + _tab + ' .result__heading').css({
        display: 'none'
      });
      if ($(_index).prop('checked')) {
        $(_index).prop('checked', true);
        $(_index).parents('li').addClass('active');
      } else {
        $(_index).prop('checked', false);
        $(_index).parents('li').removeClass('active');
      }
      var _class_name = $(_index).attr('class');
      if (_class_name && _class_name.indexOf('category-all') != -1) {
        $('#' + _tab + ' .search-categories__items li').not('.sprite-brands-btn_all').removeClass('active');
        $('#' + _tab + ' .search-categories__items li').not('.sprite-brands-btn_all').find('input').prop('checked', false);
        $('#' + _tab + ' .category-all').prop('checked', true);
        $('#' + _tab + ' .category-all').parents('li').addClass('active');
      } else {
        $('#' + _tab + ' .category-all').prop('checked', false);
        $('#' + _tab + ' .category-all').parents('li').removeClass('active');
      }
      if ($('#nav-search-init1').is(':visible')) {
        if ($('#search-category-all1 .category-all').prop('checked')) {
          $('.anchorscroll').css({
            opacity: 1,
            zIndex: 10000000
          });
          $('#target-search-init1').show();
        } else {
          $('.anchorscroll').css({
            opacity: 0,
            zIndex: 0
          });
          $('#target-search-init1').hide();
        }
      } else {}
      if ($('#nav-search-init2').is(':visible')) {
        if ($('#search-category-all2 .category-all').prop('checked')) {
          $('.anchorscroll').css({
            opacity: 1,
            zIndex: 10000000
          });
          $('#target-search-init2').show();
        } else {
          $('.anchorscroll').css({
            opacity: 0,
            zIndex: 0
          });
          $('#target-search-init2').hide();
        }
      } else {}
      var _catId = $(_index).parents('li').attr('id');
      var _catProp = $(_catId).find('input');
      var _catClass = '.' + _catId;
      var _catActiveLength = $('#' + _tab + ' .search-categories__items .active').length;
      var _refActiveLength = $('#' + _tab + ' .search-refine__items .active').length;
      if (_catActiveLength == 0) {
        $('#' + _tab + ' .category-all').prop('checked', true);
        $('#' + _tab + ' .category-all').parents('li').addClass('active');
      }
      var _classCategory = [];
      var _idCategory = [];
      $.each($('#' + _tab + ' .search-categories__items .js-check.active'), function () {
        var _id = $(this).attr('id');
        _classCategory.push('.' + _id);
        _idCategory.push('#' + _id);
      });
      var _classRefine = [];
      var _classRefine2 = [];
      var _IDRefine = [];
      $.each($('#' + _tab + ' .search-refine__items .js-check.active'), function () {
        var _id = $(this).attr('id');
        _classRefine.push(_id);
        _classRefine2.push('.' + _id);
        _IDRefine.push('#' + _id);
      });
      if (_refActiveLength > 0) {
        var _classRefineJoin = '.' + _classRefine.join('.');
      } else {
        var _classRefineJoin = _classRefine.join('.');
      }
      if (_tab != 'tab3-content') {
        if ($('#' + _tab + ' .category-all').prop('checked')) {
          if (_refActiveLength > 0) {
            $('#' + _tab + ' ' + _classRefineJoin).show();
          } else {
            $('.result__heading').show();
            $('.result__body').show();
          }
        } else {
          for (i = 0; i < _catActiveLength; i++) {
            $('#' + _tab + ' ' + _classCategory[i] + _classRefineJoin).show();
          }
        }
      } else {
        if ($(_index).prop('checked')) {
          $('#' + _tab + ' .result__heading' + _classRefineJoin).show();
          $('#' + _tab + ' .result__body' + _classRefineJoin).show();
        } else {
          $('#' + _tab + ' .result__heading').show();
          $('#' + _tab + ' .result__body').show();
        }
      }
      if (_refActiveLength > 0) {
        $('#' + _tab + ' .result').each(function () {
          var _visibleBlock = $(this).children('.result__body:visible').length;
          if (_visibleBlock == 0) {
            $(this).find('.result__heading').hide();
          }
        });
      }

      function sum(_hiddenItems) {
        var result = 0;
        for (var i = 0, l = _hiddenItems.length; i < l; i++) {
          result += _hiddenItems[i];
        }
        return result;
      }
      var _hiddenItem = [];
      $('.result').each(function (i) {
        var _visibleBlock = _hiddenItem.push($(this).find('.result__body:visible').length);
      });
      var _hiddenTotal = sum(_hiddenItem);
      if (_hiddenTotal == 0) {
        $('.result__message').show();
      } else {
        $('.result__message').hide();
      }
      this.onLog(_tab, _idCategory, _classCategory, _classRefineJoin, _IDRefine);
      this.hit = $('.result__body:visible').length;
      $('#js-hit-number').html(this.hit);
    }
  };
  categorySearch = function () {
    this.onCategoryStart();
  }
  categorySearch.prototype = {
    onCategoryStart: function () {
      this.onCategoryCheck();
      this.onRefineCheck();
    },
    onParam:function(){
      //?cat[]=2

      let catId = '';
      let petId = '';
      let isPet = false;
      const searchStr = decodeURIComponent(location.search.replace(/&amp;/g, '&')) || '';
      searchStr.split('&').forEach(val => {
        if(val.indexOf('cat[]') !== -1){
          catId = val.split('=')[1];
        }
        if(val.indexOf('c_flg[]') !== -1){
          petId = val.split('=')[1];
          console.log('====petId:',petId)
        }

      });
      if(catId !== ''){
        setTimeout(()=>{
          $("#category"+catId).prop("checked", true);
          // console.log('++++:',$("#category"+catId));
          // console.log('-----:',$('#category'+catId)[0])
          shopSearch.onSearchFilter('tab2-content', $('#category'+catId));
          shopSearch.onHitShop();
        }, 1000);
      }

      if(petId === 'pets_accompanied'){
        setTimeout(()=>{
          // $('.search-refine__items-pets').addClass('active');
          // $('#refine4').prop("checked", true);
          shopSearch.onSearchFilter('tab2-content', '#refine4');
          shopSearch.onHitShop();
        }, 1000);
      }
    },
    onCategoryCheck: function () {
      $('#tab1-content .search-categories__items input').click(function () {
        var _btn = this;
        var _tab = 'tab1-content';

        shopSearch.onSearchFilter(_tab, _btn);
        shopSearch.onHitShop();
      });
      $('#tab2-content .search-categories__items input').click(function () {
        var _btn = this;
        var _tab = 'tab2-content';
        console.log('チェック:',$("#category2:checked").val())
        shopSearch.onSearchFilter(_tab, _btn);
        shopSearch.onHitShop();
      });
    },
    onRefineCheck: function () {
      $('#tab1-content .search-refine__items input').click(function () {
        var _btn = this;
        var _tab = 'tab1-content';
        shopSearch.onSearchFilter(_tab, _btn);
		shopSearch.onHitShop();
      });
      $('#tab2-content .search-refine__items input').click(function () {
        var _btn = this;
        var _tab = 'tab2-content';
        shopSearch.onSearchFilter(_tab, _btn);
        shopSearch.onHitShop();
      });
      $('#tab3-content .search-refine__items input').click(function () {
        var _btn = this;
        var _tab = 'tab3-content';
        shopSearch.onSearchFilter(_tab, _btn);
        console.log('tab3');
      });
    }
  };
  $(function () {
    window.shopSearch = new shopSearchApp();
    window.categorySearch = new categorySearch();
  });
})(jQuery, this);
