// $(function() {
// 	var spAppUrl = new Array();

// 	spAppUrl[spAppUrl.length] = "/en/kobesanda/access/bus_schedule_root1.html";
// 	spAppUrl[spAppUrl.length] = "/en/kobesanda/access/bus_schedule_root2.html";
// 	spAppUrl[spAppUrl.length] = "/en/kobesanda/access/bus_schedule_root02.html";
// 	spAppUrl[spAppUrl.length] = "/en/kobesanda/access/bus_schedule_root3.html";
// 	spAppUrl[spAppUrl.length] = "/en/rinku/sp/spring-2024/";
// 	spAppUrl[spAppUrl.length] = "/en/kobesanda/sp/spring-2024/";

// 	var  isSpApp = function () {
// 		var res = false;
// 		for (var i = 0; i < spAppUrl.length; i++ ) {
// 			if (location.pathname == spAppUrl[i]) {
// 				res = true;
// 				break;
// 			}
// 		}
// 		return res;
// 	}

// 	var redirect = function () {
// 		console.log('redirector_referrer:', document.referrer);
// 		if(document.referrer != '') {
// 			console.log('document.referrer:has referrer');
// 			console.log('location.pathname');console.log(location.pathname);
// 			console.log('location.search');console.log(location.search);
// 			return ;
// 		}

// 		//*
// 		console.log('navigator.userAgent:', navigator.userAgent);
// 		//var regUa = /jp.co.premiumoutlets/iu;
// 		//var result = regUa.test(navigator.userAgent);
// 		//if(result) {
// 		if (navigator.userAgent.indexOf('jp.co.premiumoutlets') != -1) {
// 			if(isSpApp()) {
// 				console.log('navigator.userAgent:non redirect ua');
// 				return ;
// 			}
// 		}
// 		//*/
// 		console.log('navigator.userAgent:redirect ua');
		
// 		$.ajax({
// 			url: "/redirect/common_redirect.php",
// 			type: "GET",
// 			dataType: 'json',
// 			cache : false,
// 			data: {
// 	          current_url: location.pathname + location.search
// 	        }
// 		}).done(function(res) {
// 			if(res.status == 'redirect') {
// //			    console.log('redirector_status：', res.status);
// 				location.href = res.url;
// 			}
// 			else{
// 			    console.log('redirector_status:', res.status);
// 			    console.log('redirector_mes:', res.mes);
// 			    console.log('redirector_url:', res.url);
// 				console.log('redirector_line:', res.line);
// 			}
// 		}).fail(function (jqXHR, textStatus, errorThrown) {
// 		    console.log('redirector_status:error', jqXHR, textStatus, errorThrown);
// 		});
// 	}
// 	redirect();
// });