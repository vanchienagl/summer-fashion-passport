/*!
 * modernizr v3.3.1
 * Build http://modernizr.com/download?-overflowscrolling-setclasses-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/


/*
 * Custom Version
 ** CSS Overflow Scrolling
*/


;(function(window, document, undefined){
  var classes = [];
  

  var tests = [];
  

  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.3.1',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': '',
      'enableClasses': true,
      'enableJSClass': true,
      'usePrefixes': true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function() {
        cb(self[test]);
      }, 0);
    },

    addTest: function(name, fn, options) {
      tests.push({name: name, fn: fn, options: options});
    },

    addAsyncTest: function(fn) {
      tests.push({name: null, fn: fn});
    }
  };

  

  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function() {};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  

  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return typeof obj === type;
  }
  ;

  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            /* jshint -W053 */
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  ;

  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;
  

  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';
  

  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */

  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    if (isSVG) {
      className = className.baseVal;
    }

    // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too
    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      isSVG ? docElement.className.baseVal = className : docElement.className = className;
    }

  }

  ;

  /**
   * If the browsers follow the spec, then they would expose vendor-specific style as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following, which would be technically incorrect:
   *   elem.style.webkitBorderRadius

   * Webkit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/

   * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */

  var omPrefixes = 'Moz O ms Webkit';
  

  var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
  ModernizrProto._cssomPrefixes = cssomPrefixes;
  

  /**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */

  var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
  ModernizrProto._domPrefixes = domPrefixes;
  


  /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */

  function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
  }

  ;

  /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */

  function createElement() {
    if (typeof document.createElement !== 'function') {
      // This is the case in IE7, where the type of createElement is "object".
      // For this reason, we cannot call apply() as Object is not a Function.
      return document.createElement(arguments[0]);
    } else if (isSVG) {
      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
    } else {
      return document.createElement.apply(document, arguments);
    }
  }

  ;

  /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */

  function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
      return m1 + m2.toUpperCase();
    }).replace(/^-/, '');
  }
  ;

  /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */

  function fnBind(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  }

  ;

  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   */
  function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
      if (props[i] in obj) {

        // return the property name as a string
        if (elem === false) {
          return props[i];
        }

        item = obj[props[i]];

        // let's bind a function
        if (is(item, 'function')) {
          // bind to obj unless overriden
          return fnBind(item, elem || obj);
        }

        // return the unbound function or obj or value
        return item;
      }
    }
    return false;
  }

  ;

  /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */

  var modElem = {
    elem: createElement('modernizr')
  };

  // Clean up this element
  Modernizr._q.push(function() {
    delete modElem.elem;
  });

  

  var mStyle = {
    style: modElem.elem.style
  };

  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function() {
    delete mStyle.style;
  });

  

  /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */

  function domToCSS(name) {
    return name.replace(/([A-Z])/g, function(str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }
  ;

  /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */

  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
      // Can't use the real body create a fake one.
      body = createElement(isSVG ? 'svg' : 'body');
      body.fake = true;
    }

    return body;
  }

  ;

  /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */

  function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if (parseInt(nodes, 10)) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while (nodes--) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    style = createElement('style');
    style.type = 'text/css';
    style.id = 's' + mod;

    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).appendChild(style);
    body.appendChild(div);

    if (style.styleSheet) {
      style.styleSheet.cssText = rule;
    } else {
      style.appendChild(document.createTextNode(rule));
    }
    div.id = mod;

    if (body.fake) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if (body.fake) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;

  }

  ;

  /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */

  // Accepts a list of property names and a single value
  // Returns `undefined` if native detection not available
  function nativeTestProps(props, value) {
    var i = props.length;
    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
    if ('CSS' in window && 'supports' in window.CSS) {
      // Try every prefixed variant of the property
      while (i--) {
        if (window.CSS.supports(domToCSS(props[i]), value)) {
          return true;
        }
      }
      return false;
    }
    // Otherwise fall back to at-rule (for Opera 12.x)
    else if ('CSSSupportsRule' in window) {
      // Build a condition string for every prefixed variant
      var conditionText = [];
      while (i--) {
        conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
      }
      conditionText = conditionText.join(' or ');
      return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
        return getComputedStyle(node, null).position == 'absolute';
      });
    }
    return undefined;
  }
  ;

  // testProps is a generic CSS / DOM property test.

  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.

  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.

  // Property names can be provided in either camelCase or kebab-case.

  function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    // Try native detect first
    if (!is(value, 'undefined')) {
      var result = nativeTestProps(props, value);
      if (!is(result, 'undefined')) {
        return result;
      }
    }

    // Otherwise do it properly
    var afterInit, i, propsLength, prop, before;

    // If we don't have a style element, that means we're running async or after
    // the core tests, so we'll need to create our own elements to use

    // inside of an SVG element, in certain browsers, the `style` element is only
    // defined for valid tags. Therefore, if `modernizr` does not have one, we
    // fall back to a less used element and hope for the best.
    var elems = ['modernizr', 'tspan'];
    while (!mStyle.style) {
      afterInit = true;
      mStyle.modElem = createElement(elems.shift());
      mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we created them.
    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    propsLength = props.length;
    for (i = 0; i < propsLength; i++) {
      prop = props[i];
      before = mStyle.style[prop];

      if (contains(prop, '-')) {
        prop = cssToDOM(prop);
      }

      if (mStyle.style[prop] !== undefined) {

        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, 'undefined')) {

          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {}

          // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()
          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
        }
        // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
          cleanElems();
          return prefixed == 'pfx' ? prop : true;
        }
      }
    }
    cleanElems();
    return false;
  }

  ;

  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   */
  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
    props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    // did they call .prefixed('boxSizing') or are we just testing a prop?
    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
      return testProps(props, prefixed, value, skipValueTest);

      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  // Modernizr.testAllProps() investigates whether a given style property,
  // or any of its vendor-prefixed variants, is recognized
  //
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')
  ModernizrProto.testAllProps = testPropsAll;

  

  /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */

  function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
  }
  ModernizrProto.testAllProps = testAllProps;
  
/*!
{
  "name": "CSS Overflow Scrolling",
  "property": "overflowscrolling",
  "tags": ["css"],
  "builderAliases": ["css_overflow_scrolling"],
  "warnings": ["Introduced in iOS5b2. API is subject to change."],
  "notes": [{
    "name": "Article on iOS overflow scrolling",
    "href": "https://css-tricks.com/snippets/css/momentum-scrolling-on-ios-overflow-elements/"
  }]
}
!*/

  Modernizr.addTest('overflowscrolling', testAllProps('overflowScrolling', 'touch', true));


  // Run each test
  testRunner();

  // Remove the "no-js" class if it exists
  setClasses(classes);

  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest;

  // Run the things that are supposed to run after the tests
  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  }

  // Leak Modernizr namespace
  window.Modernizr = Modernizr;


;

})(window, document);
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
