/*
 * uigg 2.8 (build 20250501)
 * Project: https://ui.gg
 * Author: https://www.mixice.com
 * Github: https://github.com/mixice/uigg
 * license: MIT
 */

//----------------------------------------------------------------------------------preset
console.log('%c BRACKET BY UIGG ','background-image: linear-gradient(90deg,slateblue,deeppink);color:white','http://ui.gg')
const language = navigator.language || navigator.userLanguage;

//----------------------------------------------------------------------------------rem
(function(doc, win){
    const docEl = doc.documentElement
    const calcFontSize = () => {
        const viewWidth = Math.max(320, Math.min(640, docEl.clientWidth))
        docEl.style.fontSize = `${100 * (viewWidth / 640)}px`
    }
    calcFontSize()
    win.ResizeObserver ? new ResizeObserver(calcFontSize).observe(docEl) : win.addEventListener('resize', calcFontSize)
})(document, window)

//----------------------------------------------------------------------------------mobile
function mobile(e){
    e ? $('style, link[rel="stylesheet"]').each((_, el) => {
        try {$(el.sheet?.cssRules || []).each((_, r) => {r instanceof CSSMediaRule && r.conditionText.includes('max-width: 640px') && $('<style>', {id: 'mobile', text: $(r.cssRules).map((_,c) => c.cssText).get().join('')}).insertBefore($('link[href*="styles.css"]')[0])})}catch{}
    }) : $(`#${s}`).remove()
};
//mobile(false)

//----------------------------------------------------------------------------------load
window.onload = () => $('load').hide()
setTimeout(() => $('load').hide(), 6000);

//----------------------------------------------------------------------------------browser
/MSIE|Trident/.test(navigator.userAgent) && $(function(){language === 'zh-CN' ? $('body').html('<msie>请使用其他浏览器</msie>') : $('body').html('<msie>please use another browser</msie>')});

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
        if(langSwitch === 0){if($('[lang]').length === 0) return}
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

//----------------------------------------------------------------------------------music
$(function(){
    const m=$('music').addClass('ico').find('audio').attr({id:'music',autoplay:'',loop:''}).end()
    m.attr('pause')===''&&$('#music')[0].pause()
    m.on('click',function(){
        const a=$('#music')[0]
        $(this).attr('pause')===''?($(this).removeAttr('pause'),a.play().catch(e=>console.log('Autoplay blocked:',e))):($(this).attr('pause',''),a.pause())
    })
    typeof WeixinJSBridge!=='undefined'?WeixinJSBridge.invoke('getNetworkType',{},()=>{$('#music')[0].play().catch(e=>console.log('WeChat play failed:',e))}):document.addEventListener('WeixinJSBridgeReady',()=>{$('#music')[0].play().catch(e=>console.log('WeChat play failed:',e))},!1)
});

//----------------------------------------------------------------------------------audio
$(document).on('click', '[class*="audio-"]', function(){
    var audioName = $(this).attr('class').match(/audio-(\w+)/)[1],
        audioId = 'audio-' + audioName
    if(!$('#' + audioId).length){$('body').append('<audio id="' + audioId + '" src="//ui.gg/lib/media/' + audioName + '.mp3"></audio>')}
    $('#' + audioId)[0].play()
});

//----------------------------------------------------------------------------------fullscreen
$(function(){
    $('.fullscreen').addClass('ico').on('click',function(){
        $(this).toggleClass('active')
        !document.fullscreenElement?(document.documentElement.requestFullscreen?.() || document.documentElement.webkitRequestFullscreen?.() || document.documentElement.mozRequestFullScreen?.()
        ):(document.exitFullscreen?.() || document.webkitExitFullscreen?.()|| document.mozCancelFullScreen?.())
    })
})

