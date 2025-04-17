/*
 * uigg 2.7 (build 20250101)
 * Project: https://ui.gg
 * Author: https://www.mixice.com
 * Github: https://github.com/mixice/uigg
 * license: MIT
 */

//----------------------------------------------------------------------------------preset
console.log('%c PERFORMS BY UIGG ','background-image: linear-gradient(90deg,slateblue,deeppink);color:white','http://ui.gg')
const language = navigator.language || navigator.userLanguage;

//----------------------------------------------------------------------------------rem
(function(doc, win){
    let docElement = doc.documentElement
    function recalc(){
        let viewWidth = Math.max(320, Math.min(640, docElement.clientWidth))
        docElement.style.fontSize = 100 * (viewWidth / 640) + 'px'
    }
    recalc()
    win.ResizeObserver ? new ResizeObserver(recalc).observe(docElement) : win.addEventListener('resize', recalc, false)
})(document, window)

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
        let audio = $('music')
        audio.play()
        document.addEventListener('WeixinJSBridgeReady',function(){audio.play()},false)
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

//----------------------------------------------------------------------------------name
$(function(){
    $('name').addClass('anime-fade-in-down')
    $('name-search input').before('<i class="ico ico-search"></i>')
    $('name h2,name-logo').after('<u></u>')
});

//----------------------------------------------------------------------------------nav
$(function(){
    $('nav').addClass('anime-fade-in-up').before('<space></space>')
    let fillColor = $('nav[uigg]').attr('uigg') || '#fff'
    $('nav[uigg]').prepend(`<svg viewBox="0 0 640 80"><path d="M437.5,0c-59.55,0-53.55,69.83-117.5,69.83S262.05,0,202.5,0H10C4.48,0,0,4.48,0,10v70h640V10c0-5.52-4.48-10-10-10h-192.5Z" fill="${fillColor}"/></svg>`)
    let num = $('nav[uigg] li').length
    if(num == 3) $('nav[uigg] li').eq(1).addClass('midel')
    if(num == 5) $('nav[uigg] li').eq(2).addClass('midel')
});

//----------------------------------------------------------------------------------swiper
$(function(){
    $('.swiper-button-next').addClass('ico ico-alone-right')
    $('.swiper-button-prev').addClass('ico ico-alone-left')
})
function lug(){
    $('.lug-thumbs a').click(function(){$(this).addClass('active').siblings().removeClass('active')})
    new Swiper('.lug-top',{
        on:{
            touchEnd: function(){
                let swiperIndex = $('.lug-top .swiper-slide-active').index()
                $('.lug-thumbs a').eq(swiperIndex).addClass('active').siblings().removeClass('active')
            },
        },
    })
};

//----------------------------------------------------------------------------------random
function randNum(){return Math.round(Math.random() * 100)}
function randCol(){return parseInt(Math.random() * 255)}
$(function(){
    $('[uigg="bg"],[uigg="img"],[uigg="product"],[uigg="avatar"]').each(function(){
        let url = `//ui.gg/lib/images/${$(this).attr('uigg')}?=${randNum()}`
        if($(this).css('background-image') == 'none' && !$(this).is('img')) $(this).css('background-image',`url(${url})`)
        if(!$(this).attr('src') && $(this).is('img')) $(this).attr('src',url)
    })
    $('[uigg="color"]').each(function(){
        $(this).css('background-color',`rgb(${randCol()},${randCol()},${randCol()})`)
        if($(this).is('img')) $(this).css({'width': '100%','height': '100%'})
    })
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    function generateRandomWord(length){
        let randomWord = ''
        for (let i = 0; i < length; i++){
            const randomIndex = Math.floor(Math.random() * alphabet.length)
            randomWord += alphabet[randomIndex]
        }
        return randomWord
    }
    function generateRandomSentence(){
        const numWords = 10,sentenceWords = []
        for (let i = 0; i < numWords; i++){
            const wordLength = Math.floor(Math.random() * 8) + 3
            sentenceWords.push(generateRandomWord(wordLength))
        }
        return sentenceWords.join(' ')
    }
    const randomSentences = []
    for(let i = 0; i < 10; i++){randomSentences.push(generateRandomSentence())}
    if(!$('[uigg="txt"]').attr('lang') && !$('[uigg="txt"]').html()) $('[uigg="txt"]').append(randomSentences)
    $('[uigg="title"]').each(function(){if(!$(this).attr('lang') && !$(this).html()) $(this).append(randomSentences[Math.round(Math.random() * (randomSentences.length - 1))])})
    let arr = new Array()
    for(let i = 1;i <= 100; i++){arr[i] = i
        $('[uigg="emot"]').append(`<s style="background-image: url(//ui.gg/lib/emot/${i}.svg)"></s>`)
    }
});

