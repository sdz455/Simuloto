/*! ========================================================================
 * Bootstrap Toggle: bootstrap-toggle.js v2.2.0
 * http://www.bootstraptoggle.com
 * ========================================================================
 * Copyright 2014 Min Hur, The New York Times Company
 * Licensed under MIT
 * ======================================================================== */


 +function ($) {
 	'use strict';

	// TOGGLE PUBLIC CLASS DEFINITION
	// ==============================

	var Toggle = function (element, options) {
		this.$element  = $(element)
		this.options   = $.extend({}, this.defaults(), options)
		this.render()
	}

	Toggle.VERSION  = '2.2.0'

	Toggle.DEFAULTS = {
		on: 'On',
		off: 'Off',
		onstyle: 'primary',
		offstyle: 'default',
		size: 'normal',
		style: '',
		width: null,
		height: null
	}

	Toggle.prototype.defaults = function() {
		return {
			on: this.$element.attr('data-on') || Toggle.DEFAULTS.on,
			off: this.$element.attr('data-off') || Toggle.DEFAULTS.off,
			onstyle: this.$element.attr('data-onstyle') || Toggle.DEFAULTS.onstyle,
			offstyle: this.$element.attr('data-offstyle') || Toggle.DEFAULTS.offstyle,
			size: this.$element.attr('data-size') || Toggle.DEFAULTS.size,
			style: this.$element.attr('data-style') || Toggle.DEFAULTS.style,
			width: this.$element.attr('data-width') || Toggle.DEFAULTS.width,
			height: this.$element.attr('data-height') || Toggle.DEFAULTS.height
		}
	}

	Toggle.prototype.render = function () {
		this._onstyle = 'btn-' + this.options.onstyle
		this._offstyle = 'btn-' + this.options.offstyle
		var size = this.options.size === 'large' ? 'btn-lg'
			: this.options.size === 'small' ? 'btn-sm'
			: this.options.size === 'mini' ? 'btn-xs'
			: ''
		var $toggleOn = $('<label class="btn">').html(this.options.on)
			.addClass(this._onstyle + ' ' + size)
		var $toggleOff = $('<label class="btn">').html(this.options.off)
			.addClass(this._offstyle + ' ' + size + ' active')
		var $toggleHandle = $('<span class="toggle-handle btn btn-default">')
			.addClass(size)
		var $toggleGroup = $('<div class="toggle-group">')
			.append($toggleOn, $toggleOff, $toggleHandle)
		var $toggle = $('<div class="toggle btn" data-toggle="toggle">')
			.addClass( this.$element.prop('checked') ? this._onstyle : this._offstyle+' off' )
			.addClass(size).addClass(this.options.style)

		this.$element.wrap($toggle)
		$.extend(this, {
			$toggle: this.$element.parent(),
			$toggleOn: $toggleOn,
			$toggleOff: $toggleOff,
			$toggleGroup: $toggleGroup
		})
		this.$toggle.append($toggleGroup)

		var width = this.options.width || Math.max($toggleOn.outerWidth(), $toggleOff.outerWidth())+($toggleHandle.outerWidth()/2)
		var height = this.options.height || Math.max($toggleOn.outerHeight(), $toggleOff.outerHeight())
		$toggleOn.addClass('toggle-on')
		$toggleOff.addClass('toggle-off')
		this.$toggle.css({ width: width, height: height })
		if (this.options.height) {
			$toggleOn.css('line-height', $toggleOn.height() + 'px')
			$toggleOff.css('line-height', $toggleOff.height() + 'px')
		}
		this.update(true)
		this.trigger(true)
	}

	Toggle.prototype.toggle = function () {
		if (this.$element.prop('checked')) this.off()
		else this.on()
	}

	Toggle.prototype.on = function (silent) {
		if (this.$element.prop('disabled')) return false
		this.$toggle.removeClass(this._offstyle + ' off').addClass(this._onstyle)
		this.$element.prop('checked', true)
		if (!silent) this.trigger()
	}

	Toggle.prototype.off = function (silent) {
		if (this.$element.prop('disabled')) return false
		this.$toggle.removeClass(this._onstyle).addClass(this._offstyle + ' off')
		this.$element.prop('checked', false)
		if (!silent) this.trigger()
	}

	Toggle.prototype.enable = function () {
		this.$toggle.removeAttr('disabled')
		this.$element.prop('disabled', false)
	}

	Toggle.prototype.disable = function () {
		this.$toggle.attr('disabled', 'disabled')
		this.$element.prop('disabled', true)
	}

	Toggle.prototype.update = function (silent) {
		if (this.$element.prop('disabled')) this.disable()
		else this.enable()
		if (this.$element.prop('checked')) this.on(silent)
		else this.off(silent)
	}

	Toggle.prototype.trigger = function (silent) {
		this.$element.off('change.bs.toggle')
		if (!silent) this.$element.change()
		this.$element.on('change.bs.toggle', $.proxy(function() {
			this.update()
		}, this))
	}

	Toggle.prototype.destroy = function() {
		this.$element.off('change.bs.toggle')
		this.$toggleGroup.remove()
		this.$element.removeData('bs.toggle')
		this.$element.unwrap()
	}

	// TOGGLE PLUGIN DEFINITION
	// ========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.toggle')
			var options = typeof option == 'object' && option

			if (!data) $this.data('bs.toggle', (data = new Toggle(this, options)))
			if (typeof option == 'string' && data[option]) data[option]()
		})
	}

	var old = $.fn.bootstrapToggle

	$.fn.bootstrapToggle             = Plugin
	$.fn.bootstrapToggle.Constructor = Toggle

	// TOGGLE NO CONFLICT
	// ==================

	$.fn.toggle.noConflict = function () {
		$.fn.bootstrapToggle = old
		return this
	}

	// TOGGLE DATA-API
	// ===============

	$(function() {
		$('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle()
	})

	$(document).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
		var $checkbox = $(this).find('input[type=checkbox]')
		$checkbox.bootstrapToggle('toggle')
		e.preventDefault()
	})

}(jQuery);

