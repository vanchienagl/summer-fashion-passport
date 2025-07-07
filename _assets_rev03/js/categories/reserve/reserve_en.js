$(function() {
	// $('.cnt_des').css({'display':'none'});
	$('.cnt_btn button').on('click', function() {
		let a = $(this).attr('aria-expanded');
		$('.cnt_des').slideToggle();
		if(a == 'false') {
      $(this).attr('aria-expanded', 'true');
      $('.cnt_des').attr('aria-hidden', 'false')
		} else {
			$(this).attr('aria-expanded', 'false')
			$('.cnt_des').attr('aria-hidden', 'true')
		}
	});

	if ($("[name='coupon_flag']:eq(0)").is(':checked') ){
		$('table.reserve-form-entry--zipcode sup').css({'visibility':'visible'});
		$("[name='send_zip']").prop('disabled',false);
		$("[name='send_address']").prop('disabled',false);
	} else {
		$('table.reserve-form-entry--zipcode sup').css({'visibility':'hidden'});
		$("[name='send_zip']").prop('disabled',true);
		$("[name='send_address']").prop('disabled',true);
	}

	if ( ( $("#centerID").val() != "2" ) && ( $("#centerID").val() != "" ) ) {
    	$('#bus_count').children('[value="0"]').remove();
	}
});

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
function checkradio(val){
	if (val == 'block') {
		$('table.reserve-form-entry--zipcode sup').css({'visibility':'visible'});
		$("[name='send_zip']").prop('disabled',false);
		$("[name='send_address']").prop('disabled',false);
	}else{
		$('table.reserve-form-entry--zipcode sup').css({'visibility':'hidden'});
		$("[name='send_zip']").prop('disabled',true);
		$("[name='send_address']").prop('disabled',true);
	}
}
