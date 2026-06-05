/*
 * uigg 3.0 (build 20260604)
 * Project: https://ui.gg
 * Author: https://www.mixice.com
 * Github: https://github.com/mixice/uigg
 * license: MIT
 */

console.log('%c BRACKET BY UIGG ','background-image: linear-gradient(90deg,slateblue,deeppink);color:white','http://ui.gg')
const language = navigator.language || navigator.userLanguage;

// Cookie helpers
const setCookie = (name, value, hours = 0) => {
    let cookie = `${name}=${encodeURIComponent(value)}`
    if(hours > 0){
        const date = new Date()
        date.setTime(date.getTime() + hours * 3600 * 1000)
        cookie += `;expires=${date.toUTCString()}`
    }
    document.cookie = cookie
}
const getCookie = name => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}
// Rem responsive
(function(doc, win){
    const docEl = doc.documentElement
    const calcFontSize = () => {
        const viewWidth = Math.max(320, Math.min(640, docEl.clientWidth))
        docEl.style.fontSize = `${100 * (viewWidth / 640)}px`
    }
    calcFontSize()
    win.ResizeObserver ? new ResizeObserver(calcFontSize).observe(docEl) : win.addEventListener('resize', calcFontSize)
})(document, window)

// Mobile CSS extraction — force mobile styles on desktop
function mobile(force){
    if(force){
        const style = document.createElement('style')
        style.id = 'mobile'
        let css = ''
        document.querySelectorAll('style, link[rel="stylesheet"]').forEach(el => {
            try {
                if(!el.sheet) return
                [...(el.sheet.cssRules || [])].forEach(r => {if(r instanceof CSSMediaRule && r.conditionText?.includes('max-width: 640px')){css += [...(r.cssRules || [])].map(c => c.cssText).join('')}})
            }catch{}
        })
        style.textContent = css
        document.head.appendChild(style)
    } else {
        const el = document.getElementById('mobile')
        el?.remove()
    }
}

// Utility
const randNum = () => Math.round(Math.random() * 100)
const randCol = () => Math.floor(Math.random() * 256)
const generateRandomWord = (length = Math.floor(Math.random() * 8) + 3) => Array.from({length}, () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]).join('')
const generateRandomSentence = (wordCount = 10) => Array.from({length: wordCount}, () => generateRandomWord()).join(' ')
const randomSentences = Array.from({length: 10}, generateRandomSentence)

// Lang read
function langRead(targetObj, data){
    let langVal = targetObj.split('-')
    let result = data
    for(let i = 0; i < langVal.length - 1; i++){result = result?.[langVal[i]]?.[0]}
    return result?.[langVal[langVal.length - 1]] ?? ''
}

// isMobileView
function isMobileView(){return document.documentElement.clientWidth <= 640 || document.documentElement.classList.contains('force-mobile')}

// Locale constants
const [langConfirm, langCancel] = language === 'zh-CN' ? ['确认', '取消'] : ['confirm', 'cancel']
const [copyRight, copyErr] = language === 'zh-CN' ? ['复制成功', '复制失败'] : ['Copy successful', 'Could not copy text']
const uploadAlert = language === 'zh-CN' ? '文件格式必须是' : 'File format must be'

// Alert DOM helper
function createAlertDOM(message, extra = ''){
    const alert = document.createElement('alert')
    alert.className = 'anime-fade-in'
    alert.innerHTML = `<alert-main class="anime-fade-in-down"><alert-cont>${message}</alert-cont>${extra}<alert-solve></alert-solve></alert-main>`
    return alert
}
function btnHTML(label, id = ''){return `<a class="btn"${id ? ` id="${id}"` : ''}>${label}</a>`}

// Tip
function tip(str, type, time){
    if(!isNaN(type)){time = +type; type = undefined}
    time ??= 3000
    const cls = 't' + Math.round(Math.random() * 999999)
    const tipEl = document.createElement('tip')
    tipEl.className = `${cls} center anime-zoom-in${type ? ' ' + type : ''}`
    tipEl.innerHTML = str
    document.body.appendChild(tipEl)
    const t = document.querySelector(`.${cls}`)
    if(t){t.style.margin = `-${Math.round(t.offsetHeight/2)}px 0 0 -${Math.round(t.offsetWidth/2)}px`}
    if(time > 0) setTimeout(() => tipEl.remove(), time)
}

// Notify
function notifyRemove(notifyThis){
    notifyThis.classList.add('anime-bounce-out-right')
    setTimeout(() => notifyThis.remove(),500)
}
function notify(str, align, time){
    let notifyEl = document.querySelector('notify')
    if(!notifyEl){
        notifyEl = document.createElement('notify')
        notifyEl.innerHTML = '<audio src="//ui.gg/lib/media/notify.mp3"></audio>'
        document.body.appendChild(notifyEl)
    }
    const cls = 'n' + Math.round(Math.random() * 999999)
    if(align === 'bottom') notifyEl.classList.add('bottom')
    else notifyEl.classList.remove('bottom')
    const li = document.createElement('li')
    li.className = `${cls} anime-bounce-in-right`
    li.innerHTML = `<x class="ico ico-close"></x>${str}`
    notifyEl.appendChild(li)
    const notifyAudio = notifyEl.querySelector('audio')
    notifyAudio.currentTime = 0
    notifyAudio.play()
    if(time !== undefined){setTimeout(() => notifyRemove(li), time)}
}