/**
 * Portions of this code are from the Google Closure Library,
 * received from the Closure Authors under the Apache 2.0 license.
 *
 * All other code is (C) FriendsOfSymfony and subject to the MIT license.
 */
(function() {var f=!1,i,k=this;function l(a,c){var b=a.split("."),d=k;!(b[0]in d)&&d.execScript&&d.execScript("var "+b[0]);for(var e;b.length&&(e=b.shift());)!b.length&&void 0!==c?d[e]=c:d=d[e]?d[e]:d[e]={}};var m=Array.prototype,n=m.forEach?function(a,c,b){m.forEach.call(a,c,b)}:function(a,c,b){for(var d=a.length,e="string"==typeof a?a.split(""):a,g=0;g<d;g++)g in e&&c.call(b,e[g],g,a)};function q(a,c){this.c={};this.a=[];var b=arguments.length;if(1<b){if(b%2)throw Error("Uneven number of arguments");for(var d=0;d<b;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){var e;if(a instanceof q){r(a);d=a.a.concat();r(a);e=[];for(b=0;b<a.a.length;b++)e.push(a.c[a.a[b]])}else{var b=[],g=0;for(d in a)b[g++]=d;d=b;b=[];g=0;for(e in a)b[g++]=a[e];e=b}for(b=0;b<d.length;b++)this.set(d[b],e[b])}}q.prototype.f=0;q.prototype.p=0;
function r(a){if(a.f!=a.a.length){for(var c=0,b=0;c<a.a.length;){var d=a.a[c];t(a.c,d)&&(a.a[b++]=d);c++}a.a.length=b}if(a.f!=a.a.length){for(var e={},b=c=0;c<a.a.length;)d=a.a[c],t(e,d)||(a.a[b++]=d,e[d]=1),c++;a.a.length=b}}q.prototype.get=function(a,c){return t(this.c,a)?this.c[a]:c};q.prototype.set=function(a,c){t(this.c,a)||(this.f++,this.a.push(a),this.p++);this.c[a]=c};function t(a,c){return Object.prototype.hasOwnProperty.call(a,c)};var u,v,w,x;function y(){return k.navigator?k.navigator.userAgent:null}x=w=v=u=f;var C;if(C=y()){var D=k.navigator;u=0==C.indexOf("Opera");v=!u&&-1!=C.indexOf("MSIE");w=!u&&-1!=C.indexOf("WebKit");x=!u&&!w&&"Gecko"==D.product}var E=v,F=x,G=w;var I;if(u&&k.opera){var J=k.opera.version;"function"==typeof J&&J()}else F?I=/rv\:([^\);]+)(\)|;)/:E?I=/MSIE\s+([^\);]+)(\)|;)/:G&&(I=/WebKit\/(\S+)/),I&&I.exec(y());function K(a,c){this.b=a||{e:"",prefix:"",host:"",scheme:""};this.h(c||{})}K.g=function(){return K.j?K.j:K.j=new K};i=K.prototype;i.h=function(a){this.d=new q(a)};i.o=function(){return this.d};i.k=function(a){this.b.e=a};i.n=function(){return this.b.e};i.l=function(a){this.b.prefix=a};
function L(a,c,b,d){var e,g=RegExp(/\[\]$/);if(b instanceof Array)n(b,function(b,e){g.test(c)?d(c,b):L(a,c+"["+("object"===typeof b?e:"")+"]",b,d)});else if("object"===typeof b)for(e in b)L(a,c+"["+e+"]",b[e],d);else d(c,b)}i.i=function(a){var c=this.b.prefix+a;if(t(this.d.c,c))a=c;else if(!t(this.d.c,a))throw Error('The route "'+a+'" does not exist.');return this.d.get(a)};
i.m=function(a,c,b){var d=this.i(a),e=c||{},g={},z;for(z in e)g[z]=e[z];var h="",s=!0,j="";n(d.tokens,function(b){if("text"===b[0])h=b[1]+h,s=f;else if("variable"===b[0]){var c=b[3]in d.defaults;if(f===s||!c||b[3]in e&&e[b[3]]!=d.defaults[b[3]]){if(b[3]in e){var c=e[b[3]],p=b[3];p in g&&delete g[p]}else if(c)c=d.defaults[b[3]];else{if(s)return;throw Error('The route "'+a+'" requires the parameter "'+b[3]+'".');}if(!(!0===c||f===c||""===c)||!s)p=encodeURIComponent(c).replace(/%2F/g,"/"),"null"===p&&
null===c&&(p=""),h=b[1]+p+h;s=f}else c&&(b=b[3],b in g&&delete g[b])}else throw Error('The token type "'+b[0]+'" is not supported.');});""===h&&(h="/");n(d.hosttokens,function(a){var b;if("text"===a[0])j=a[1]+j;else if("variable"===a[0]){if(a[3]in e){b=e[a[3]];var c=a[3];c in g&&delete g[c]}else a[3]in d.defaults&&(b=d.defaults[a[3]]);j=a[1]+b+j}});h=this.b.e+h;"_scheme"in d.requirements&&this.b.scheme!=d.requirements._scheme?h=d.requirements._scheme+"://"+(j||this.b.host)+h:j&&this.b.host!==j?h=
this.b.scheme+"://"+j+h:!0===b&&(h=this.b.scheme+"://"+this.b.host+h);var c=0,A;for(A in g)c++;if(0<c){var B,H=[];A=function(a,b){b="function"===typeof b?b():b;H.push(encodeURIComponent(a)+"="+encodeURIComponent(null===b?"":b))};for(B in g)L(this,B,g[B],A);h=h+"?"+H.join("&").replace(/%20/g,"+")}return h};l("fos.Router",K);l("fos.Router.setData",function(a){var c=K.g();c.k(a.base_url);c.h(a.routes);"prefix"in a&&c.l(a.prefix);c.b.host=a.host;c.b.scheme=a.scheme});K.getInstance=K.g;K.prototype.setRoutes=K.prototype.h;K.prototype.getRoutes=K.prototype.o;K.prototype.setBaseUrl=K.prototype.k;K.prototype.getBaseUrl=K.prototype.n;K.prototype.generate=K.prototype.m;K.prototype.setPrefix=K.prototype.l;K.prototype.getRoute=K.prototype.i;window.Routing=K.g();})();
/**
 * execute an ajax call
 * @param uNumbers array: numbers selected by user from checkboxes
 * @param countGames array: count how many draw simulation has to do
 **/