//----------------------------------------------------------------------------------touch
$.fn.touch = function(direction, callback, options = {}){
    const config = {
        threshold: 100,
        preventDefault: true,
        ...options
    }
    let startPos = null
    const isTouchDevice = 'ontouchstart' in window
    const eventType = isTouchDevice ? {start: 'touchstart',end: 'touchend'} : {start: 'mousedown',end: 'mouseup'}
    function handleStart(e){
        if(config.preventDefault && e.cancelable) e.preventDefault()
        const point = isTouchDevice ? e.touches[0] : e
        startPos = { x: point.pageX, y: point.pageY }
    }
    function handleEnd(e){
        if(!startPos) return
        if(config.preventDefault && e.cancelable) e.preventDefault()
        const point = isTouchDevice ? (e.changedTouches ? e.changedTouches[0] : e.touches[0]) : e
        const deltaX = point.pageX - startPos.x
        const deltaY = point.pageY - startPos.y
        startPos = null
        if (Math.abs(deltaX) < config.threshold && Math.abs(deltaY) < config.threshold) return
        const isDirectionMatch = direction === 'all' || (direction === 'left' && deltaX < -config.threshold) || (direction === 'right' && deltaX > config.threshold) || (direction === 'up' && deltaY < -config.threshold) || (direction === 'down' && deltaY > config.threshold)
        if (isDirectionMatch) callback()
    }
    return this.on(eventType.start, handleStart).on(eventType.end, handleEnd)
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
    const fillColor = $('nav[uigg]').attr('uigg') || '#fff'
    $('nav[uigg]').prepend(`<svg viewBox="0 0 640 80"><path d="M437.5,0c-59.55,0-53.55,69.83-117.5,69.83S262.05,0,202.5,0H10C4.48,0,0,4.48,0,10v70h640V10c0-5.52-4.48-10-10-10h-192.5Z" fill="${fillColor}"/></svg>`)
    const num = $('nav[uigg] li').length
    $('nav[uigg] li').eq(num === 3 ? 1 : num === 5 ? 2 : -1).addClass('midel')
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
$(function(){
    const randNum = () => Math.round(Math.random() * 100)
    const randCol = () => Math.floor(Math.random() * 256)
    $('[uigg="bg"], [uigg="img"], [uigg="product"], [uigg="avatar"]').each(function(){
        const $el = $(this)
        const url = `//ui.gg/lib/images/${$el.attr('uigg')}?=${randNum()}`
        if($el.css('background-image') === 'none' && !$el.is('img')){$el.css('background-image', `url(${url})`)}
        else if(!$el.attr('src') && $el.is('img')){$el.attr('src', url)}
    })
    $('[uigg="color"]').each(function(){
        const $el = $(this)
        $el.css('background-color', `rgb(${randCol()}, ${randCol()}, ${randCol()})`)
        if($el.is('img')) $el.css({ width: '100%', height: '100%' })
    })
    const generateRandomWord = (length = Math.floor(Math.random() * 8) + 3) => Array.from({length}, () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]).join('')
    const generateRandomSentence = (wordCount = 10) => Array.from({length: wordCount}, () => generateRandomWord()).join(' ')
    const randomSentences = Array.from({length: 10}, generateRandomSentence)
    $('[uigg="txt"]').filter(function(){return !$(this).attr('lang') && !$(this).html()}).append(randomSentences)
    $('[uigg="title"]').filter(function(){return !$(this).attr('lang') && !$(this).html()}).each(function(){$(this).append(randomSentences[Math.floor(Math.random() * randomSentences.length)])})
    $('[uigg="emot"]').html(Array.from({length: 100}, (_, i) => `<s style="background-image: url(//ui.gg/lib/emot/${i+1}.svg)"></s>`).join(''))
});

