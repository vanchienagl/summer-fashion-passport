
(function($,window,undefined){AceessShopping=function(){this.isInit=false;};AceessShopping.prototype={win:$(window),_init:function(){if(this.isInit)return false;this.isInit=true;this.win.bind(AccessCommon.EVENT_ON_LOAD,$.proxy(this.onLoad,this));this.onNavIndex();this.onAncorLink();},onLoad:function(){var hash=location.hash;var userAgent=window.navigator.userAgent.toLowerCase();if(hash=='#bus_1'||hash=='#bus1'){if(0<$("#bus_1").size()){var t=$('#bus_1').offset().top;}else if(0<$("#bus10").size()){var t=$('#bus1').offset().top;}
$('#bus_1,#bus_2,#bus1,#bus2').addClass('active');$('html,body').scrollTop(t);}
if(hash=='#bus_29'||hash=='#bus29'){if(0<$("#bus_29").size()){var t=$('#bus_29').offset().top;}
$('#bus_29,#bus29,#bus_30,#bus30').addClass('active');$('html,body').scrollTop(t);}
if(hash=='#bus_3'){if(0<$("#bus_3").size()){var t=$('#bus_3').offset().top;}
$('#bus_3,#bus3').addClass('active');$('html,body').scrollTop(t);}
if(hash=='#bus_4'){if(0<$("#bus_4").size()){var t=$('#bus_4').offset().top;}
$('#bus_4,#bus4').addClass('active');$('html,body').scrollTop(t);}
if(hash=='#bus_6'||hash=='#bus6'){if(0<$("#bus_5").size()){var t=$('#bus_5').offset().top;}else if(0<$("#bus5").size()){var t=$('#bus5').offset().top;}
$('#bus_6,#bus6,#bus_5,#bus5').addClass('active');$('html,body').scrollTop(t);}
if(hash=='#bus_7'||hash=='#bus7'){if(0<$("#bus_6").size()){var t=$('#bus_6').offset().top;}else if(0<$("#bus6").size()){var t=$('#bus6').offset().top;}
$('#bus_6,#bus6,#bus_7,#bus7').addClass('active');$('html,body').scrollTop(t);}
if(hash=='#bus_8'||hash=='#bus8'){if(0<$("#bus_8").size()){var t=$('#bus_8').offset().top;}else if(0<$("#bus8").size()){var t=$('#bus8').offset().top;}
$('#bus_8,#bus_9,#bus8,#bus9').addClass('active');$('html,body').scrollTop(t);}
if(hash=='#bus_35'||hash=='#bus35'){if(0<$("#bus_10").size()){var t=$('#bus_35').offset().top;}else if(0<$("#bus35").size()){var t=$('#bus35').offset().top;}
$('#bus_35,#bus_10,#bus_11,#bus_47,#bus35,#bus10,#bus11,#bus47').addClass('active');$('html,body').scrollTop(t);}
if(hash=='#bus_10'||hash=='#bus10'){if(0<$("#bus_10").size()){var t=$('#bus_10').offset().top;}else if(0<$("#bus10").size()){var t=$('#bus10').offset().top;}
$('#bus_10,#bus_11,#bus10,#bus11').addClass('active');$('html,body').scrollTop(t);}
if(hash=='#bus_37'||hash=='#bus37'){if(0<$("#bus_37").size()){var t=$('#bus_37').offset().top;}else if(0<$("#bus37").size()){var t=$('#bus37').offset().top;}
$('#bus_37').addClass('active');$('html,body').scrollTop(t);}
if(hash=='#bus_36'||hash=='#bus36'){if(0<$("#bus_36").size()){var t=$('#bus_36').offset().top;}else if(0<$("#bus36").size()){var t=$('#bus36').offset().top;}
$('#bus_36').addClass('active');$('html,body').scrollTop(t);}},onNavIndex:function(){$('.anchor .anchor__box').each(function(){$(this).children('a').hover(function(){$(this).parent('a').addClass('select')},function(){$(this).parent('a').removeClass('select')});});},onAncorLink:function(){$('.js-access-anchor a').click(function(e){var target=$(this).data('target-cms');var targetY=$('.grid-item.'+target).offset().top;$('html,body').animate({scrollTop:targetY},600);var cls=target.replace('#bus','area');$('.grid-item').removeClass('active');$('.grid-item.'+cls).addClass('active');});$('.anchor__box a, .anchor__pipe a').click(function(e){var target=$(this).attr('class');var targetY=$('.grid-item.'+target).offset().top;$('html,body').animate({scrollTop:targetY},600);var get_id=$(this).attr('class');var cls=get_id.replace('#bus','area');$('.grid-item').removeClass('active');$('.grid-item.'+cls).addClass('active');});return false;}};$(function(){window.Main=new AceessShopping();Main._init();});})(jQuery,this);