function sendUNumbers(uNumbers, uStars, countGames) {
    
    /** creating ajax request **/
    var url = Routing.generate('execute_euromillions_simulation');

    $.post(
            url,
            {uNumbers: uNumbers, uStars: uStars, countGames: countGames},
            function (response) {
                if (response.code == 100 && response.success) {
                    window.console.log(response);
                    if (response.message == "none") {
                        var score = response.score;
                        var simulationDetails = response.arrSimulationDetails;
                        var countGames = response.countGames;

                        /**  build HtmlTable score  **/
                        var $htmlTable = buildHtmlTable(score);

                        /** empty previous content  **/
                        $('#score, #scoreDetails, #details').empty();
                        $('#p_details').remove();

                        $('#score').append($htmlTable);

                        /**  build Html Table details simulation   **/
                        //TODO attach it to the dom: create <div> after div#score
                        var $htmlTableDetails = buildSimulationDetails(simulationDetails, countGames);

                        $('#scoreDetails').append('<button id="p_details" class="btn btn-primary">Afficher les tirages</button>');
                        $('#p_details').on({
                            click: function () {
                                $('#details').slideToggle('normal', 'linear', function () {
                                    $(this).append($htmlTableDetails);
                                });
                            }
                        })
                    } else {
                        /** creating div alert error  **/
                        var $div = $("<div>");
                        $div.addClass('alert alert-danger customAlert').html('<strong>' + response.message + '<strong>');
                        /** add div alert error to the dom **/
                        $('#details').append($div);

                    }
                }

            }, 'json');
}

