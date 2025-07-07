jQuery(document).ready(function($){

	if ($('input[name="coupon_flag"]:eq(0)').is(':checked') ){
		$('#chk_address > sup').css({'visibility':'visible'});
	} else {
		$('#chk_address > sup').css({'visibility':'hidden'});
	}

	if ($('input[name=select_arrive]:eq(0)').is(':checked') ){
		$('#state').prop('disabled',false);
		$('#world_name').prop('disabled',true);
	} else {
		if ($('input[name="select_arrive"]:eq(1)').is(':checked') ){
			$('#state').prop('disabled',true);
			$('#world_name').prop('disabled',false);
		} else {
			$('#state').prop('disabled',true);
			$('#world_name').prop('disabled',true);
		}
	}

	$('input[name="select_arrive"]').click(function(){
		var num = $('[name="select_arrive"]').index(this);
		if(num == 1) {
			$('#state').prop('disabled',true);
			$('#world_name').prop('disabled',false);
		} else {
			$('#state').prop('disabled',false);
			$('#world_name').prop('disabled',true);
		}
	});


	if(shop_name_val == null) {
		shop_name_val = "";
	} else {
      shop_name_val = false;
	}

    $('#shop_name_1').ajaxComboBox(
        '/reserve/search_shop',
        {
            'db_table'     : '',
            'field'        : 'shop_name',
            'button_img'   : '/_assets_rev03/js/libs/jquery-ajax-combobox/images/btn_combobox.png',
            'per_page'     : '10',
            'init_record'  : shop_name_val
        }
    );

});

function checkradio(val){
	if (val == 'block') {
		$('#chk_address > sup').css({'visibility':'visible'});
	}else{
		$('#chk_address > sup').css({'visibility':'hidden'});
	}
}
function setOption() {
  if ( ( $("#centerID").val() != "2" ) && ( $("#centerID").val() != "" ) ){
    $('#bus_count').children('[value="0"]').remove();
  } else {
    $('#bus_count').prepend($('<option>').attr({ value: '0' }).text('0'));
    $('#bus_count').children('[value=""]').remove();
    $('#bus_count').prepend($('<option>').attr({ value: '' }).text('---'));
  }
  if ( $("#centerID").val() == "10" ) {
    $('.reserve-form__txt--fpo').show();
  } else {
    $('.reserve-form__txt--fpo').hide();
  }
}
