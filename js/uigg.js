/*
 * uigg 2.0 (build 20210601)
 * Project: https://ui.gg
 * Author: http://www.mixice.com
 * Github: https://github.com/mixice/uigg
 */

//----------------------------------------------------------------------------------rem
(function(doc, win){
    var docElement = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function(){
        var viewWidth = docElement.clientWidth;
        if(viewWidth > 640){
            viewWidth = 640;
        }
        if(viewWidth < 320){
            viewWidth = 320;
        }
        docElement.style.fontSize = 100 * (viewWidth / 640) + 'px';
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);

//----------------------------------------------------------------------------------load
document.onreadystatechange = function(){
    if(document.readyState == "complete"){
        $('load').hide();
    }
};

//----------------------------------------------------------------------------------browser
$(function(){
    var OsObject=navigator.userAgent;
    if(OsObject.indexOf("MSIE") != -1 || OsObject.indexOf("Trident") != -1){
        $('body').html('<msie>please use another browser</msie>');
    }
    //else if(OsObject.indexOf("Chrome") != -1){}
    //else if(OsObject.indexOf("Firefox") != -1){}
    //else if(OsObject.indexOf("Safari") != -1){}
});

//----------------------------------------------------------------------------------music
$(function(){
    $('music').addClass('ico');
    $('music audio').attr('id','music');
    $('music audio').attr('autoplay','');
    $('music audio').attr('loop','');
    $('music').css('opacity','1');
    document.addEventListener('DOMContentLoaded',function(){
        function audioAutoPlay(){
            var audio = document.getElementById('music');
                audio.play();
            document.addEventListener("WeixinJSBridgeReady",function(){
                audio.play();
            }, false);
        }
        audioAutoPlay();
    });
    if($('music').hasClass('pause')){
        $('#music')[0].pause();
    };
    $('music').click(function(){
        if($(this).hasClass('pause')){
            $(this).removeClass('pause');
            $('#music')[0].play();
        }else{
            $(this).addClass('pause');
            $('#music')[0].pause();
        }
    });
});

//----------------------------------------------------------------------------------fullscreen
$(document).on("click",".fullscreen", function toggleFullScreen() {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
    }
});
$(function(){
    $('.fullscreen').addClass('ico');
    $('.fullscreen').click(function(){
        $(this).toggleClass('active');
    });
});

//----------------------------------------------------------------------------------touch
jQuery.fn.bindmove = function(newdirect,newfn) {
    $(this).on("touchstart", function(e) {
        if (e.cancelable) {
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
        });
        $(this).on("touchend", function(e) {
            if (e.cancelable) {
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;
        console.log(X,Y,newdirect);
        if((X != 0 || Y != 0) && newdirect=='touchall'){
            eval(newfn); return;
        }
        if ( X > 30  && newdirect=='touchright') {
            eval(newfn); return;
        }
        else if ( X < -30  && newdirect=='touchleft') {
            eval(newfn); return;
        }
        else if ( Y > 30 && newdirect=='touchdown') {
            eval(newfn); return;
        }
        else if ( Y < -30  && newdirect=='touchup') {
            console.log(newfn);
            eval(newfn); return;
        }
    });
};

//----------------------------------------------------------------------------------swiper
$(function(){
    $('.swiper-button-next').addClass('ico ico-alone-right');
    $('.swiper-button-prev').addClass('ico ico-alone-left');
    $('.lug-thumbs a').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
});
//swiper-animate 1.03 from the www.swiper.com.cn
function swiperAnimateCache(a){
	for (j = 0; j < a.slides.length; j++) for (allBoxes = a.slides[j].querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++) allBoxes[i].attributes["style"] ? allBoxes[i].setAttribute("swiper-animate-style-cache", allBoxes[i].attributes["style"].value) : allBoxes[i].setAttribute("swiper-animate-style-cache", " "),
	allBoxes[i].style.visibility = "hidden"
};
function swiperAnimate(a){
	clearSwiperAnimate(a);
	var b = a.slides[a.activeIndex].querySelectorAll(".ani");
	for (i = 0; i < b.length; i++) b[i].style.visibility = "visible",
	effect = b[i].attributes["swiper-animate-effect"] ? b[i].attributes["swiper-animate-effect"].value: "",
	b[i].className = b[i].className + "  " + effect + " ",
	style = b[i].attributes["style"].value,
	duration = b[i].attributes["swiper-animate-duration"] ? b[i].attributes["swiper-animate-duration"].value: "",
	duration && (style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";"),
	delay = b[i].attributes["swiper-animate-delay"] ? b[i].attributes["swiper-animate-delay"].value: "",
	delay && (style = style + "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";"),
	b[i].setAttribute("style", style)
};
function clearSwiperAnimate(a){
	for (j = 0; j < a.slides.length; j++) for (allBoxes = a.slides[j].querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++) allBoxes[i].attributes["swiper-animate-style-cache"] && allBoxes[i].setAttribute("style", allBoxes[i].attributes["swiper-animate-style-cache"].value),
	allBoxes[i].style.visibility = "hidden",
	allBoxes[i].className = allBoxes[i].className.replace("", ""),
	allBoxes[i].attributes["swiper-animate-effect"] && (effect = allBoxes[i].attributes["swiper-animate-effect"].value, allBoxes[i].className = allBoxes[i].className.replace(effect, " "))
};

//----------------------------------------------------------------------------------title
function browserTitle(){
    var originTitile = document.title;
    var titleTime;
    document.addEventListener('visibilitychange', function(){
        if (document.hidden){
            document.title = 'Google';
            clearTimeout(titleTime);
        }else{
            document.title = 'Google';
            titleTime = setTimeout(function(){
                document.title = originTitile;
            }, 100);
        }
    });
};

//----------------------------------------------------------------------------------random
$(function(){
    $('[src~="uigg-img"]').each(function(){
        $(this).attr('src','https://ui.gg/lib/images/img?=' + Math.floor(Math.random() * 100));
    });
    $('[src~="uigg-product"]').each(function(){
        $(this).attr('src','https://ui.gg/lib/images/product?=' + Math.floor(Math.random() * 100));
    });
    $('[src~="uigg-bg"]').each(function(){
        $(this).attr('src','https://ui.gg/lib/images/bg?=' + Math.floor(Math.random() * 100));
    });
    $('[src~="uigg-avatar"]').each(function(){$(this).attr('src','https://ui.gg/lib/images/avatar?=' + Math.floor(Math.random() * 100));
    });
    $('[style~="uigg-img"]').each(function(){
        $(this).attr('style','background-image: url(https://ui.gg/lib/images/img?=' + Math.floor(Math.random() * 100) +');');
    });
    $('[style~="uigg-product"]').each(function(){
        $(this).attr('style','background-image: url(https://ui.gg/lib/images/product?=' + Math.floor(Math.random() * 100) +');');
    });
    $('[style~="uigg-bg"]').each(function(){
        $(this).attr('style','background-image: url(https://ui.gg/lib/images/bg?=' + Math.floor(Math.random() * 100) +');');
    });
    $('[style~="uigg-avatar"]').each(function(){
        $(this).attr('style','background-image: url(https://ui.gg/lib/images/avatar?=' + Math.floor(Math.random() * 100) +');');
    });
    $('uigg-title').each(function(){
        var len = 10;
        var rnd = Math.floor(Math.random() * len);
        var txt = new Array(len);
        txt[0]='Lorem ipsum dolor sit amet consectetur adipisicing elit';
        txt[1]='Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
        txt[2]='Ut enim ad minim veniam';
        txt[3]='Quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat';
        txt[4]='Duis aute irure dolor in reprehenderit in voluptate';
        txt[5]='Velit esse cillum dolore eu fugiat';
        txt[6]='Excepteur sint occaecat cupidatat non proident';
        txt[7]='Sunt in culpa qui officia deserunt mollit anim id est laborum';
        txt[8]='Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium';
        txt[9]='Totam rem aperiam eaque ipsa quae ab illo inventore veritatis enim';
        $(this).append(txt[rnd]);
    });
    $('uigg-txt').append('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.');
});

//----------------------------------------------------------------------------------disable
//Disable right click menu
function disable() {
    document.oncontextmenu = function (event) {
        if (window.event) {
            event = window.event;
        }
        try {
            var the = Event.srcElement;
            if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }
    //Disable Ctrl+U
    var arr = [123, 17, 18];
    document.oncontextmenu = new Function("event.returnValue=false;"),

        window.onkeydown = function (e) {
            var keyCode = e.keyCode || e.which || e.charCode;
            var ctrlKey = e.ctrlKey || e.metaKey;
            console.log(keyCode + "--" + keyCode);
            if (ctrlKey && keyCode == 85) {
                e.preventDefault();
            }
            if (arr.indexOf(keyCode) > -1) {
                e.preventDefault();
            }
        }
    //Disable F12
    document.onkeydown = function (event) {
        if (KeyboardEvent.keyCode == 123) {
            return false;
        }
    }
    window.onhelp = function () {
        return false;
    }
};

//----------------------------------------------------------------------------------smooth
$(function(){
    $('.smooth').click(function(){
        $('html,body').animate({scrollTop: ($($(this).attr('href')).offset().top -0)},1000);
    });
});

//----------------------------------------------------------------------------------return
$(function(){
    $('.return').click(function(){
        history.back(-1);
    });
});

//----------------------------------------------------------------------------------anew
$(function(){
    $('.anew.btn').addClass('ico ico-alone-top');
    $('.anew').click(function(){
		$('html,body').animate({scrollTop:'0px'},800);
	});
    $(document).scroll(function(){
        var winTop = $(window).scrollTop();
        var winHeight = $(window).height();
        if(winTop > winHeight){
            $('.anew').css('opacity','1');
        }else{
            $('.anew').css('opacity','0');
        };
    });
});

//----------------------------------------------------------------------------------tab
$(function(){
    $('tab-group').addClass('anime-fade-in');
    $('tab-list li').click(function(){
        tabIndex = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().next().children().eq(tabIndex).addClass('active').siblings().removeClass('active');
    });
});

//----------------------------------------------------------------------------------pop
$(function(){
    $('pop-main,pop-choice,pop-sider').before('<x></x>');
    $('pop').addClass('anime-fade-in');
    $('pop-main').wrap('<div class="full center"></div>');
    $('pop-main').addClass('anime-zoom-in');
    $('pop-choice').addClass('anime-fade-in-up');
    $('pop-title .close').addClass('ico');
    $('pop .close, pop x').click(function(){
        $(this).parents('pop').hide();
    });
});

//----------------------------------------------------------------------------------menu
$(function(){
    $('menu').append('<x class="ico"></x>');
    $('menu x').click(function(){
        $('menu-cont').toggle();
    });
    $('menu-cont,menu-group').addClass('anime-fade-in');
    $('menu-cont li').click(function(){
        var menuGroup = $(this).children('menu-group');
        if(menuGroup.css('display') == 'block'){
            menuGroup.hide();
        }else{
            $('menu-group').hide();
            menuGroup.show();
        };
    });
});

//----------------------------------------------------------------------------------switch
$(function(){
    $('.checkbox,.checkbox-done,.checkbox-cancel,.favorite,.star,.visibility,.mic,.volume,.muzak,.phonecard,.telecamera,.camera,.aim,.semaphore,.suitcase,.toggle').click(function(){
        $(this).toggleClass('active');
    });
    $(document).on('click','.radio,.radio-done',function(){
        $(this).parent().parent().parent().find('.radio,.radio-done').removeClass('active');
        $(this).addClass('active');
    });
    $('.checkbox-all').click(function(){
        if($(this).hasClass('active')){
            $(this).parent().parent().parent().parent().find('.checkbox,.checkbox-done').addClass('active');
        }else{
            $(this).parent().parent().parent().parent().find('.checkbox,.checkbox-done').removeClass('active');
        }
    });
});

//----------------------------------------------------------------------------------scaler
$(function(){
    $('scaler input').before('<a class="btn ico ico-reduce"></a>');
    $('scaler input').after('<a class="btn ico ico-add"></a>');
    $('scaler .ico-add').click(function(){
        var calcInput = $(this).siblings('input');
        calcInput.val(parseInt(calcInput.val()) + 1);
    });
    $('scaler .ico-reduce').click(function(){
        var calcInput = $(this).siblings('input');
        if(calcInput.val() > 0){
            calcInput.val(parseInt(calcInput.val()) - 1);
        }
    });
});

//----------------------------------------------------------------------------------upload
$(function(){
    $('.upload-add').click(function(){
        $(this).before('<div class="ico upload-group"><input type="file"><x class="ico"></x></div>');
        uploadImg();
    });
    $(document).on('click','.upload-group x',function(){
        $(this).parent().remove();
    });
    function uploadImg(){
        $('.upload-group input').on('change', function(){
            var imgValue = $(this).val(),
            fileFormat = imgValue.substring(imgValue.lastIndexOf(".")).toLowerCase(),
            windowURL = window.URL || window.webkitURL,
            imgUrl = window.URL.createObjectURL(this.files[0]);
            if(!fileFormat.match(/.png|.jpg|.jpeg|.svg|.webp/)){
                alert('File format must be: png/jpg/jpeg/svg/webp');
                return;
            }else{
                $(this).parent().attr('style','background-image:url('+ imgUrl+');');
            };
            $(this).parent().css('color','transparent');
        });
    };
    uploadImg();
});

//----------------------------------------------------------------------------------tip
$(function(){
    $('tip').addClass('anime-zoom-in');
    var tipHeight = $('tip').height();
    var tipWidth = $('tip').width();
    $('tip').css('margin-top', -tipHeight/2-11 + 'px');
    $('tip').css('margin-left', -tipWidth/2-20 + 'px');
    $('html').click(function(){
        setTimeout(function(){
             $('tip').hide();
        },2000);
    });
});

//----------------------------------------------------------------------------------drop
$(function(){
    $('drop').append('<i class="ico ico-alone-bottom"></i><drop-cont></drop-cont>');
    var dropFirst = $(this).find('drop-list li').html();
    $(this).find('drop-cont').html(dropFirst);
    $('drop-cont').click(function(){
        $(this).parent().toggleClass('active');
    });
    $('drop-list').addClass('anime-fade-in');
    $('drop-list li:first').before('<x></x>');
    $('drop-list li').click(function(){
        var dropFirst = $(this).html();
        $(this).parents('drop').find('drop-cont').html(dropFirst);
        $(this).parents('drop').removeClass('active');
    });
    $('drop x').click(function(){
        $(this).parents('drop').removeClass('active');
    });
});

//----------------------------------------------------------------------------------alone
var alone;
$(function(){
    $(alone).each(function(){
        txt = $(this).html();
        aloneEl = txt.match(/./g);
        element = '';
        for (var i = 0; i < aloneEl.length; i++){
            word = aloneEl[i];
            element += '<z>' + word + '</z>';
         }
         $(this).html(element);
    });
});

//----------------------------------------------------------------------------------rate
$(function(){
    $('rate').html('<i></i><i></i><i></i><i></i><i></i>');
    $('rate i').addClass('ico ico-star');
    $('rate.edit i').click(function(){
        $(this).siblings().removeClass('active');
        $(this).prevAll().addClass('active');
        $(this).addClass('active');
    });
});

//----------------------------------------------------------------------------------name
$(function(){
    $('name').addClass('anime-fade-in-down');
    $('name-search').append('<i class="ico ico-search"></i>');
});

//----------------------------------------------------------------------------------nav
$(function(){
    $('nav').before('<space></space>');
    $('nav').addClass('anime-fade-in-up');
});

//----------------------------------------------------------------------------------
$(function(){

});

//----------------------------------------------------------------------------------calendar
(function (root, factory)
{'use strict';
    var moment;
    if (typeof exports === 'object') {
        try { moment = require('moment'); } catch (e) {}
        module.exports = factory(moment);
    } else if (typeof define === 'function' && define.amd) {
        define(function (req){
            var id = 'moment';
            moment = req.defined && req.defined(id) ? req(id) : undefined;
            return factory(moment);
        });
    } else {
        root.calendarday = factory(root.moment);
    }
}(this, function (moment)
{'use strict';
    var hasMoment = typeof moment === 'function',
    hasEventListeners = !!window.addEventListener,
    document = window.document,
    sto = window.setTimeout,
    addEvent = function(el, e, callback, capture){
        if (hasEventListeners) {
            el.addEventListener(e, callback, !!capture);
        } else {
            el.attachEvent('on' + e, callback);
        }
    },
    removeEvent = function(el, e, callback, capture){
        if (hasEventListeners) {
            el.removeEventListener(e, callback, !!capture);
        } else {
            el.detachEvent('on' + e, callback);
        }
    },
    fireEvent = function(el, eventName, data){
        var ev;
        if (document.createEvent) {
            ev = document.createEvent('HTMLEvents');
            ev.initEvent(eventName, true, false);
            ev = extend(ev, data);
            el.dispatchEvent(ev);
        } else if (document.createEventObject) {
            ev = document.createEventObject();
            ev = extend(ev, data);
            el.fireEvent('on' + eventName, ev);
        }
    },
    trim = function(str)
    {return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');},
    hasClass = function(el, cn)
    {return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;},
    addClass = function(el, cn)
    {if (!hasClass(el, cn)) {el.className = (el.className === '') ? cn : el.className + ' ' + cn;}},
    removeClass = function(el, cn)
    {el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));},
    isArray = function(obj)
    {return (/Array/).test(Object.prototype.toString.call(obj));},
    isDate = function(obj)
    {return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());},
    isLeapYear = function(year)
    {return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;},
    getDaysInMonth = function(year, month)
    {return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];},
    setToStartOfDay = function(date)
    {if (isDate(date)) date.setHours(0,0,0,0);},
    compareDates = function(a,b)
    {return a.getTime() === b.getTime();},
    extend = function(to, from, overwrite){
        var prop, hasProp;
        for (prop in from) {
            hasProp = to[prop] !== undefined;
            if (hasProp && typeof from[prop] === 'object' && from[prop].nodeName === undefined) {
                if (isDate(from[prop])) {
                    if (overwrite) {
                        to[prop] = new Date(from[prop].getTime());
                    }
                }
                else if (isArray(from[prop])) {
                    if (overwrite) {
                        to[prop] = from[prop].slice(0);
                    }
                } else {
                    to[prop] = extend({}, from[prop], overwrite);
                }
            } else if (overwrite || !hasProp) {
                to[prop] = from[prop];
            }
        }
        return to;
    },
    defaults = {
        field: null,
        bound: undefined,
        format: 'YYYY-MM-DD',
        defaultDate: null,
        setDefaultDate: false,
        firstDay: 0,
        minDate: null,
        maxDate: null,
        yearRange: 10,
        minYear: 0,
        maxYear: 9999,
        minMonth: 1,
        maxMonth: 12,
        isRTL: false,
        yearSuffix: '年',
        showMonthAfterYear: true,
        numberOfMonths: 1,
        i18n: {
            previousMonth : '&#xe710',
            nextMonth     : '&#xe718',
            months        : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            weekdaysShort : ['日','一','二','三','四','五','六']
        },
        onSelect: null,
        onOpen: null,
        onClose: null,
        onDraw: null
    },
    renderDayName = function(opts, day, abbr){
        day += opts.firstDay;
        while (day >= 7) {
            day -= 7;
        }
        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    },
    renderDay = function(i, isSelected, isToday, isDisabled, isEmpty){
        if (isEmpty) {
            return '<td class="is-empty"></td>';
        }
        var arr = [];
        if (isDisabled) {
            arr.push('is-disabled');
        }
        if (isToday) {
            arr.push('is-today');
        }
        if (isSelected) {
            arr.push('is-selected');
        }
        return '<td data-day="' + i + '" class="' + arr.join(' ') + '"><button class="calendar-button" type="button">' + i + '</button>' + '</td>';
    },
    renderRow = function(days, isRTL)
    {return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';},
    renderBody = function(rows)
    {return '<tbody>' + rows.join('') + '</tbody>';},
    renderHead = function(opts){
        var i, arr = [];
        for (i = 0; i < 7; i++) {
            arr.push('<th scope="col"><span title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</span></th>');
        }
        return '<thead>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</thead>';
    },
    renderTitle = function(instance){
        var i, j, arr,
            opts = instance._o,
            month = instance._m,
            year  = instance._y,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div class="calendar-title">',
            monthHtml,
            yearHtml,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
            arr.push('<option value="' + i + '"' +
                (i === month ? ' selected': '') +
                ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled' : '') + '>' +
                opts.i18n.months[i] + '</option>');
        }
        monthHtml = '<div class="calendar-label">' + opts.i18n.months[month] + '<select class="calendar-select calendar-select-month">' + arr.join('') + '</select></div>';

        if (isArray(opts.yearRange)) {
            i = opts.yearRange[0];
            j = opts.yearRange[1] + 1;
        } else {
            i = year - opts.yearRange;
            j = 1 + year + opts.yearRange;
        }
        for (arr = []; i < j && i <= opts.maxYear; i++) {
            if (i >= opts.minYear) {
                arr.push('<option value="' + i + '"' + (i === year ? ' selected': '') + '>' + (i) + '</option>');
            }
        }
        yearHtml = '<div class="calendar-label">' + year + opts.yearSuffix + '<select class="calendar-select calendar-select-year">' + arr.join('') + '</select></div>';

        if (opts.showMonthAfterYear) {
            html += yearHtml + monthHtml;
        } else {
            html += monthHtml + yearHtml;
        }
        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
            prev = false;
        }
        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
            next = false;
        }
        html += '<button class="calendar-prev ico' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
        html += '<button class="calendar-next ico' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';

        return html += '</div>';
    },
    renderTable = function(opts, data){
        return '<table class="calendar-table">' + renderHead(opts) + renderBody(data) + '</table>';
    },
    calendarday = function(options){
        var self = this,
            opts = self.config(options);
        self._onMouseDown = function(e){
            if (!self._v) {
                return;
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (!hasClass(target, 'is-disabled')) {
                if (hasClass(target, 'calendar-button') && !hasClass(target, 'is-empty')) {
                    self.setDate(new Date(self._y, self._m, parseInt(target.innerHTML, 10)));
                    if (opts.bound) {
                        sto(function() {
                            self.hide();
                        }, 100);
                    }
                    return;
                }
                else if (hasClass(target, 'calendar-prev')) {
                    self.prevMonth();
                }
                else if (hasClass(target, 'calendar-next')) {
                    self.nextMonth();
                }
            }
            if (!hasClass(target, 'calendar-select')) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                    return false;
                }
            } else {
                self._c = true;
            }
        };
        self._onChange = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (hasClass(target, 'calendar-select-month')) {
                self.gotoMonth(target.value);
            }
            else if (hasClass(target, 'calendar-select-year')) {
                self.gotoYear(target.value);
            }
        };
        self._onInputChange = function(e){
            var date;

            if (e.firedBy === self) {
                return;
            }
            if (hasMoment) {
                date = moment(opts.field.value, opts.format);
                date = (date && date.isValid()) ? date.toDate() : null;
            }
            else {
                date = new Date(Date.parse(opts.field.value));
            }
            self.setDate(isDate(date) ? date : null);
            if (!self._v) {
                self.show();
            }
        };
        self._onInputFocus = function(){
            self.show();
        };
        self._onInputClick = function(){
            self.show();
        };
        self._onInputBlur = function(){
            if (!self._c) {
                self._b = sto(function() {
                    self.hide();
                }, 50);
            }
            self._c = false;
        };
        self._onClick = function(e){
            e = e || window.event;
            var target = e.target || e.srcElement,
                pEl = target;
            if (!target) {
                return;
            }
            if (!hasEventListeners && hasClass(target, 'calendar-select')) {
                if (!target.onchange) {
                    target.setAttribute('onchange', 'return;');
                    addEvent(target, 'change', self._onChange);
                }
            }
            do {
                if (hasClass(pEl, 'calendar-single')) {
                    return;
                }
            }
            while ((pEl = pEl.parentNode));
            if (self._v && target !== opts.trigger) {
                self.hide();
            }
        };

        self.el = document.createElement('div');
        self.el.className = 'calendar-single anime-fade-in' + (opts.isRTL ? ' is-rtl' : '');
        addEvent(self.el, 'mousedown', self._onMouseDown, true);
        addEvent(self.el, 'change', self._onChange);

        if (opts.field) {
            if (opts.bound) {
                document.body.appendChild(self.el);
            } else {
                opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
            }
            addEvent(opts.field, 'change', self._onInputChange);

            if (!opts.defaultDate) {
                if (hasMoment && opts.field.value) {
                    opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                } else {
                    opts.defaultDate = new Date(Date.parse(opts.field.value));
                }
                opts.setDefaultDate = true;
            }
        }
        var defDate = opts.defaultDate;

        if (isDate(defDate)) {
            if (opts.setDefaultDate) {
                self.setDate(defDate, true);
            } else {
                self.gotoDate(defDate);
            }
        } else {
            self.gotoDate(new Date());
        }
        if (opts.bound) {
            this.hide();
            self.el.className += ' is-bound';
            addEvent(opts.trigger, 'click', self._onInputClick);
            addEvent(opts.trigger, 'focus', self._onInputFocus);
            addEvent(opts.trigger, 'blur', self._onInputBlur);
        } else {
            this.show();
        }
    };
    calendarday.prototype = {
        config: function(options){
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }
            var opts = extend(this._o, options, true);
            opts.isRTL = !!opts.isRTL;
            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;
            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);
            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;
            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;
            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                setToStartOfDay(opts.minDate);
                opts.minYear  = opts.minDate.getFullYear();
                opts.minMonth = opts.minDate.getMonth();
            }
            if (opts.maxDate) {
                setToStartOfDay(opts.maxDate);
                opts.maxYear  = opts.maxDate.getFullYear();
                opts.maxMonth = opts.maxDate.getMonth();
            }
            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }
            return opts;
        },
        toString: function(format){
            return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString();
        },
        getMoment: function(){
            return hasMoment ? moment(this._d) : null;
        },
        setMoment: function(date){
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate());
            }
        },
        getDate: function(){
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },
        setDate: function(date, preventOnSelect){
            if (!date) {
                this._d = null;
                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }
            var min = this._o.minDate,
                max = this._o.maxDate;
            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }
            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                //this._o.field.value = this.toString();
                var datestr = this.getDate();
                this._o.field.value=datestr.getFullYear().toString() +'-'+(datestr.getMonth()+1).toString() +'-'+datestr.getDate().toString();
                //-------------------------------------------------------------------Custom date format
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },
        gotoDate: function(date){
            if (!isDate(date)) {
                return;
            }
            this._y = date.getFullYear();
            this._m = date.getMonth();
            this.draw();
        },
        gotoToday: function(){
            this.gotoDate(new Date());
        },
        gotoMonth: function(month){
            if (!isNaN( (month = parseInt(month, 10)) )) {
                this._m = month < 0 ? 0 : month > 11 ? 11 : month;
                this.draw();
            }
        },
        nextMonth: function(){
            if (++this._m > 11) {
                this._m = 0;
                this._y++;
            }
            this.draw();
        },
        prevMonth: function(){
            if (--this._m < 0) {
                this._m = 11;
                this._y--;
            }
            this.draw();
        },
        gotoYear: function(year){
            if (!isNaN(year)) {
                this._y = parseInt(year, 10);
                this.draw();
            }
        },
        setMinDate: function(value){
            this._o.minDate = value;
        },
        setMaxDate: function(value){
            this._o.maxDate = value;
        },
        draw: function(force){
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
                minYear = opts.minYear,
                maxYear = opts.maxYear,
                minMonth = opts.minMonth,
                maxMonth = opts.maxMonth;

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }
            this.el.innerHTML = renderTitle(this) + this.render(this._y, this._m);
            if (opts.bound) {
                this.adjustPosition();
                if(opts.field.type !== 'hidden') {
                    sto(function() {
                        opts.trigger.focus();
                    }, 1);
                }
            }
            if (typeof this._o.onDraw === 'function') {
                var self = this;
                sto(function() {
                    self._o.onDraw.call(self);
                }, 0);
            }
        },
        adjustPosition: function(){
            var field = this._o.trigger, pEl = field,
            width = this.el.offsetWidth, height = this.el.offsetHeight,
            viewportWidth = window.innerWidth || document.documentElement.clientWidth,
            viewportHeight = window.innerHeight || document.documentElement.clientHeight,
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
            left, top, clientRect;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top  = pEl.offsetTop + pEl.offsetHeight;
                while((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top  += pEl.offsetTop;
                }
            }
            if (left + width > viewportWidth) {
                left = left - width + field.offsetWidth;
            }
            if (top + height > viewportHeight + scrollTop) {
                top = top - height - field.offsetHeight;
            }
            this.el.style.cssText = 'position:absolute;left:' + left + 'px;top:' + top + 'px;';
        },
        render: function(year, month){
            var opts   = this._o,
                now    = new Date(),
                days   = getDaysInMonth(year, month),
                before = new Date(year, month, 1).getDay(),
                data   = [],
                row    = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var cells = days + before,
                after = cells;
            while(after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            for (var i = 0, r = 0; i < cells; i++){
                var day = new Date(year, month, 1 + (i - before)),
                    isDisabled = (opts.minDate && day < opts.minDate) || (opts.maxDate && day > opts.maxDate),
                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                    isToday = compareDates(day, now),
                    isEmpty = i < before || i >= (days + before);

                row.push(renderDay(1 + (i - before), isSelected, isToday, isDisabled, isEmpty));

                if (++r === 7) {
                    data.push(renderRow(row, opts.isRTL));
                    row = [];
                    r = 0;
                }
            }
            return renderTable(opts, data);
        },
        isVisible: function(){
            return this._v;
        },
        show: function(){
            if (!this._v) {
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                }
                removeClass(this.el, 'is-hidden');
                this._v = true;
                this.draw();
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },
        hide: function(){
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.cssText = '';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },
        destroy: function(){
            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (this._o.field) {
                removeEvent(this._o.field, 'change', this._onInputChange);
                if (this._o.bound) {
                    removeEvent(this._o.trigger, 'click', this._onInputClick);
                    removeEvent(this._o.trigger, 'focus', this._onInputFocus);
                    removeEvent(this._o.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }
    };
    return calendarday;
}));
$(function(){
    var picker = new Array();
    $('.calendar').each(function(index,el){
        picker[index]=new calendarday({
            field:el,
            firstDay: 1,
            minDate: new Date('1900-01-01'),
            maxDate: new Date('2030-12-31'),
            yearRange: [1900,2030]
        });
    });
});