/**
 * disable all unchecked balls
 * this function is used when when selectedBalls.length >= 10
 * **/
function disableUnchecked($allBalls) {
    $allBalls.each(function (k, v) {
        if (!$(this).attr('checked')) {
            /** needs to add class 'disabled to div parent to set "grey effect" on disable checkbox '**/
            $(this).attr('disabled', true).closest('div').addClass('disabled');
        }
    })
}

/**
 * enable all disabled balls
 * this function is used when user unselect a ball AND selectedBalls.length >= 10
 * **/
function enableDisabled($allBalls) {
    $allBalls.each(function () {
        if ($(this).attr('disabled')) {
            $(this).removeAttr('disabled').closest('div').removeClass('disabled');
        }
    })
}

/**
 *  build an html table representing euromillions score
 *  and attach it to the dom !
 *
 *  @param jsonObject score
 *
 *  @return objectHTML <table>
 */
function buildHtmlTable(score) {

    var $table = $('<table>');
    var $thead = $('<thead>');
    var $tbody = $('<tbody>');
    var $tr, $td, $th;

    /** building thead **/
    $tr = $('<tr>');
    var $th1 = $('<th>').html('Bon numéros');
    var $th2 = $('<th>').html('Votre Score');
    $tr.append($th1);
    $tr.append($th2);
    $thead.append($tr);
    $table.append($thead);

    /** building tbody **/
    $.each(score, function (k, v) {
        var $td1 = $('<td>');
        var $td2 = $('<td>');
        $tr = $('<tr>');
        $td1.html(replaceKey(k));
        $td2.html(v);
        $tr.append($td1).append($td2);
        $tbody.append($tr);
        $table.append($tbody);
    })

    /** add style to table **/
    $table.addClass("table table-striped");
    return $table;
}

/**
 * replace key of jsonObject var score key -> key  O = 6 good numbers, key 1 = 5+ good numbers , etc
 * @param int key
 * @return string
 * **/
function replaceKey(key) {

    var result;
    // -1 because key begin with 1 in json object
    switch (parseInt(key)) {
        case 1:
            result = "5 + 2";
            break;
        case 2:
            result = "5 + 1";
            break;
        case 3:
            result = "5";
            break;
        case 4:
            result = "4 + 2";
            break;
        case 5:
            result = "4 + 1";
            break;
        case 6:
            result = "4";
            break;
        case 7:
            result = "3 + 2";
            break;
        case 8:
            result = "2 + 2";
            break;
        case 9:
            result = "3 + 1";
            break;
        case 10:
            result = "3 + 0";
            break;
        case 11:
            result = "1 + 2";
            break;
        case 12:
            result = "2 + 1";
            break;

        case 13:
            result = "2 + 0";
            break;
    }

    return result;
}

/**
 *  build an html table representing detailled simulation result
 *  @param simulationDetails json object
 *
 *  @return objectHTML <table>
 */