// Copy
function copySelectedText(event){
    const selection = window.getSelection()
    if(!selection.rangeCount || selection.isCollapsed) return
    const node = selection.anchorNode.nodeType === 1 ? selection.anchorNode : selection.anchorNode.parentElement
    if(node?.closest('[copy-select]')){
        const selectedText = selection.toString().trim()
        if(selectedText) navigator.clipboard.writeText(selectedText).then(() => tip(copyRight),err => tip(copyErr + err))
    }
}

// Countdown
let _countDate = ''
function countdownFn(date){
    if(date !== undefined) _countDate = date
    const leftTime = new Date(_countDate).getTime() - Date.now()
    if(leftTime < 0) return
    const d = Math.floor(leftTime/1000/60/60/24)
    const h = Math.floor(leftTime/1000/60/60%24)
    const m = Math.floor(leftTime/1000/60%60)
    const s = Math.floor(leftTime/1000%60)
    const digit = (num,n) => num.toString().padStart(n, '0')
    document.querySelectorAll('countdown d').forEach(el => el.textContent = d)
    document.querySelectorAll('countdown h').forEach(el => el.textContent = digit(h,2))
    document.querySelectorAll('countdown m').forEach(el => el.textContent = digit(m,2))
    document.querySelectorAll('countdown s').forEach(el => el.textContent = digit(s,2))
    setTimeout(countdownFn, 1000)
}

// Alert / Confirm / Prompt
function alertFn(message){
    const alertEl = createAlertDOM(message)
    alertEl.querySelector('alert-solve').innerHTML = btnHTML(langConfirm)
    document.body.appendChild(alertEl)
    const close = () => {alertEl.remove(); document.removeEventListener('keydown', keyHandler)}
    alertEl.querySelector('a').addEventListener('click', close)
    function keyHandler({key}){if(['Enter', 'Escape', ' '].includes(key)) close()}
    document.addEventListener('keydown', keyHandler)
}
function confirmFn(message){
    return new Promise((resolve) => {
        const alertEl = createAlertDOM(message)
        alertEl.querySelector('alert-solve').innerHTML = btnHTML(langCancel, 'alert-cancel') + btnHTML(langConfirm, 'alert-confirm')
        document.body.appendChild(alertEl)
        const done = (result) => {alertEl.remove(); document.removeEventListener('keydown', keyHandler); resolve(result)}
        alertEl.querySelector('#alert-confirm').addEventListener('click', () => done(true))
        alertEl.querySelector('#alert-cancel').addEventListener('click', () => done(false))
        function keyHandler({key}){if(key === 'Enter') done(true); if(key === 'Escape') done(false)}
        document.addEventListener('keydown', keyHandler)
    })
}
function promptFn(message, defaultValue = ''){
    return new Promise((resolve) => {
        const alertEl = createAlertDOM(message, `<input type="text" id="alert-input" value="${defaultValue}">`)
        alertEl.querySelector('alert-solve').innerHTML = btnHTML(langCancel, 'alert-cancel') + btnHTML(langConfirm, 'alert-confirm')
        document.body.appendChild(alertEl)
        const done = (result) => {alertEl.remove(); document.removeEventListener('keydown', keyHandler); resolve(result)}
        alertEl.querySelector('#alert-confirm').addEventListener('click', () => done(alertEl.querySelector('#alert-input').value))
        alertEl.querySelector('#alert-cancel').addEventListener('click', () => done(null))
        function keyHandler({key}){if(key === 'Enter') done(alertEl.querySelector('#alert-input').value); if(key === 'Escape') done(null)}
        document.addEventListener('keydown', keyHandler)
    })
}

// Disable
function disable(){
    document.addEventListener('contextmenu', e => e.preventDefault())
    document.addEventListener('selectstart', e => e.preventDefault())
    document.addEventListener('dragstart', e => e.preventDefault(), true)
    document.addEventListener('copy', e => e.preventDefault(), true)
    document.addEventListener('cut', e => e.preventDefault(), true)
    window.onhelp = () => false
    window.addEventListener('keydown', e => {if((e.ctrlKey && ['u','s','i','j'].includes(e.key.toLowerCase())) || e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['i','j'].includes(e.key.toLowerCase()))) {e.preventDefault()}})
    const style = document.createElement('style')
    style.textContent = `*{user-select:none!important;-webkit-user-select:none!important;cursor:default!important;}`
    document.head.appendChild(style)
}

// Lug
function lug(){
    document.querySelectorAll('.lug-thumbs a').forEach(a => a.addEventListener('click', function(){
        this.classList.add('active')
        this.parentElement?.querySelectorAll(':scope > a').forEach(s => s !== this && s.classList.remove('active'))
    }))
    if(typeof Swiper === 'undefined') return
    const thumbs = document.querySelectorAll('.lug-thumbs a')
    new Swiper('.lug-top',{
        on:{
            touchEnd: function(){
                const idx = this.loop ? this.realIndex : this.activeIndex
                thumbs.forEach((a,i) => a.classList.toggle('active', i === idx))
            },
        },
    })
}

