/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined"==typeof jQuery.migrateMute&&(jQuery.migrateMute=!0),function(a,b,c){function d(c){var d=b.console;f[c]||(f[c]=!0,a.migrateWarnings.push(c),d&&d.warn&&!a.migrateMute&&(d.warn("JQMIGRATE: "+c),a.migrateTrace&&d.trace&&d.trace()))}function e(b,c,e,f){if(Object.defineProperty)try{return void Object.defineProperty(b,c,{configurable:!0,enumerable:!0,get:function(){return d(f),e},set:function(a){d(f),e=a}})}catch(g){}a._definePropertyBroken=!0,b[c]=e}a.migrateVersion="1.4.1";var f={};a.migrateWarnings=[],b.console&&b.console.log&&b.console.log("JQMIGRATE: Migrate is installed"+(a.migrateMute?"":" with logging active")+", version "+a.migrateVersion),a.migrateTrace===c&&(a.migrateTrace=!0),a.migrateReset=function(){f={},a.migrateWarnings.length=0},"BackCompat"===document.compatMode&&d("jQuery is not compatible with Quirks Mode");var g=a("<input/>",{size:1}).attr("size")&&a.attrFn,h=a.attr,i=a.attrHooks.value&&a.attrHooks.value.get||function(){return null},j=a.attrHooks.value&&a.attrHooks.value.set||function(){return c},k=/^(?:input|button)$/i,l=/^[238]$/,m=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,n=/^(?:checked|selected)$/i;e(a,"attrFn",g||{},"jQuery.attrFn is deprecated"),a.attr=function(b,e,f,i){var j=e.toLowerCase(),o=b&&b.nodeType;return i&&(h.length<4&&d("jQuery.fn.attr( props, pass ) is deprecated"),b&&!l.test(o)&&(g?e in g:a.isFunction(a.fn[e])))?a(b)[e](f):("type"===e&&f!==c&&k.test(b.nodeName)&&b.parentNode&&d("Can't change the 'type' of an input or button in IE 6/7/8"),!a.attrHooks[j]&&m.test(j)&&(a.attrHooks[j]={get:function(b,d){var e,f=a.prop(b,d);return f===!0||"boolean"!=typeof f&&(e=b.getAttributeNode(d))&&e.nodeValue!==!1?d.toLowerCase():c},set:function(b,c,d){var e;return c===!1?a.removeAttr(b,d):(e=a.propFix[d]||d,e in b&&(b[e]=!0),b.setAttribute(d,d.toLowerCase())),d}},n.test(j)&&d("jQuery.fn.attr('"+j+"') might use property instead of attribute")),h.call(a,b,e,f))},a.attrHooks.value={get:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?i.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value') no longer gets properties"),b in a?a.value:null)},set:function(a,b){var c=(a.nodeName||"").toLowerCase();return"button"===c?j.apply(this,arguments):("input"!==c&&"option"!==c&&d("jQuery.fn.attr('value', val) no longer sets properties"),void(a.value=b))}};var o,p,q=a.fn.init,r=a.find,s=a.parseJSON,t=/^\s*</,u=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,v=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,w=/^([^<]*)(<[\w\W]+>)([^>]*)$/;a.fn.init=function(b,e,f){var g,h;return b&&"string"==typeof b&&!a.isPlainObject(e)&&(g=w.exec(a.trim(b)))&&g[0]&&(t.test(b)||d("$(html) HTML strings must start with '<' character"),g[3]&&d("$(html) HTML text after last tag is ignored"),"#"===g[0].charAt(0)&&(d("HTML string cannot start with a '#' character"),a.error("JQMIGRATE: Invalid selector string (XSS)")),e&&e.context&&e.context.nodeType&&(e=e.context),a.parseHTML)?q.call(this,a.parseHTML(g[2],e&&e.ownerDocument||e||document,!0),e,f):(h=q.apply(this,arguments),b&&b.selector!==c?(h.selector=b.selector,h.context=b.context):(h.selector="string"==typeof b?b:"",b&&(h.context=b.nodeType?b:e||document)),h)},a.fn.init.prototype=a.fn,a.find=function(a){var b=Array.prototype.slice.call(arguments);if("string"==typeof a&&u.test(a))try{document.querySelector(a)}catch(c){a=a.replace(v,function(a,b,c,d){return"["+b+c+'"'+d+'"]'});try{document.querySelector(a),d("Attribute selector with '#' must be quoted: "+b[0]),b[0]=a}catch(e){d("Attribute selector with '#' was not fixed: "+b[0])}}return r.apply(this,b)};var x;for(x in r)Object.prototype.hasOwnProperty.call(r,x)&&(a.find[x]=r[x]);a.parseJSON=function(a){return a?s.apply(this,arguments):(d("jQuery.parseJSON requires a valid JSON string"),null)},a.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a.browser||(o=a.uaMatch(navigator.userAgent),p={},o.browser&&(p[o.browser]=!0,p.version=o.version),p.chrome?p.webkit=!0:p.webkit&&(p.safari=!0),a.browser=p),e(a,"browser",a.browser,"jQuery.browser is deprecated"),a.boxModel=a.support.boxModel="CSS1Compat"===document.compatMode,e(a,"boxModel",a.boxModel,"jQuery.boxModel is deprecated"),e(a.support,"boxModel",a.support.boxModel,"jQuery.support.boxModel is deprecated"),a.sub=function(){function b(a,c){return new b.fn.init(a,c)}a.extend(!0,b,this),b.superclass=this,b.fn=b.prototype=this(),b.fn.constructor=b,b.sub=this.sub,b.fn.init=function(d,e){var f=a.fn.init.call(this,d,e,c);return f instanceof b?f:b(f)},b.fn.init.prototype=b.fn;var c=b(document);return d("jQuery.sub() is deprecated"),b},a.fn.size=function(){return d("jQuery.fn.size() is deprecated; use the .length property"),this.length};var y=!1;a.swap&&a.each(["height","width","reliableMarginRight"],function(b,c){var d=a.cssHooks[c]&&a.cssHooks[c].get;d&&(a.cssHooks[c].get=function(){var a;return y=!0,a=d.apply(this,arguments),y=!1,a})}),a.swap=function(a,b,c,e){var f,g,h={};y||d("jQuery.swap() is undocumented and deprecated");for(g in b)h[g]=a.style[g],a.style[g]=b[g];f=c.apply(a,e||[]);for(g in b)a.style[g]=h[g];return f},a.ajaxSetup({converters:{"text json":a.parseJSON}});var z=a.fn.data;a.fn.data=function(b){var e,f,g=this[0];return!g||"events"!==b||1!==arguments.length||(e=a.data(g,b),f=a._data(g,b),e!==c&&e!==f||f===c)?z.apply(this,arguments):(d("Use of jQuery.fn.data('events') is deprecated"),f)};var A=/\/(java|ecma)script/i;a.clean||(a.clean=function(b,c,e,f){c=c||document,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,d("jQuery.clean() is deprecated");var g,h,i,j,k=[];if(a.merge(k,a.buildFragment(b,c).childNodes),e)for(i=function(a){return!a.type||A.test(a.type)?f?f.push(a.parentNode?a.parentNode.removeChild(a):a):e.appendChild(a):void 0},g=0;null!=(h=k[g]);g++)a.nodeName(h,"script")&&i(h)||(e.appendChild(h),"undefined"!=typeof h.getElementsByTagName&&(j=a.grep(a.merge([],h.getElementsByTagName("script")),i),k.splice.apply(k,[g+1,0].concat(j)),g+=j.length));return k});var B=a.event.add,C=a.event.remove,D=a.event.trigger,E=a.fn.toggle,F=a.fn.live,G=a.fn.die,H=a.fn.load,I="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",J=new RegExp("\\b(?:"+I+")\\b"),K=/(?:^|\s)hover(\.\S+|)\b/,L=function(b){return"string"!=typeof b||a.event.special.hover?b:(K.test(b)&&d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),b&&b.replace(K,"mouseenter$1 mouseleave$1"))};a.event.props&&"attrChange"!==a.event.props[0]&&a.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),a.event.dispatch&&e(a.event,"handle",a.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),a.event.add=function(a,b,c,e,f){a!==document&&J.test(b)&&d("AJAX events should be attached to document: "+b),B.call(this,a,L(b||""),c,e,f)},a.event.remove=function(a,b,c,d,e){C.call(this,a,L(b)||"",c,d,e)},a.each(["load","unload","error"],function(b,c){a.fn[c]=function(){var a=Array.prototype.slice.call(arguments,0);return"load"===c&&"string"==typeof a[0]?H.apply(this,a):(d("jQuery.fn."+c+"() is deprecated"),a.splice(0,0,c),arguments.length?this.bind.apply(this,a):(this.triggerHandler.apply(this,a),this))}}),a.fn.toggle=function(b,c){if(!a.isFunction(b)||!a.isFunction(c))return E.apply(this,arguments);d("jQuery.fn.toggle(handler, handler...) is deprecated");var e=arguments,f=b.guid||a.guid++,g=0,h=function(c){var d=(a._data(this,"lastToggle"+b.guid)||0)%g;return a._data(this,"lastToggle"+b.guid,d+1),c.preventDefault(),e[d].apply(this,arguments)||!1};for(h.guid=f;g<e.length;)e[g++].guid=f;return this.click(h)},a.fn.live=function(b,c,e){return d("jQuery.fn.live() is deprecated"),F?F.apply(this,arguments):(a(this.context).on(b,this.selector,c,e),this)},a.fn.die=function(b,c){return d("jQuery.fn.die() is deprecated"),G?G.apply(this,arguments):(a(this.context).off(b,this.selector||"**",c),this)},a.event.trigger=function(a,b,c,e){return c||J.test(a)||d("Global events are undocumented and deprecated"),D.call(this,a,b,c||document,e)},a.each(I.split("|"),function(b,c){a.event.special[c]={setup:function(){var b=this;return b!==document&&(a.event.add(document,c+"."+a.guid,function(){a.event.trigger(c,Array.prototype.slice.call(arguments,1),b,!0)}),a._data(this,c,a.guid++)),!1},teardown:function(){return this!==document&&a.event.remove(document,c+"."+a._data(this,c)),!1}}}),a.event.special.ready={setup:function(){this===document&&d("'ready' event is deprecated")}};var M=a.fn.andSelf||a.fn.addBack,N=a.fn.find;if(a.fn.andSelf=function(){return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),M.apply(this,arguments)},a.fn.find=function(a){var b=N.apply(this,arguments);return b.context=this.context,b.selector=this.selector?this.selector+" "+a:a,b},a.Callbacks){var O=a.Deferred,P=[["resolve","done",a.Callbacks("once memory"),a.Callbacks("once memory"),"resolved"],["reject","fail",a.Callbacks("once memory"),a.Callbacks("once memory"),"rejected"],["notify","progress",a.Callbacks("memory"),a.Callbacks("memory")]];a.Deferred=function(b){var c=O(),e=c.promise();return c.pipe=e.pipe=function(){var b=arguments;return d("deferred.pipe() is deprecated"),a.Deferred(function(d){a.each(P,function(f,g){var h=a.isFunction(b[f])&&b[f];c[g[1]](function(){var b=h&&h.apply(this,arguments);b&&a.isFunction(b.promise)?b.promise().done(d.resolve).fail(d.reject).progress(d.notify):d[g[0]+"With"](this===e?d.promise():this,h?[b]:arguments)})}),b=null}).promise()},c.isResolved=function(){return d("deferred.isResolved is deprecated"),"resolved"===c.state()},c.isRejected=function(){return d("deferred.isRejected is deprecated"),"rejected"===c.state()},b&&b.call(c,c),c}}}(jQuery,window);


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
/*
 * simplyScroll 2 - a scroll-tastic jQuery plugin
 *
 * http://logicbox.net/jquery/simplyscroll/
 *
 * Copyright (c) 2009-2012 Will Kelly - http://logicbox.net
 *
 * Dual licensed under the MIT and GPL licenses.
 *
 * Version: 2.0.5 Last revised: 10/05/2012
 *
 */