//----------------------------------------------------------------------------------disable
function disable(){
    document.oncontextmenu = e => {
        try{const {tagName, type} = e.target
            if(!(tagName === 'INPUT' && type?.toLowerCase() === 'text') && tagName !== 'TEXTAREA') e.preventDefault()
        }catch{e.preventDefault()}
    }
    window.addEventListener('keydown', e => {if((e.ctrlKey && ['u','s'].includes(e.key)) || e.key === 'F12') e.preventDefault()})
    window.onhelp = () => false
    document.onselectstart = e => {
        const {tagName, type} = e.target
        if(!(tagName === 'INPUT' && type?.toLowerCase() === 'text') && tagName !== 'TEXTAREA'){
            e.preventDefault()
            return false
        }
    }
    const noSelectStyle = document.createElement('style')
    noSelectStyle.textContent = `* {user-select: none;-webkit-user-select: none;-moz-user-select: none;}
        input[type="text"], textarea {user-select: text !important;-webkit-user-select: text !important;-moz-user-select: text !important;}`
    document.head.appendChild(noSelectStyle)
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
        const $li = $(this), idx = $li.index()
        $li.addClass('active').siblings().removeClass('active').closest('tab').find('tab-cont').children().eq(idx).addClass('active').siblings().removeClass('active')
    })
});

//----------------------------------------------------------------------------------pop
$(function(){
    $('pop').addClass('anime-fade-in').append('<x></x>')
    .each(function(){$(this).find('pop-sider').addClass($(this).attr('right') === '' ? 'anime-fade-in-right' : 'anime-fade-in-left')})
    .each(function(){$(this).find('pop-choice').addClass($(this).attr('top') === '' ? 'anime-fade-in-down' : 'anime-fade-in-up')})
    .on('click', '.close, > x', function(){$(this).parents('pop').hide()})
    $('pop-main').addClass('anime-zoom-in').wrap('<div class="full center"></div>')
    $('pop-title .close').addClass('ico').before('<u></u>')
    $('a[pop]').click(function(){$(`pop[pop="${$(this).attr('pop')}"]`).show()})
});

//----------------------------------------------------------------------------------menu
function isMobileView(){return $(window).width() <= 640 || $('#mobile').length}
$(function(){
    $('menu').append('<x class="ico"></x>')
    $('menu x').click(function(){$('menu-cont').toggle()})
    $('menu-cont,menu-group').addClass('anime-fade-in')
    if(isMobileView()){
        $('menu-cont li > a').click(function(){
            let menuGroup = $(this).siblings('menu-group')
            if(menuGroup.css('display') == 'block'){menuGroup.hide()}
            else{$('menu-group').hide();menuGroup.show()}
        })
    }
    $('.menu-cont a').click(function(){$('.menu-cont').hide()})
})
if(isMobileView()) $('menu-cont a').click(function(){$('menu-cont').hide()});