// ============ Custom Elements ============
// Load
class Load extends HTMLElement {
    connectedCallback(){
        this.hide()
        setTimeout(() => this.hide(), 6000)
    }
    hide(){this.style.display = 'none'}
}
// Music
class Music extends HTMLElement {
    connectedCallback(){
        this.classList.add('ico')
        const audio = this.querySelector('audio')
        if(!audio) return
        audio.id = 'music'
        audio.autoplay = true
        audio.loop = true
        if(this.hasAttribute('pause')) audio.pause()
        this.addEventListener('click', () => {
            if(audio.paused){
                this.removeAttribute('pause')
                audio.play().catch(() => {})
            } else {
                this.setAttribute('pause', '')
                audio.pause()
            }
        })
    }
}
// Name
class Name extends HTMLElement {
    connectedCallback(){
        this.classList.add('anime-fade-in-down')
        const searchInput = this.querySelector('name-search input')
        if(searchInput){
            const icon = document.createElement('i')
            icon.className = 'ico ico-search'
            searchInput.parentElement?.insertBefore(icon, searchInput)
        }
        this.querySelectorAll('h2, name-logo').forEach(el => {
            const u = document.createElement('u')
            el.parentElement?.insertBefore(u, el.nextSibling)
        })
    }
}

// Nav
class Nav extends HTMLElement {
    connectedCallback(){
        this.classList.add('anime-fade-in-up')
        const space = document.createElement('space')
        this.parentElement?.insertBefore(space, this)
        if(this.hasAttribute('uigg')){
            const fillColor = this.getAttribute('uigg') || '#fff'
            const svg = document.createElement('div')
            svg.innerHTML = `<svg viewBox="0 0 640 80"><path d="M437.5,0c-59.55,0-53.55,69.83-117.5,69.83S262.05,0,202.5,0H10C4.48,0,0,4.48,0,10v70h640V10c0-5.52-4.48-10-10-10h-192.5Z" fill="${fillColor}"/></svg>`
            this.prepend(svg.firstElementChild)
            const lis = this.querySelectorAll('li')
            const num = lis.length
            const midIdx = num === 3 ? 1 : num === 5 ? 2 : lis.length - 1
            if(lis[midIdx]) lis[midIdx].classList.add('midel')
        }
    }
}

// Tab
class Tab extends HTMLElement {
    connectedCallback(){
        this.querySelectorAll('tab-group').forEach(g => g.classList.add('anime-fade-in'))
        const lis = this.querySelectorAll(':scope > tab-list > li')
        lis.forEach(li => li.addEventListener('click', function(){
            const idx = [...li.parentElement.children].indexOf(li)
            li.classList.add('active')
            lis.forEach(l => l !== li && l.classList.remove('active'))
            const conts = this.closest('tab')?.querySelectorAll(':scope > tab-cont > *') || []
            conts.forEach((c,i) => c.classList.toggle('active', i === idx))
        }))
    }
}

// Pop
class Pop extends HTMLElement {
    connectedCallback(){
        this.classList.add('anime-fade-in')
        const x = document.createElement('x')
        this.appendChild(x)
        const sider = this.querySelector('pop-sider')
        if(sider){sider.classList.add(this.hasAttribute('right') ? 'anime-fade-in-right' : 'anime-fade-in-left')}
        const choice = this.querySelector('pop-choice')
        if(choice){choice.classList.add(this.hasAttribute('top') ? 'anime-fade-in-down' : 'anime-fade-in-up')}
        this.addEventListener('click', (e) => {
            const t = e.target
            if(t.matches?.('.close, x')){this.style.display = 'none'}
        })
        const main = this.querySelector('pop-main')
        if(main){
            main.classList.add('anime-zoom-in')
            const wrapper = document.createElement('div')
            wrapper.className = 'full center'
            main.parentElement?.replaceChild(wrapper, main)
            wrapper.appendChild(main)
        }
        const closeBtn = this.querySelector('pop-title .close')
        if(closeBtn){
            closeBtn.classList.add('ico')
            const u = document.createElement('u')
            closeBtn.parentElement?.insertBefore(u, closeBtn)
        }
    }
}

// Menu
class Menu extends HTMLElement {
    connectedCallback(){
        const xBtn = document.createElement('x')
        xBtn.className = 'ico'
        this.appendChild(xBtn)
        const menuCont = this.querySelector('menu-cont')
        if(isMobileView() && menuCont) menuCont.style.display = 'none'
        menuCont?.classList.add('anime-fade-in')
        this.querySelectorAll('menu-group').forEach(g => g.classList.add('anime-fade-in'))
        xBtn.addEventListener('click', () => {if(menuCont) menuCont.style.display = menuCont.style.display === 'none' ? 'block' : 'none'})
        menuCont?.addEventListener('click', (e) => {
            const a = e.target.closest('a')
            if(!a || !isMobileView()) return
            const li = a.parentElement
            if(li?.tagName === 'LI' && li.parentElement?.tagName?.toLowerCase() === 'menu-cont'){
                const group = a.nextElementSibling
                if(group?.tagName?.toLowerCase() === 'menu-group'){
                    const isVisible = group.offsetParent !== null
                    menuCont.querySelectorAll(':scope > li > menu-group').forEach(g => g.style.display = 'none')
                    if(!isVisible) group.style.display = 'block'
                    return
                }
                return
            }
            menuCont.style.display = 'none'
        })
        window.addEventListener('resize', () => {
            if(!menuCont) return
            const mobile = isMobileView()
            menuCont.style.display = mobile ? 'none' : ''
            this.querySelectorAll('menu-group').forEach(g => g.style.display = '')
        })
    }
}