(function(c,j,i){c.fn.simplyScroll=function(a){return this.each(function(){new c.simplyScroll(this,a)})};var h={customClass:"simply-scroll",frameRate:24,speed:1,orientation:"horizontal",auto:!0,autoMode:"loop",manualMode:"end",direction:"forwards",pauseOnHover:!0,pauseOnTouch:!0,pauseButton:!1,startOnLoad:!1};c.simplyScroll=function(a,b){var g=this;this.o=c.extend({},h,b||{});this.isAuto=!1!==this.o.auto&&null!==this.o.autoMode.match(/^loop|bounce$/);this.isRTL=(this.isHorizontal=null!==this.o.orientation.match(/^horizontal|vertical$/)&&
this.o.orientation==h.orientation)&&"rtl"==c("html").attr("dir");this.isForwards=!this.isAuto||this.isAuto&&(null!==this.o.direction.match(/^forwards|backwards$/)&&this.o.direction==h.direction)&&!this.isRTL;this.isLoop=this.isAuto&&"loop"==this.o.autoMode||!this.isAuto&&"loop"==this.o.manualMode;this.events=(this.supportsTouch="createTouch"in document)?{start:"touchstart MozTouchDown",move:"touchmove MozTouchMove",end:"touchend touchcancel MozTouchRelease"}:{start:"mouseenter",end:"mouseleave"};
this.$list=c(a);var d=this.$list.children();this.$list.addClass("simply-scroll-list").wrap('<div class="simply-scroll-clip"></div>').parent().wrap('<div class="'+this.o.customClass+' simply-scroll-container"></div>');this.isAuto?this.o.pauseButton&&(this.$list.parent().parent().prepend('<div class="simply-scroll-btn simply-scroll-btn-pause"></div>'),this.o.pauseOnHover=!1):this.$list.parent().parent().prepend('<div class="simply-scroll-forward"></div>').prepend('<div class="simply-scroll-back"></div>');
if(1<d.length){var f=!1,e=0;this.isHorizontal?(d.each(function(){e=e+c(this).outerWidth(true)}),f=d.eq(0).outerWidth(!0)*d.length!==e):(d.each(function(){e=e+c(this).outerHeight(true)}),f=d.eq(0).outerHeight(!0)*d.length!==e);f&&(this.$list=this.$list.wrap("<div></div>").parent().addClass("simply-scroll-list"),this.isHorizontal?this.$list.children().css({"float":"left",width:e+"px"}):this.$list.children().css({height:e+"px"}))}this.o.startOnLoad?c(j).load(function(){g.init()}):this.init()};c.simplyScroll.fn=
c.simplyScroll.prototype={};c.simplyScroll.fn.extend=c.simplyScroll.extend=c.extend;c.simplyScroll.fn.extend({init:function(){this.$items=this.$list.children();this.$clip=this.$list.parent();this.$container=this.$clip.parent();this.$btnBack=c(".simply-scroll-back",this.$container);this.$btnForward=c(".simply-scroll-forward",this.$container);this.isHorizontal?(this.itemMax=this.$items.eq(0).outerWidth(!0),this.clipMax=this.$clip.width(),this.dimension="width",this.moveBackClass="simply-scroll-btn-left",
this.moveForwardClass="simply-scroll-btn-right",this.scrollPos="Left"):(this.itemMax=this.$items.eq(0).outerHeight(!0),this.clipMax=this.$clip.height(),this.dimension="height",this.moveBackClass="simply-scroll-btn-up",this.moveForwardClass="simply-scroll-btn-down",this.scrollPos="Top");this.posMin=0;this.posMax=this.$items.length*this.itemMax;var a=Math.ceil(this.clipMax/this.itemMax);if(this.isAuto&&"loop"==this.o.autoMode)this.$list.css(this.dimension,this.posMax+this.itemMax*a+"px"),this.posMax+=
this.clipMax-this.o.speed,this.isForwards?(this.$items.slice(0,a).clone(!0).appendTo(this.$list),this.resetPosition=0):(this.$items.slice(-a).clone(!0).prependTo(this.$list),this.resetPosition=this.$items.length*this.itemMax,this.isRTL&&(this.$clip[0].dir="ltr",this.$items.css("float","right")));else if(!this.isAuto&&"loop"==this.o.manualMode){this.posMax+=this.itemMax*a;this.$list.css(this.dimension,this.posMax+this.itemMax*a+"px");this.posMax+=this.clipMax-this.o.speed;this.$items.slice(0,a).clone(!0).appendTo(this.$list);
this.$items.slice(-a).clone(!0).prependTo(this.$list);this.resetPositionForwards=this.resetPosition=a*this.itemMax;this.resetPositionBackwards=this.$items.length*this.itemMax;var b=this;this.$btnBack.bind(this.events.start,function(){b.isForwards=false;b.resetPosition=b.resetPositionBackwards});this.$btnForward.bind(this.events.start,function(){b.isForwards=true;b.resetPosition=b.resetPositionForwards})}else this.$list.css(this.dimension,this.posMax+"px"),this.isForwards?this.resetPosition=0:(this.resetPosition=
this.$items.length*this.itemMax,this.isRTL&&(this.$clip[0].dir="ltr",this.$items.css("float","right")));this.resetPos();this.interval=null;this.intervalDelay=Math.floor(1E3/this.o.frameRate);if(this.isAuto||"end"!=this.o.manualMode)for(;0!==this.itemMax%this.o.speed;)if(this.o.speed--,0===this.o.speed){this.o.speed=1;break}b=this;this.trigger=null;this.funcMoveBack=function(a){a!==i&&a.preventDefault();b.trigger=!b.isAuto&&b.o.manualMode=="end"?this:null;b.isAuto?b.isForwards?b.moveBack():b.moveForward():
b.moveBack()};this.funcMoveForward=function(a){a!==i&&a.preventDefault();b.trigger=!b.isAuto&&b.o.manualMode=="end"?this:null;b.isAuto?b.isForwards?b.moveForward():b.moveBack():b.moveForward()};this.funcMovePause=function(){b.movePause()};this.funcMoveStop=function(){b.moveStop()};this.funcMoveResume=function(){b.moveResume()};if(this.isAuto){this.paused=!1;var g=function(){if(b.paused===false){b.paused=true;b.funcMovePause()}else{b.paused=false;b.funcMoveResume()}return b.paused};this.supportsTouch&&
this.$items.find("a").length&&(this.supportsTouch=!1);if(this.isAuto&&this.o.pauseOnHover&&!this.supportsTouch)this.$clip.bind(this.events.start,this.funcMovePause).bind(this.events.end,this.funcMoveResume);else if(this.isAuto&&this.o.pauseOnTouch&&!this.o.pauseButton&&this.supportsTouch){var d,f;this.$clip.bind(this.events.start,function(a){g();var c=a.originalEvent.touches[0];d=b.isHorizontal?c.pageX:c.pageY;f=b.$clip[0]["scroll"+b.scrollPos];a.stopPropagation();a.preventDefault()}).bind(this.events.move,
function(a){a.stopPropagation();a.preventDefault();a=a.originalEvent.touches[0];a=d-(b.isHorizontal?a.pageX:a.pageY)+f;if(a<0)a=0;else if(a>b.posMax)a=b.posMax;b.$clip[0]["scroll"+b.scrollPos]=a;b.funcMovePause();b.paused=true})}else this.o.pauseButton&&(this.$btnPause=c(".simply-scroll-btn-pause",this.$container).bind("click",function(a){a.preventDefault();g()?c(this).addClass("active"):c(this).removeClass("active")}));this.funcMoveForward()}else this.$btnBack.addClass("simply-scroll-btn "+this.moveBackClass).bind(this.events.start,
this.funcMoveBack).bind(this.events.end,this.funcMoveStop),this.$btnForward.addClass("simply-scroll-btn "+this.moveForwardClass).bind(this.events.start,this.funcMoveForward).bind(this.events.end,this.funcMoveStop),"end"==this.o.manualMode&&(!this.isRTL?this.$btnBack.addClass("disabled"):this.$btnForward.addClass("disabled"))},moveForward:function(){var a=this;this.movement="forward";null!==this.trigger&&this.$btnBack.removeClass("disabled");a.interval=setInterval(function(){a.$clip[0]["scroll"+a.scrollPos]<
a.posMax-a.clipMax?a.$clip[0]["scroll"+a.scrollPos]+=a.o.speed:a.isLoop?a.resetPos():a.moveStop(a.movement)},a.intervalDelay)},moveBack:function(){var a=this;this.movement="back";null!==this.trigger&&this.$btnForward.removeClass("disabled");a.interval=setInterval(function(){a.$clip[0]["scroll"+a.scrollPos]>a.posMin?a.$clip[0]["scroll"+a.scrollPos]-=a.o.speed:a.isLoop?a.resetPos():a.moveStop(a.movement)},a.intervalDelay)},movePause:function(){clearInterval(this.interval)},moveStop:function(a){this.movePause();
null!==this.trigger&&("undefined"!==typeof a&&c(this.trigger).addClass("disabled"),this.trigger=null);this.isAuto&&"bounce"==this.o.autoMode&&("forward"==a?this.moveBack():this.moveForward())},moveResume:function(){"forward"==this.movement?this.moveForward():this.moveBack()},resetPos:function(){this.$clip[0]["scroll"+this.scrollPos]=this.resetPosition}})})(jQuery,window);
/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Reused string.
  var str_hashchange = 'hashchange',
    
    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    
    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Method: jQuery.fn.hashchange
  // 
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  // 
  // Usage:
  // 
  // > jQuery(window).hashchange( [ handler ] );
  // 
  // Arguments:
  // 
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };
  
  // Property: jQuery.fn.hashchange.delay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.
  
  // Property: jQuery.fn.hashchange.domain
  // 
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  // 
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property: jQuery.fn.hashchange.src
  // 
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.src = 'path/to/file.html';
  
  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  // 
  // Usage as described in <jQuery.fn.hashchange>:
  // 
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  // 
  // A more verbose usage that allows for event namespacing:
  // 
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose 
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.
  
  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,
      
      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),
      
      fn_retval = function(val){ return val; },
      history_set = fn_retval,
      history_get = fn_retval;
    
    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };
    
    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };
    
    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );
      
      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );
        
        $(window).trigger( str_hashchange );
        
      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }
      
      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    $.support.msie && !supports_onhashchange && (function(){
      // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
      // when running in "IE7 compatibility" mode.
      
      var iframe,
        iframe_src;
      
      // When the event is bound and polling starts in IE 6/7, create a hidden
      // Iframe for history handling.
      self.start = function(){
        if ( !iframe ) {
          iframe_src = $.fn[ str_hashchange ].src;
          iframe_src = iframe_src && iframe_src + get_fragment();
          
          // Create hidden Iframe. Attempt to make Iframe as hidden as possible
          // by using techniques from http://www.paciellogroup.com/blog/?p=604.
          iframe = $('<iframe tabindex="-1" title="empty"/>').hide()
            
            // When Iframe has completely loaded, initialize the history and
            // start polling.
            .one( 'load', function(){
              iframe_src || history_set( get_fragment() );
              poll();
            })
            
            // Load Iframe src if specified, otherwise nothing.
            .attr( 'src', iframe_src || 'javascript:0' )
            
            // Append Iframe after the end of the body to prevent unnecessary
            // initial page scrolling (yes, this works).
            .insertAfter( 'body' )[0].contentWindow;
          
          // Whenever `document.title` changes, update the Iframe's title to
          // prettify the back/next history menu entries. Since IE sometimes
          // errors with "Unspecified error" the very first time this is set
          // (yes, very useful) wrap this with a try/catch block.
          doc.onpropertychange = function(){
            try {
              if ( event.propertyName === 'title' ) {
                iframe.document.title = doc.title;
              }
            } catch(e) {}
          };
          
        }
      };
      
      // Override the "stop" method since an IE6/7 Iframe was created. Even
      // if there are no longer any bound event handlers, the polling loop
      // is still necessary for back/next to work at all!
      self.stop = fn_retval;
      
      // Get history by looking at the hidden Iframe's location.hash.
      history_get = function() {
        return get_fragment( iframe.location.href );
      };
      
      // Set a new history item by opening and then closing the Iframe
      // document, *then* setting its location.hash. If document.domain has
      // been set, update that as well.
      history_set = function( hash, history_hash ) {
        var iframe_doc = iframe.document,
          domain = $.fn[ str_hashchange ].domain;
        
        if ( hash !== history_hash ) {
          // Update Iframe with any initial `document.title` that might be set.
          iframe_doc.title = doc.title;
          
          // Opening the Iframe's document after it has been closed is what
          // actually adds a history entry.
          iframe_doc.open();
          
          // Set document.domain for the Iframe document as well, if necessary.
          domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );
          
          iframe_doc.close();
          
          // Update the Iframe's hash, for great justice.
          iframe.location.hash = hash;
        }
      };
      
    })();
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    return self;
  })();
  
})(jQuery,this);

/*
== malihu jquery custom scrollbar plugin == 
Version: 3.0.4 
Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller 
Author: malihu
Author URI: http://manos.malihu.gr
License: MIT License (MIT)
*/

/*
Copyright 2010 Manos Malihutsakis (email: manos@malihu.gr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
The code below is fairly long, fully commented and should be normally used in development. 
For production, use either the minified jquery.mCustomScrollbar.min.js script or 
the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin 
and dependencies (minified). 
*/