function buildSimulationDetails(simulationDetails, countGames) {
//    window.console.log();
//    window.console.log(simulationDetails);
    var arrDraw = simulationDetails.draw;
    var arrDrawStars = simulationDetails.drawStars;
    var arrUnumbers = simulationDetails.uNumbers;
    var arrUStars = simulationDetails.uStars;
    var arrCountGoodBalls = simulationDetails.goodBalls;
    var arrCountGoodStars = simulationDetails.goodStars;

    var $table = $('<table>');
    var $thead = $('<thead>');
    var $tbody = $('<tbody>');
    var $tr, $td, $th;

    /** building thead **/
    $tr = $('<tr>');
    var $th1 = $('<th>').html('Tirage');
    var $th2 = $('<th>').html('Tirage étoiles');
    var $th3 = $('<th>').html('Vos numéros');
    var $th4 = $('<th>').html('Vos étoiles');
    var $th5 = $('<th>').html('Bons numéros');
    var $th6 = $('<th>').html('Bonnes étoiles');

    $tr.append($th1);
    $tr.append($th2);
    $tr.append($th3);
    $tr.append($th4);
    $tr.append($th5);
    $tr.append($th6);
    $thead.append($tr);
    $table.append($thead);

    /** building tbody  **/
    for (var i = 0; i < countGames; i++) {
        $tr = $('<tr>');
        var $td1 = $('<td>');
        var $td2 = $('<td>');
        var $td3 = $('<td>');
        var $td4 = $('<td>');
        var $td5 = $('<td>');
        var $td6 = $('<td>');

        var drawToParse = arrDraw[i];
        var drawStarsToParse = arrDrawStars[i];
        var uNumbersToParse = arrUnumbers[i];
        var uStarsToParse = arrUStars[i];
        var goodBallsToParse = arrCountGoodBalls[i];
        var goodStarsToParse = arrCountGoodStars[i];


        var s = ''; // the string to add into each <td>
        var drawLength = Object.keys(drawToParse).length;

        /** parse draw numbers **/
        $.each(drawToParse, function (k, v) {
            s += v + ' - ';
        });
        // delete white space at the end
        s = s.trim();
        s = s.substr(0, s.length - 1);
        $td1.append(s);
        $tr.append($td1);
        s = '';

        /** parse draw stars **/
        $.each(drawStarsToParse, function (k, v) {
            s += v + ' - ';
        });
        // delete white space at the end
        s = s.trim();
        s = s.substr(0, s.length - 1);
        $td2.append(s);
        $tr.append($td2);
        s = '';


        /** parse uNumbers **/
        $.each(uNumbersToParse, function (k, v) {
            s += v + ' - ';
        });
        // delete white space at the end
        s = s.trim();
        s = s.substr(0, s.length - 1);
        $td3.append(s);
        $tr.append($td3);
        s = '';


        /** parse uStars **/
        $.each(uStarsToParse, function (k, v) {
            s += v + ' - ';
        });
        // delete white aspace at the end
        s = s.trim();
        s = s.substr(0, s.length - 1);
        $td4.append(s);
        $tr.append($td4);
        s = '';


        /** parse goodBalls **/
        $.each(goodBallsToParse, function (k, v) {
            s += v + ' - ';
        });
        // delete white aspace at the end
        s = s.trim();
        s = s.substr(0, s.length - 1);
        $td5.append(s);
        $tr.append($td5);
        s = '';


        /** parse goodStars **/
        $.each(goodStarsToParse, function (k, v) {
            s += v + ' - ';
        });
        // delete white aspace at the end
        s = s.trim();
        s = s.substr(0, s.length - 1);
        $td6.append(s);
        $tr.append($td6);
        s = '';

        //now I can append <tr> on <tbody>
        $tbody.append($tr);

    }

    $table.append($tbody);

    /** add style to table **/
    $table.addClass("table table-striped");
    return $table;

}

/** convert stars value 51 will be 1, 52 will be 2, . . . **/
function convertStarsValue(num) {
    switch (parseInt(num)) {

        case 51:
            num = 1;
            break;
        case 52:
            num = 2;
            break;
        case 53:
            num = 3;
            break;
        case 54:
            num = 4;
            break;
        case 55:
            num = 5;
            break;
        case 56:
            num = 6;
            break;
        case 57:
            num = 7;
            break;
        case 58:
            num = 8;
            break;
        case 59:
            num = 9;
            break;
        case 60:
            num = 10;
            break;
        case 61:
            num = 11;
            break;
    }
    return num;
}


/**
 * Replace stars value ex 51 will be 1, 52 will be 2
 */
function replaceStarsValue() {
    var $labelsCollect = $('label.btn');

    $labelsCollect.each(function (k) {
        /* balls or stars num */
        var num = $(this).html();
        if ($(this).html() >= 51 && $(this).html() <= 61) {
            num = convertStarsValue(num);
            $(this).html(num);
        }
    })
}

