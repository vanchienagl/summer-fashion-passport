
(function($){var BusSearch=function(){this.init();console.log('--@@BusSearch@@--+')}
BusSearch.prototype={init:function(){var s=this;this.$app=$('.js-bus-search');if(!this.$app[0])return;this.$btnChenge=this.$app.find('.js-bus-search-btn-change');this.$fields=this.$app.find('.js-bus-search-fields');this.$btnSearch=this.$app.find('.js-bus-search-btn-search');this.$btnClear=this.$app.find('.js-bus-search-btn-clear');this.$condition=this.$app.find('.js-bus-search-condition');this.$loading=this.$app.find('.js-bus-search-loading');this.$result=this.$app.find('.js-bus-search-result');this.$inputDate=this.$app.find('[name=bus-search-date]');this.$inputDir=this.$app.find('[name=bus-search-dir]');this.$inputTimeBegin=this.$app.find('[name=bus-search-time-begin]');this.$inputTimeEnd=this.$app.find('[name=bus-search-time-end]');this.$inputPlace=this.$app.find('[name=bus-search-place\\[\\]]');this.$inputOther=this.$app.find('[name=bus-search-other]');this.setup();},setup:function(){var s=this;$(".datepicker").datepicker({minDate:'-0d',maxDate:'+3m',beforeShow:function(input,inst){setTimeout(function(){$('#ui-datepicker-div').css('z-index',100);},0);}});new TimeSelect;this.condition=new Condition(this.$app);this.result=new Result(this.$app);this.$btnSearch.on('click',function(e){e.preventDefault();s.search();});this.$btnClear.on('click',function(e){e.preventDefault();s.clearfields();});this.$btnChenge.on('click',function(e){e.preventDefault();s.reSearch();});},search:function(){var s=this;if(!this.inpudValidate()){return;}
$('body, html').stop().animate({scrollTop:this.$app.offset().top},{duration:400,easing:'swing'});this.hidefields();this.result.hideResult();this.showLoading();var placeText=[];var placeValue=[];this.$inputPlace.filter(':checked').each(function(){placeText.push($(this).next('label').text());placeValue.push($(this).val());})
let dateInput=this.$inputDate.val().replace(/\//g,'-');const dateInputList=dateInput.split('-');dateInput=dateInputList[2]+'-'+dateInputList[0]+'-'+dateInputList[1];this.condValue={date:dateInput,dir:this.$inputDir.filter(':checked').val(),time_begin:this.$inputTimeBegin.val(),time_end:this.$inputTimeEnd.val(),place:placeValue,other:this.$inputOther.filter(':checked').val()||'0'}
this.condText={date:s.escapeHTML(this.$inputDate.val()),dir:this.$inputDir.filter(':checked').parent('label').text(),time_begin:this.$inputTimeBegin.val(),time_end:this.$inputTimeEnd.val(),place:placeText,other:this.$inputOther.filter(':checked').data('text')}
this.condition.show(this.condText);$.ajax({url:'/api/v1/gotemba/access/bus/search',type:'GET',dataType:'json',data:{'departure_date':this.condValue.date,'bus-search-time-begin':this.condValue.time_begin,'bus-search-time-end':this.condValue.time_end,'direction':this.condValue.dir,'search_area':this.condValue.place,'include_timeline':this.condValue.other}}).done(function(data){console.log('done');console.log('data.datalist>>>>',data.datalist);s.searchDone(data);}).fail(function(data){s.searchError(data);})},inpudValidate:function(){if(!this.$inputDate.val()){alert('Please input the departure day.');return false;}
var bt=this.$inputTimeBegin.val();var et=this.$inputTimeEnd.val();if(bt&&et){if(parseInt(bt.replace(':',''))>=parseInt(et.replace(':',''))){alert('Please revise your departure time.');return false;}}
if(!this.$inputPlace.filter(':checked')[0]){alert('Please select at least one departure place.');return false;}
return true;},searchDone:function(data){var s=this;this.showBtnChange();this.hideLoading();this.result.show(data,this.condValue);},searchError:function(data){var s=this;},reSearch:function(){this.$btnChenge.css({display:'none'});this.condition.hide(this.condText);this.showfields();},showLoading:function(){this.$loading.css({opacity:1,display:'block'});},hideLoading:function(){this.$loading.css({display:'none'});},showBtnChange:function(){this.$btnChenge.css({display:'block',opacity:0}).animate({opacity:1},{duration:400});},showfields:function(){this.$fields.css({display:'block',opacity:0}).animate({opacity:1},{duration:400});},hidefields:function(){this.$fields.css({display:'none'});},clearfields:function(){var s=this;this.$inputDate.val("");this.$inputDir.eq(0).prop('checked',true).trigger("change");this.$inputPlace.prop('checked',false);this.$inputOther.prop('checked',false);},escapeHTML:function(str){return str.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}}
var Condition=function($app){this.init($app);}
Condition.prototype={init:function($app){var s=this;this.$app=$app;this.$condition=this.$app.find('.js-bus-search-condition');},show:function(condText){var html='';html+='Departure day : '+(condText.date||'Unspecified')+'<br>';if(!condText.dir){html+='Departure time:Unspecified<br>'}else{if(!condText.time_begin&&!condText.time_end){html+='Departure time : '+condText.dir+' Unspecified<br>';}else{html+='Departure time : '+condText.dir+' '+(condText.time_begin||'')+' ~ '+(condText.time_end||'')+'<br>';}}
if(!condText.place[0]){html+='Arrival time : Unspecified<br>';}else{html+='Arrival time : '+condText.place.join('、')+'<br>'}
if(condText.other){html+=condText.other;}
this.$condition.html(html).css({display:'block',opacity:0}).animate({opacity:1},{duration:400});},hide:function(){this.$condition.css({display:'none'});}}
var Result=function($app){this.init($app);}
Result.prototype={init:function($app){var s=this;this.$app=$app;this.$result=this.$app.find('.js-bus-search-result');this.$resultBoxes=this.$app.find('.js-bus-search-result-boxes');this.$noResult=this.$app.find('.js-bus-search-result-error');this.showNum=10;},show:function(data,condValue){var s=this;this.resultData=data;this.condValue=condValue;this.$result.css({display:'block'});this.displayedResultBoxNum=0;this.datalistLength=this.resultData.datalist.length;if(this.resultData.datalist.length<=0){this.showNoResult();}else{this.showResultBox();}
$(window).on('scroll.BusSearch',function(e){s.scrollResult();});},hideResult:function(){$(window).off('scroll.BusSearch');this.$resultBoxes.empty();this.$noResult.css({display:'none'});this.$result.css({display:'none'});},scrollResult:function(){if($(window).scrollTop()+window.innerHeight*0.7>this.$result.offset().top+this.$result.height()){this.showResultBox()}},showNoResult:function(){this.$noResult.css({display:'block'});},showResultBox:function(){var s=this;var startIndex=this.displayedResultBoxNum;var stopIndex=this.displayedResultBoxNum+this.showNum;if(stopIndex>this.datalistLength){stopIndex=this.datalistLength;}
var html='';for(var i=startIndex;i<stopIndex;i++){html+=this.createResultBoxHtml(this.resultData.datalist[i]);}
this.displayedResultBoxNum=stopIndex;$(html).appendTo(this.$resultBoxes).css({display:'block',opacity:0}).animate({opacity:1},{duration:600});},createResultBoxHtml:function(item){var s=this;var html='';if(item.view_type==1){html+='<div class="bus-search-result__box">';html+='<div class="bus-search-result__box--title">';html+='<div class="label--plum">Direct<br>bus</div>';html+='<h2 class="bus-search-result-box__title text-em">From/To '+item.start_place_en+'</h2>';}else{html+='<div class="bus-search-result__box bus-search-result__box--gray">';html+='<div class="bus-search-result__box--title">';html+='<div class="label--black">Non-direct<br>bus</div>';html+='<h2 class="bus-search-result-box__title text-em">From/To '+item.place_name_en+'</h2>';}
html+='</div>'
html+='<div class="bus-search-result__box--data">';html+='<div class="bus-search-result__data--place">';html+='<h3 class="place--h">Dep.</h3>';if(item.view_type==1){html+='<p class="place--b">'+item.start_place_text_en+'</p>';}else{html+='<p class="place--b">'+item.place_name_en+'</p>';}
html+='</div>'
if(item.view_type==1){html+='<div class="bus-search-result__data--fare">';html+='<h3 class="place--h">Fare</h3>';html+='<p class="place--b">'+s.TextReplace(item.fare_en)+'</p>';html+='</div>';}
html+='<div class="bus-search-result__data--timetable">';html+='<table class="table--timetable">';html+='<tr>';html+='<th class="ch01" colspan="2">Dep.</th>';html+='<th class="ch02">Arr.</th>';html+='</tr>';html+='<tr>';html+='<td class="cl01">'+item.departure_time.replace(/:00$/,''),+'</td>';html+='<td class="cl_arw">→</td>';html+='<td class="cl02">'+item.arrival_time.replace(/:00$/,'')+'</td>';html+='</tr>';html+='<tr>';if(this.condValue.dir==1){if(item.view_type==1){html+='<td>'+item.start_place_en+'</td>';html+='<td class="cl_arw">→</td>';html+='<td>Gotemba Premium Outlets</td>';}else{html+='<td>'+item.place_name_en+'</td>';html+='<td class="cl_arw">→</td>';html+='<td>'+item.terminal_name_en+'</td>';}}else{if(item.view_type==1){html+='<td>Gotemba Premium Outlets</td>';html+='<td class="cl_arw">→</td>';html+='<td>'+item.start_place_en+'</td>';}else{html+='<td>'+item.place_name_en+'</td>';html+='<td class="cl_arw">→</td>';html+='<td>'+item.terminal_name_en+'</td>';}}
html+='</tr>';html+='</table>';html+='</div>';html+='<div class="bus-search-result__data--btn">';if(item.view_type==1){html+='<a href="../detail'+item.direct_bus_id+'.html" class="bus-search-btn">Details</a>';}else{html+='<a href="'+item.url_en+'" target="_blank" class="bus-search-btn">Visit the operating company website<img src="/_assets_rev03/images/common/previous/icon/icon_external_wh.png" alt="Open in new tab or window"><img src="/_assets_rev03/images/common/previous/icon/icon_external.png" alt="Open in new tab or window"></a>';}
html+='</div>';html+='</div>';html+='</div>';return html;},desplayedAll:function(){$(window).off('scroll.BusSearch');},TextReplace:function(text){let str=text;const $$ua=()=>{let deviceType='pc';if(navigator.userAgent.match(/iPhone|Android.+Mobile/)){deviceType='sp';}else if(navigator.userAgent.match(/iPad|Android/)){deviceType='tb';};return deviceType;},$$replaceTel=(str)=>{let replacedStr=str;if(ua!=='pc'){replacedStr=replacedStr.replaceAll(/\[:\/TEL:\](\S+?)\[:TEL\/:\]/g,'<a href="tel:$1" class="is-tell">$1</a>');}else{replacedStr=replacedStr.replaceAll('[:/TEL:]','');replacedStr=replacedStr.replaceAll('[:TEL/:]','');}
return replacedStr;};const ua=$$ua();str=str.replaceAll(/\r?\n/g,'<br>')
str=str.replaceAll('[:/fare_title:]','<span class="fare_title">');str=str.replaceAll('[:fare_title/:]','</span>');str.replaceAll('[:/RED:]','<span class="red">');str=str.replaceAll('[:RED/:]','</span>');str=str.replaceAll('[:/fare_body:]','<span class="fare_body">');str=str.replaceAll('[:fare_body/:]','</span>');str=str.replaceAll('[:/CHECK:]','<span class="red">');str=str.replaceAll('[:CHECK/:]','</span>');str=str.replaceAll('[:/STRONG:]','<strong>');str=str.replaceAll('[:STRONG/:]','</strong>');str=str.replaceAll('[:/ATT:]','<span class="att">');str=str.replaceAll('[:ATT/:]','</span>');str=str.replaceAll('[:/SAT:]','<span class="sat">');str=str.replaceAll('[:SAT/:]','</span>');str=str.replaceAll('[:/SUN:]','<span class="sun">');str=str.replaceAll('[:SUN/:]','</span>');str=str.replaceAll('[:/APP_REMOVE:]','');str=str.replaceAll('[:APP_REMOVE/:]','');str=str.replaceAll('[:/RED:]','<span class="red">');str=str.replaceAll('[:RED/:]','</span>');str=str.replaceAll('[:/textlink:]','<a href="');str=str.replaceAll('[:/textlinktext:]','">');str=str.replaceAll('[:textlinktext/:]','</a>');str=str.replaceAll('[:textlink/:]','');if(str.indexOf('[:/TEL:]')>-1)str=$$replaceTel(str);return str;}}
var TimeSelect=function(){this.init();}
TimeSelect.prototype={init:function(){var s=this;this.$app=$('.js-bus-search');this.$inputDir=this.$app.find('[name=bus-search-dir]');this.$inputTimeBegin=this.$app.find('[name=bus-search-time-begin]');this.$inputTimeEnd=this.$app.find('[name=bus-search-time-end]');this.setup();},setup:function(){var s=this;s.dirUpdate();this.$inputDir.on('change',function(e){s.dirUpdate();});},dirUpdate:function(){var GoTimebigin='\
      <option value="">-</option>\
      <option value="06:00">6:00</option>\
      <option value="07:00">7:00</option>\
      <option value="08:00">8:00</option>\
      <option value="09:00">9:00</option>\
      <option value="10:00">10:00</option>\
      <option value="11:00">11:00</option>\
      <option value="12:00">12:00</option>\
      <option value="13:00">13:00</option>\
      <option value="14:00">14:00</option>\
      <option value="15:00">15:00</option>\
      <option value="16:00">16:00</option>';var GOTimeEnd='\
      <option value="">-</option>\
      <option value="07:00">7:00</option>\
      <option value="08:00">8:00</option>\
      <option value="09:00">9:00</option>\
      <option value="10:00">10:00</option>\
      <option value="11:00">11:00</option>\
      <option value="12:00">12:00</option>\
      <option value="13:00">13:00</option>\
      <option value="14:00">14:00</option>\
      <option value="15:00">15:00</option>\
      <option value="16:00">16:00</option>\
      <option value="17:00">17:00</option>';var BackTimebigin='\
      <option value="">-</option>\
      <option value="10:00">10:00</option>\
      <option value="11:00">11:00</option>\
      <option value="12:00">12:00</option>\
      <option value="13:00">13:00</option>\
      <option value="14:00">14:00</option>\
      <option value="15:00">15:00</option>\
      <option value="16:00">16:00</option>\
      <option value="17:00">17:00</option>\
      <option value="18:00">18:00</option>\
      <option value="19:00">19:00</option>\
      <option value="20:00">20:00</option>';var BackTimeEnd='\
      <option value="">-</option>\
      <option value="11:00">11:00</option>\
      <option value="12:00">12:00</option>\
      <option value="13:00">13:00</option>\
      <option value="14:00">14:00</option>\
      <option value="15:00">15:00</option>\
      <option value="16:00">16:00</option>\
      <option value="17:00">17:00</option>\
      <option value="18:00">18:00</option>\
      <option value="19:00">19:00</option>\
      <option value="20:00">20:00</option>\
      <option value="21:00">21:00</option>';var EmptyTimebigin='\
      <option value="">-</option>';var EmptyTimeEnd='\
      <option value="">-</option>';if(this.$inputDir.filter(':checked').val()==1){this.$inputTimeBegin.html(GoTimebigin);this.$inputTimeEnd.html(GOTimeEnd);}else if(this.$inputDir.filter(':checked').val()==2){this.$inputTimeBegin.html(BackTimebigin);this.$inputTimeEnd.html(BackTimeEnd);}else{this.$inputTimeBegin.html(EmptyTimebigin);this.$inputTimeEnd.html(EmptyTimeEnd);}}}
$(function(){new BusSearch;});})(jQuery);