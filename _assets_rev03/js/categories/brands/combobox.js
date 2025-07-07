
shop_name_val=null;include_centers=null;field=null;function getBrand(){if(COMMON.langs!='lang_ja'){var lang='name_en';var langSet='en';}else{var lang='name';var langSet='ja';}
var url='./search_shop.html';$('#shop_name_1').ajaxComboBox(url,{'db_table':'','field':lang,'lang':langSet,'button_img':'/_assets_rev03/images/common/previous/btn/btn_combobox.png','per_page':'10'});}
jQuery(document).ready(getBrand);