// Scaler
class Scaler extends HTMLElement {
    connectedCallback(){
        const input = this.querySelector('input')
        if(!input) return
        const reduce = document.createElement('a')
        reduce.className = 'btn btn-empty ico ico-reduce'
        const add = document.createElement('a')
        add.className = 'btn btn-empty ico ico-add'
        input.parentElement?.insertBefore(reduce, input)
        input.parentElement?.insertBefore(add, input.nextSibling)
        input.addEventListener('input', () => {if(!Number(input.value)) input.value = ''})
        this.addEventListener('click', (e) => {
            if(e.target.tagName !== 'A') return
            const step = Number(input.getAttribute('step') || 1)
            const decimalPlaces = step.toString().includes('.') ? step.toString().split('.')[1].length : 0
            const max = Number(input.getAttribute('max'))
            const min = Number(input.getAttribute('min') || 0)
            const currentValue = Number(input.value) || 0
            const isAdd = e.target.classList.contains('ico-add')
            const newValue = isAdd ? Math.min(currentValue + step, max) : Math.max(currentValue - step, min)
            input.value = newValue.toFixed(decimalPlaces)
        })
    }
}

// Choice
class Choice extends HTMLElement {
    connectedCallback(){
        const x = document.createElement('x')
        this.appendChild(x)
        this.addEventListener('click', () => this.classList.toggle('active'))
        this.querySelectorAll('choice-list a').forEach(a => a.addEventListener('click', function(){this.parentElement?.parentElement?.querySelectorAll(':scope > a').forEach(s => {if(s !== this) s.innerHTML = this.innerHTML})}))
    }
}

// Progress
class Progress extends HTMLElement {
    static observedAttributes = ['color']
    connectedCallback(){
        const color = this.getAttribute('color')
        if(color){
            this.style.color = color
            this.style.setProperty('--progress-color', color)
        }
    }
    attributeChangedCallback(){this.connectedCallback()}
}

// Drop
class Drop extends HTMLElement {
    connectedCallback(){
        const dropList = this.querySelector('drop-list')
        if(!dropList) return
        dropList.parentElement?.insertBefore(Object.assign(document.createElement('i'),{className:'ico ico-alone-right'}), dropList)
        const dropCont = document.createElement('drop-cont')
        const firstLi = dropList.querySelector('li')
        if(firstLi) dropCont.innerHTML = firstLi.innerHTML
        this.appendChild(dropCont)
        dropCont.addEventListener('click', () => this.classList.toggle('active'))
        dropList.classList.add('anime-fade-in')
        const ul = dropList.querySelector('ul')
        if(ul){
            const x = document.createElement('x')
            ul.parentElement?.insertBefore(x, ul)
            x.addEventListener('click', () => this.classList.remove('active'))
        }
        dropList.querySelectorAll('li').forEach(li => {
            const subDrop = li.querySelector('drop-list')
            if(subDrop){
                li.insertBefore(Object.assign(document.createElement('i'),{className:'ico ico-alone-right'}), subDrop)
                return
            }
            li.addEventListener('click', function(){
                dropCont.innerHTML = this.innerHTML
                this.closest('drop')?.classList.remove('active')
            })
        })
    }
}

// Rate
class Rate extends HTMLElement {
    static observedAttributes = ['value', 'edit']
    connectedCallback(){
        this.innerHTML = '<i class="ico"></i><i class="ico"></i><i class="ico"></i><i class="ico"></i><i class="ico"></i>'
        const val = parseInt(this.getAttribute('value')) || 0
        this.querySelectorAll('i').forEach((i,idx) => {if(idx < val) i.classList.add('active')})
        if(this.hasAttribute('edit')){
            this.querySelectorAll('i').forEach(i => i.addEventListener('click', function(){
                const idx = [...this.parentElement.children].indexOf(this)
                this.parentElement.querySelectorAll('i').forEach((s,j) => s.classList.toggle('active', j <= idx))
                this.parentElement.setAttribute('value', idx + 1)
            }))
        }
    }
}

// Empty
class Empty extends HTMLElement {
    connectedCallback(){
        if(!this.innerHTML.trim()){
            const emptyText = language === 'zh-CN' ? '暂无内容' : 'empty'
            this.setAttribute('data-empty', emptyText)
            this.classList.add('default')
        }
    }
}

// Hop
class Hop extends HTMLElement {
    connectedCallback(){
        const hopA = this.querySelector(':scope > a')
        const hopCont = this.querySelector('hop-cont')
        if(!hopA || !hopCont) return
        hopCont.classList.add('anime-fade-in')
        hopCont.style.display = 'none'
        const x = document.createElement('x')
        x.style.display = 'none'
        hopCont.parentElement?.insertBefore(x, hopCont)
        const hopHeight = hopA.offsetHeight
        const toggle = () => {
            hopCont.style.display = hopCont.style.display !== 'none' ? 'none' : 'block'
            x.style.display = hopCont.style.display
        }
        hopA.addEventListener('click', toggle)
        this.addEventListener('click', (e) => {
            if(e.target === hopCont || e.target === x){
                hopCont.style.display = 'none'
                x.style.display = 'none'
            }
        })
        if(this.hasAttribute('center') && this.hasAttribute('bottom')){
            hopCont.style.bottom = hopHeight + 'px'
            hopCont.style.top = 'auto'
        }else if(this.hasAttribute('center')){hopCont.style.top = hopHeight + 'px'
        }else if(this.hasAttribute('bottom')){hopCont.style.bottom = hopHeight + 'px'}
    }
}