//----------------------------------------------------------------------------------disable
function disable(){
    document.oncontextmenu = function (event){
        event = event
        try{let the = event.target
            if(!((the.tagName === 'INPUT' && the.type.toLowerCase() === 'text') || the.tagName === 'TEXTAREA')) event.preventDefault()
        }
        catch(e){event.preventDefault()}
    }
    window.addEventListener('keydown', function (e){if(e.ctrlKey && (e.key === 'u' || e.key === 's')) e.preventDefault()})
    window.addEventListener('keydown', function (event){if(event.key === 'F12') event.preventDefault()})
    window.onhelp = function (){return false}
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
        $(this).closest('tab').find('tab-cont').children().eq($(this).index()).addClass('active').siblings().removeClass('active')
    })
});

//----------------------------------------------------------------------------------pop
$(function(){
    $('pop').addClass('anime-fade-in').append('<x></x>')
    $('pop-main').addClass('anime-zoom-in').wrap('<div class="full center"></div>')
    $('pop-choice').addClass('anime-fade-in-up')
    $('pop-title .close').addClass('ico').before('<u></u>');
    $('pop .close, pop > x').click(function(){$(this).parents('pop').hide()})
    $('pop').each(function(){
        $(this).attr('right') == '' ? $(this).find('pop-sider').addClass('anime-fade-in-right') : $(this).find('pop-sider').addClass('anime-fade-in-left')
    })
    $('a[pop]').click(function(){$(`pop[pop="${$(this).attr('pop')}"]`).show()})
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
    $('.menu-cont a').click(function(){$('.menu-cont').hide()})
})
if($(window).width() <= 640) $('menu-cont a').click(function(){$('menu-cont').hide()});