//----------------------------------------------------------------------------------toggle
$(function(){
    const toggleSelectors = ['o.checkbox', 'o.checkbox-done', 'o.checkbox-cancel', 'o.favorite', 'o.star', 'o.visibility', 'o.password', 'o.mic', 'o.volume', 'o.muzak', 'o.phonecard', 'o.cinema', 'o.camera', 'o.aim', 'o.semaphore', 'o.suitcase', 'o.light', 'o.thumb-up', 'o.thumb-down', 'o.devicerotate', 'o.thumbtack', 'o.bell', 'o.place', 'o.link', 'o.blur', 'o.toggle']
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
    const $scalerInputs = $('scaler input')
    $scalerInputs.before('<a class="btn ico ico-reduce"></a>').after('<a class="btn ico ico-add"></a>').on('input', function(){if(!Number($(this).val())) $(this).val('')})
    $('scaler').on('click', 'a', function(){
        const $input = $(this).siblings('input')
        const step = Number($input.attr('step') || 1)
        const decimalPlaces = step.toString().includes('.') ? step.toString().split('.')[1].length : 0
        const max = Number($input.attr('max'))
        const min = Number($input.attr('min') || 0)
        const currentValue = Number($input.val()) || 0
        const newValue = $(this).hasClass('ico-add') ? Math.min(currentValue + step, max) : Math.max(currentValue - step, min)
        $input.val(newValue.toFixed(decimalPlaces))
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
const uploadAlert = language === 'zh-CN' ? '文件格式必须是' : 'File format must be'
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
    if(align == 'bottom') $('notify').addClass('bottom')
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
const [copyRight, copyErr] = language === 'zh-CN' ? ['复制成功', '复制失败'] : ['Copy successful', 'Could not copy text']
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
    const $hop = $('hop'),
          $hopA = $hop.find('> a'),
          $hopCont = $('hop-cont'),
          hopHeight = $hopA.height()
    $hopCont.addClass('anime-fade-in').before('<x></x>')
    $hopA.on('click', function(){$(this).siblings('hop-cont, x').toggle()})
    $hop.on('click', 'hop-cont, x', function(){$(this).add($(this).siblings('hop-cont, x')).hide()})
    $hop.filter('[bottom]').find('hop-cont').css('bottom', hopHeight)
    $hop.filter('[center]').find('hop-cont').css('top', hopHeight)
    $hop.filter('[center][bottom]').find('hop-cont').css({bottom: hopHeight,top: 'auto'})
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
const setCookie = (name, value, hours = 0) => {
    let cookie = `${name}=${encodeURIComponent(value)}`
    if(hours > 0){
        const date = new Date()
        date.setTime(date.getTime() + hours * 3600 * 1000)
        cookie += `;expires=${date.toUTCString()}`
    }document.cookie = cookie
}
const getCookie = name => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}

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
    $('crumb li').first().prepend('<i class="ico ico-home"></i>').end().not(':first').prepend('<i class="ico ico-alone-right"></i>')
});

//----------------------------------------------------------------------------------clue
$(function(){
    $('[clue]').each(function(){
        const $element = $(this)
        const titleValue = $element.attr('title')
        if(titleValue && titleValue.trim() !== '') $element.attr('clue', titleValue).removeAttr('title')
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
const [langConfirm, langCancel] = language === 'zh-CN' ? ['确认', '取消'] : ['confirm', 'cancel']
function alert(message){
    const $alert = $(`<alert class="anime-fade-in"><alert-main class="anime-fade-in-down"><alert-cont>${message}</alert-cont><alert-solve><a class="btn">${langConfirm}</a></alert-solve></alert-main></alert>`).appendTo('body')
    const handleClose = () => $alert.remove()
    $alert.find('alert-solve a').click(handleClose)
    $(document).on('keydown.alertClose', (e) => {if(['Enter', 'Escape', ' '].includes(e.key))handleClose()})
}
function confirm(message){
    return new Promise((resolve) => {
        const $alert = $(`<alert class="anime-fade-in"><alert-main class="anime-fade-in-down"><alert-cont>${message}</alert-cont><alert-solve><a class="btn" id="alert-cancel">${langCancel}</a><a class="btn" id="alert-confirm">${langConfirm}</a></alert-solve></alert-main></alert>`).appendTo('body')
        const cleanup = () => {
            $alert.remove()
            $(document).off('keydown.confirmEvent')
        }
        const handleConfirm = () => {
            cleanup()
            resolve(true)
        }
        const handleCancel = () => {
            cleanup()
            resolve(false)
        }
        $('#alert-confirm').on('click', handleConfirm)
        $('#alert-cancel').on('click', handleCancel)
        $(document).on('keydown.confirmEvent', (e) => {
            if(e.key === 'Enter') handleConfirm()
            if(e.key === 'Escape') handleCancel()
        })
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
    const $notice = $('notice')
    $notice.html(`<i class="ico ico-volume"></i><notice-cont><aside>${$notice.html()}</aside></notice-cont>${$notice.attr('href') ? `<a href="${$notice.attr('href')}" class="ico ico-more-horizontal"></a>` : ''}`)
});

//----------------------------------------------------------------------------------recording
$(function(){
    $('.recording').click(async function(){
        try{const stream = await navigator.mediaDevices.getDisplayMedia({video: true})
            const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm"
            const mediaRecorder = new MediaRecorder(stream, {mimeType: mime})
            const chunks = []
            mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, {type: chunks[0].type})
                const url = URL.createObjectURL(blob)
                const $a = $('<a>', {href: url, download: `recording-${new Date().toISOString().slice(0,10)}.webm`}).appendTo('body')
                $a[0].click()
                setTimeout(() => {
                    $a.remove()
                    URL.revokeObjectURL(url)
                }, 100)
            }
            mediaRecorder.start()
        }catch(error){console.error('Recording failed:', error)}
    })
});