// Fold
class Fold extends HTMLElement {
    static observedAttributes = ['show']
    connectedCallback(){
        const foldTitles = this.querySelectorAll('fold-title')
        foldTitles.forEach(u => u.querySelector('u')?.parentElement?.appendChild(Object.assign(document.createElement('s'), {className: 'ico ico-alone-bottom'})))
        this.querySelectorAll('fold-cont').forEach(c => c.classList.add('anime-fade-in'))
        if(this.getAttribute('show') === ''){
            this.querySelectorAll('fold-group').forEach(g => g.classList.add('active'))
            foldTitles.forEach(t => t.addEventListener('click', () => {t.closest('fold-group')?.classList.toggle('active')}))
        }else{
            foldTitles.forEach(t => t.addEventListener('click', function(){
                const fg = this.closest('fold-group')
                if(fg?.classList.contains('active')){fg.classList.remove('active')}
                else{
                    this.closest('fold')?.querySelectorAll('fold-group').forEach(g => g.classList.remove('active'))
                    fg?.classList.add('active')
                }
            }))
        }
    }
}

// Step
class Step extends HTMLElement {
    connectedCallback(){
        const liArr = [...this.children]
        this.innerHTML = ''
        const ul = document.createElement('ul')
        liArr.forEach(li => ul.appendChild(li))
        this.appendChild(ul)
        this.querySelectorAll('li').forEach((li, idx) => {
            const span = document.createElement('span')
            span.innerHTML = li.innerHTML
            li.innerHTML = ''
            li.appendChild(span)
            const i = document.createElement('i')
            i.textContent = idx + 1
            li.prepend(i)
        })
    }
}

// Crumb
class Crumb extends HTMLElement {
    connectedCallback(){
        const lis = this.querySelectorAll('li')
        lis.forEach((li, idx) => {
            const i = document.createElement('i')
            i.className = idx === 0 ? 'ico ico-home' : 'ico ico-alone-right'
            li.prepend(i)
        })
    }
}

// Horn
class Horn extends HTMLElement {
    connectedCallback(){}
}

// Notice
class Notice extends HTMLElement {
    connectedCallback(){
        const href = this.getAttribute('href') || ''
        const children = [...this.children]
        this.innerHTML = `<i class="ico ico-volume"></i><notice-cont><aside></aside></notice-cont>${href ? `<a href="${href}" class="ico ico-more-horizontal"></a>` : ''}`
        this.querySelector('notice-cont aside').append(...children)
    }
}

//  Page
function pageRender(el){
    const total = parseInt(el.getAttribute('total')) || 0
    const p = parseInt(el.getAttribute('page')) || 1
    const limit = parseInt(el.getAttribute('limit')) || 10
    const pages = Math.max(1, Math.ceil(total / limit))
    if(pages <= 1){el.innerHTML = ''; return}
    let start = Math.max(1, p - 2)
    let end = Math.min(pages, start + 4)
    if(end - start < 4) start = Math.max(1, end - 4)

    let html = ''
    html += `<a class="ico ico-alone-side-left" data-action="first" ${p<=1?'disabled':''}></a>`
    html += `<a class="ico ico-alone-left" data-action="prev" ${p<=1?'disabled':''}></a>`
    html += '<ul>'
    for(let i = start; i <= end; i++){html += `<a href="javascript:void(0)" ${i===p?'class="active"':''} data-page="${i}">${i}</a>`}
    html += '</ul>'
    html += `<a class="ico ico-alone-right" data-action="next" ${p>=pages?'disabled':''}></a>`
    html += `<a class="ico ico-alone-side-right" data-action="last" ${p>=pages?'disabled':''}></a>`
    html += `<span>${p}/${pages}</span>`
    html += `<input type="text" data-jump>`
    html += `<a class="ico ico-arrow-enter" data-go></a>`
    el.innerHTML = html
    el._pageGo = (pg) => {
        const curTotal = parseInt(el.getAttribute('total')) || 0
        const curPages = Math.max(1, Math.ceil(curTotal / limit))
        if(pg < 1 || pg > curPages) return
        el.setAttribute('page', pg)
        el.dispatchEvent(new CustomEvent('pagechange', {
            detail: {page: pg, limit, total: curTotal, pages: curPages},
            bubbles: true
        }))
        pageRender(el)
    }
    if(!el._pageBound){
        el.addEventListener('click', e => {
            const target = e.target.closest('[data-action], [data-page]')
            if(!target) return
            const action = target.dataset.action
            const pageNum = target.dataset.page
            if(pageNum) return el._pageGo(parseInt(pageNum))
            if(action === 'go'){
                const val = parseInt(el.querySelector('[data-jump]')?.value)
                if(val) el._pageGo(val)
                return
            }
            if(action === 'first') return el._pageGo(1)
            if(action === 'last'){
                const p = Math.max(1, Math.ceil((parseInt(el.getAttribute('total')) || 0) / limit))
                return el._pageGo(p)
            }
            if(action === 'prev') return el._pageGo((parseInt(el.getAttribute('page')) || 1) - 1)
            if(action === 'next') return el._pageGo((parseInt(el.getAttribute('page')) || 1) + 1)
        })
        el._pageBound = true
    }
    el.jumpTo = function(pg, newTotal){
        if(newTotal !== undefined) el.setAttribute('total', newTotal)
        if(!el._pageGo || newTotal !== undefined) pageRender(el)
        el._pageGo(pg)
    }
    const goBtn = el.querySelector('[data-go]')
    if(goBtn) goBtn.addEventListener('click', (e) => {e.stopPropagation(); const val = parseInt(el.querySelector('[data-jump]')?.value); if(val) el._pageGo(val)})
    const input = el.querySelector('[data-jump]')
    if(input) input.addEventListener('keydown', (e) => {if(e.key === 'Enter'){e.stopPropagation(); const val = parseInt(e.target.value); if(val) el._pageGo(val)}})
}