$(function () {
    //replaceStarsValue();
    /** form submit prevent default (it uses ajax to send data) **/
    $('form').on({
        submit: function () {
            return false;
        }
    });
    /** using http://www.bootstraptoggle.com/ **/
    var countBalls = 0; // how many balls are selected by user (min 6, max 10)
    var countStars = 0;


    var minBalls = 5; // user must select min 6 balls
    var maxBalls = 10; // user must select max 10 balls

    var minStars = 2;
    var maxStars = 11;

    var $allBalls = $('.ballsCheckBox'); // collection of Lotto balls
    var $allStars = $('.starsCheckBox');

    var selectedBalls = []; // value of user's selected balls ex:[4, 17, 22, 29, 36, 45]
    var selectedStars = [];

    var countGames;

    /** balls and stars config and style  **/
//    $('.toggle-on').each(function (k, v) {
//        k = convertStarsValue(k + 1);
//        $(this).html(k);
//
//    })
    
    $(':checkbox').each(function (k, v) {
        $(this).bootstrapToggle({
            on: (k + 1),
            off: (k + 1),
            //onstyle: 'success',
            //offstyle: 'danger',
        })
    })

    /** balls and stars config and style  **/
//    $('.toggle-off').each(function (k, v) {
//        k = convertStarsValue(k + 1);
//        $(this).html(k);
//        $(this).bootstrapToggle({
//            on: (k + 1),
//            off: (k + 1),
//            onstyle: 'success',
//            offstyle: 'danger',
//        })
//   })

    $('.ios').css({
        "border-radius": '25px'
    })

    /** disable form submit button **/
    $('#form_Simuler').attr('disabled', true);

    /** retrieves user selected balls **/
    $allBalls.each(function (k, v) {
        $(this).on({
            change: function () {
                var ball = parseInt($(this).val());
                //if ball already present in selectedBalls then remove it from that array
                if ($.inArray(ball, selectedBalls) != -1) {
                    $(this).attr('checked', false);
                    selectedBalls.splice(selectedBalls.indexOf(ball), 1);
                    countBalls--;

                    window.console.log("selectedBalls.length = " + selectedBalls.length);
                    window.console.log("selectedStars.length = " + selectedStars.length);

                    if (selectedBalls.length == 9) {
                        enableDisabled($allBalls);
                    }

                    if (selectedBalls.length == 4) {
                        $("#form_Simuler").attr('disabled', true);
                    }

                } else {
                    //if ball not present in selectedBalls array
                    $(this).attr('checked', true);
                    selectedBalls.push(parseInt(ball));
                    countBalls++;

                    window.console.log("selectedBalls.length = " + selectedBalls.length);
                    window.console.log("selectedStars.length = " + selectedStars.length);

                    if (selectedBalls.length >= 5 && selectedBalls.length <= 10 && selectedStars.length > 1) {
                        window.console.log("oui");
                        $("#form_Simuler").removeAttr('disabled');

                    }
                    if (selectedBalls.length >= 10) {
                        disableUnchecked($allBalls);
                    }
                }
            }
        })
    })

    /** retrieves user selected stars **/
    $allStars.each(function (k, v) {
        $(this).on({
            change: function () {
                var star = $(this).val();
                star = convertStarsValue(star);

                //if ball already present in selectedBalls then remove it from that array
                if ($.inArray(star, selectedStars) != -1) {
                    $(this).attr('checked', false);
                    selectedStars.splice(selectedStars.indexOf(star), 1);
                    countStars--;

                    window.console.log("selectedBalls.length = " + selectedBalls.length);
                    window.console.log("selectedStars.length = " + selectedStars.length);

                    if (selectedStars.length == 1) {
                        window.console.log("aaaaa");
                        $("#form_Simuler").attr('disabled', true);
                    }

                } else {
                    //if ball not present in selectedBalls array
                    $(this).attr('checked', true);
                    selectedStars.push(parseInt(star));
                    countStars++;

                    window.console.log("selectedBalls.length = " + selectedBalls.length);
                    window.console.log("selectedStars.length = " + selectedStars.length);

                    if (selectedBalls.length >= 5 && selectedBalls.length <= 10 && selectedStars.length > 1) {
                        window.console.log("zzz");
                        $("#form_Simuler").removeAttr('disabled');
                    }

                }
            }
        })
    })

    /** add eventListener on button sumbit to send ajax **/
    $('#form_Simuler').on({
        click: function (e) {
            e.preventDefault();
            countGames = $('#form_Nombre_de_tirages').val();
            window.console.log('ok japan !');
            if (countBalls >= 5 && countBalls <= 10 && countStars >= 2) {
                window.console.log('ok usa !');
                window.console.log(countGames);
                window.console.log(selectedBalls);
                window.console.log(selectedStars);
                /** retrives countGames before ajax process **/
                countGames = $('#form_Nombre_de_tirages').val();
                sendUNumbers(selectedBalls, selectedStars, countGames);
            }
        }
    })

});