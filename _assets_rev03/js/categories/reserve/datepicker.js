$(function(){

		$("#datepicker").datepicker();
		$("#datepicker").datepicker("option", "showOn", 'button');
		$("#datepicker").datepicker("option", "buttonImageOnly", true);
		$("#datepicker").datepicker("option", "buttonImage", '/_assets_rev03/images/page/reserve/img_calendar.png');
			$('#datepicker').bind("change", function() {
			setDatePulldown($(this).val());
		});
		$('#y').bind("change", function() {
			setDateHidden();
		});
		
		$('#m').bind("change", function() {
			setDateHidden();
		});
		
		$('#d').bind("change", function() {
			setDateHidden();
		});
		
		if(come_date == null) {
			var today = null;
		} else {
			$('#datepicker').val(come_date);
		}
});

// Datepickerの日付がクリックされた時にプルダウンを変更させる関数
function setDatePulldown(date) {
	var dates = date.split('/');
	$("#y").val(dates[0]);
	$("#m").val(dates[1]);
	$("#d").val(dates[2]);
}

// プルダウンが変更されたときに日付をDatepickerに反映させる関数
function setDateHidden() {
	if ($("#y").val() == '--' || $("#m").val() == '--' || $("#d").val() == '--') {return;}
	var year = parseInt($("#y").val());
	var month = parseInt($("#m").val());
	var day = parseInt($("#d").val());
	var newdate = year + "/" + month + "/" + day;
	$('#datepicker').val(newdate);
}
