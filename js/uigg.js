/*
 * uigg 2.5 (build 20230225)
 * Project: https://ui.gg
 * Author: https://www.mixice.com
 * Github: https://github.com/mixice/uigg
 * license: MIT
 */

//----------------------------------------------------------------------------------preset
console.log('%c  POWERED BY UIGG  ','background:#6c62f9;color:white;border-radius:10px','http://ui.gg')
$(function(){
    $('[hide]').hide()
    $('[show]').show()
});

//----------------------------------------------------------------------------------rem
(function(doc, win){
    let docElement = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function(){
            let viewWidth = docElement.clientWidth
            if(viewWidth > 640) viewWidth = 640
            if(viewWidth < 320) viewWidth = 320
            docElement.style.fontSize = 100 * (viewWidth / 640) + 'px'
        }
    recalc()
    if(!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
})(document, window);

//----------------------------------------------------------------------------------load
onload = () => $('load').hide()
setTimeout(() => $('load').hide(),6000);

//----------------------------------------------------------------------------------browser
let userAgent = JSON.stringify(navigator.userAgent)
if(userAgent.indexOf('MSIE') != -1 || userAgent.indexOf('Trident') != -1) $(function(){$('body').html('<msie>please use another browser</msie>')});

//----------------------------------------------------------------------------------music
$(function(){
    $('music').addClass('ico').find('audio').attr('id','music').attr('autoplay','').attr('loop','')
    if($('music').attr('pause') == '') $('#music')[0].pause()
    $('music').click(function(){
        $(this).attr('pause') == '' ? $(this).removeAttr('pause').find('#music')[0].play() : $(this).attr('pause','').find('#music')[0].pause()
    })
    document.addEventListener('DOMContentLoaded',function(){
        function audioAutoPlay(){
            let audio = document.getElementById('music')
            audio.play()
            document.addEventListener('WeixinJSBridgeReady',function(){audio.play()},false)
        }
        audioAutoPlay()
    })
});
//----------------------------------------------------------------------------------fullscreen
$(document).on('click','.fullscreen', function toggleFullScreen(){
    if(document.fullscreenElement !== undefined && document.fullscreenElement === null){
        if(document.documentElement.requestFullscreen) document.documentElement.requestFullscreen()}
    else{if(document.cancelFullScreen) document.cancelFullScreen()
        else if(document.mozCancelFullScreen) document.mozCancelFullScreen()
        else if(document.webkitCancelFullScreen) document.webkitCancelFullScreen()
    }
})
$(function(){
    $('.fullscreen').addClass('ico')
    $('.fullscreen').click(function(){$(this).toggleClass('active')})
});

//----------------------------------------------------------------------------------touch
$.fn.bindmove = function(newdirect,newfn){
    $(this).on('touchstart', function(e){
        if(e.cancelable){if(!e.defaultPrevented) e.preventDefault()}
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY
    })
    $(this).on('touchend', function(e){
        if(e.cancelable){if(!e.defaultPrevented) e.preventDefault()}
        moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY
        if((X != 0 || Y != 0) && newdirect=='touchall'){eval(newfn);return}
        if( X > 30  && newdirect=='touchright'){eval(newfn);return}
        else if( X < -30  && newdirect=='touchleft'){eval(newfn);return}
        else if( Y > 30 && newdirect=='touchdown'){eval(newfn);return}
        else if( Y < -30  && newdirect=='touchup'){eval(newfn);return}
    })
};

//----------------------------------------------------------------------------------swiper
$(function(){
    $('.swiper-button-next').addClass('ico ico-alone-right')
    $('.swiper-button-prev').addClass('ico ico-alone-left')
})
function lug(){
    $('.lug-thumbs a').click(function(){$(this).addClass('active').siblings().removeClass('active')})
    var swiperLug = new Swiper('.lug-top',{
        on: {
            touchEnd: function(swiper,event){
                let swiperIndex = $('.lug-top .swiper-slide-active').index()
                $('.lug-thumbs a').eq(swiperIndex).addClass('active').siblings().removeClass('active')
            },
        },
    })
};

//----------------------------------------------------------------------------------random
$(function(){
    $('img[uigg="bg"]').each(function(){if(!$(this).attr('src')) $(this).attr('src','//ui.gg/lib/images/bg?=' + Math.round(Math.random() * 100))})
    $('img[uigg="img"]').each(function(){if(!$(this).attr('src')) $(this).attr('src','//ui.gg/lib/images/img?=' + Math.round(Math.random() * 100))})
    $('img[uigg="product"]').each(function(){if(!$(this).attr('src')) $(this).attr('src','//ui.gg/lib/images/product?=' + Math.round(Math.random() * 100))})
    $('img[uigg="avatar"]').each(function(){if(!$(this).attr('src')) $(this).attr('src','//ui.gg/lib/images/avatar?=' + Math.round(Math.random() * 100))})

    $('[uigg="bg"]:not(img)').each(function(){if($(this).css('background-image') == 'none'){$(this).css('background-image','url(//ui.gg/lib/images/bg?=' + Math.round(Math.random() * 100) + ')')}})
    $('[uigg="img"]:not(img)').each(function(){if($(this).css('background-image') == 'none'){$(this).css('background-image','url(//ui.gg/lib/images/img?=' + Math.round(Math.random() * 100) + ')')}})
    $('[uigg="product"]:not(img)').each(function(){if($(this).css('background-image') == 'none'){$(this).css('background-image','url(//ui.gg/lib/images/product?=' + Math.round(Math.random() * 100) + ')')}})
    $('[uigg="avatar"]:not(img)').each(function(){if($(this).css('background-image') == 'none'){$(this).css('background-image','url(//ui.gg/lib/images/avatar?=' + Math.round(Math.random() * 100) + ')')}})
    $('[uigg="color"]').each(function(){$(this).css('background-color','rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')')})

    let sentence = [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit ',
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ',
        'Ut enim ad minim veniam, quis nostrud exercitation ',
        'Ullamco laboris nisi ut aliquip ex ea commodo consequat ',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ',
        'Ugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident ',
        'Sunt in culpa qui officia deserunt mollit anim id est laborum ',
        'Sed ut perspiciatis unde omnis iste natus error sit ',
        'voluptatem accusantium doloremque laudantium, totam rem aperiam ',
        'eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae '
    ]
    if(!$('[uigg="txt"]').attr('lang') && !$('[uigg="txt"]').html()) $('[uigg="txt"]').append(sentence)
    $('[uigg="title"]').each(function(){if(!$(this).attr('lang') && !$(this).html()) $(this).append(sentence[Math.round(Math.random() * (sentence.length - 1))])})

    let arr = new Array()
    for(let i = 1;i <= 100;i++){arr[i] = i
        $('[uigg="emot"]').append('<s style="background-image: url(//ui.gg/lib/emot/' + i + '.svg)"></s>')
    }
});

//----------------------------------------------------------------------------------disable
//disable right click menu
function disable(){
    document.oncontextmenu = function(event){
        if(window.event) event = window.event
        try {let the = Event.srcElement
            if(!((the.tagName == 'INPUT' && the.type.toLowerCase() == 'text') || the.tagName == 'TEXTAREA')){return false}
            return true
        }catch (e){return false}
    }
    //disable Ctrl+U
    let arr = [123, 17, 18]
    document.oncontextmenu = new Function('event.returnValue=false'),
        window.onkeydown = function(e){
            let keyCode = e.keyCode || e.which || e.charCode,
                ctrlKey = e.ctrlKey || e.metaKey
            if(ctrlKey && keyCode == 85) e.preventDefault()
            if(ctrlKey && keyCode == 83) e.preventDefault()
            if(arr.indexOf(keyCode) > -1) e.preventDefault()
        }
    //disable F12
    document.onkeydown = function (event){if(KeyboardEvent.keyCode == 123){return false}}
    window.onhelp = function(){return false}
};

//----------------------------------------------------------------------------------smooth
$(function(){
    $('.smooth').click(function(){$('html,body').animate({scrollTop: ($($(this).attr('href')).offset().top - 0)},1000)})
});

//----------------------------------------------------------------------------------return
$(function(){
    $('.return').click(function(){history.back(-1)})
});

//----------------------------------------------------------------------------------top
$(function(){
    $('.top.btn').addClass('ico ico-alone-top')
    $('.top').click(function(){$('html,body').animate({scrollTop:'0px'},1000)})
    $(document).scroll(function(){$(window).scrollTop() > $(window).height() ? $('.top').css('opacity','1') : $('.top').css('opacity','0')})
});

//----------------------------------------------------------------------------------tab
$(function(){
    $('tab-group').addClass('anime-fade-in')
    $('tab-list li').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
        $(this).parent().next().children().eq($(this).index()).addClass('active').siblings().removeClass('active')
    })
});

//----------------------------------------------------------------------------------pop
$(function(){
    $('pop').addClass('anime-fade-in').append('<x></x>')
    $('pop-main').addClass('anime-zoom-in').wrap('<div class="full center"></div>')
    $('pop-choice').addClass('anime-fade-in-up')
    $('pop-title .close').addClass('ico')
    $('pop .close, pop > x').click(function(){$(this).parents('pop').hide()})
    $('pop').each(function(){
        $(this).attr('right') == '' ? $(this).find('pop-sider').addClass('anime-fade-in-right') : $(this).find('pop-sider').addClass('anime-fade-in-left')
    })
    $('[class$="-pop"]').click(function(){
        if($(this).prop('tagName') != 'POP') $('pop.'+ $.grep($(this).attr('class').split(' '),function(item){return item.indexOf("-pop") !== -1}).join(' ')).show()
    })
});

//----------------------------------------------------------------------------------menu
$(function(){
    $('menu').append('<x class="ico"></x>')
    $('menu x').click(function(){$('menu-cont').toggle()})
    $('menu-cont,menu-group').addClass('anime-fade-in')
    if($(document).width() <= 640){
        $('menu-cont li').click(function(){
            let menuGroup = $(this).children('menu-group')
            if(menuGroup.css('display') == 'block'){menuGroup.hide()}
            else{$('menu-group').hide();menuGroup.show()}
        })
    }
});

//----------------------------------------------------------------------------------toggle
$(function(){
    $('o.checkbox,o.checkbox-done,o.checkbox-cancel,o.favorite,o.star,o.visibility,o.password,o.mic,o.volume,o.muzak,o.phonecard,o.telecamera,o.camera,o.aim,o.semaphore,o.suitcase,o.toggle').click(function(){$(this).toggleClass('active')})
    $(document).on('click','o.radio,o.radio-done',function(){
        $(this).parent().parent().parent().find('o.radio,o.radio-done').removeClass('active')
        $(this).addClass('active')
    })
    $('o.checkbox-all').click(function(){
        $(this).hasClass('active')
        ? $(this).parent().parent().parent().parent().find('o.checkbox,o.checkbox-done').addClass('active')
        : $(this).parent().parent().parent().parent().find('o.checkbox,o.checkbox-done').removeClass('active')
    })
    $('o.password').click(function(){
        let inputType = $(this).siblings('input').attr('type')
        inputType == 'password' ? $(this).siblings('input').attr('type','text') : $(this).siblings('input').attr('type','password')
    })
});

//----------------------------------------------------------------------------------scaler
$(function(){
    $('scaler input').before('<a class="btn ico ico-reduce"></a>').after('<a class="btn ico ico-add"></a>')
    $('scaler input').on('input',function(){if(!Number($(this).val(),10)) $(this).val('')})
    $('scaler a').click(function(){
        let calcInput = $(this).siblings('input'),
            step = calcInput.attr('step') != undefined ? Number(calcInput.attr('step')) : 1,
            len = step.toString().indexOf('.') != -1 ? (step.toString().split('.'))[1].toString().split('').length : 0,
            max = Number(calcInput.attr('max')),
            min = calcInput.attr('min') != undefined ? Number(calcInput.attr('min')) : 0,
            calc = Number((Number(calcInput.val()) + step).toFixed(len))
        if($(this).hasClass('ico-add')) calc > max ? calcInput.val(max) : calcInput.val(calc)
        if($(this).hasClass('ico-reduce')) calcInput.val() > min ? calcInput.val((Number(calcInput.val()) - step).toFixed(len)) : calcInput.val(min)
    })
});

//----------------------------------------------------------------------------------upload
$(function(){
    $('.upload-add').click(function(){
        $(this).before('<div class="ico upload-group"><input type="file"><horn class="ico"></horn></div>')
        uploadImg()
    })
    $(document).on('click','.upload-group horn',function(){$(this).parent().remove()})
    function uploadImg(){
        $('.upload-group input').on('change',function(){
            let imgValue = $(this).val(),
                fileFormat = imgValue.substring(imgValue.lastIndexOf('.')).toLowerCase(),
                imgUrl = window.URL.createObjectURL(this.files[0])
            if(!fileFormat.match(/.png|.jpg|.jpeg|.webp|.gif/)){alert('File format must be: png/jpg/jpeg/webp/gif')}
            else{
                $(this).parent().attr('style','background-image:url(' + imgUrl + ')')
                $(this).parent().css('color','transparent')
            }
        })
    }
    uploadImg()
});

//----------------------------------------------------------------------------------tip
let tipVal
function tip(){
    let addClass = 't' + Math.round(Math.random() * 999999),
        tipThis = '.' + addClass
    $('body').append('<tip class="' + addClass + ' center anime-zoom-in">' + tipVal + '</tip>')
    $(tipThis).css('margin', (- $(tipThis).height()/2-11) + 'px 0 0 ' + (- $(tipThis).width()/2-20 + 'px'))
    setTimeout(() => $(tipThis).remove(),3000)
};

//----------------------------------------------------------------------------------drop
$(function(){
    $('drop-list').before('<i class="ico ico-alone-right"></i>')
    $('drop').append('<drop-cont></drop-cont>')
    let dropFirst = $(this).find('drop-list li').html()
    $(this).find('drop-cont').html(dropFirst)
    $('drop-cont').click(function(){$(this).parent().toggleClass('active')})
    $('drop-list').addClass('anime-fade-in')
    $('drop-list ul').before('<x></x>')
    $('drop-list li').click(function(){
        if($(this).children('drop-list').length){}else{
            dropFirst = $(this).html()
            $(this).parents('drop').find('drop-cont').html(dropFirst)
            $(this).parents('drop').removeClass('active')
        }
    })
    $('drop x').click(function(){$(this).parents('drop').removeClass('active')})
});

//----------------------------------------------------------------------------------alone
let alone
$(function(){
    $(alone).each(function(){
        let txt = $(this).html(),
            aloneEl = txt.match(/./g),
            element = ''
        for(let i = 0;i < aloneEl.length;i++){element += '<z>' + aloneEl[i] + '</z>'}
        $(this).html(element)
    })
});

//----------------------------------------------------------------------------------rate
$(function(){
    $('rate').html('<i></i><i></i><i></i><i></i><i></i>')
    $('rate').each(function(){$(this).find('i').addClass('ico ico-star').filter(':lt(' + $(this).attr('value') + ')').addClass('active')})
    $('rate[edit] i').click(function(){
        $(this).parent().attr('value',$(this).index() + 1)
        $(this).siblings().removeClass('active')
        $(this).prevAll().addClass('active')
        $(this).addClass('active')
    })
});

//----------------------------------------------------------------------------------name
$(function(){
    $('name').addClass('anime-fade-in-down')
    $('name-search input').before('<i class="ico ico-search"></i>')
    $('name h2,name-logo').after('<u></u>')
});

//----------------------------------------------------------------------------------nav
$(function(){
    $('nav').addClass('anime-fade-in-up').before('<space></space>')
});

//----------------------------------------------------------------------------------countdown
let countDate
function countdown(){
    let date = new Date(),
        endDate = new Date(countDate),
        leftTime = endDate.getTime() - date.getTime(),
        d,h,m,s
    if(leftTime >= 0){
        d = Math.floor(leftTime/1000/60/60/24)
        h = Math.floor(leftTime/1000/60/60%24)
        m = Math.floor(leftTime/1000/60%60)
        s = Math.floor(leftTime/1000%60)
    }
    function digit(num,n){return (Array(n).join(0) + num).slice(-n)}
    $('countdown d').html(d)
    $('countdown h').html(digit(h,2))
    $('countdown m').html(digit(m,2))
    $('countdown s').html(digit(s,2))
    setTimeout(countdown,1000)
};

//----------------------------------------------------------------------------------notify
let notifyVal,notifyAlign,addClass
function notify(){
    if($('notify').length == 0) $('body').append('<notify><audio src="//ui.gg/lib/media/notify.mp3"></audio></notify>')
    if(notifyAlign == 'bottom'){$('notify').addClass('bottom')}
    addClass = 'n' + Math.round(Math.random() * 999999)
    $('notify').append('<li class="' + addClass + ' anime-bounce-in-right"><x class="ico ico-close"></x>' + notifyVal + '</li>').find('audio')[0].play()
}
function notifyRemre(notifyThis){
    notifyThis.addClass('anime-bounce-out-right')
    setTimeout(() => notifyThis.remove(),500)
}
function notifyAuto(notifyTime){
    notify()
    let notifyThis = $('.' + addClass)
    setTimeout(() => notifyRemre(notifyThis),notifyTime)
}
$(document).on('click','notify x',function(){
    let notifyThis = $(this).parent()
    notifyRemre(notifyThis)
});

//----------------------------------------------------------------------------------copy
let copyNum,copyEl,copyVal
$(function(){
    $('[copy-btn]').click(function(){
        copyNum = $(this).attr('copy-btn')
        copyNum == '' ? copyEl = $('[copy-val]') : copyEl = $('[copy-val=' + copyNum + ']')
        copyEl.is('input') ? copyVal = copyEl.val() : copyVal = copyEl.html()
        navigator.clipboard.writeText(copyVal)
        tipVal = 'Copy successful'
        tip()
    })
});

//----------------------------------------------------------------------------------empty
$(function(){
    $('empty').each(function(){if($(this).is(':empty')) $(this).addClass('default')})
});

//----------------------------------------------------------------------------------hop
$(function(){
    $('hop-cont').addClass('anime-fade-in').before('<x></x>')
    $('hop > a').click(function(){$(this).siblings('hop-cont,x').toggle()})
    $('hop-cont,hop x').click(function(){$(this).hide().siblings('hop-cont,x').hide()})
});

//----------------------------------------------------------------------------------chat
$(function(){
    $('chat-cont,chat-tip').addClass('anime-fade-in')
    function chatNew(){$('chat-message').animate({scrollTop: '999999999'},1000)}
    chatNew()
    $('chat-tool .ico-emot-smile').click(function(){$(this).next().toggle()})
    $('chat [uigg="emot"] s').click(function(){
        $(this).parent().parent().hide()
        console.log(1)
        $('chat-control aside').append($(this))
    })
    $('chat-title x.ico-close').click(function(){$(this).parent().parent().hide()})
    $(document).on('click','chat aside img',function(){$('chat').append('<pop class="anime-fade-in center"><img src="' + $(this).attr('src') + '"></pop>')})
    $(document).on('click','chat pop',function(){$(this).remove()})
    $('chat-list li').click(function(){
        $('chat-cont').css('display','flex')
        chatNew()
    })
    $('chat-control a').click(function(){
        let messageVal = $('chat-control aside').html(),
            date = new Date()
        if(messageVal == ''){}else{
            $('chat-message').append('<li class="mine"><em class="avatar" style="background-image: "></em><cite>' + date.toLocaleTimeString() + '</cite><aside>' + messageVal + '</aside></li>')
            $('chat-control aside').html('')
            chatNew()
        }
    })
    $('chat-tool .ico-folder-empty input').on('change',function(){
        let fileValue = $(this).val(),
            fileFormat = fileValue.substring(fileValue.lastIndexOf('.')).toLowerCase(),
            fileName = fileValue.substring(fileValue.lastIndexOf('\\') + 1),
            fileUrl = window.URL.createObjectURL(this.files[0])
        if(fileFormat.match(/.png|.jpg|.jpeg|.webp|.gif/)){$('chat-control aside').append('<img src="' + fileUrl + '">');return}
        if(fileFormat.match(/.mp4|.webm/)){$('chat-control aside').append('<video src="' + fileUrl + '" controls></video>');return}
        if(fileFormat.match(/.mp3|.ogg|.wav|.midi/)){$('chat-control aside').append('<audio src="' + fileUrl + '" controls></audio>');return}
        else{$('chat-control aside').append('<a download href="' + fileUrl + '"><i class="ico ico-file"></i>' + fileName + '</a>')}
    })
});

//----------------------------------------------------------------------------------fold
$(function(){
    $('fold-title u').after('<s class="ico ico-alone-bottom"></s>').remove()
    $('fold-cont').addClass('anime-fade-in')
    if($('fold').attr('show') == ''){
        $('fold-group').addClass('active')
        $('fold-title').click(function(){$(this).parents('fold-group').toggleClass('active')})
    }else{
        $('fold-title').click(function(){
            let foldActive = $(this).parents('fold-group')
            foldActive.hasClass('active') ? foldActive.removeClass('active') : foldActive.addClass('active').siblings().removeClass('active')
        })
    }
});

//----------------------------------------------------------------------------------page
$(function(){
    let pageVal = $('page').attr('value'),
        pageMax = $('page').attr('max')
    $('page').append('<a class="ico ico-alone-side-left"></a><a class="ico ico-alone-left"></a><ul></ul><a class="ico ico-alone-right"></a><a class="ico ico-alone-side-right"></a><span>' + pageVal + '/' + pageMax + '</span><input type="text"><button class="ico ico-arrow-enter"></button>')
    let arr = new Array()
    for(let i = 1;i <= pageMax;i++){arr[i] = i;$('page ul').append('<a>' + i + '</a>')}
    function page(){
        pageVal = $('page').attr('value')
        pageMax = $('page').attr('max')
        $('page ul a').removeClass('active').hide()
        $('page').each(function(){
            pageVal == 1 ? $(this).find('ul a:first').addClass('active').show().next().show().next().show() : $(this).find('ul a').eq(pageVal - 1).addClass('active').show().prev().show().prev().show().end().next().show().next().show().next().show()
            $(this).find('span').html(pageVal + '/' + pageMax)
        })
    }
    page()
    $('page .ico-alone-side-right').click(function(){$('page').attr('value',pageMax);page()})
    $('page .ico-alone-side-left').click(function(){$('page').attr('value','1');page()})
    $('page .ico-alone-left').click(function(){
        if(pageVal == 1){return false}
        else{$('page').attr('value',pageVal - 1);page()}
    })
    $('page .ico-alone-right').click(function(){
        if(pageVal == pageMax){return false}
        else{$('page').attr('value',+ pageVal + 1);page()}
    })
    $('page ul a').click(function(){$('page').attr('value',$(this).text());page()})
    $('page .ico-arrow-enter').click(function(){
        let inputVal = $('page input').val()
        if(inputVal > parseInt(pageMax)) inputVal = pageMax
        if(inputVal < 1 || isNaN(inputVal)) inputVal = 1
        $('page').attr('value',inputVal)
        page()
        $('page input').val('')
    })
});

//----------------------------------------------------------------------------------cookie
//input cookie
function setCookie(objName, objValue, objHours){
    let str = objName + '=' + encodeURI(objValue)
    if(objHours > 0){
        let date = new Date(),
            ms = objHours * 3600 * 1000
        date.setTime(date.getTime() + ms)
        str += ';expires=' + date.toGMTString()
    }
    document.cookie = str
};

//output cookie
function getCookie(objName){
    let arrStr = document.cookie.split('; ')
    for(let i = 0;i < arrStr.length;i++){
        let temp = arrStr[i].split('=')
        if(temp[0] == objName) return decodeURI(temp[1])
    }
    return ''
};

//----------------------------------------------------------------------------------step
$(function(){
    let stepLength = $('step ul li').length
    $('step').prepend('<aside><cite></cite></aside>')
    for(let i = 0;i < stepLength;i++){$('aside').append('<i></i>')}
    $('step li').each(function(){
        let index = $(this).index()
        $('aside i').eq(index).append(index + 1)
    })
});

//----------------------------------------------------------------------------------crumb
$(function(){
    $('crumb li:first').prepend('<i class="ico ico-home"></i>')
    $('crumb li:not(:first)').prepend('<i class="ico ico-alone-right"></i>')
});

//----------------------------------------------------------------------------------lang
function langRead(targetObj,data){
    let langVal = targetObj.split('-'),
        dataStr = 'data'
    for(i = 0;i < langVal.length - 1;i++){dataStr += '.' + langVal[i] + '[0]'}
    dataStr += '.' + langVal[langVal.length - 1]
    return eval(dataStr)
}
$(function(){
    let langType = getCookie('lang') == '' ? 'en' : getCookie('lang')
    function lang(){
        if($('[lang-set]').length != 0){
            $.get(`/lang/${langType}.json`,function(data){
                $('[lang]').each(function(){$(this).html(langRead($(this).attr('lang'),data))})
                $('[lang-placeholder]').each(function(){$(this).attr('placeholder',langRead($(this).attr('lang-placeholder'),data))})
                $('[lang-value]').each(function(){$(this).attr('value',langRead($(this).attr('lang-value'),data))})
                $('[lang-content]').each(function(){$(this).attr('content',langRead($(this).attr('lang-content'),data))})
            })
        }
    }
    lang()
    $('[lang-set]').click(function(){
        langType = $(this).attr('lang-set')
        setCookie('lang', langType, '72')
        lang()
    })
});

//----------------------------------------------------------------------------------clue
$(function(){
    $('*[title]').hover(function(){
        if($(this).attr('clue') == undefined){
            $(this).attr('clue',$(this).attr('title')).append('<clue class="corner anime-fade-in">' + $(this).attr('clue') + '</clue>').removeAttr('title')
            let clue = $(this).find('clue'),
                clueWidth = clue.width(),
                selfWidth = $(this).width()
            if(clueWidth > selfWidth){
                let clueLeft = - (clueWidth - selfWidth) / 2 - 10
                clue.css('left',clueLeft)
            }
        }
    })
});

//----------------------------------------------------------------------------------horn
$(function(){
    $('horn').each(function(){
        let hornParent = $(this).parent()
        if(hornParent.css('position') !='absolute' && hornParent.css('position') !='fixed') hornParent.css('position','relative')
    })
});

//----------------------------------------------------------------------------------
$(function(){

});