// ============ Fallback Init for non-hyphenated element names ============
function initCustomElements(){
    const map = [
        ['load', Load], ['music', Music], ['name', Name], ['nav', Nav],
        ['tab', Tab], ['pop', Pop], ['menu', Menu], ['scaler', Scaler],
        ['choice', Choice], ['progress', Progress], ['drop', Drop],
        ['rate', Rate], ['empty', Empty], ['hop', Hop], ['fold', Fold],
        ['step', Step], ['crumb', Crumb], ['n', Horn], ['notice', Notice]
    ]
    map.forEach(([tag, Cls]) => {
        if(customElements.get(tag)) return
        try{customElements.define(tag, Cls); return}catch(e){}
        document.querySelectorAll(tag).forEach(el => {
            Object.setPrototypeOf(el, Cls.prototype)
            el.connectedCallback()
        })
    })
}

// ============ Init Functions ============
function initPage(){document.querySelectorAll('page').forEach(el => pageRender(el))}
function initLazy(){document.querySelectorAll('[lazy]').forEach(el => el.setAttribute('loading', 'lazy'))}
let langSwitch = 0
function initLang(){
    let langType = getCookie('lang') === '' ? 'en' : getCookie('lang')
    function lang(){
        if(document.querySelectorAll('[lang]').length === 0) return
        fetch(`../lang/${langType}.json`).then(async r => {
            if(!r.ok) return
            const data = await r.json()
            document.querySelectorAll('[lang]').forEach(el => el.innerHTML = langRead(el.getAttribute('lang'), data))
            document.querySelectorAll('[lang-placeholder]').forEach(el => el.placeholder = langRead(el.getAttribute('lang-placeholder'), data))
            document.querySelectorAll('[lang-value]').forEach(el => el.setAttribute('value', langRead(el.getAttribute('lang-value'), data)))
            document.querySelectorAll('[lang-content]').forEach(el => el.setAttribute('content', langRead(el.getAttribute('lang-content'), data)))
        }).catch(() => {})
    }
    lang()
    document.querySelectorAll('[lang-set]').forEach(el => el.addEventListener('click', function(){
        langType = this.getAttribute('lang-set')
        setCookie('lang', langType, '72')
        lang()
    }))
}
function initFullscreen(){
    document.querySelectorAll('.fullscreen').forEach(el => {
        el.classList.add('ico')
        el.addEventListener('click', function(){
            if(!document.fullscreenElement){
                document.documentElement.requestFullscreen?.() || document.documentElement.webkitRequestFullscreen?.() || document.documentElement.mozRequestFullScreen?.()
            }else{document.exitFullscreen?.() || document.webkitExitFullscreen?.() || document.mozCancelFullScreen?.()}
        })
    })
    document.addEventListener('fullscreenchange', () => {document.querySelectorAll('.fullscreen').forEach(el => el.classList.toggle('active', !!document.fullscreenElement))})
}
function initAudio(){
    document.addEventListener('click', (e) => {
        const cls = e.target.className
        if(typeof cls === 'string' && cls.includes('audio-')){
            const match = cls.match(/audio-(\w+)/)
            if(!match) return
            const audioName = match[1]
            const audioId = 'audio-' + audioName
            let audio = document.getElementById(audioId)
            if(!audio){
                audio = document.createElement('audio')
                audio.id = audioId
                audio.src = `//ui.gg/lib/media/${audioName}.mp3`
                document.body.appendChild(audio)
            }
            audio.play()
        }
    })
}
let _scrollAnimId = 0
function scrollAnim(scrollEl, from, to, duration){
    duration = typeof duration === 'number' ? duration : 500
    if(from === to) return
    const id = ++_scrollAnimId
    const t0 = performance.now()
    const isWindow = scrollEl === document.scrollingElement || scrollEl === document.body
    function go(t){
        if(id !== _scrollAnimId) return
        const p = Math.min((t - t0) / duration, 1)
        const val = from + (to - from) * p
        if(isWindow){window.scrollTo(0, val)}
        else {scrollEl.scrollTop = val}
        if(p < 1) requestAnimationFrame(go)
    }
    requestAnimationFrame(go)
}
function scrollToEl(el, duration){
    const scrollEl = findScrollParent(el)
    const from = scrollEl.scrollTop
    el.scrollIntoView()
    const to = scrollEl.scrollTop
    scrollAnim(scrollEl, from, to, duration)
}
function scrollToTop(duration){
    const from = window.pageYOffset || document.scrollingElement.scrollTop || document.body.scrollTop
    scrollAnim(document.scrollingElement || document.body, from, 0, duration)
}
function findScrollParent(el){
    while(el && el !== document.body){
        const d = getComputedStyle(el).overflowY
        if(d === 'auto' || d === 'scroll') return el
        el = el.parentElement
    }
    return document.scrollingElement || document.body
}
function initSmooth(){
    document.querySelectorAll('.smooth').forEach(a => a.addEventListener('click', function(e){
        e.preventDefault()
        const el = document.querySelector(this.getAttribute('href'))
        if(el) scrollToEl(el)
    }))
}
function initReturn(){document.querySelectorAll('.return').forEach(a => a.addEventListener('click', () => history.back(-1)))}
function initTop(){
    document.querySelectorAll('.top.btn').forEach(el => el.classList.add('ico', 'ico-alone-top'))
    document.querySelectorAll('.top').forEach(btn => btn.addEventListener('click', scrollToTop))
    window.addEventListener('scroll', () => {document.querySelectorAll('.top').forEach(t => {t.style.opacity = window.scrollY > window.innerHeight ? '1' : '0'})})
}
function initPopLinks(){
    document.querySelectorAll('a[pop]').forEach(a => a.addEventListener('click', function(){
        const popId = this.getAttribute('pop')
        const pop = document.querySelector(`pop[pop="${popId}"]`)
        if(pop) pop.style.display = 'block'
    }))
}
function initToggle(){
    const toggleSelectors = ['o.checkbox', 'o.checkbox-done', 'o.checkbox-cancel', 'o.favorite', 'o.star', 'o.visibility', 'o.password', 'o.mic', 'o.volume', 'o.muzak', 'o.phonecard', 'o.cinema', 'o.camera', 'o.aim', 'o.semaphore', 'o.suitcase', 'o.light', 'o.thumb-up', 'o.thumb-down', 'o.devicerotate', 'o.thumbtack', 'o.bell', 'o.place', 'o.link', 'o.blur', 'o.toggle']
    document.querySelectorAll(toggleSelectors.join(',')).forEach(el => el.addEventListener('click', function(){
        this.classList.toggle('active')
    }))
    document.addEventListener('click', (e) => {
        if(e.target.matches?.('o.radio, o.radio-done')){
            const parent = e.target.closest('.parent')
            parent?.querySelectorAll('o.radio, o.radio-done').forEach(r => r.classList.remove('active'))
            e.target.classList.add('active')
        }
    })
    document.querySelectorAll('o.checkbox-all').forEach(el => el.addEventListener('click', function(){
        const parent = this.closest('.parent')
        const checkboxes = [...(parent?.querySelectorAll('o.checkbox, o.checkbox-done') || [])]
        const isActive = this.classList.contains('active')
        checkboxes.forEach(c => c.classList.toggle('active', isActive))
    }))
    document.querySelectorAll('o.password').forEach(el => el.addEventListener('click', function(){
        const parent = this.parentElement
        const input = parent?.querySelector('input')
        if(input) input.type = input.type === 'password' ? 'text' : 'password'
    }))
}
function initAutoTextarea(){document.querySelectorAll('textarea.auto').forEach(ta => ta.addEventListener('input', () => {ta.style.height = ta.scrollHeight + 'px' }))}
function initUpload(){
    function bindUploadGroup(group){
        const input = group.querySelector('input')
        input.addEventListener('change', function(){
            const imgValue = this.value
            const fileFormat = imgValue.substring(imgValue.lastIndexOf('.')).toLowerCase()
            const imgUrl = window.URL.createObjectURL(this.files[0])
            if(!fileFormat.match(/\.png|\.jpg|\.jpeg|\.webp|\.gif/)){alertFn(uploadAlert + ': png/jpg/jpeg/webp/gif')}
            else{
                group.style.backgroundImage = `url(${imgUrl})`
                group.style.color = 'transparent'
            }
        })
    }
    document.querySelectorAll('.upload-group').forEach(bindUploadGroup)
    document.querySelectorAll('.upload-add').forEach(btn => btn.addEventListener('click', function(){
        const group = document.createElement('div')
        group.className = 'ico upload-group'
        group.innerHTML = `<input type="file" accept=".jpg,.jpeg,.png,.webp,.gif"><n class="ico"></n>`
        this.parentElement?.insertBefore(group, this)
        bindUploadGroup(group)
    }))
    document.addEventListener('click', (e) => {if(e.target.matches?.('.upload-group n')){e.target.parentElement?.remove()}})
}
function initRandom(){
    document.querySelectorAll('[uigg="bg"], [uigg="img"], [uigg="product"], [uigg="avatar"]').forEach(el => {
        const url = `//ui.gg/lib/images/${el.getAttribute('uigg')}?=${randNum()}`
        const bg = window.getComputedStyle(el).backgroundImage
        if(bg === 'none' && el.tagName !== 'IMG'){el.style.backgroundImage = `url(${url})`}
        else if(!el.getAttribute('src') && el.tagName === 'IMG'){el.setAttribute('src', url)}
    })
    document.querySelectorAll('[uigg="color"]').forEach(el => {
        el.style.backgroundColor = `rgb(${randCol()}, ${randCol()}, ${randCol()})`
        if(el.tagName === 'IMG') el.style.cssText += ';width:100%;height:100%'
    })
    document.querySelectorAll('[uigg="txt"]').forEach(el => {if(!el.getAttribute('lang') && !el.innerHTML){el.innerHTML += randomSentences}})
    document.querySelectorAll('[uigg="title"]').forEach(el => {if(!el.getAttribute('lang') && !el.innerHTML){el.innerHTML += randomSentences[Math.floor(Math.random() * randomSentences.length)]}})
    const emot = document.querySelector('[uigg="emot"]')
    if(emot){emot.innerHTML = Array.from({length: 100}, (_, i) => `<s style="background-image: url(//ui.gg/lib/emot/${i+1}.svg)"></s>`).join('')}
}
function initClue(){
    document.querySelectorAll('[clue]').forEach(el => {
        let clue = el.getAttribute('clue')
        if(!clue || clue === 'null') clue = el.getAttribute('title') || ''
        if(clue){el.setAttribute('clue', clue); el.removeAttribute('title')}
    })
}
function initCopy(){
    document.querySelectorAll('[copy-btn]').forEach(btn => btn.addEventListener('click', function(){
        const copyNum = this.getAttribute('copy-btn')
        const copyEl = copyNum ? document.querySelector(`[copy-val="${copyNum}"]`) : document.querySelector('[copy-val]')
        if(!copyEl) return
        const copyVal = copyEl.tagName === 'INPUT' ? copyEl.value : copyEl.textContent
        navigator.clipboard.writeText(copyVal).then(() => tip(copyRight),err => tip(copyErr + err))
    }))
    if(document.querySelector('[copy-select]')){document.addEventListener('mouseup', copySelectedText)}
}
function initNotifyClose(){
    document.addEventListener('click', (e) => {
        if(e.target.matches?.('notify x')){
            const li = e.target.parentElement
            if(li) notifyRemove(li)
        }
    })
}
function initSwiperBtns(){
    document.querySelectorAll('.swiper-button-next').forEach(el => el.classList.add('ico', 'ico-alone-right'))
    document.querySelectorAll('.swiper-button-prev').forEach(el => el.classList.add('ico', 'ico-alone-left'))
}
function initRecording(){
    document.querySelectorAll('.recording').forEach(btn => btn.addEventListener('click', async function(){
        try{
            const stream = await navigator.mediaDevices.getDisplayMedia({video: true})
            const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm"
            const mediaRecorder = new MediaRecorder(stream, {mimeType: mime})
            const chunks = []
            mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, {type: chunks[0].type})
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `recording-${new Date().toISOString().slice(0,10)}.webm`
                document.body.appendChild(a)
                a.click()
                setTimeout(() => {a.remove(); URL.revokeObjectURL(url)}, 100)
            }
            mediaRecorder.start()
        }catch(error){console.error('Recording failed:', error)}
    }))
}
function alone(elements){
    if(!elements) return
    if(typeof elements === 'string') elements = document.querySelectorAll(elements)
    if(!elements.forEach) elements = [elements]
    elements.forEach(function(el){
        let txt = el.textContent || ''
        let aloneEl = txt.split('')
        let html = ''
        for(let i = 0; i < aloneEl.length; i++){html += `<z>${(aloneEl[i] === ' ' ? '&nbsp;' : aloneEl[i])}</z>`}
        el.innerHTML = html
    })
}
function touch(selector, direction, callback, threshold){
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector
    if(!element || !callback) return
    if(!threshold) threshold = 100
    let startPos = null
    const isTouchDevice = 'ontouchstart' in window
    const eType = isTouchDevice ? {start: 'touchstart', end: 'touchend'} : {start: 'mousedown', end: 'mouseup'}
    function getPoint(e){return isTouchDevice ? (e.changedTouches || e.touches)[0] : e}
    function handleStart(e){
        if(e.cancelable) e.preventDefault()
        const p = getPoint(e)
        startPos = {x: p.pageX, y: p.pageY}
    }
    function handleEnd(e){
        if(!startPos) return
        const p = getPoint(e)
        const dx = p.pageX - startPos.x
        const dy = p.pageY - startPos.y
        startPos = null
        if(Math.abs(dx) < threshold && Math.abs(dy) < threshold) return
        const match = direction === 'all'
            || (direction === 'left' && dx < -threshold)
            || (direction === 'right' && dx > threshold)
            || (direction === 'up' && dy < -threshold)
            || (direction === 'down' && dy > threshold)
        if(match){
            if(direction === 'all'){callback.call(element, Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down'))}
            else callback.call(element)
        }
    }
    element.addEventListener(eType.start, handleStart)
    element.addEventListener(eType.end, handleEnd)
    return {off: () => {element.removeEventListener(eType.start, handleStart); element.removeEventListener(eType.end, handleEnd)}}
}

// ============ Uigg Manager ============
const Uigg = {
    inited: false,
    init(ctx){
        if(this.inited) return
        initCustomElements();
        initPage(); initLazy(); initLang(); initFullscreen(); initAudio();
        initSmooth(); initReturn(); initTop(); initPopLinks(); initToggle();
        initAutoTextarea(); initUpload(); initRandom(); initClue();
        initCopy(); initNotifyClose(); initSwiperBtns(); initRecording();
        lug()
        this.inited = true
    },
    tip, alert: alertFn, confirm: confirmFn, prompt: promptFn, notify, notifyRemove, countdown(date){countdownFn(date)}, disable, lug, mobile, touch, alone, setCookie, getCookie, isMobileView, scrollAnim,
}

// Auto-init on DOM ready
if(document.readyState !== 'loading') Uigg.init()
else document.addEventListener('DOMContentLoaded', () => Uigg.init())

// Attach to window for <script> tag usage
if(typeof window !== 'undefined'){
    window.Uigg = Uigg
    for(const [k,v] of [['tip',tip],['notify',notify],['lug',lug],['touch',touch],['alone',alone],['disable',disable],['mobile',mobile],['setCookie',setCookie],['getCookie',getCookie],['countdown',countdownFn]]) window[k] = v
}

// ES module exports (works with import when type="module")
export {Uigg, Load, Music, Name, Nav, Tab, Pop, Menu, Scaler, Choice, Progress, Drop, Rate, Empty, Hop, Fold, Step, Crumb, Horn, Notice}
export {initCustomElements, initPage, initLazy, initLang, initFullscreen, initAudio, initSmooth, initReturn, initTop, initPopLinks, initToggle, initAutoTextarea, initUpload, initRandom, initClue, initCopy, initNotifyClose, initSwiperBtns, initRecording}
export default Uigg