;(function(window,document,undefined){

  /* plugin dependencies */
  (function(init){
    /* support for RequireJS */
    if(typeof define==="function" && define.amd){
      define(["jquery", "jquery-mousewheel"], init);
    }else{
      var _dlp=("https:"==document.location.protocol) ? "https:" : "http:"; /* dependency location protocol */
      /* load jquery-mousewheel plugin (via CDN) if it's not present (works when mCustomScrollbar fn is called on window load) */
      $.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src="+_dlp+"//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.11/jquery.mousewheel.min.js%3E%3C/script%3E"));
      init(jQuery);
    }
  }
  
  (function($){
    
    /* 
    ----------------------------------------
    PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S) 
    ----------------------------------------
    */
    
    var pluginNS="mCustomScrollbar",
      pluginPfx="mCS",
      defaultSelector=".mCustomScrollbar",
    
    
      
    
    
    /* 
    ----------------------------------------
    DEFAULT OPTIONS 
    ----------------------------------------
    */
    
      defaults={
        /* 
        set element/content width programmatically 
        values: boolean, pixels, percentage 
        */
        setWidth:false,
        /* 
        set element/content height programmatically 
        values: boolean, pixels, percentage 
        */
        setHeight:false,
        /*
        set the initial css top property of content  
        values: string (e.g. "-100px", "10%" etc.)
        */
        setTop:0,
        /*
        set the initial css left property of content  
        values: string (e.g. "-100px", "10%" etc.)
        */
        setLeft:0,
        /* 
        scrollbar axis (vertical and/or horizontal scrollbars) 
        values (string): "y", "x", "yx"
        */
        axis:"y",
        /*
        position of scrollbar relative to content  
        values (string): "inside", "outside" ("outside" requires elements with position:relative)
        */
        scrollbarPosition:"inside",
        /*
        scrolling inertia
        values: integer (milliseconds)
        */
        scrollInertia:950,
        /* 
        auto-adjust scrollbar dragger length
        values: boolean
        */
        autoDraggerLength:true,
        /*
        auto-hide scrollbar when idle 
        values: boolean
        */
        autoHideScrollbar:false,
        /*
        auto-expands scrollbar on mouse-over and dragging
        */
        autoExpandScrollbar:false,
        /*
        always show scrollbar, even when there's nothing to scroll 
        values: integer (0=disable, 1=always show dragger rail, 2=always show dragger rail, dragger and buttons), boolean
        */
        alwaysShowScrollbar:0,
        /*
        scrolling always snaps to a multiple of this number in pixels
        values: integer
        */
        snapAmount:null,
        /*
        when snapping, snap with this number in pixels as an offset 
        values: integer
        */
        snapOffset:0,
        /* 
        mouse-wheel scrolling
        */
        mouseWheel:{
          /* 
          enable mouse-wheel scrolling
          values: boolean
          */
          enable:true,
          /* 
          scrolling amount in pixels
          values: "auto", integer 
          */
          scrollAmount:"auto",
          /* 
          mouse-wheel scrolling axis 
          the default scrolling direction when both vertical and horizontal scrollbars are present 
          values (string): "y", "x" 
          */
          axis:"y",
          /* 
          prevent the default behaviour which automatically scrolls the parent element(s) 
          when end of scrolling is reached 
          values: boolean
          */
          preventDefault:false,
          /*
          the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.  
          values: "auto", integer 
          "auto" uses the default OS/browser value 
          */
          deltaFactor:"auto",
          /*
          normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration) 
          values: boolean
          */
          normalizeDelta:false,
          /*
          invert mouse-wheel scrolling direction 
          values: boolean
          */
          invert:false,
          /*
          the tags that disable mouse-wheel when cursor is over them
          */
          disableOver:["select","option","keygen","datalist","textarea"]
        },
        /* 
        scrollbar buttons
        */
        scrollButtons:{ 
          /*
          enable scrollbar buttons
          values: boolean
          */
          enable:false,
          /*
          scrollbar buttons scrolling type 
          values (string): "stepless", "stepped"
          */
          scrollType:"stepless",
          /*
          scrolling amount in pixels
          values: "auto", integer 
          */
          scrollAmount:"auto"
        },
        /* 
        keyboard scrolling
        */
        keyboard:{ 
          /*
          enable scrolling via keyboard
          values: boolean
          */
          enable:true,
          /*
          keyboard scrolling type 
          values (string): "stepless", "stepped"
          */
          scrollType:"stepless",
          /*
          scrolling amount in pixels
          values: "auto", integer 
          */
          scrollAmount:"auto"
        },
        /*
        enable content touch-swipe scrolling 
        values: boolean, integer, string (number)
        integer values define the axis-specific minimum amount required for scrolling momentum
        */
        contentTouchScroll:25,
        /*
        advanced option parameters
        */
        advanced:{
          /*
          auto-expand content horizontally (for "x" or "yx" axis) 
          values: boolean
          */
          autoExpandHorizontalScroll:false,
          /*
          auto-scroll to elements with focus
          */
          autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
          /*
          auto-update scrollbars on content, element or viewport resize 
          should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc. 
          values: boolean
          */
          updateOnContentResize:true,
          /*
          auto-update scrollbars each time each image inside the element is fully loaded 
          values: boolean
          */
          updateOnImageLoad:true,
          /*
          auto-update scrollbars based on the amount and size changes of specific selectors 
          useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size 
          values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed) 
          a value of true (boolean) will auto-update scrollbars each time any element is changed
          */
          updateOnSelectorChange:false
        },
        /* 
        scrollbar theme 
        values: string 
        ready-to-use themes: "light", "dark", "light-2", "dark-2", "light-3", "dark-3", "light-thick", "dark-thick", "light-thin", "dark-thin", 
        "rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "minimal", "minimal-dark", 
        "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"
        */
        theme:"light",
        /*
        user defined callback functions
        */
        callbacks:{
          /*
          function to call when a scroll event starts 
          values (function): function(){}
          */
          onScrollStart:false,
          /*
          function to call when a scroll event is complete 
          values (function): function(){}
          */
          onScroll:false,
          /*
          function to call when a scroll event is complete and content is scrolled all the way to the end (bottom/right)
          values (function): function(){}
          */
          onTotalScroll:false,
          /*
          function to call when a scroll event is complete and content is scrolled back to the beginning (top/left)
          values (function): function(){}
          */
          onTotalScrollBack:false,
          /*
          function to call when a scroll event is running 
          values (function): function(){}
          */
          whileScrolling:false,
          /*
          onTotalScroll offset value
          values: integer (pixels)
          */
          onTotalScrollOffset:0,
          /*
          onTotalScrollBack offset value
          values: integer (pixels)
          */
          onTotalScrollBackOffset:0,
          /*
          callback offsets will trigger even if content is already scrolled to the end or beginning
          values: boolean
          */
          alwaysTriggerOffsets:true,
          /*
          function to call when content becomes long enough and vertical scrollbar is added
          values (function): function(){}
          */
          onOverflowY:false,
          /*
          function to call when content becomes wide enough and horizontal scrollbar is added
          values (function): function(){}
          */
          onOverflowX:false,
          /*
          function to call when content becomes short enough and vertical scrollbar is removed
          values (function): function(){}
          */
          onOverflowYNone:false,
          /*
          function to call when content becomes narrow enough and horizontal scrollbar is removed
          values (function): function(){}
          */
          onOverflowXNone:false
        },
        /*
        add scrollbar(s) on all elements matching the current selector, now and in the future 
        values: boolean, string 
        string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
        */
        live:false,
        /*
        the matching set of elements (instead of the current selector) to add scrollbar(s), now and in the future
        values: string (selector)
        */
        liveSelector:null
      },
    
    
    
    
    
    /* 
    ----------------------------------------
    VARS, CONSTANTS 
    ----------------------------------------
    */
    
      totalInstances=0, /* plugin instances amount */
      liveTimers={}, /* live option timers */
      /* live option timers removal */
      removeLiveTimers=function(selector){
        if(liveTimers[selector]){
          clearTimeout(liveTimers[selector]);
          functions._delete.call(null,liveTimers[selector]);
        }
      },
      oldIE=(window.attachEvent && !window.addEventListener) ? 1 : 0, /* detect IE < 9 */
      touchActive=false, /* global touch state (for touch and pointer events) */
      
    
    
    
    
    /* 
    ----------------------------------------
    METHODS 
    ----------------------------------------
    */
    
      methods={
        
        /* 
        plugin initialization method 
        creates the scrollbar(s), plugin data object and options
        ----------------------------------------
        */
        
        init:function(options){
          
          var options=$.extend(true,{},defaults,options),
            selector=functions._selector.call(this); /* validate selector */
          
          /* 
          if live option is enabled, monitor for elements matching the current selector and 
          apply scrollbar(s) when found (now and in the future) 
          */
          if(options.live){
            var liveSelector=options.liveSelector || this.selector || defaultSelector, /* live selector(s) */
              $liveSelector=$(liveSelector); /* live selector(s) as jquery object */
            if(options.live==="off"){
              /* 
              disable live if requested 
              usage: $(selector).mCustomScrollbar({live:"off"}); 
              */
              removeLiveTimers(liveSelector);
              return;
            }
            liveTimers[liveSelector]=setTimeout(function(){
              /* call mCustomScrollbar fn on live selector(s) every half-second */
              $liveSelector.mCustomScrollbar(options);
              if(options.live==="once" && $liveSelector.length){
                /* disable live after first invocation */
                removeLiveTimers(liveSelector);
              }
            },500);
          }else{
            removeLiveTimers(liveSelector);
          }
          
          /* options backward compatibility (for versions < 3.0.0) and normalization */
          options.setWidth=(options.set_width) ? options.set_width : options.setWidth;
          options.setHeight=(options.set_height) ? options.set_height : options.setHeight;
          options.axis=(options.horizontalScroll) ? "x" : functions._findAxis.call(null,options.axis);
          options.scrollInertia=options.scrollInertia>0 && options.scrollInertia<17 ? 17 : options.scrollInertia;
          if(typeof options.mouseWheel!=="object" &&  options.mouseWheel==true){ /* old school mouseWheel option (non-object) */
            options.mouseWheel={enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false}
          }
          options.mouseWheel.scrollAmount=!options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
          options.mouseWheel.normalizeDelta=!options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
          options.scrollButtons.scrollType=functions._findScrollButtonsType.call(null,options.scrollButtons.scrollType); 
          
          functions._theme.call(null,options); /* theme-specific options */
          
          /* plugin constructor */
          return $(selector).each(function(){
            
            var $this=$(this);
            
            if(!$this.data(pluginPfx)){ /* prevent multiple instantiations */
            
              /* store options and create objects in jquery data */
              $this.data(pluginPfx,{
                idx:++totalInstances, /* instance index */
                opt:options, /* options */
                scrollRatio:{y:null,x:null}, /* scrollbar to content ratio */
                overflowed:null, /* overflowed axis */
                contentReset:{y:null,x:null}, /* object to check when content resets */
                bindEvents:false, /* object to check if events are bound */
                tweenRunning:false, /* object to check if tween is running */
                sequential:{}, /* sequential scrolling object */
                langDir:$this.css("direction"), /* detect/store direction (ltr or rtl) */
                cbOffsets:null, /* object to check whether callback offsets always trigger */
                /* 
                object to check how scrolling events where last triggered 
                "internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method) 
                usage: object.data("mCS").trigger
                */
                trigger:null
              });
              
              /* HTML data attributes */
              var o=$this.data(pluginPfx).opt,
                htmlDataAxis=$this.data("mcs-axis"),htmlDataSbPos=$this.data("mcs-scrollbar-position"),htmlDataTheme=$this.data("mcs-theme");
              if(htmlDataAxis){o.axis=htmlDataAxis;} /* usage example: data-mcs-axis="y" */
              if(htmlDataSbPos){o.scrollbarPosition=htmlDataSbPos;} /* usage example: data-mcs-scrollbar-position="outside" */
              if(htmlDataTheme){ /* usage example: data-mcs-theme="minimal" */
                o.theme=htmlDataTheme;
                functions._theme.call(null,o); /* theme-specific options */
              }
              
              functions._pluginMarkup.call(this); /* add plugin markup */
              
              methods.update.call(null,$this); /* call the update method */
            
            }
            
          });
          
        },
        /* ---------------------------------------- */
        
        
        
        /* 
        plugin update method 
        updates content and scrollbar(s) values, events and status 
        ----------------------------------------
        usage: $(selector).mCustomScrollbar("update");
        */
        
        update:function(el){
          
          var selector=el || functions._selector.call(this); /* validate selector */
          
          return $(selector).each(function(){
            
            var $this=$(this);
            
            if($this.data(pluginPfx)){ /* check if plugin has initialized */
              
              var d=$this.data(pluginPfx),o=d.opt,
                mCSB_container=$("#mCSB_"+d.idx+"_container"),
                mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
              
              if(!mCSB_container.length){return;}
              
              if(d.tweenRunning){functions._stop.call(null,$this);} /* stop any running tweens while updating */
              
              /* if element was disabled or destroyed, remove class(es) */
              if($this.hasClass("mCS_disabled")){$this.removeClass("mCS_disabled");}
              if($this.hasClass("mCS_destroyed")){$this.removeClass("mCS_destroyed");}
              
              functions._maxHeight.call(this); /* detect/set css max-height value */
              
              functions._expandContentHorizontally.call(this); /* expand content horizontally */
              
              if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
                mCSB_container.css("width",functions._contentWidth(mCSB_container.children()));
              }
              
              d.overflowed=functions._overflowed.call(this); /* determine if scrolling is required */
              
              functions._scrollbarVisibility.call(this); /* show/hide scrollbar(s) */
              
              /* auto-adjust scrollbar dragger length analogous to content */
              if(o.autoDraggerLength){functions._setDraggerLength.call(this);}
              
              functions._scrollRatio.call(this); /* calculate and store scrollbar to content ratio */
              
              functions._bindEvents.call(this); /* bind scrollbar events */
              
              /* reset scrolling position and/or events */
              var to=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)];
              if(o.axis!=="x"){ /* y/yx axis */
                if(!d.overflowed[0]){ /* y scrolling is not required */
                  functions._resetContentPosition.call(this); /* reset content position */
                  if(o.axis==="y"){
                    functions._unbindEvents.call(this);
                  }else if(o.axis==="yx" && d.overflowed[1]){
                    functions._scrollTo.call(this,$this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
                  }
                }else if(mCSB_dragger[0].height()>mCSB_dragger[0].parent().height()){
                  functions._resetContentPosition.call(this); /* reset content position */
                }else{ /* y scrolling is required */
                  functions._scrollTo.call(this,$this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
                  d.contentReset.y=null;
                }
              }
              if(o.axis!=="y"){ /* x/yx axis */
                if(!d.overflowed[1]){ /* x scrolling is not required */
                  functions._resetContentPosition.call(this); /* reset content position */
                  if(o.axis==="x"){
                    functions._unbindEvents.call(this);
                  }else if(o.axis==="yx" && d.overflowed[0]){
                    functions._scrollTo.call(this,$this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
                  }
                }else if(mCSB_dragger[1].width()>mCSB_dragger[1].parent().width()){
                  functions._resetContentPosition.call(this); /* reset content position */
                }else{ /* x scrolling is required */
                  functions._scrollTo.call(this,$this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
                  d.contentReset.x=null;
                }
              }
              
              functions._autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */
              
            }
            
          });
          
        },
        /* ---------------------------------------- */
        
        
        
        /* 
        plugin scrollTo method 
        triggers a scrolling event to a specific value
        ----------------------------------------
        usage: $(selector).mCustomScrollbar("scrollTo",value,options);
        */
      
        scrollTo:function(val,options){
          
          /* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
          if(typeof val=="undefined" || val==null){return;}
          
          var selector=functions._selector.call(this); /* validate selector */
          
          return $(selector).each(function(){
            
            var $this=$(this);
            
            if($this.data(pluginPfx)){ /* check if plugin has initialized */
            
              var d=$this.data(pluginPfx),o=d.opt,
                /* method default options */
                methodDefaults={
                  trigger:"external", /* method is by default triggered externally (e.g. from other scripts) */
                  scrollInertia:o.scrollInertia, /* scrolling inertia (animation duration) */
                  scrollEasing:"mcsEaseInOut", /* animation easing */
                  moveDragger:false, /* move dragger instead of content */
                  timeout:60, /* scroll-to delay */
                  callbacks:true, /* enable/disable callbacks */
                  onStart:true,
                  onUpdate:true,
                  onComplete:true
                },
                methodOptions=$.extend(true,{},methodDefaults,options),
                to=functions._arr.call(this,val),dur=methodOptions.scrollInertia>0 && methodOptions.scrollInertia<17 ? 17 : methodOptions.scrollInertia;
              
              /* translate yx values to actual scroll-to positions */
              to[0]=functions._to.call(this,to[0],"y");
              to[1]=functions._to.call(this,to[1],"x");
              
              /* 
              check if scroll-to value moves the dragger instead of content. 
              Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.) 
              */
              if(methodOptions.moveDragger){
                to[0]*=d.scrollRatio.y;
                to[1]*=d.scrollRatio.x;
              }
              
              methodOptions.dur=dur;
              
              setTimeout(function(){ 
                /* do the scrolling */
                if(to[0]!==null && typeof to[0]!=="undefined" && o.axis!=="x" && d.overflowed[0]){ /* scroll y */
                  methodOptions.dir="y";
                  methodOptions.overwrite="all";
                  functions._scrollTo.call(this,$this,to[0].toString(),methodOptions);
                }
                if(to[1]!==null && typeof to[1]!=="undefined" && o.axis!=="y" && d.overflowed[1]){ /* scroll x */
                  methodOptions.dir="x";
                  methodOptions.overwrite="none";
                  functions._scrollTo.call(this,$this,to[1].toString(),methodOptions);
                }
              },methodOptions.timeout);
              
            }
            
          });
          
        },
        /* ---------------------------------------- */
        
        
        
        /*
        plugin stop method 
        stops scrolling animation
        ----------------------------------------
        usage: $(selector).mCustomScrollbar("stop");
        */
        stop:function(){
          
          var selector=functions._selector.call(this); /* validate selector */
          
          return $(selector).each(function(){
            
            var $this=$(this);
            
            if($this.data(pluginPfx)){ /* check if plugin has initialized */
                      
              functions._stop.call(null,$this);
            
            }
            
          });
          
        },
        /* ---------------------------------------- */
        
        
        
        /*
        plugin disable method 
        temporarily disables the scrollbar(s) 
        ----------------------------------------
        usage: $(selector).mCustomScrollbar("disable",reset); 
        reset (boolean): resets content position to 0 
        */
        disable:function(r){
          
          var selector=functions._selector.call(this); /* validate selector */
          
          return $(selector).each(function(){
            
            var $this=$(this);
            
            if($this.data(pluginPfx)){ /* check if plugin has initialized */
              
              var d=$this.data(pluginPfx),o=d.opt;
              
              functions._autoUpdate.call(this,"remove"); /* remove automatic updating */
              
              functions._unbindEvents.call(this); /* unbind events */
              
              if(r){functions._resetContentPosition.call(this);} /* reset content position */
              
              functions._scrollbarVisibility.call(this,true); /* show/hide scrollbar(s) */
              
              $this.addClass("mCS_disabled"); /* add disable class */
            
            }
            
          });
          
        },
        /* ---------------------------------------- */
        
        
        
        /*
        plugin destroy method 
        completely removes the scrollbar(s) and returns the element to its original state
        ----------------------------------------
        usage: $(selector).mCustomScrollbar("destroy"); 
        */
        destroy:function(){
          
          var selector=functions._selector.call(this); /* validate selector */
          
          return $(selector).each(function(){
            
            var $this=$(this);
            
            if($this.data(pluginPfx)){ /* check if plugin has initialized */
            
              var d=$this.data(pluginPfx),o=d.opt,
                mCustomScrollBox=$("#mCSB_"+d.idx),
                mCSB_container=$("#mCSB_"+d.idx+"_container"),
                scrollbar=$(".mCSB_"+d.idx+"_scrollbar");
            
              if(o.live){removeLiveTimers(selector);} /* remove live timer */
              
              functions._autoUpdate.call(this,"remove"); /* remove automatic updating */
              
              functions._unbindEvents.call(this); /* unbind events */
              
              functions._resetContentPosition.call(this); /* reset content position */
              
              $this.removeData(pluginPfx); /* remove plugin data object */
              
              functions._delete.call(null,this.mcs); /* delete callbacks object */
              
              /* remove plugin markup */
              scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
              mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
              /* remove plugin classes from the element and add destroy class */
              $this.removeClass(pluginNS+" _"+pluginPfx+"_"+d.idx+" mCS-autoHide mCS-dir-rtl mCS_no_scrollbar mCS_disabled").addClass("mCS_destroyed");
            
            }
            
          });
          
        }
        /* ---------------------------------------- */
        
      },
    
    
    
    
      
    /* 
    ----------------------------------------
    FUNCTIONS
    ----------------------------------------
    */
    
      functions={
        
        /* validates selector (if selector is invalid or undefined uses the default one) */
        _selector:function(){
          return (typeof $(this)!=="object" || $(this).length<1) ? defaultSelector : this;
        },
        /* -------------------- */
        
        /* changes options according to theme */
        _theme:function(obj){
          var fixedSizeScrollbarThemes=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],
            nonExpandedScrollbarThemes=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],
            disabledScrollButtonsThemes=["minimal","minimal-dark"],
            enabledAutoHideScrollbarThemes=["minimal","minimal-dark"],
            scrollbarPositionOutsideThemes=["minimal","minimal-dark"];
          obj.autoDraggerLength=$.inArray(obj.theme,fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
          obj.autoExpandScrollbar=$.inArray(obj.theme,nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
          obj.scrollButtons.enable=$.inArray(obj.theme,disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
          obj.autoHideScrollbar=$.inArray(obj.theme,enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
          obj.scrollbarPosition=$.inArray(obj.theme,scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
        },
        /* -------------------- */
        
        
        /* normalizes axis option to valid values: "y", "x", "yx" */
        _findAxis:function(val){
          return (val==="yx" || val==="xy" || val==="auto") ? "yx" : (val==="x" || val==="horizontal") ? "x" : "y";
        },
        /* -------------------- */
        
        
        /* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
        _findScrollButtonsType:function(val){
          return (val==="stepped" || val==="pixels" || val==="step" || val==="click") ? "stepped" : "stepless";
        },
        /* -------------------- */
        
        
        /* generates plugin markup */
        _pluginMarkup:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
            expandClass=o.autoExpandScrollbar ? " mCSB_scrollTools_onDrag_expand" : "",
            scrollbar=["<div id='mCSB_"+d.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_vertical"+expandClass+"'><div class='mCSB_draggerContainer'><div id='mCSB_"+d.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+d.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_horizontal"+expandClass+"'><div class='mCSB_draggerContainer'><div id='mCSB_"+d.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
            wrapperClass=o.axis==="yx" ? "mCSB_vertical_horizontal" : o.axis==="x" ? "mCSB_horizontal" : "mCSB_vertical",
            scrollbars=o.axis==="yx" ? scrollbar[0]+scrollbar[1] : o.axis==="x" ? scrollbar[1] : scrollbar[0],
            contentWrapper=o.axis==="yx" ? "<div id='mCSB_"+d.idx+"_container_wrapper' class='mCSB_container_wrapper' />" : "",
            autoHideClass=o.autoHideScrollbar ? " mCS-autoHide" : "",
            scrollbarDirClass=(o.axis!=="x" && d.langDir==="rtl") ? " mCS-dir-rtl" : "";
          if(o.setWidth){$this.css("width",o.setWidth);} /* set element width */
          if(o.setHeight){$this.css("height",o.setHeight);} /* set element height */
          o.setLeft=(o.axis!=="y" && d.langDir==="rtl") ? "989999px" : o.setLeft; /* adjust left position for rtl direction */
          $this.addClass(pluginNS+" _"+pluginPfx+"_"+d.idx+autoHideClass+scrollbarDirClass).wrapInner("<div id='mCSB_"+d.idx+"' class='mCustomScrollBox mCS-"+o.theme+" "+wrapperClass+"'><div id='mCSB_"+d.idx+"_container' class='mCSB_container' style='position:relative; top:"+o.setTop+"; left:"+o.setLeft+";' dir="+d.langDir+" /></div>");
          var mCustomScrollBox=$("#mCSB_"+d.idx),
            mCSB_container=$("#mCSB_"+d.idx+"_container");
          if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
            mCSB_container.css("width",functions._contentWidth(mCSB_container.children()));
          }
          if(o.scrollbarPosition==="outside"){
            if($this.css("position")==="static"){ /* requires elements with non-static position */
              $this.css("position","relative");
            }
            $this.css("overflow","visible");
            mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
          }else{
            mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
            mCSB_container.wrap(contentWrapper);
          }
          functions._scrollButtons.call(this); /* add scrollbar buttons */
          /* minimum dragger length */
          var mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
          mCSB_dragger[0].css("min-height",mCSB_dragger[0].height());
          mCSB_dragger[1].css("min-width",mCSB_dragger[1].width());
        },
        /* -------------------- */
        
        
        /* calculates content width */
        _contentWidth:function(el){
          return Math.max.apply(Math,el.map(function(){return $(this).outerWidth(true);}).get());
        },
        /* -------------------- */
        
        
        /* expands content horizontally */
        _expandContentHorizontally:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
            mCSB_container=$("#mCSB_"+d.idx+"_container");
          if(o.advanced.autoExpandHorizontalScroll && o.axis!=="y"){
            /* 
            wrap content with an infinite width div and set its position to absolute and width to auto. 
            Setting width to auto before calculating the actual width is important! 
            We must let the browser set the width as browser zoom values are impossible to calculate.
            */
            mCSB_container.css({"position":"absolute","width":"auto"})
              .wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
              .css({ /* set actual width, original position and un-wrap */
                /* 
                get the exact width (with decimals) and then round-up. 
                Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
                */
                "width":(Math.ceil(mCSB_container[0].getBoundingClientRect().right+0.4)-Math.floor(mCSB_container[0].getBoundingClientRect().left)),
                "position":"relative"
              }).unwrap();
          }
        },
        /* -------------------- */
        
        
        /* adds scrollbar buttons */
        _scrollButtons:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
            mCSB_scrollTools=$(".mCSB_"+d.idx+"_scrollbar:first"),
            btnHTML=[
              "<a href='#' class='mCSB_buttonUp' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonDown' oncontextmenu='return false;' />",
              "<a href='#' class='mCSB_buttonLeft' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonRight' oncontextmenu='return false;' />"
            ],
            btn=[(o.axis==="x" ? btnHTML[2] : btnHTML[0]),(o.axis==="x" ? btnHTML[3] : btnHTML[1]),btnHTML[2],btnHTML[3]];
          if(o.scrollButtons.enable){
            mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
          }
        },
        /* -------------------- */
        
        
        /* detects/sets css max-height value */
        _maxHeight:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
            mCustomScrollBox=$("#mCSB_"+d.idx),
            mh=$this.css("max-height"),pct=mh.indexOf("%")!==-1,
            bs=$this.css("box-sizing");
          if(mh!=="none"){
            var val=pct ? $this.parent().height()*parseInt(mh)/100 : parseInt(mh);
            /* if element's css box-sizing is "border-box", subtract any paddings and/or borders from max-height value */
            if(bs==="border-box"){val-=(($this.innerHeight()-$this.height())+($this.outerHeight()-$this.innerHeight()));}
            mCustomScrollBox.css("max-height",Math.round(val));
          }
        },
        /* -------------------- */
        
        
        /* auto-adjusts scrollbar dragger length */
        _setDraggerLength:function(){
          var $this=$(this),d=$this.data(pluginPfx),
            mCustomScrollBox=$("#mCSB_"+d.idx),
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
            ratio=[mCustomScrollBox.height()/mCSB_container.outerHeight(false),mCustomScrollBox.width()/mCSB_container.outerWidth(false)],
            l=[
              parseInt(mCSB_dragger[0].css("min-height")),Math.round(ratio[0]*mCSB_dragger[0].parent().height()),
              parseInt(mCSB_dragger[1].css("min-width")),Math.round(ratio[1]*mCSB_dragger[1].parent().width())
            ],
            h=oldIE && (l[1]<l[0]) ? l[0] : l[1],w=oldIE && (l[3]<l[2]) ? l[2] : l[3];
          mCSB_dragger[0].css({
            "height":h,"max-height":(mCSB_dragger[0].parent().height()-10)
          }).find(".mCSB_dragger_bar").css({"line-height":l[0]+"px"});
          mCSB_dragger[1].css({
            "width":w,"max-width":(mCSB_dragger[1].parent().width()-10)
          });
        },
        /* -------------------- */
        
        
        /* calculates scrollbar to content ratio */
        _scrollRatio:function(){
          var $this=$(this),d=$this.data(pluginPfx),
            mCustomScrollBox=$("#mCSB_"+d.idx),
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
            scrollAmount=[mCSB_container.outerHeight(false)-mCustomScrollBox.height(),mCSB_container.outerWidth(false)-mCustomScrollBox.width()],
            ratio=[
              scrollAmount[0]/(mCSB_dragger[0].parent().height()-mCSB_dragger[0].height()),
              scrollAmount[1]/(mCSB_dragger[1].parent().width()-mCSB_dragger[1].width())
            ];
          d.scrollRatio={y:ratio[0],x:ratio[1]};
        },
        /* -------------------- */
        
        
        /* toggles scrolling classes */
        _onDragClasses:function(el,action,xpnd){
          var expandClass=xpnd ? "mCSB_dragger_onDrag_expanded" : "",classes=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag"],
            scrollbar=el.closest(".mCSB_scrollTools");
          if(action==="active"){
            el.toggleClass(classes[0]+" "+expandClass); scrollbar.toggleClass(classes[1]); 
            el[0]._draggable=el[0]._draggable ? 0 : 1;
          }else{
            if(!el[0]._draggable){
              if(action==="hide"){
                el.removeClass(classes[0]); scrollbar.removeClass(classes[1]);
              }else{
                el.addClass(classes[0]); scrollbar.addClass(classes[1]);
              }
            }
          }
        },
        /* -------------------- */
        
        
        /* checks if content overflows its container to determine if scrolling is required */
        _overflowed:function(){
          var $this=$(this),d=$this.data(pluginPfx),
            mCustomScrollBox=$("#mCSB_"+d.idx),
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            contentHeight=d.overflowed==null ? mCSB_container.height() : mCSB_container.outerHeight(false),
            contentWidth=d.overflowed==null ? mCSB_container.width() : mCSB_container.outerWidth(false);
          return [contentHeight>mCustomScrollBox.height(),contentWidth>mCustomScrollBox.width()];
        },
        /* -------------------- */
        
        
        /* resets content position to 0 */
        _resetContentPosition:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
            mCustomScrollBox=$("#mCSB_"+d.idx),
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
          functions._stop($this); /* stop any current scrolling before resetting */
          if((o.axis!=="x" && !d.overflowed[0]) || (o.axis==="y" && d.overflowed[0])){ /* reset y */
            mCSB_dragger[0].add(mCSB_container).css("top",0);
            functions._scrollTo($this,"_resetY");
          }
          if((o.axis!=="y" && !d.overflowed[1]) || (o.axis==="x" && d.overflowed[1])){ /* reset x */
            var cx=dx=0;
            if(d.langDir==="rtl"){ /* adjust left position for rtl direction */
              cx=mCustomScrollBox.width()-mCSB_container.outerWidth(false);
              dx=Math.abs(cx/d.scrollRatio.x);
            }
            mCSB_container.css("left",cx);
            mCSB_dragger[1].css("left",dx);
            functions._scrollTo($this,"_resetX");
          }
        },
        /* -------------------- */
        
        
        /* binds scrollbar events */
        _bindEvents:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt;
          if(!d.bindEvents){ /* check if events are already bound */
            functions._draggable.call(this);
            if(o.contentTouchScroll){functions._contentDraggable.call(this);}
            if(o.mouseWheel.enable){ /* bind mousewheel fn when plugin is available */
              function _mwt(){
                mousewheelTimeout=setTimeout(function(){
                  if(!$.event.special.mousewheel){
                    _mwt();
                  }else{
                    clearTimeout(mousewheelTimeout);
                    functions._mousewheel.call($this[0]);
                  }
                },1000);
              }
              var mousewheelTimeout;
              _mwt();
            }
            functions._draggerRail.call(this);
            functions._wrapperScroll.call(this);
            if(o.advanced.autoScrollOnFocus){functions._focus.call(this);}
            if(o.scrollButtons.enable){functions._buttons.call(this);}
            if(o.keyboard.enable){functions._keyboard.call(this);}
            d.bindEvents=true;
          }
        },
        /* -------------------- */
        
        
        /* unbinds scrollbar events */
        _unbindEvents:function(){
          var $this=$(this),d=$this.data(pluginPfx),
            namespace=pluginPfx+"_"+d.idx,
            sb=".mCSB_"+d.idx+"_scrollbar",
            sel=$("#mCSB_"+d.idx+",#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,"+sb+" .mCSB_draggerContainer,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal,"+sb+">a"),
            mCSB_container=$("#mCSB_"+d.idx+"_container");
          if(d.bindEvents){ /* check if events are bound */
            /* unbind namespaced events from document/selectors */
            $(document).unbind("."+namespace);
            sel.each(function(){
              $(this).unbind("."+namespace);
            });
            /* clear and delete timeouts/objects */
            clearTimeout($this[0]._focusTimeout); functions._delete.call(null,$this[0]._focusTimeout);
            clearTimeout(d.sequential.step); functions._delete.call(null,d.sequential.step);
            clearTimeout(mCSB_container[0].onCompleteTimeout); functions._delete.call(null,mCSB_container[0].onCompleteTimeout);
            d.bindEvents=false;
          }
        },
        /* -------------------- */
        
        
        /* toggles scrollbar visibility */
        _scrollbarVisibility:function(disabled){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
            contentWrapper=$("#mCSB_"+d.idx+"_container_wrapper"),
            content=contentWrapper.length ? contentWrapper : $("#mCSB_"+d.idx+"_container"),
            scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
            mCSB_dragger=[scrollbar[0].find(".mCSB_dragger"),scrollbar[1].find(".mCSB_dragger")];
          if(o.axis!=="x"){
            if(d.overflowed[0] && !disabled){
              scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display","block");
              content.removeClass("mCS_no_scrollbar_y mCS_y_hidden");
            }else{
              if(o.alwaysShowScrollbar){
                if(o.alwaysShowScrollbar!==2){mCSB_dragger[0].add(scrollbar[0].children("a")).css("display","none");}
                content.removeClass("mCS_y_hidden");
              }else{
                scrollbar[0].css("display","none");
                content.addClass("mCS_y_hidden");
              }
              content.addClass("mCS_no_scrollbar_y");
            }
          }
          if(o.axis!=="y"){
            if(d.overflowed[1] && !disabled){
              scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display","block");
              content.removeClass("mCS_no_scrollbar_x mCS_x_hidden");
            }else{
              if(o.alwaysShowScrollbar){
                if(o.alwaysShowScrollbar!==2){mCSB_dragger[1].add(scrollbar[1].children("a")).css("display","none");}
                content.removeClass("mCS_x_hidden");
              }else{
                scrollbar[1].css("display","none");
                content.addClass("mCS_x_hidden");
              }
              content.addClass("mCS_no_scrollbar_x");
            }
          }
          if(!d.overflowed[0] && !d.overflowed[1]){
            $this.addClass("mCS_no_scrollbar");
          }else{
            $this.removeClass("mCS_no_scrollbar");
          }
        },
        /* -------------------- */
        
        
        /* returns input coordinates of pointer, touch and mouse events (relative to document) */
        _coordinates:function(e){
          var t=e.type;
          switch(t){
            case "pointerdown": case "MSPointerDown": case "pointermove": case "MSPointerMove": case "pointerup": case "MSPointerUp":
              return [e.originalEvent.pageY,e.originalEvent.pageX];
              break;
            case "touchstart": case "touchmove": case "touchend":
              var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
              return [touch.pageY,touch.pageX];
              break;
            default:
              return [e.pageY,e.pageX];
          }
        },
        /* -------------------- */
        
        
        /* 
        SCROLLBAR DRAG EVENTS
        scrolls content via scrollbar dragging 
        */
        _draggable:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
            namespace=pluginPfx+"_"+d.idx,
            draggerId=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            mCSB_dragger=$("#"+draggerId[0]+",#"+draggerId[1]),
            draggable,dragY,dragX;
          mCSB_dragger.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            if(!functions._mouseBtnLeft(e)){return;} /* left mouse button only */
            touchActive=true;
            if(oldIE){document.onselectstart=function(){return false;}} /* disable text selection for IE < 9 */
            _iframe(false); /* enable scrollbar dragging over iframes by disabling their events */
            functions._stop($this);
            draggable=$(this);
            var offset=draggable.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left,
              h=draggable.height()+offset.top,w=draggable.width()+offset.left;
            if(y<h && y>0 && x<w && x>0){
              dragY=y; 
              dragX=x;
            }
            functions._onDragClasses(draggable,"active",o.autoExpandScrollbar); 
          }).bind("touchmove."+namespace,function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            var offset=draggable.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left;
            _drag(dragY,dragX,y,x);
          });
          $(document).bind("mousemove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
            if(draggable){
              var offset=draggable.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left;
              if(dragY===y){return;} /* has it really moved? */
              _drag(dragY,dragX,y,x);
            }
          }).add(mCSB_dragger).bind("mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
            if(draggable){
              functions._onDragClasses(draggable,"active",o.autoExpandScrollbar); 
              draggable=null;
            }
            touchActive=false;
            if(oldIE){document.onselectstart=null;} /* enable text selection for IE < 9 */
            _iframe(true); /* enable iframes events */
          });
          function _iframe(evt){
            var el=mCSB_container.find("iframe");
            if(!el.length){return;} /* check if content contains iframes */
            var val=!evt ? "none" : "auto";
            el.css("pointer-events",val); /* for IE11, iframe's display property should not be "block" */
          }
          function _drag(dragY,dragX,y,x){
            mCSB_container[0].idleTimer=o.scrollInertia<233 ? 250 : 0;
            if(draggable.attr("id")===draggerId[1]){
              var dir="x",to=((draggable[0].offsetLeft-dragX)+x)*d.scrollRatio.x;
            }else{
              var dir="y",to=((draggable[0].offsetTop-dragY)+y)*d.scrollRatio.y;
            }
            functions._scrollTo($this,to.toString(),{dir:dir,drag:true});
          }
        },
        /* -------------------- */
        
        
        /* 
        TOUCH SWIPE EVENTS
        scrolls content via touch swipe 
        Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices 
        */
        _contentDraggable:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
            namespace=pluginPfx+"_"+d.idx,
            mCustomScrollBox=$("#mCSB_"+d.idx),
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
            dragY,dragX,touchStartY,touchStartX,touchMoveY=[],touchMoveX=[],startTime,runningTime,endTime,distance,speed,amount,
            durA=0,durB,overwrite=o.axis==="yx" ? "none" : "all";
          mCSB_container.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
            if(!functions._pointerTouch(e) || touchActive){return;}
            var offset=mCSB_container.offset();
            dragY=functions._coordinates(e)[0]-offset.top;
            dragX=functions._coordinates(e)[1]-offset.left;
          }).bind("touchmove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
            if(!functions._pointerTouch(e) || touchActive){return;}
            e.stopImmediatePropagation();
            runningTime=functions._getTime();
            var offset=mCustomScrollBox.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left,
              easing="mcsLinearOut";
            touchMoveY.push(y);
            touchMoveX.push(x);
            if(d.overflowed[0]){
              var limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
                prevent=((dragY-y)>0 && (y-dragY)>-(limit*d.scrollRatio.y));
            }
            if(d.overflowed[1]){
              var limitX=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
                preventX=((dragX-x)>0 && (x-dragX)>-(limitX*d.scrollRatio.x));
            }
            if(prevent || preventX){e.preventDefault();} /* prevent native document scrolling */
            amount=o.axis==="yx" ? [(dragY-y),(dragX-x)] : o.axis==="x" ? [null,(dragX-x)] : [(dragY-y),null];
            mCSB_container[0].idleTimer=250;
            if(d.overflowed[0]){_drag(amount[0],durA,easing,"y","all",true);}
            if(d.overflowed[1]){_drag(amount[1],durA,easing,"x",overwrite,true);}
          });
          mCustomScrollBox.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
            if(!functions._pointerTouch(e) || touchActive){return;}
            e.stopImmediatePropagation();
            functions._stop($this);
            startTime=functions._getTime();
            var offset=mCustomScrollBox.offset();
            touchStartY=functions._coordinates(e)[0]-offset.top;
            touchStartX=functions._coordinates(e)[1]-offset.left;
            touchMoveY=[]; touchMoveX=[];
          }).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
            if(!functions._pointerTouch(e) || touchActive){return;}
            e.stopImmediatePropagation();
            endTime=functions._getTime();
            var offset=mCustomScrollBox.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left;
            if((endTime-runningTime)>30){return;}
            speed=1000/(endTime-startTime);
            var easing="mcsEaseOut",slow=speed<2.5,
              diff=slow ? [touchMoveY[touchMoveY.length-2],touchMoveX[touchMoveX.length-2]] : [0,0];
            distance=slow ? [(y-diff[0]),(x-diff[1])] : [y-touchStartY,x-touchStartX];
            var absDistance=[Math.abs(distance[0]),Math.abs(distance[1])];
            speed=slow ? [Math.abs(distance[0]/4),Math.abs(distance[1]/4)] : [speed,speed];
            var a=[
              Math.abs(mCSB_container[0].offsetTop)-(distance[0]*_m((absDistance[0]/speed[0]),speed[0])),
              Math.abs(mCSB_container[0].offsetLeft)-(distance[1]*_m((absDistance[1]/speed[1]),speed[1]))
            ];
            amount=o.axis==="yx" ? [a[0],a[1]] : o.axis==="x" ? [null,a[1]] : [a[0],null];
            durB=[(absDistance[0]*4)+o.scrollInertia,(absDistance[1]*4)+o.scrollInertia];
            var md=parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
            amount[0]=absDistance[0]>md ? amount[0] : 0;
            amount[1]=absDistance[1]>md ? amount[1] : 0;
            if(d.overflowed[0]){_drag(amount[0],durB[0],easing,"y",overwrite,false);}
            if(d.overflowed[1]){_drag(amount[1],durB[1],easing,"x",overwrite,false);}
          });
          function _m(ds,s){
            var r=[s*1.5,s*2,s/1.5,s/2];
            if(ds>90){
              return s>4 ? r[0] : r[3];
            }else if(ds>60){
              return s>3 ? r[3] : r[2];
            }else if(ds>30){
              return s>8 ? r[1] : s>6 ? r[0] : s>4 ? s : r[2];
            }else{
              return s>8 ? s : r[3];
            }
          }
          function _drag(amount,dur,easing,dir,overwrite,drag){
            if(!amount){return;}
            functions._scrollTo($this,amount.toString(),{dur:dur,scrollEasing:easing,dir:dir,overwrite:overwrite,drag:drag});
          }
        },
        /* -------------------- */
        
        
        /* 
        MOUSE WHEEL EVENT
        scrolls content via mouse-wheel 
        via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
        */
        _mousewheel:function(){
          var $this=$(this),d=$this.data(pluginPfx);
          if(d){ /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
            var o=d.opt,
              namespace=pluginPfx+"_"+d.idx,
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
              iframe=$("#mCSB_"+d.idx+"_container").find("iframe"),
              el=mCustomScrollBox /* mousewheel element selector */;
            /* check for cross domain iframes and bind mousewheel event on them in addition to default mousewheel element selector */
            if(iframe.length){
              iframe.each(function(){
                var iFobj=this;
                if(_canAccessIFrame(iFobj)){ /* check if iframe can be accessed */
                  el=el.add($(iFobj).contents().find("body"));
                }
              });
            }
            el.bind("mousewheel."+namespace,function(e,delta){
              functions._stop($this);
              if(functions._disableMousewheel($this,e.target)){return;} /* disables mouse-wheel when hovering specific elements */
              var deltaFactor=o.mouseWheel.deltaFactor!=="auto" ? parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor<100) ? 100 : e.deltaFactor || 100;
              if(o.axis==="x" || o.mouseWheel.axis==="x"){
                var dir="x",
                  px=[Math.round(deltaFactor*d.scrollRatio.x),parseInt(o.mouseWheel.scrollAmount)],
                  amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.width() ? mCustomScrollBox.width()*0.9 : px[0],
                  contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetLeft),
                  draggerPos=mCSB_dragger[1][0].offsetLeft,
                  limit=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
                  dlt=e.deltaX || e.deltaY || delta;
              }else{
                var dir="y",
                  px=[Math.round(deltaFactor*d.scrollRatio.y),parseInt(o.mouseWheel.scrollAmount)],
                  amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.height() ? mCustomScrollBox.height()*0.9 : px[0],
                  contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetTop),
                  draggerPos=mCSB_dragger[0][0].offsetTop,
                  limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
                  dlt=e.deltaY || delta;
              }
              if((dir==="y" && !d.overflowed[0]) || (dir==="x" && !d.overflowed[1])){return;}
              if(o.mouseWheel.invert){dlt=-dlt;}
              if(o.mouseWheel.normalizeDelta){dlt=dlt<0 ? -1 : 1;}
              if((dlt>0 && draggerPos!==0) || (dlt<0 && draggerPos!==limit) || o.mouseWheel.preventDefault){
                e.stopImmediatePropagation();
                e.preventDefault();
              }
              functions._scrollTo($this,(contentPos-(dlt*amount)).toString(),{dir:dir});
            });
          }
          /* check if iframe can be accessed */
          function _canAccessIFrame(iframe){
            var html=null;
            try{
              var doc=iframe.contentDocument || iframe.contentWindow.document;
              html=doc.body.innerHTML;
            }catch(err){/* do nothing */}
            return(html!==null);
          }
        },
        /* -------------------- */
        
        
        /* disables mouse-wheel when hovering specific elements like select, datalist etc. */
        _disableMousewheel:function(el,target){
          var tag=target.nodeName.toLowerCase(),
            tags=el.data(pluginPfx).opt.mouseWheel.disableOver,
            /* elements that require focus */
            focusTags=["select","textarea"];
          return $.inArray(tag,tags) > -1 && !($.inArray(tag,focusTags) > -1 && !$(target).is(":focus"));
        },
        /* -------------------- */
        
        
        /* 
        DRAGGER RAIL CLICK EVENT
        scrolls content via dragger rail 
        */
        _draggerRail:function(){
          var $this=$(this),d=$this.data(pluginPfx),
            namespace=pluginPfx+"_"+d.idx,
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            wrapper=mCSB_container.parent(),
            mCSB_draggerContainer=$(".mCSB_"+d.idx+"_scrollbar .mCSB_draggerContainer");
          mCSB_draggerContainer.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
            touchActive=true;
          }).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
            touchActive=false;
          }).bind("click."+namespace,function(e){
            if($(e.target).hasClass("mCSB_draggerContainer") || $(e.target).hasClass("mCSB_draggerRail")){
              functions._stop($this);
              var el=$(this),mCSB_dragger=el.find(".mCSB_dragger");
              if(el.parent(".mCSB_scrollTools_horizontal").length>0){
                if(!d.overflowed[1]){return;}
                var dir="x",
                  clickDir=e.pageX>mCSB_dragger.offset().left ? -1 : 1,
                  to=Math.abs(mCSB_container[0].offsetLeft)-(clickDir*(wrapper.width()*0.9));
              }else{
                if(!d.overflowed[0]){return;}
                var dir="y",
                  clickDir=e.pageY>mCSB_dragger.offset().top ? -1 : 1,
                  to=Math.abs(mCSB_container[0].offsetTop)-(clickDir*(wrapper.height()*0.9));
              }
              functions._scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
            }
          });
        },
        /* -------------------- */
        
        
        /* 
        FOCUS EVENT
        scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
        */
        _focus:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
            namespace=pluginPfx+"_"+d.idx,
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            wrapper=mCSB_container.parent();
          mCSB_container.bind("focusin."+namespace,function(e){
            var el=$(document.activeElement),
              nested=mCSB_container.find(".mCustomScrollBox").length,
              dur=0;
            if(!el.is(o.advanced.autoScrollOnFocus)){return;}
            functions._stop($this);
            clearTimeout($this[0]._focusTimeout);
            $this[0]._focusTimer=nested ? (dur+17)*nested : 0;
            $this[0]._focusTimeout=setTimeout(function(){
              var	to=[el.offset().top-mCSB_container.offset().top,el.offset().left-mCSB_container.offset().left],
                contentPos=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft],
                isVisible=[
                  (contentPos[0]+to[0]>=0 && contentPos[0]+to[0]<wrapper.height()-el.outerHeight(false)),
                  (contentPos[1]+to[1]>=0 && contentPos[0]+to[1]<wrapper.width()-el.outerWidth(false))
                ],
                overwrite=(o.axis==="yx" && !isVisible[0] && !isVisible[1]) ? "none" : "all";
              if(o.axis!=="x" && !isVisible[0]){
                functions._scrollTo($this,to[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
              }
              if(o.axis!=="y" && !isVisible[1]){
                functions._scrollTo($this,to[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
              }
            },$this[0]._focusTimer);
          });
        },
        /* -------------------- */
        
        
        /* sets content wrapper scrollTop/scrollLeft always to 0 */
        _wrapperScroll:function(){
          var $this=$(this),d=$this.data(pluginPfx),
            namespace=pluginPfx+"_"+d.idx,
            wrapper=$("#mCSB_"+d.idx+"_container").parent();
          wrapper.bind("scroll."+namespace,function(e){
            wrapper.scrollTop(0).scrollLeft(0);
          });
        },
        /* -------------------- */
        
        
        /* 
        BUTTONS EVENTS
        scrolls content via up, down, left and right buttons 
        */
        _buttons:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
            namespace=pluginPfx+"_"+d.idx,
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            sel=".mCSB_"+d.idx+"_scrollbar",
            btn=$(sel+">a");
          btn.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace+" mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace+" mouseout."+namespace+" pointerout."+namespace+" MSPointerOut."+namespace+" click."+namespace,function(e){
            e.preventDefault();
            if(!functions._mouseBtnLeft(e)){return;} /* left mouse button only */
            var btnClass=$(this).attr("class");
            seq.type=o.scrollButtons.scrollType;
            switch(e.type){
              case "mousedown": case "touchstart": case "pointerdown": case "MSPointerDown":
                if(seq.type==="stepped"){return;}
                touchActive=true;
                d.tweenRunning=false;
                _seq("on",btnClass);
                break;
              case "mouseup": case "touchend": case "pointerup": case "MSPointerUp":
              case "mouseout": case "pointerout": case "MSPointerOut":
                if(seq.type==="stepped"){return;}
                touchActive=false;
                if(seq.dir){_seq("off",btnClass);}
                break;
              case "click":
                if(seq.type!=="stepped" || d.tweenRunning){return;}
                _seq("on",btnClass);
                break;
            }
            function _seq(a,c){
              seq.scrollAmount=o.snapAmount || o.scrollButtons.scrollAmount;
              functions._sequentialScroll.call(this,$this,a,c);
            }
          });
        },
        /* -------------------- */
        
        
        /* 
        KEYBOARD EVENTS
        scrolls content via keyboard 
        Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
        */
        _keyboard:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
            namespace=pluginPfx+"_"+d.idx,
            mCustomScrollBox=$("#mCSB_"+d.idx),
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            wrapper=mCSB_container.parent(),
            editables="input,textarea,select,datalist,keygen,[contenteditable='true']";
          mCustomScrollBox.attr("tabindex","0").bind("blur."+namespace+" keydown."+namespace+" keyup."+namespace,function(e){
            switch(e.type){
              case "blur":
                if(d.tweenRunning && seq.dir){_seq("off",null);}
                break;
              case "keydown": case "keyup":
                var code=e.keyCode ? e.keyCode : e.which,action="on";
                if((o.axis!=="x" && (code===38 || code===40)) || (o.axis!=="y" && (code===37 || code===39))){
                  /* up (38), down (40), left (37), right (39) arrows */
                  if(((code===38 || code===40) && !d.overflowed[0]) || ((code===37 || code===39) && !d.overflowed[1])){return;}
                  if(e.type==="keyup"){action="off";}
                  if(!$(document.activeElement).is(editables)){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    _seq(action,code);
                  }
                }else if(code===33 || code===34){
                  /* PgUp (33), PgDn (34) */
                  if(d.overflowed[0] || d.overflowed[1]){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                  }
                  if(e.type==="keyup"){
                    functions._stop($this);
                    var keyboardDir=code===34 ? -1 : 1;
                    if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
                      var dir="x",to=Math.abs(mCSB_container[0].offsetLeft)-(keyboardDir*(wrapper.width()*0.9));
                    }else{
                      var dir="y",to=Math.abs(mCSB_container[0].offsetTop)-(keyboardDir*(wrapper.height()*0.9));
                    }
                    functions._scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
                  }
                }else if(code===35 || code===36){
                  /* End (35), Home (36) */
                  if(!$(document.activeElement).is(editables)){
                    if(d.overflowed[0] || d.overflowed[1]){
                      e.preventDefault();
                      e.stopImmediatePropagation();
                    }
                    if(e.type==="keyup"){
                      if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
                        var dir="x",to=code===35 ? Math.abs(wrapper.width()-mCSB_container.outerWidth(false)) : 0;
                      }else{
                        var dir="y",to=code===35 ? Math.abs(wrapper.height()-mCSB_container.outerHeight(false)) : 0;
                      }
                      functions._scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
                    }
                  }
                }
                break;
            }
            function _seq(a,c){
              seq.type=o.keyboard.scrollType;
              seq.scrollAmount=o.snapAmount || o.keyboard.scrollAmount;
              if(seq.type==="stepped" && d.tweenRunning){return;}
              functions._sequentialScroll.call(this,$this,a,c);
            }
          });
        },
        /* -------------------- */
        
        
        /* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
        _sequentialScroll:function(el,action,trigger){
          var d=el.data(pluginPfx),o=d.opt,seq=d.sequential,
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            once=seq.type==="stepped" ? true : false;
          switch(action){
            case "on":
              seq.dir=[
                (trigger==="mCSB_buttonRight" || trigger==="mCSB_buttonLeft" || trigger===39 || trigger===37 ? "x" : "y"),
                (trigger==="mCSB_buttonUp" || trigger==="mCSB_buttonLeft" || trigger===38 || trigger===37 ? -1 : 1)
              ];
              functions._stop(el);
              if(functions._isNumeric(trigger) && seq.type==="stepped"){return;}
              _start(once);
              break;
            case "off":
              _stop();
              if(once || (d.tweenRunning && seq.dir)){
                _start(true);
              }
              break;
          }
          /* starts sequence */
          function _start(once){
            var c=seq.type!=="stepped", /* continuous scrolling */
              t=!once ? 1000/60 : c ? o.scrollInertia/1.5 : o.scrollInertia, /* timer */
              m=!once ? 2.5 : c ? 7.5 : 40, /* multiplier */
              contentPos=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)],
              ratio=[d.scrollRatio.y>10 ? 10 : d.scrollRatio.y,d.scrollRatio.x>10 ? 10 : d.scrollRatio.x],
              amount=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*(ratio[1]*m)) : contentPos[0]+(seq.dir[1]*(ratio[0]*m)),
              px=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*parseInt(seq.scrollAmount)) : contentPos[0]+(seq.dir[1]*parseInt(seq.scrollAmount)),
              to=seq.scrollAmount!=="auto" ? px : amount,
              easing=!once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
              onComplete=!once ? false : true;
            if(once && t<17){
              to=seq.dir[0]==="x" ? contentPos[1] : contentPos[0];
            }
            functions._scrollTo(el,to.toString(),{dir:seq.dir[0],scrollEasing:easing,dur:t,onComplete:onComplete});
            if(once){
              seq.dir=false;
              return;
            }
            clearTimeout(seq.step);
            seq.step=setTimeout(function(){
              _start();
            },t);
          }
          /* stops sequence */
          function _stop(){
            clearTimeout(seq.step);
            functions._stop(el);
          }
        },
        /* -------------------- */
        
        
        /* returns a yx array from value */
        _arr:function(val){
          var o=$(this).data(pluginPfx).opt,vals=[];
          if(typeof val==="function"){val=val();} /* check if the value is a single anonymous function */
          /* check if value is object or array, its length and create an array with yx values */
          if(!(val instanceof Array)){ /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
            vals[0]=val.y ? val.y : val.x || o.axis==="x" ? null : val;
            vals[1]=val.x ? val.x : val.y || o.axis==="y" ? null : val;
          }else{ /* array value (e.g. [100,100]) */
            vals=val.length>1 ? [val[0],val[1]] : o.axis==="x" ? [null,val[0]] : [val[0],null];
          }
          /* check if array values are anonymous functions */
          if(typeof vals[0]==="function"){vals[0]=vals[0]();}
          if(typeof vals[1]==="function"){vals[1]=vals[1]();}
          return vals;
        },
        /* -------------------- */
        
        
        /* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
        _to:function(val,dir){
          if(val==null || typeof val=="undefined"){return;}
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            wrapper=mCSB_container.parent(),
            t=typeof val;
          if(!dir){dir=o.axis==="x" ? "x" : "y";}
          var contentLength=dir==="x" ? mCSB_container.outerWidth(false) : mCSB_container.outerHeight(false),
            contentOffset=dir==="x" ? mCSB_container.offset().left : mCSB_container.offset().top,
            contentPos=dir==="x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
            cssProp=dir==="x" ? "left" : "top";
          switch(t){
            case "function": /* this currently is not used. Consider removing it */
              return val();
              break;
            case "object":
              if(val.nodeType){ /* DOM */
                var objOffset=dir==="x" ? $(val).offset().left : $(val).offset().top;
              }else if(val.jquery){ /* jquery object */
                if(!val.length){return;}
                var objOffset=dir==="x" ? val.offset().left : val.offset().top;
              }
              return objOffset-contentOffset;
              break;
            case "string": case "number":
              if(functions._isNumeric.call(null,val)){ /* numeric value */
                return Math.abs(val);
              }else if(val.indexOf("%")!==-1){ /* percentage value */
                return Math.abs(contentLength*parseInt(val)/100);
              }else if(val.indexOf("-=")!==-1){ /* decrease value */
                return Math.abs(contentPos-parseInt(val.split("-=")[1]));
              }else if(val.indexOf("+=")!==-1){ /* inrease value */
                var p=(contentPos+parseInt(val.split("+=")[1]));
                return p>=0 ? 0 : Math.abs(p);
              }else if(val.indexOf("px")!==-1 && functions._isNumeric.call(null,val.split("px")[0])){ /* pixels string value (e.g. "100px") */
                return Math.abs(val.split("px")[0]);
              }else{
                if(val==="top" || val==="left"){ /* special strings */
                  return 0;
                }else if(val==="bottom"){
                  return Math.abs(wrapper.height()-mCSB_container.outerHeight(false));
                }else if(val==="right"){
                  return Math.abs(wrapper.width()-mCSB_container.outerWidth(false));
                }else if(val==="first" || val==="last"){
                  var obj=mCSB_container.find(":"+val),
                    objOffset=dir==="x" ? $(obj).offset().left : $(obj).offset().top;
                  return objOffset-contentOffset;
                }else{
                  if($(val).length){ /* jquery selector */
                    var objOffset=dir==="x" ? $(val).offset().left : $(val).offset().top;
                    return objOffset-contentOffset;
                  }else{ /* other values (e.g. "100em") */
                    mCSB_container.css(cssProp,val);
                    methods.update.call(null,$this[0]);
                    return;
                  }
                }
              }
              break;
          }
        },
        /* -------------------- */
        
        
        /* calls the update method automatically */
        _autoUpdate:function(rem){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
            mCSB_container=$("#mCSB_"+d.idx+"_container");
          if(rem){
            /* 
            removes autoUpdate timer 
            usage: functions._autoUpdate.call(this,"remove");
            */
            clearTimeout(mCSB_container[0].autoUpdate);
            functions._delete.call(null,mCSB_container[0].autoUpdate);
            return;
          }
          var	wrapper=mCSB_container.parent(),
            scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
            scrollbarSize=function(){return [
              scrollbar[0].is(":visible") ? scrollbar[0].outerHeight(true) : 0, /* returns y-scrollbar height */
              scrollbar[1].is(":visible") ? scrollbar[1].outerWidth(true) : 0 /* returns x-scrollbar width */
            ]},
            oldSelSize=sizesSum(),newSelSize,
            os=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false),wrapper.height(),wrapper.width(),scrollbarSize()[0],scrollbarSize()[1]],ns,
            oldImgsLen=imgSum(),newImgsLen;
          upd();
          function upd(){
            clearTimeout(mCSB_container[0].autoUpdate);
            mCSB_container[0].autoUpdate=setTimeout(function(){
              /* update on specific selector(s) length and size change */
              if(o.advanced.updateOnSelectorChange){
                newSelSize=sizesSum();
                if(newSelSize!==oldSelSize){
                  doUpd();
                  oldSelSize=newSelSize;
                  return;
                }
              }
              /* update on main element and scrollbar size changes */
              if(o.advanced.updateOnContentResize){
                ns=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false),wrapper.height(),wrapper.width(),scrollbarSize()[0],scrollbarSize()[1]];
                if(ns[0]!==os[0] || ns[1]!==os[1] || ns[2]!==os[2] || ns[3]!==os[3] || ns[4]!==os[4] || ns[5]!==os[5]){
                  doUpd();
                  os=ns;
                }
              }
              /* update on image load */
              if(o.advanced.updateOnImageLoad){
                newImgsLen=imgSum();
                if(newImgsLen!==oldImgsLen){
                  mCSB_container.find("img").each(function(){
                    imgLoader(this.src);
                  });
                  oldImgsLen=newImgsLen;
                }
              }
              if(o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad){upd();}
            },60);
          }
          /* returns images amount */
          function imgSum(){
            var total=0
            if(o.advanced.updateOnImageLoad){total=mCSB_container.find("img").length;}
            return total;
          }
          /* a tiny image loader */
          function imgLoader(src){
            var img=new Image();
            function createDelegate(contextObject,delegateMethod){
              return function(){return delegateMethod.apply(contextObject,arguments);}
            }
            function imgOnLoad(){
              this.onload=null;
              doUpd();
            }
            img.onload=createDelegate(img,imgOnLoad);
            img.src=src;
          }
          /* returns the total height and width sum of all elements matching the selector */
          function sizesSum(){
            if(o.advanced.updateOnSelectorChange===true){o.advanced.updateOnSelectorChange="*";}
            var total=0,sel=mCSB_container.find(o.advanced.updateOnSelectorChange);
            if(o.advanced.updateOnSelectorChange && sel.length>0){sel.each(function(){total+=$(this).height()+$(this).width();});}
            return total;
          }
          /* calls the update method */
          function doUpd(){
            clearTimeout(mCSB_container[0].autoUpdate); 
            methods.update.call(null,$this[0]);
          }
        },
        /* -------------------- */
        
        
        /* snaps scrolling to a multiple of a pixels number */
        _snapAmount:function(to,amount,offset){
          return (Math.round(to/amount)*amount-offset); 
        },
        /* -------------------- */
        
        
        /* stops content and scrollbar animations */
        _stop:function(el){
          var d=el.data(pluginPfx),
            sel=$("#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal");
          sel.each(function(){
            functions._stopTween.call(this);
          });
        },
        /* -------------------- */
        
        
        /* 
        ANIMATES CONTENT 
        This is where the actual scrolling happens
        */
        _scrollTo:function(el,to,options){
          var d=el.data(pluginPfx),o=d.opt,
            defaults={
              trigger:"internal",
              dir:"y",
              scrollEasing:"mcsEaseOut",
              drag:false,
              dur:o.scrollInertia,
              overwrite:"all",
              callbacks:true,
              onStart:true,
              onUpdate:true,
              onComplete:true
            },
            options=$.extend(defaults,options),
            dur=[options.dur,(options.drag ? 0 : options.dur)],
            mCustomScrollBox=$("#mCSB_"+d.idx),
            mCSB_container=$("#mCSB_"+d.idx+"_container"),
            totalScrollOffsets=o.callbacks.onTotalScrollOffset ? functions._arr.call(el,o.callbacks.onTotalScrollOffset) : [0,0],
            totalScrollBackOffsets=o.callbacks.onTotalScrollBackOffset ? functions._arr.call(el,o.callbacks.onTotalScrollBackOffset) : [0,0];
          d.trigger=options.trigger;
          if(to==="_resetY" && !d.contentReset.y){
            /* callbacks: onOverflowYNone */
            if(_cb("onOverflowYNone")){o.callbacks.onOverflowYNone.call(el[0]);}
            d.contentReset.y=1;
          }
          if(to==="_resetX" && !d.contentReset.x){
            /* callbacks: onOverflowXNone */
            if(_cb("onOverflowXNone")){o.callbacks.onOverflowXNone.call(el[0]);}
            d.contentReset.x=1;
          }
          if(to==="_resetY" || to==="_resetX"){return;}
          if((d.contentReset.y || !el[0].mcs) && d.overflowed[0]){
            /* callbacks: onOverflowY */
            if(_cb("onOverflowY")){o.callbacks.onOverflowY.call(el[0]);}
            d.contentReset.x=null;
          }
          if((d.contentReset.x || !el[0].mcs) && d.overflowed[1]){
            /* callbacks: onOverflowX */
            if(_cb("onOverflowX")){o.callbacks.onOverflowX.call(el[0]);}
            d.contentReset.x=null;
          }
          if(o.snapAmount){to=functions._snapAmount(to,o.snapAmount,o.snapOffset);} /* scrolling snapping */
          switch(options.dir){
            case "x":
              var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_horizontal"),
                property="left",
                contentPos=mCSB_container[0].offsetLeft,
                limit=[
                  mCustomScrollBox.width()-mCSB_container.outerWidth(false),
                  mCSB_dragger.parent().width()-mCSB_dragger.width()
                ],
                scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.x)],
                tso=totalScrollOffsets[1],
                tsbo=totalScrollBackOffsets[1],
                totalScrollOffset=tso>0 ? tso/d.scrollRatio.x : 0,
                totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.x : 0;
              break;
            case "y":
              var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_vertical"),
                property="top",
                contentPos=mCSB_container[0].offsetTop,
                limit=[
                  mCustomScrollBox.height()-mCSB_container.outerHeight(false),
                  mCSB_dragger.parent().height()-mCSB_dragger.height()
                ],
                scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.y)],
                tso=totalScrollOffsets[0],
                tsbo=totalScrollBackOffsets[0],
                totalScrollOffset=tso>0 ? tso/d.scrollRatio.y : 0,
                totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.y : 0;
              break;
          }
          if(scrollTo[1]<0 || (scrollTo[0]===0 && scrollTo[1]===0)){
            scrollTo=[0,0];
          }else if(scrollTo[1]>=limit[1]){
            scrollTo=[limit[0],limit[1]];
          }else{
            scrollTo[0]=-scrollTo[0];
          }
          if(!el[0].mcs){_mcs();} /* init mcs object (once) to make it available before callbacks */
          clearTimeout(mCSB_container[0].onCompleteTimeout);
          if(!d.tweenRunning && ((contentPos===0 && scrollTo[0]>=0) || (contentPos===limit[0] && scrollTo[0]<=limit[0]))){return;}
          functions._tweenTo.call(null,mCSB_dragger[0],property,Math.round(scrollTo[1]),dur[1],options.scrollEasing);
          functions._tweenTo.call(null,mCSB_container[0],property,Math.round(scrollTo[0]),dur[0],options.scrollEasing,options.overwrite,{
            onStart:function(){
              if(options.callbacks && options.onStart && !d.tweenRunning){
                /* callbacks: onScrollStart */
                if(_cb("onScrollStart")){_mcs(); o.callbacks.onScrollStart.call(el[0]);}
                d.tweenRunning=true;
                functions._onDragClasses(mCSB_dragger);
                d.cbOffsets=_cbOffsets();
              }
            },onUpdate:function(){
              if(options.callbacks && options.onUpdate){
                /* callbacks: whileScrolling */
                if(_cb("whileScrolling")){_mcs(); o.callbacks.whileScrolling.call(el[0]);}
              }
            },onComplete:function(){
              if(options.callbacks && options.onComplete){
                if(o.axis==="yx"){clearTimeout(mCSB_container[0].onCompleteTimeout);}
                var t=mCSB_container[0].idleTimer || 0;
                mCSB_container[0].onCompleteTimeout=setTimeout(function(){
                  /* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
                  if(_cb("onScroll")){_mcs(); o.callbacks.onScroll.call(el[0]);}
                  if(_cb("onTotalScroll") && scrollTo[1]>=limit[1]-totalScrollOffset && d.cbOffsets[0]){_mcs(); o.callbacks.onTotalScroll.call(el[0]);}
                  if(_cb("onTotalScrollBack") && scrollTo[1]<=totalScrollBackOffset && d.cbOffsets[1]){_mcs(); o.callbacks.onTotalScrollBack.call(el[0]);}
                  d.tweenRunning=false;
                  mCSB_container[0].idleTimer=0;
                  functions._onDragClasses(mCSB_dragger,"hide");
                },t);
              }
            }
          });
          /* checks if callback function exists */
          function _cb(cb){
            return d && o.callbacks[cb] && typeof o.callbacks[cb]==="function";
          }
          /* checks whether callback offsets always trigger */
          function _cbOffsets(){
            return [o.callbacks.alwaysTriggerOffsets || contentPos>=limit[0]+tso,o.callbacks.alwaysTriggerOffsets || contentPos<=-tsbo];
          }
          /* 
          populates object with useful values for the user 
          values: 
            content: this.mcs.content
            content top position: this.mcs.top 
            content left position: this.mcs.left 
            dragger top position: this.mcs.draggerTop 
            dragger left position: this.mcs.draggerLeft 
            scrolling y percentage: this.mcs.topPct 
            scrolling x percentage: this.mcs.leftPct 
            scrolling direction: this.mcs.direction
          */
          function _mcs(){
            var cp=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft], /* content position */
              dp=[mCSB_dragger[0].offsetTop,mCSB_dragger[0].offsetLeft], /* dragger position */
              cl=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false)], /* content length */
              pl=[mCustomScrollBox.height(),mCustomScrollBox.width()]; /* content parent length */
            el[0].mcs={
              content:mCSB_container, /* original content wrapper as jquery object */
              top:cp[0],left:cp[1],draggerTop:dp[0],draggerLeft:dp[1],
              topPct:Math.round((100*Math.abs(cp[0]))/(Math.abs(cl[0])-pl[0])),leftPct:Math.round((100*Math.abs(cp[1]))/(Math.abs(cl[1])-pl[1])),
              direction:options.dir
            };
            /* 
            this refers to the original element containing the scrollbar(s)
            usage: this.mcs.top, this.mcs.leftPct etc. 
            */
          }
        },
        /* -------------------- */
        
        
        /* 
        CUSTOM JAVASCRIPT ANIMATION TWEEN 
        Lighter and faster than jquery animate() and css transitions 
        Animates top/left properties and includes easings 
        */
        _tweenTo:function(el,prop,to,duration,easing,overwrite,callbacks){
          var callbacks=callbacks || {},
            onStart=callbacks.onStart || function(){},onUpdate=callbacks.onUpdate || function(){},onComplete=callbacks.onComplete || function(){},
            startTime=functions._getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style,_request;
          if(prop==="left"){from=el.offsetLeft;}
          var diff=to-from;
          el._mcsstop=0;
          if(overwrite!=="none"){_cancelTween();}
          _startTween();
          function _step(){
            if(el._mcsstop){return;}
            if(!progress){onStart.call();}
            progress=functions._getTime()-startTime;
            _tween();
            if(progress>=el._mcstime){
              el._mcstime=(progress>el._mcstime) ? progress+_delay-(progress- el._mcstime) : progress+_delay-1;
              if(el._mcstime<progress+1){el._mcstime=progress+1;}
            }
            if(el._mcstime<duration){el._mcsid=_request(_step);}else{onComplete.call();}
          }
          function _tween(){
            if(duration>0){
              el._mcscurrVal=_ease(el._mcstime,from,diff,duration,easing);
              elStyle[prop]=Math.round(el._mcscurrVal)+"px";
            }else{
              elStyle[prop]=to+"px";
            }
            onUpdate.call();
          }
          function _startTween(){
            _delay=1000/60;
            el._mcstime=progress+_delay;
            _request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
            el._mcsid=_request(_step);
          }
          function _cancelTween(){
            if(el._mcsid==null){return;}
            if(!window.requestAnimationFrame){clearTimeout(el._mcsid);
            }else{window.cancelAnimationFrame(el._mcsid);}
            el._mcsid=null;
          }
          function _ease(t,b,c,d,type){
            switch(type){
              case "linear": case "mcsLinear":
                return c*t/d + b;
                break;
              case "mcsLinearOut":
                t/=d; t--; return c * Math.sqrt(1 - t*t) + b;
                break;
              case "easeInOutSmooth":
                t/=d/2;
                if(t<1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
                break;
              case "easeInOutStrong":
                t/=d/2;
                if(t<1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
                t--;
                return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
                break;
              case "easeInOut": case "mcsEaseInOut":
                t/=d/2;
                if(t<1) return c/2*t*t*t + b;
                t-=2;
                return c/2*(t*t*t + 2) + b;
                break;
              case "easeOutSmooth":
                t/=d; t--;
                return -c * (t*t*t*t - 1) + b;
                break;
              case "easeOutStrong":
                return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
                break;
              case "easeOut": case "mcsEaseOut": default:
                var ts=(t/=d)*t,tc=ts*t;
                return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
            }
          }
        },
        /* -------------------- */
        
        
        /* returns current time */
        _getTime:function(){
          if(window.performance && window.performance.now){
            return window.performance.now();
          }else{
            if(window.performance && window.performance.webkitNow){
              return window.performance.webkitNow();
            }else{
              if(Date.now){return Date.now();}else{return new Date().getTime();}
            }
          }
        },
        /* -------------------- */
        
        
        /* stops a tween */
        _stopTween:function(){
          var el=this;
          if(el._mcsid==null){return;}
          if(!window.requestAnimationFrame){clearTimeout(el._mcsid);
          }else{window.cancelAnimationFrame(el._mcsid);}
          el._mcsid=null;
          el._mcsstop=1;
        },
        /* -------------------- */
        
        
        /* deletes a property (avoiding the exception thrown by IE) */
        _delete:function(p){
          try{delete p;}catch(e){p=null;}
        },
        /* -------------------- */
        
        
        /* detects left mouse button */
        _mouseBtnLeft:function(e){
          return !(e.which && e.which!==1);
        },
        /* -------------------- */
        
        
        /* detects if pointer type event is touch */
        _pointerTouch:function(e){
          var t=e.originalEvent.pointerType;
          return !(t && t!=="touch" && t!==2);
        },
        /* -------------------- */
        
        
        /* checks if value is numeric */
        _isNumeric:function(val){
          return !isNaN(parseFloat(val)) && isFinite(val);
        }
        /* -------------------- */
        
      };
      
    
    
    
    
    /* 
    ----------------------------------------
    PLUGIN SETUP 
    ----------------------------------------
    */
    
    /* plugin constructor functions */
    $.fn[pluginNS]=function(method){ /* usage: $(selector).mCustomScrollbar(); */
      if(methods[method]){
        return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
      }else if(typeof method==="object" || !method){
        return methods.init.apply(this,arguments);
      }else{
        $.error("Method "+method+" does not exist");
      }
    };
    $[pluginNS]=function(method){ /* usage: $.mCustomScrollbar(); */
      if(methods[method]){
        return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
      }else if(typeof method==="object" || !method){
        return methods.init.apply(this,arguments);
      }else{
        $.error("Method "+method+" does not exist");
      }
    };
    
    /* 
    allow setting plugin default options. 
    usage: $.mCustomScrollbar.defaults.scrollInertia=500; 
    to apply any changed default options on default selectors (below), use inside document ready fn 
    e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
    */
    $[pluginNS].defaults=defaults;
    
    /* 
    add window object (window.mCustomScrollbar) 
    usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
    */
    window[pluginNS]=true;
    
    $(window).load(function(){
      $(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */
    });
  
  }))}(window,document));