//----------------------------------------------------------------------------------toggle
$(function(){
    const toggleSelectors = ['o.checkbox', 'o.checkbox-done', 'o.checkbox-cancel', 'o.favorite', 'o.star', 'o.visibility', 'o.password', 'o.mic', 'o.volume', 'o.muzak', 'o.phonecard', 'o.telecamera', 'o.camera', 'o.aim', 'o.semaphore', 'o.suitcase', 'o.light', 'o.thumb-up', 'o.thumb-down', 'o.devicerotate', 'o.thumbtack', 'o.bell', 'o.place', 'o.link', 'o.blur', 'o.toggle']
    $(toggleSelectors.join(',')).click(function(){$(this).toggleClass('active')})
    $(document).on('click', 'o.radio,o.radio-done', function(){
        $(this).closest('.parent').find('o.radio,o.radio-done').removeClass('active')
        $(this).addClass('active')
    })
    $('o.checkbox-all').click(function(){
        const checkboxAll = $(this).closest('.parent').find('o.checkbox,o.checkbox-done')
        checkboxAll.toggleClass('active', $(this).hasClass('active'))
    })
    $('o.password').click(function(){
        const input = $(this).siblings('input')
        input.attr('type', input.attr('type') === 'password' ? 'text' : 'password')
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

//----------------------------------------------------------------------------------form
$(function(){
    $('textarea.auto').on('input',function(){$(this).css('height',(this.scrollHeight) + 'px')})
    $('progress').each(function(){
        $(this).css('color',$(this).attr('color'))
        $(this).css('--progress-color', $(this).css('color'))
    })
});

//----------------------------------------------------------------------------------upload
let uploadAlert
if(language === 'zh-CN'){uploadAlert = '文件格式必须是'}else{uploadAlert = 'File format must be'}
$(function(){
    $('.upload-add').click(function(){
        $(this).before('<div class="ico upload-group"><input type="file" accept=".jpg,.jpeg,.png,.webp,.gif"><horn class="ico"></horn></div>')
        uploadImg()
    })
    $(document).on('click','.upload-group horn',function(){$(this).parent().remove()})
    function uploadImg(){
        $('.upload-group input').on('change',function(){
            let imgValue = $(this).val(),
                fileFormat = imgValue.substring(imgValue.lastIndexOf('.')).toLowerCase(),
                imgUrl = window.URL.createObjectURL(this.files[0])
            if(!fileFormat.match(/.png|.jpg|.jpeg|.webp|.gif/)){alert(uploadAlert + ': png/jpg/jpeg/webp/gif')}
            else{
                $(this).parent().attr('style',`background-image:url(${imgUrl})`)
                $(this).parent().css('color','transparent')
            }
        })
    }
    uploadImg()
});

//----------------------------------------------------------------------------------tip
function tip(str){
    let addClass = 't' + Math.round(Math.random() * 999999),
        tipThis = '.' + addClass
    $('body').append(`<tip class="${addClass} center anime-zoom-in">${str}</tip>`)
    $(tipThis).css('margin', (- $(tipThis).height()/2-5) + 'px 0 0 ' + (- $(tipThis).width()/2-10 + 'px'))
    setTimeout(() => $(tipThis).remove(),3000)
};

//----------------------------------------------------------------------------------drop
$(function(){
    $('drop').each(function(){
        const $drop = $(this)
        $drop.find('drop-list').before('<i class="ico ico-alone-right"></i>').end().append('<drop-cont></drop-cont>').find('drop-cont').html($drop.find('drop-list li').first().html()).click(function(){$drop.toggleClass('active')})
        $drop.find('drop-list').addClass('anime-fade-in').find('ul').before('<x></x>').end().find('li').click(function(){if(!$(this).children('drop-list').length) $drop.removeClass('active').find('drop-cont').html($(this).html())})
        $drop.find('x').click(function(){$drop.removeClass('active')})
    })
});

//----------------------------------------------------------------------------------alone
let alone
$(function(){
    $(alone).each(function(){
        let txt = $(this).text(),
            aloneEl = txt.split(''),
            element = ''
        for(let i = 0;i < aloneEl.length;i++){element += `<z>${(aloneEl[i] === ' ' ? '&nbsp;' : aloneEl[i])}</z>`}
        $(this).html(element)
    })
});

//----------------------------------------------------------------------------------rate
$(function(){
    $('rate').html('<i></i><i></i><i></i><i></i><i></i>')
    $('rate').each(function(){$(this).find('i').addClass('ico').filter(`:lt(${$(this).attr('value')})`).addClass('active')})
    $('rate[edit] i').click(function(){
        $(this).addClass('active').siblings().removeClass('active').parent().attr('value',$(this).index() + 1)
        $(this).prevAll().addClass('active')
    })
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
        function digit(num,n){return num.toString().padStart(n, '0')}
        $('countdown d').html(d)
        $('countdown h').html(digit(h,2))
        $('countdown m').html(digit(m,2))
        $('countdown s').html(digit(s,2))
    }
    setTimeout(countdown,1000)
};

//----------------------------------------------------------------------------------notify
function notify(str,align,time){
    if($('notify').length == 0) $('body').append('<notify><audio src="//ui.gg/lib/media/notify.mp3"></audio></notify>')
    let addClass = 'n' + Math.round(Math.random() * 999999)
    $('notify').append(`<li class="${addClass} anime-bounce-in-right"><x class="ico ico-close"></x>${str}</li>`).find('audio')[0].play()
    if(align == 'bottom'){$('notify').addClass('bottom')}
    if(time != undefined){
        let notifyThis = $('.' + addClass)
        setTimeout(() => notifyRemre(notifyThis),time)}
}
function notifyRemre(notifyThis){
    notifyThis.addClass('anime-bounce-out-right')
    setTimeout(() => notifyThis.remove(),500)
}
$(document).on('click','notify x',function(){
    let notifyThis = $(this).parent()
    notifyRemre(notifyThis)
});

//----------------------------------------------------------------------------------copy
let copyRight, copyErr
if(language === 'zh-CN'){copyRight = '复制成功';copyErr = '复制失败'}else{copyRight = 'Copy successful';copyErr = 'Could not copy text'}
let copySelect = false
function copySelectedText(event){
    if($(event.target).closest('[copy-select]').length > 0){
        const selectedText = window.getSelection().toString().trim()
        if(selectedText) navigator.clipboard.writeText(selectedText).then(() => tip(copyRight),err => tip(copyErr + err))
    }
}
$(function(){
    $('[copy-btn]').click(function(){
        const copyNum = $(this).attr('copy-btn')
        const copyEl = copyNum ? $(`[copy-val="${copyNum}"]`) : $('[copy-val]')
        const copyVal = copyEl.is('input') ? copyEl.val() : copyEl.text()
        navigator.clipboard.writeText(copyVal).then(() => tip(copyRight),err => tip(copyErr + err))
    })
    if($('[copy-select]').length > 0) document.addEventListener('mouseup', copySelectedText)
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
    let hopHeight = $('hop > a').height()
    $('hop[bottom] hop-cont').css('bottom',hopHeight)
    $('hop[center] hop-cont').css('top',hopHeight)
    $('hop[center][bottom] hop-cont').css('bottom',hopHeight).css('top','auto')
});

//----------------------------------------------------------------------------------chat
$(function(){
    $('chat-cont,chat-tip').addClass('anime-fade-in')
    function chatNew(){$('chat-message').animate({scrollTop: '999999999'},1000)}
    chatNew()
    $('chat-tool .ico-emot-smile').click(function(){$(this).next().toggle()})
    $('chat [uigg="emot"] s').click(function(){
        $(this).parent().parent().hide()
        $('chat-control aside').append($(this))
    })
    $('chat-title x.ico-close').click(function(){$(this).parent().parent().hide()})
    $(document).on('click','chat aside img',function(){$('chat').append(`<pop class="anime-fade-in center"><img src="${$(this).attr('src')}"></pop>`)})
    $(document).on('click','chat pop',function(){$(this).remove()})
    $('chat-list li').click(function(){
        $('chat-cont').css('display','flex')
        chatNew()
    })
    $('chat-control a').click(function(){
        let messageVal = $('chat-control aside').html(),
            date = new Date()
        if(messageVal == ''){}else{
            $('chat-message').append(`<li class="mine"><em class="avatar" style="background-image: "></em><cite>${date.toLocaleTimeString()}</cite><aside>${messageVal}</aside></li>`)
            $('chat-control aside').html('')
            chatNew()
        }
    })
    $('chat-tool .ico-folder-empty input').on('change',function(){
        let fileValue = $(this).val(),
            fileFormat = fileValue.substring(fileValue.lastIndexOf('.')).toLowerCase(),
            fileName = fileValue.substring(fileValue.lastIndexOf('\\') + 1),
            fileUrl = window.URL.createObjectURL(this.files[0])
        if(fileFormat.match(/.png|.jpg|.jpeg|.webp|.gif/)){$('chat-control aside').append(`<img src="${fileUrl}">`);return}
        if(fileFormat.match(/.mp4|.webm/)){$('chat-control aside').append(`<video src="${fileUrl}" controls></video>`);return}
        if(fileFormat.match(/.mp3|.ogg|.wav|.midi/)){$('chat-control aside').append(`<audio src="${fileUrl}" controls></audio>`);return}
        else{$('chat-control aside').append(`<a download href="${fileUrl}"><i class="ico ico-file"></i>${fileName}</a>`)}
    })
});

//----------------------------------------------------------------------------------fold
$(function(){
    $('fold-title u').parent().append('<s class="ico ico-alone-bottom"></s>')
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

//----------------------------------------------------------------------------------cookie
//input cookie
function setCookie(cookieName, cookieValue, hours){
    const encodedValue = encodeURI(cookieValue)
    let cookieString = `${cookieName}=${encodedValue}`
    if(hours > 0){
        const expirationDate = new Date()
        expirationDate.setTime(expirationDate.getTime() + hours * 3600 * 1000)
        cookieString += `;expires=${expirationDate.toGMTString()}`
    }
    document.cookie = cookieString
}
//output cookie
function getCookie(cookieName){
    const cookies = document.cookie.split('; ')
    for(let i = 0; i < cookies.length; i++){
        const cookie = cookies[i].split('=')
        if(cookie[0] === cookieName){
            return decodeURI(cookie[1])
        }
    }
    return ''
};

//----------------------------------------------------------------------------------step
$(function(){
    $('step').html(function(_, html){return $('<ul>').html(html).prop('outerHTML')})
    $('step li').each(function(){
        $(this).html(function(_, html){return $('<span>').html(html).prop('outerHTML')})
        $(this).prepend(`<i>${$(this).index() + 1}</i>`)
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
let langSwitch = 0
$(function(){
    let langType = getCookie('lang') == '' ? 'en' : getCookie('lang')
    function lang(){
        if(langSwitch === 0){if($('[lang-set]').length === 0) return}
        $.get(`../lang/${langType}.json`,function(data){
            $('[lang]').each(function(){$(this).html(langRead($(this).attr('lang'),data))})
            $('[lang-placeholder]').each(function(){$(this).attr('placeholder',langRead($(this).attr('lang-placeholder'),data))})
            $('[lang-value]').each(function(){$(this).attr('value',langRead($(this).attr('lang-value'),data))})
            $('[lang-content]').each(function(){$(this).attr('content',langRead($(this).attr('lang-content'),data))})
        })
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
        const element = $(this)
        if(element.attr('clue') === undefined){
            const titleText = element.attr('title')
            element.attr('clue', titleText).append(`<clue class="corner anime-fade-in">${titleText}</clue>`).removeAttr('title')
            const clue = element.find('clue'),
                clueWidth = clue.width(),
                selfWidth = element.width()
                console.log(selfWidth)
                console.log(clueWidth)
            if(clueWidth > selfWidth){
                const clueLeft = -(clueWidth - selfWidth) / 2 - 10
                clue.css('left', clueLeft)
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

//----------------------------------------------------------------------------------alert
let langConfirm, langCancel
if(language === 'zh-CN'){langConfirm = '确认';langCancel = '取消'}else{langConfirm = 'confirm';langCancel = 'cancel'}
function alert(message){
    $('body').append(`<alert class="anime-fade-in"><alert-main class="anime-fade-in-down"><alert-cont>${message}</alert-cont><alert-solve><a class="btn">${langConfirm}</a></alert-solve></alert-main></alert>`)
    $(document).on('keydown', function(event){if(event.key === 'Enter' || event.key === 'Escape' || event.key === ' ') $('alert-solve a').click()})
}
function confirm(message){
    return new Promise(function(resolve, reject){
        $('body').append(`<alert class="anime-fade-in"><alert-main class="anime-fade-in-down"><alert-cont>${message}</alert-cont><alert-solve><a class="btn" id="alert-cancel">${langCancel}</a><a class="btn" id="alert-confirm">${langConfirm}</a></alert-solve></alert-main></alert>`)
        $(document).on('keydown', function(event){
            if(event.key === 'Enter') $('#alert-confirm').click()
            if(event.key === 'Escape') $('#alert-cancel').click()
        })
        $('#alert-confirm').off('click').on('click', function(){resolve(true)})
        $('#alert-cancel').off('click').on('click', function(){resolve(false)})
    })
}
function prompt(message, defaultValue = ''){
    return new Promise(function(resolve, reject){
        $('body').append(`<alert class="anime-fade-in"><alert-main class="anime-fade-in-down"><alert-cont>${message}</alert-cont><input type="text" id="alert-input" value="${defaultValue}"><alert-solve><a class="btn" id="alert-cancel">${langCancel}</a><a class="btn" id="alert-confirm">${langConfirm}</a></alert-solve></alert-main></alert>`)
        $(document).on('keydown', function(event){
            if(event.key === 'Enter') $('#alert-confirm').click()
            if(event.key === 'Escape') $('#alert-cancel').click()
        })
        $('#alert-confirm').off('click').on('click', function(){resolve($('#alert-input').val())})
        $('#alert-cancel').off('click').on('click', function(){resolve(null)})
    })
}
$(document).on('click','alert-solve a',function(){
    $('alert').remove()
    $(document).off('keydown')
});

//----------------------------------------------------------------------------------notice
$(function(){
    let notice = $('notice')
    notice.html(`<i class="ico ico-volume"></i><marquee onMouseOut="this.start()" onMouseOver="this.stop()">${notice.html()}</marquee>`)
    if(notice.attr('href')) notice.append(`<a href="${notice.attr('href')}" class="ico ico-more-horizontal"></a>`)
});

//----------------------------------------------------------------------------------recording
$(function(){
    $('.recording').click(async function(){
        let stream = await navigator.mediaDevices.getDisplayMedia({video: true}),
            mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm",
            mediaRecorder = new MediaRecorder(stream,{mimeType: mime}),
            chunks = []
        mediaRecorder.addEventListener('dataavailable', function(e){chunks.push(e.data)})
        mediaRecorder.addEventListener('stop', function(){
            let blob = new Blob(chunks,{type: chunks[0].type}),
                url = URL.createObjectURL(blob),
                $a = $('<a>').attr({href: url, download: 'video.webm'}).appendTo('body')
            $a[0].click()
            $a.remove()
        })
        mediaRecorder.start()
    })
});









