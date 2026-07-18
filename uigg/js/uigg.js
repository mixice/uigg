/*
 * uigg 3.1 (build 20260629)
 * Project: https://ui.gg
 * Author: https://www.mixice.com
 * Github: https://github.com/mixice/uigg
 * license: MIT
 */

console.log('%c BRACKET BY UIGG ','background-image: linear-gradient(90deg,slateblue,deeppink);color:white','http://ui.gg')
const $ = (sel, ctx = document) => ctx.querySelector(sel)
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]
const language = navigator.language || navigator.userLanguage

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
        $$('style, link[rel="stylesheet"]').forEach(el => {
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
    for(let i = 0; i < langVal.length; i++){result = result?.[langVal[i]]}
    return result ?? ''
}

// isMobileView
function isMobileView(){return document.documentElement.clientWidth <= 640 || document.documentElement.classList.contains('force-mobile')}

const normalizeRoot = root => root === undefined ? document : (typeof root === 'string' ? $(root) : root)
function scoped(root, selector){
    if(root == null) return []
    root = normalizeRoot(root)
    if(!root) return []
    const els = root.querySelectorAll ? [...root.querySelectorAll(selector)] : []
    if(root.nodeType === 1 && root.matches?.(selector)) els.unshift(root)
    return els
}

// Locale constants
const [langConfirm, langCancel] = language === 'zh-CN' ? ['确认', '取消'] : ['confirm', 'cancel']
const [copyRight, copyErr] = language === 'zh-CN' ? ['复制成功', '复制失败'] : ['Copy successful', 'Copy failed']

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
    const t = $(`.${cls}`)
    if(t){t.style.margin = `-${Math.round(t.offsetHeight/2)}px 0 0 -${Math.round(t.offsetWidth/2)}px`}
    if(time > 0) setTimeout(() => tipEl.remove(), time)
}

// Notify
function notifyRemove(notifyThis){
    notifyThis.classList.add('anime-bounce-out-right')
    setTimeout(() => notifyThis.remove(),500)
}
function notify(str, align, time){
    let notifyEl = $('notify')
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
    notifyAudio.play().catch(() => {})
    if(time !== undefined){setTimeout(() => notifyRemove(li), time)}
}

// Copy
function copySelectedText(){
    const selection = window.getSelection()
    if(!selection.rangeCount || selection.isCollapsed) return
    const node = selection.anchorNode.nodeType === 1 ? selection.anchorNode : selection.anchorNode.parentElement
    if(node?.closest('[copy-select]')){
        const selectedText = selection.toString().trim()
        if(selectedText) navigator.clipboard.writeText(selectedText).then(() => tip(_t('uigg-copyright', copyRight)),err => tip(_t('uigg-copyerr', copyErr) + err))
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
    $$('countdown d').forEach(el => el.textContent = d)
    $$('countdown h').forEach(el => el.textContent = digit(h,2))
    $$('countdown m').forEach(el => el.textContent = digit(m,2))
    $$('countdown s').forEach(el => el.textContent = digit(s,2))
    setTimeout(countdownFn, 1000)
}

// Lang helper for JS values — reads from cached lang data, falls back to fallback (defaults to key)
const _t = (key, fallback) => _langData ? (langRead(key, _langData) || fallback) : fallback

// Alert / Confirm / Prompt
function alertBox(message, extra = '', buttons = [], onKey){
    const alertEl = createAlertDOM(message, extra)
    alertEl.querySelector('alert-solve').innerHTML = buttons.map(b => btnHTML(b.text, b.id)).join('')
    const done = result => {alertEl.remove(); document.removeEventListener('keydown', keyHandler); return result}
    function keyHandler({key}){onKey?.(key, done, alertEl)}
    document.body.appendChild(alertEl)
    buttons.forEach(b => alertEl.querySelector(b.id ? `#${b.id}` : 'a')?.addEventListener('click', () => b.fn(done, alertEl)))
    document.addEventListener('keydown', keyHandler)
    return alertEl
}
function alertFn(message){
    alertBox(message, '', [{text: _t('uigg-confirm', langConfirm), fn: done => done()}], (key, done) => {if(['Enter', 'Escape', ' '].includes(key)) done()})
}
function confirmFn(message){
    return new Promise((resolve) => {
        const finish = (done, result) => resolve(done(result))
        alertBox(message, '', [
            {id: 'alert-cancel', text: _t('uigg-cancel', langCancel), fn: done => finish(done, false)},
            {id: 'alert-confirm', text: _t('uigg-confirm', langConfirm), fn: done => finish(done, true)}
        ], (key, done) => {if(key === 'Enter') finish(done, true); if(key === 'Escape') finish(done, false)})
    })
}
function promptFn(message, defaultValue = ''){
    return new Promise((resolve) => {
        const inputVal = el => el.querySelector('#alert-input').value
        const finish = (done, el, result) => resolve(done(result))
        const alertEl = alertBox(message, '<input type="text" id="alert-input">', [
            {id: 'alert-cancel', text: _t('uigg-cancel', langCancel), fn: (done, el) => finish(done, el, null)},
            {id: 'alert-confirm', text: _t('uigg-confirm', langConfirm), fn: (done, el) => finish(done, el, inputVal(el))}
        ], (key, done, el) => {if(key === 'Enter') finish(done, el, inputVal(el)); if(key === 'Escape') finish(done, el, null)})
        alertEl.querySelector('#alert-input').value = defaultValue
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

// ============ Custom Elements ============
// Load
function isStateLoad(el){
    return el.parentElement && el.parentElement !== document.body
}
class Load extends HTMLElement {
    connectedCallback(){
        if(isStateLoad(this)) return
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
            if(t.closest?.('.close, x')){this.style.display = 'none'}
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
        reduce.className = 'btn ico ico-reduce'
        const add = document.createElement('a')
        add.className = 'btn ico ico-add'
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
        const top = () => this.querySelector(':scope>a')
        this.getData = () => top()?.textContent.trim() || ''
        this.setData = v => {
            const a = top()
            if(!a) return
            this.querySelectorAll('choice-list a').forEach(i => {
                if(i.textContent.trim() === String(v)) a.innerHTML = i.innerHTML
            })
        }
        this.addEventListener('click', () => this.classList.toggle('active'))
        this.querySelectorAll('choice-list a').forEach(a => a.addEventListener('click', function(){const t=top();if(t)t.innerHTML=this.innerHTML}))
    }
}

// Progress
class Progress extends HTMLElement {
    static observedAttributes = ['color', 'value', 'max']
    connectedCallback(){
        this._progress()
    }
    attributeChangedCallback(){this._progress()}
    getData(){return parseFloat(this.getAttribute('value')) || 0}
    setData(v){this.setAttribute('value', Math.max(0, Math.min(parseFloat(this.getAttribute('max')) || 100, parseFloat(v) || 0)));this._progress()}
    _progress(){
        const color = this.getAttribute('color')
        if(color){
            this.style.color = color
            this.style.setProperty('--progress-color', color)
        }
        if(this.hasAttribute('circle')){
            const max = parseFloat(this.getAttribute('max')) || 100
            const val = parseFloat(this.getAttribute('value')) || 0
            this.style.setProperty('--progress-value', Math.max(0, Math.min(100, val / max * 100)) + '%')
            if(!this._progressObserve){
                this._progressObserve = new MutationObserver(() => this.connectedCallback())
                this._progressObserve.observe(this, {attributes: true, attributeFilter: ['value', 'max', 'color']})
            }
        }
    }
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
    static observedAttributes = ['value']
    connectedCallback(){
        if(!this.children.length)this.innerHTML = '<i class="ico"></i>'.repeat(5)
        this.onclick = e => {
            if(!this.hasAttribute('edit'))return
            const idx = [...this.children].indexOf(e.target.closest?.('i'))
            if(idx > -1)this.setData(idx + 1)
        }
        this._rate()
    }
    attributeChangedCallback(){this._rate()}
    getData(){return parseInt(this.getAttribute('value')) || 0}
    setData(v){this.setAttribute('value', Math.max(0, Math.min(this.children.length || 5, parseInt(v) || 0)))}
    _rate(){const v = this.getData();this.querySelectorAll('i').forEach((i,idx) => i.classList.toggle('active', idx < v))}
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
        hopCont.addEventListener('click', () => {
            hopCont.style.display = 'none'
            x.style.display = 'none'
        })
        this.addEventListener('click', (e) => {
            if(e.target === x){
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

// Notice
class Notice extends HTMLElement {
    connectedCallback(){
        const href = this.getAttribute('href') || ''
        const children = [...this.children]
        this.innerHTML = `<i class="ico ico-volume"></i><notice-cont><aside></aside></notice-cont>${href ? `<a href="${href}" class="ico ico-more-horizontal"></a>` : ''}`
        this.querySelector('notice-cont aside').append(...children)
    }
}

// ============ Swiper ============
const parseSwiperView = raw => {
    raw = `${raw ?? ''}`.trim()
    if(!raw) return {base: 1, points: []}
    if(!/[,:;]/.test(raw)) return {base: Math.max(1, parseInt(raw) || 1), points: []}
    const points = []
    raw.split(/[;,]/).forEach(part => { const [bp, view] = part.trim().split(/[:=]/); const min = parseInt(bp), val = parseInt(view); if(min > 0 && val > 0) points.push([min, val]) })
    points.sort((a,b)=>a[0]-b[0])
    return {base: points[0]?.[1] ?? 1, points}
}
class Swiper extends HTMLElement {
    connectedCallback(){
        const w = this._w = this.querySelector('swiper-wrapper')
        if(!w) return
        const s = [...w.children], len = s.length
        if(!len) return
        const d = this.hasAttribute('vertical') ? 'Y' : 'X'
        const fade = this.hasAttribute('fade')
        const loop = this.hasAttribute('loop') && len > 1
        const useTranslateLoop = loop && !fade
        const isThumb = this.hasAttribute('thumb')
        const {base, points} = parseSwiperView(this.getAttribute('view'))
        const getView = () => {
            if(fade) return 1
            const ww = document.documentElement.clientWidth || window.innerWidth || 0
            let cur = base
            for(const [bp, view] of points) if(ww >= bp) cur = view
            return Math.max(1, cur)
        }
        let v = getView(), idx = 0, drag = false, down = false, sX = 0, dX = 0, moved = false, wheelBusy = false, n = 1
        let slides = s
        if(useTranslateLoop){
            n = Math.max(base, ...(points.map(([,view]) => view)), 1)
            for(let i = 0; i < n; i++) w.appendChild(s[i % len].cloneNode(true))
            for(let i = n - 1; i >= 0; i--) w.insertBefore(s[((len - n + i) % len + len) % len].cloneNode(true), w.firstChild)
            slides = [...w.children]
            idx = n
        }
        if(this.hasAttribute('vertical') && this.offsetHeight < 10) this.style.height = '100vh'
        this.style.setProperty('--swiper-view', v)
        const wrapIndex = i => ((i % len) + len) % len
        const realOf = i => fade ? wrapIndex(i) : useTranslateLoop ? wrapIndex(i - n) : i
        this._realOf = realOf
        const maxIdx = () => fade ? len - 1 : useTranslateLoop ? slides.length - v : Math.max(0, len - v)
        const clamp = i => Math.max(0, Math.min(maxIdx(), i))
        const dot = this.querySelector('swiper-dot')
        const upDot = i => dot && [...dot.children].forEach((d, j) => d.classList.toggle('active', j === i))
        const renderDot = () => dot && (dot.innerHTML = '<i></i>'.repeat(loop ? len : Math.max(1, len - v + 1)))
        const setThumb = i => {
            if(!isThumb) return
            i = Math.max(0, Math.min(fade || !useTranslateLoop ? len - 1 : slides.length - 1, i))
            const real = realOf(i)
            this._activeDisplayIndex = i
            this._realIndex = real
            upDot(real)
            slides.forEach((sl, j) => sl.classList.toggle('active', j === i))
            return real
        }
        const go = (i, anim = true, emit = true) => {
            if(fade){
                i = loop ? wrapIndex(i) : clamp(i)
                idx = i; this._realIndex = i
                slides.forEach((sl, j) => sl.classList.toggle('view', j === i))
            }else{
                if(!useTranslateLoop) i = clamp(i)
                idx = i
                this._realIndex = realOf(i)
                w.style.transition = anim ? 'transform .3s' : 'none'
                w.style.transform = `translate${d}(${-i * 100 / v}%)`
                slides.forEach((sl, j) => sl.classList.toggle('view', j >= i && j < i + v))
            }
            upDot(this._realIndex)
            if(emit) this.dispatchEvent(new CustomEvent('slide', {detail: {idx: this._realIndex}}))
        }
        const syncView = () => {
            const nv = getView()
            if(nv === v) return
            v = nv
            this.style.setProperty('--swiper-view', v)
            renderDot()
            go(loop ? idx : clamp(idx), false, false)
            if(isThumb && this._activeDisplayIndex >= 0) setThumb(this._activeDisplayIndex)
        }
        const fixLoop = () => {
            if(!useTranslateLoop) return false
            if(idx >= n + len){ go(idx - len, false, false); return true }
            if(idx < n){ go(idx + len, false, false); return true }
            return false
        }
        this.slideTo = (i, anim = true, emit = true) => {
            if(fade){
                go(i, anim, emit)
                setThumb(idx)
                return
            }
            i = useTranslateLoop ? wrapIndex(i) : i
            const display = useTranslateLoop ? i + n : i
            let start = idx
            if(display < start) start = display
            else if(display >= start + v) start = display - v + 1
            if(!useTranslateLoop) start = clamp(start)
            go(start, anim, emit)
            setThumb(display)
        }
        this.next = () => {
            if(fade){ if(!loop && idx >= maxIdx()) return false; go(idx + 1); return true }
            if(useTranslateLoop){ if(fixLoop()) w.offsetWidth; go(idx + 1); return true }
            if(idx >= maxIdx()) return false
            go(idx + 1); return true
        }
        this.prev = () => {
            if(fade){ if(!loop && idx <= 0) return false; go(idx - 1); return true }
            if(useTranslateLoop){ if(fixLoop()) w.offsetWidth; go(idx - 1); return true }
            if(idx <= 0) return false
            go(idx - 1); return true
        }
        w.addEventListener('transitionend', e => { if(!fade && e.target === w) fixLoop() })
        if(dot){
            renderDot()
            dot.addEventListener('click', e => {
                const i = [...dot.children].indexOf(e.target)
                if(i >= 0) this.slideTo(i)
            })
        }
        const endDrag = () => {
            down = false
            if(!drag) return
            drag = false
            if(fade){
                const nextIdx = dX > 0 ? idx - 1 : idx + 1
                const m = d === 'X' ? this.offsetWidth : this.offsetHeight
                go(moved && Math.abs(dX) > m / 5 ? nextIdx : idx)
                return
            }
            const m = d === 'X' ? this.offsetWidth : this.offsetHeight
            const swiped = moved && Math.abs(dX) > m / v / 5
            if(moved) this._clickBlockUntil = Date.now() + 120
            swiped ? (dX > 0 ? this.prev() : this.next()) || go(idx) : go(idx)
        }
        this.addEventListener('pointerdown', e => {
            if(e.target.closest?.('[ignore]')) return
            down = true
            sX = d === 'X' ? e.clientX : e.clientY
            dX = 0
            moved = false
            this._clickBlockUntil = 0
            drag = true
            if(!fade) w.style.transition = 'none', w.style.transform = `translate${d}(${-idx * 100 / v}%)`
            e.preventDefault()
        })
        this.addEventListener('pointermove', e => {
            dX = (d === 'X' ? e.clientX : e.clientY) - sX
            moved = moved || Math.abs(dX) > 3
            if(!drag){if(down && moved) this._clickBlockUntil = Date.now() + 120; return}
            if(fade) return
            const m = d === 'X' ? this.offsetWidth : this.offsetHeight
            const min = -maxIdx() * 100 / v
            let p = -idx * 100 / v + dX / m * 100
            if(loop) p = Math.max(min, Math.min(0, p))
            else if(p > 0) p *= .35
            else if(p < min) p = min + (p - min) * .35
            w.style.transform = `translate${d}(${p}%)`
        })
        document.addEventListener('pointerup', endDrag)
        this.addEventListener('pointerleave', endDrag)
        this.addEventListener('click', e => {
            if(Date.now() < (this._clickBlockUntil || 0)){e.preventDefault(); e.stopImmediatePropagation(); return}
            if(e.target.closest?.('a')) return
            const sl = e.target.closest?.('swiper-slide[href]')
            if(!sl || !this.contains(sl)) return
            const href = sl.getAttribute('href')
            if(!href) return
            const target = sl.getAttribute('target')
            target ? window.open(href, target) : location.href = href
        }, true)
        this.addEventListener('wheel', e => {
            e.preventDefault()
            if(wheelBusy) return
            wheelBusy = true
            e.deltaY > 0 ? this.next() : this.prev()
            setTimeout(() => wheelBusy = false, 350)
        }, {passive: false})
        const arr = this.querySelector('swiper-arrow')
        if(arr) arr.innerHTML = '<swiper-prev></swiper-prev><swiper-next></swiper-next>'
        const pv = this.querySelector('swiper-prev'), nx = this.querySelector('swiper-next')
        if(pv){ pv.classList.add('ico', this.hasAttribute('vertical') ? 'ico-alone-top' : 'ico-alone-left'); pv.addEventListener('click', () => this.prev()) }
        if(nx){ nx.classList.add('ico', this.hasAttribute('vertical') ? 'ico-alone-bottom' : 'ico-alone-right'); nx.addEventListener('click', () => this.next()) }
        const ap = parseFloat(this.getAttribute('autoplay')) * 1000
        if(ap){
            const auto = () => this.next() || go(0, false)
            let tid = setInterval(auto, ap)
            this.addEventListener('pointerenter', () => clearInterval(tid))
            this.addEventListener('pointerleave', () => { clearInterval(tid); tid = setInterval(auto, ap) })
        }
        if(points.length && !this._viewResizeBound){
            this._viewResizeBound = 1
            window.addEventListener('resize', syncView)
            window.addEventListener('orientationchange', syncView)
        }
        const role = this.hasAttribute('gallery') ? 'gallery' : this.hasAttribute('thumb') ? 'thumb' : ''
        if(role){
            const key = (this.getAttribute(role) ?? '').trim()
            setTimeout(() => {
                const attr = role === 'gallery' ? 'thumb' : 'gallery'
                const other = $$(`swiper[${attr}]`).find(el => el !== this && !el._thumbLinked && (el.getAttribute(attr) ?? '').trim() === key)
                if(!other) return
                const gallery = role === 'gallery' ? this : other
                const thumb = role === 'gallery' ? other : this
                if(gallery._thumbLinked || thumb._thumbLinked) return
                if(typeof gallery.slideTo !== 'function' || typeof thumb.slideTo !== 'function') return
                gallery._thumbLinked = thumb._thumbLinked = true
                gallery.addEventListener('slide', e => thumb.slideTo(e.detail.idx))
                thumb.addEventListener('click', e => {
                    if(Date.now() < (thumb._clickBlockUntil || 0)) return
                    const sl = e.target.closest?.('swiper-slide')
                    if(!sl) return
                    const i = [...thumb._w.children].indexOf(sl)
                    if(i < 0) return
                    gallery.slideTo(thumb._realOf?.(i) ?? i)
                })
                thumb.slideTo(gallery._realIndex ?? 0)
            }, 0)
        }
        if(s.some(sl => sl.hasAttribute('hash'))){
            const sync = () => {
                const h = location.hash.slice(1)
                const i = s.findIndex(sl => sl.getAttribute('hash') === h)
                if(i >= 0) this.slideTo(i)
            }
            window.addEventListener('hashchange', sync)
            sync()
        }
        go(idx, false)
    }
}

//  Page
function pageRender(el){
    const total = parseInt(el.getAttribute('total')) || 0
    const limit = parseInt(el.getAttribute('limit')) || 10
    const param = el.getAttribute('param')
    const attrPage = parseInt(el.getAttribute('page')) || 1
    const urlPage = param ? parseInt(new URLSearchParams(window.location.search).get(param)) : NaN
    const pages = Math.max(1, Math.ceil(total / limit))
    const p = Math.min(pages, Math.max(1, Number.isNaN(urlPage) ? attrPage : urlPage))
    el.setAttribute('page', p)
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
        if(param){
            const url = new URL(window.location)
            url.searchParams.set(param, pg)
            window.location.href = url.toString()
        } else {
            el.dispatchEvent(new CustomEvent('pagechange', {
                detail: {page: pg, limit, total: curTotal, pages: curPages},
                bubbles: true
            }))
        }
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

// ============ Semantic Element Lifecycle ============
const semanticElements = [
    ['load', Load], ['music', Music], ['name', Name], ['nav', Nav],
    ['tab', Tab], ['pop', Pop], ['menu', Menu], ['scaler', Scaler],
    ['choice', Choice], ['progress', Progress], ['drop', Drop],
    ['rate', Rate], ['hop', Hop], ['fold', Fold],
    ['crumb', Crumb], ['notice', Notice], ['swiper', Swiper]
]
function mountElement(el, Cls, tag){
    if(el._uiggElement === tag) return el
    if(el._uiggElement) unmountElement(el)
    if(!el._uiggOriginalPrototype) el._uiggOriginalPrototype = Object.getPrototypeOf(el)
    Object.setPrototypeOf(el, Cls.prototype)
    el._uiggElement = tag
    el.connectedCallback?.()
    return el
}
function unmountElement(el){
    if(!el._uiggElement) return el
    el.disconnectedCallback?.()
    if(el._uiggOriginalPrototype) Object.setPrototypeOf(el, el._uiggOriginalPrototype)
    delete el._uiggElement
    return el
}
function initCustomElements(root = document){
    root = normalizeRoot(root)
    if(!root) return null
    semanticElements.forEach(([tag, Cls]) => scoped(root, tag).forEach(el => mountElement(el, Cls, tag)))
    return root
}
function unmountCustomElements(root = document){
    root = normalizeRoot(root)
    if(!root) return null
    semanticElements.forEach(([tag]) => scoped(root, tag).forEach(unmountElement))
    return root
}

// ============ Init Functions ============
function initPage(root = document){scoped(root, 'page').forEach(el => pageRender(el))}
let _langData = null
function initLang(){
    let langType = getCookie('lang') === '' ? 'en' : getCookie('lang')
    function lang(){
        if($$('[lang]').length === 0) return
        fetch(`../lang/${langType}.json`).then(async r => {
            if(!r.ok) return
            _langData = await r.json()
            const data = _langData
            $$('[lang]:not(html)').forEach(el => el.innerHTML = langRead(el.getAttribute('lang'), data))
            $$('[lang-placeholder]').forEach(el => el.placeholder = langRead(el.getAttribute('lang-placeholder'), data))
            $$('[lang-value]').forEach(el => el.setAttribute('value', langRead(el.getAttribute('lang-value'), data)))
            $$('[lang-content]').forEach(el => el.setAttribute('content', langRead(el.getAttribute('lang-content'), data)))
        }).catch(() => {})
    }
    lang()
    $$('[lang-set]').forEach(el => el.addEventListener('click', function(){
        langType = this.getAttribute('lang-set')
        setCookie('lang', langType, '72')
        lang()
    }))
}
function initFullscreen(root = document){
    scoped(root, '.fullscreen').forEach(el => {
        if(el._uiggFullscreenInit) return
        el._uiggFullscreenInit = true
        el.classList.add('ico')
        el.addEventListener('click', function(){
            if(!document.fullscreenElement){
                document.documentElement.requestFullscreen?.() || document.documentElement.webkitRequestFullscreen?.() || document.documentElement.mozRequestFullScreen?.()
            }else{document.exitFullscreen?.() || document.webkitExitFullscreen?.() || document.mozCancelFullScreen?.()}
        })
    })
    if(initFullscreen._bound) return
    document.addEventListener('fullscreenchange', () => {$$('.fullscreen').forEach(el => el.classList.toggle('active', !!document.fullscreenElement))})
    initFullscreen._bound = true
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
            audio.play().catch(() => {})
        }
    })
}
function scrollAnim(box, from, to){
    let start
    requestAnimationFrame(function step(t){
      start ??= t
      let p = Math.min((t - start) / 500, 1)
      box.scrollTop = from + (to - from) * (p < .5 ? 2*p*p : -1+(4-2*p)*p)
      p < 1 && requestAnimationFrame(step)
    })
}
function initSmooth(root = document){
    scoped(root, '.smooth').forEach(a =>
      a.onclick = e => {
        e.preventDefault()
        const href = a.getAttribute('href')
        if(!href || href[0] !== '#') return
        let el = $(href),
            box = el, start, s, d
        if(!el) return
        while ((box = box.parentElement) && box !== document.body && box.scrollHeight <= box.clientHeight);
        box = box && box !== document.body ? box : document.scrollingElement
        s = box.scrollTop
        d = box === document.scrollingElement
          ? el.getBoundingClientRect().top
          : el.getBoundingClientRect().top - box.getBoundingClientRect().top
        scrollAnim(box, s, s + d)
      }
    )
}
function initTop(root = document){
    const bound = initTop._bound || (initTop._bound = new WeakSet())
    scoped(root, '.top.btn').forEach(el => el.classList.add('ico', 'ico-alone-top'))
    scoped(root, '.top').forEach(btn => {
        btn.onclick = e => {
            e.preventDefault()
            scrollAnim(document.scrollingElement, scrollY, 0)
        }
        const doc = btn.ownerDocument, win = doc.defaultView
        if(bound.has(doc)) return
        bound.add(doc)
        win.addEventListener('scroll', () => {doc.querySelectorAll('.top').forEach(t => {t.style.opacity = win.scrollY > win.innerHeight ? '1' : '0'})}, {passive: true})
    })
}
function initReturn(root = document){scoped(root, '.return').forEach(a => {if(a._uiggReturnInit) return; a._uiggReturnInit = true; a.addEventListener('click', () => history.back(-1))})}
function initPopLinks(root = document){
    scoped(root, 'a[pop]').forEach(a => {
        if(a._uiggPopLinkInit) return
        a._uiggPopLinkInit = true
        a.addEventListener('click', function(){
        const popId = this.getAttribute('pop')
        const pop = $(`pop[pop="${popId}"]`)
        if(pop) pop.style.display = 'block'
        })
    })
    if(initPopLinks._escBound) return
    document.addEventListener('keydown', e => {
        if(e.key !== 'Escape') return
        const pops = $$('pop').filter(pop => getComputedStyle(pop).display !== 'none')
        const pop = pops.at(-1)
        if(pop) pop.style.display = 'none'
    })
    initPopLinks._escBound = true
}
function initToggle(root = document){
    const toggleSelector = ['o.checkbox', 'o.checkbox-done', 'o.checkbox-cancel', 'o.favorite', 'o.star', 'o.visibility', 'o.password', 'o.mic', 'o.volume', 'o.muzak', 'o.phonecard', 'o.cinema', 'o.camera', 'o.aim', 'o.semaphore', 'o.suitcase', 'o.light', 'o.thumb-up', 'o.thumb-down', 'o.devicerotate', 'o.thumbtack', 'o.bell', 'o.place', 'o.link', 'o.blur', 'o.toggle'].join(',')
    scoped(root, toggleSelector).forEach(el => {
        el.getData = () => el.classList.contains('active')
        el.setData = v => { el.classList.toggle('active', !!v); return el }
    })
    scoped(root, '.parent[name]').forEach(el => {
        const rs = () => el.querySelectorAll(':scope>o.radio,:scope>o.radio-done')
        const cs = () => el.querySelectorAll(':scope>o.checkbox,:scope>o.checkbox-done')
        const vOf = o => o.getAttribute('data') || o.nextElementSibling?.textContent?.trim() || ''
        el.getData = () => {
            const r = rs()
            if(r.length){
                const a = el.querySelector(':scope>o.radio.active,:scope>o.radio-done.active')
                return a ? vOf(a) : ''
            }
            return [...cs()].filter(o => o.classList.contains('active')).map(vOf)
        }
        el.setData = v => {
            const vs = Array.isArray(v) ? v.map(String) : v == null ? [] : [String(v)]
            const first = vs[0] || ''
            rs().forEach(o => o.classList.toggle('active', vOf(o) === first))
            const set = new Set(vs)
            cs().forEach(o => o.classList.toggle('active', set.has(vOf(o))))
        }
    })
    if(initToggle._bound) return
    document.addEventListener('click', e => {
        const target = e.target.closest?.(toggleSelector)
        target?.classList.toggle('active')
        if(target?.matches('o.checkbox-all')){
            const parent = target.closest('.parent')
            const checkboxes = [...(parent?.querySelectorAll('o.checkbox, o.checkbox-done') || [])]
            const isActive = target.classList.contains('active')
            checkboxes.forEach(c => c.classList.toggle('active', isActive))
        }
        if(target?.matches('o.password')){
            const input = target.parentElement?.querySelector('input')
            if(input) input.type = input.type === 'password' ? 'text' : 'password'
        }
    }, true)
    document.addEventListener('click', e => {
        const radio = e.target.closest?.('o.radio, o.radio-done')
        if(!radio) return
        const parent = radio.closest('.parent')
        parent?.querySelectorAll('o.radio, o.radio-done').forEach(r => r.classList.remove('active'))
        radio.classList.add('active')
    })
    initToggle._bound = true
}
function initAutoTextarea(root = document){
    scoped(root, 'textarea.auto').forEach(ta => {
        if(ta._uiggAutoTextareaInit) return
        ta._uiggAutoTextareaInit = true
        ta.addEventListener('input', () => {ta.style.height = ta.scrollHeight + 'px' })
    })
}
function Images(im){
    if(im._uiggImagesInit) return im
    im._uiggImagesInit = true
    const multi = im.hasAttribute('multiple')
    const accept = (im.getAttribute('accept') || '.jpg,.jpeg,.png,.webp,.gif')
        .split(',')
        .map(v => v.trim())
        .filter(Boolean)
        .map(v => v.includes('/') || v.startsWith('.') ? v : `.${v}`)
        .join(',')
    const inp = Object.assign(document.createElement('input'), {
        type: 'file', multiple: multi,
        accept,
        style: 'display:none'
    })
    im.appendChild(inp)
    im._files = []
    im._defaultHTML = [...im.querySelectorAll('li')].map(li => li.cloneNode(true))
    let replacing = null
    let btn = im.querySelector('add')
    if(!btn){ btn = document.createElement('add'); im.appendChild(btn) }
    const syncAdd = () => { if(!multi) btn.style.display = im.querySelector('li') ? 'none' : '' }
    const revoke = li => { if(li?._url) URL.revokeObjectURL(li._url) }
    const removeItem = li => {
        if(!li) return
        if(li._file){
            const idx = im._files.indexOf(li._file)
            if(idx !== -1) im._files.splice(idx, 1)
        }
        revoke(li)
        li.remove()
    }
    const clear = () => [...im.querySelectorAll('li')].forEach(removeItem)
    const normalize = v => {
        const arr = Array.isArray(v) ? v : (v == null || v === '' ? [] : [v])
        return multi ? arr.filter(Boolean) : arr.filter(Boolean).slice(0, 1)
    }
    const createItem = item => {
        const isBlob = typeof Blob !== 'undefined' && item instanceof Blob
        const src = isBlob ? URL.createObjectURL(item) : String(item || '')
        if(!src) return null
        const li = document.createElement('li')
        const img = Object.assign(document.createElement('img'), { src })
        img.setAttribute('cover', '')
        if(isBlob){
            li._file = item
            li._url = src
            im._files.push(item)
        }
        li.append(img, document.createElement('n'))
        return li
    }
    const addItem = item => {
        const li = createItem(item)
        if(li) btn.before(li)
        return li
    }
    const open = li => { replacing = li || null; inp.click() }
    btn.addEventListener('click', () => open())
    inp.addEventListener('change', () => {
        const files = [...inp.files]
        if(replacing){
            const li = files[0] && createItem(files[0])
            if(li){ replacing.before(li); removeItem(replacing) }
        }else{
            if(!multi) clear()
            files.forEach(addItem)
        }
        replacing = null
        syncAdd()
        inp.value = ''
    })
    im.addEventListener('click', e => {
        if(e.target.matches('li img')){
            open(e.target.closest('li'))
            return
        }
        if(!e.target.matches('n')) return
        removeItem(e.target.closest('li'))
        syncAdd()
    })
    im.getData = () => {
        const data = [...im.querySelectorAll('li')].map(li => {
            const img = li.querySelector('img')
            return li._file || img?.getAttribute('src') || img?.src
        }).filter(Boolean)
        return multi ? data : data[0] || null
    }
    im.setData = v => {
        clear()
        im._files = []
        normalize(v).forEach(addItem)
        syncAdd()
    }
    im.reset = () => {
        clear()
        im._files = []
        im._defaultHTML.forEach(li => btn.before(li.cloneNode(true)))
        syncAdd()
    }
    syncAdd()
    return im
}
function initImages(root = document){scoped(root, 'images').forEach(Images)}
function initRandom(root = document){
    scoped(root, '[uigg="bg"], [uigg="img"], [uigg="product"], [uigg="avatar"]').forEach(el => {
        const url = `//ui.gg/lib/images/${el.getAttribute('uigg')}?=${randNum()}`
        const bg = window.getComputedStyle(el).backgroundImage
        if(bg === 'none' && el.tagName !== 'IMG'){el.style.backgroundImage = `url(${url})`}
        else if(!el.getAttribute('src') && el.tagName === 'IMG'){el.setAttribute('src', url)}
    })
    scoped(root, '[uigg="color"]').forEach(el => {
        el.style.backgroundColor = `rgb(${randCol()}, ${randCol()}, ${randCol()})`
        if(el.tagName === 'IMG') el.style.cssText += ';width:100%;height:100%'
    })
    scoped(root, '[uigg="txt"]').forEach(el => {if(!el.getAttribute('lang') && !el.innerHTML){el.innerHTML += randomSentences}})
    scoped(root, '[uigg="title"]').forEach(el => {if(!el.getAttribute('lang') && !el.innerHTML){el.innerHTML += randomSentences[Math.floor(Math.random() * randomSentences.length)]}})
    const emot = scoped(root, '[uigg="emot"]')[0]
    if(emot){emot.innerHTML = Array.from({length: 100}, (_, i) => `<s style="background-image: url(//ui.gg/lib/emot/${i+1}.svg)"></s>`).join('')}
}
function initClue(root = document){
    scoped(root, '[clue]').forEach(el => {
        let clue = el.getAttribute('clue')
        if(!clue || clue === 'null') clue = el.getAttribute('title') || ''
        if(clue){el.setAttribute('clue', clue); el.removeAttribute('title')}
    })
}
function initCopy(root = document){
    scoped(root, '[copy-btn]').forEach(btn => {
        if(btn._uiggCopyInit) return
        btn._uiggCopyInit = true
        btn.addEventListener('click', function(){
        const copyNum = this.getAttribute('copy-btn')
        const copyEl = copyNum ? $(`[copy-val="${copyNum}"]`) : $('[copy-val]')
        if(!copyEl) return
        const copyVal = copyEl.tagName === 'INPUT' ? copyEl.value : copyEl.textContent
        navigator.clipboard.writeText(copyVal).then(() => tip(_t('uigg-copyright', copyRight)),err => tip(_t('uigg-copyerr', copyErr) + err))
        })
    })
    if(!initCopy._selectBound && scoped(root, '[copy-select]').length){
        document.addEventListener('mouseup', copySelectedText)
        initCopy._selectBound = true
    }
}
function initNotifyClose(){
    document.addEventListener('click', (e) => {
        if(e.target.matches?.('notify x')){
            const li = e.target.parentElement
            if(li) notifyRemove(li)
        }
    })
}
function initDrag(root = document){
    scoped(root, '[drag]').forEach(ct => {
        if(ct._uiggDragInit) return
        ct._uiggDragInit = true
        let el = null, ph = null, sx = 0, sy = 0, ox = 0, oy = 0, moved = false
        const hdl = ct.getAttribute('drag')
        ct.addEventListener('pointerdown', e => {
            if(e.target.closest?.('[ignore]')) return
            const li = e.target.closest('li')
            if(!li || !ct.contains(li)) return
            if(hdl && !e.target.closest(hdl)) return
            el = li; sx = e.clientX; sy = e.clientY; moved = false
            e.preventDefault()
        })
        ct.addEventListener('pointermove', e => {
            if(!el) return
            if(!moved && Math.abs(e.clientX - sx) < 5 && Math.abs(e.clientY - sy) < 5) return
            moved = true
            if(!ph){
                ph = document.createElement('li')
                ph.classList.add('drag-hole')
                el.after(ph)
                el.classList.add('drag-float')
                const r = el.getBoundingClientRect()
                ox = e.clientX - r.left; oy = e.clientY - r.top
                el.style.width = r.width + 'px'
                ph.style.width = r.width + 'px'
                ph.style.height = r.height + 'px'
            }
            el.style.position = 'fixed'; el.style.zIndex = '9999'; el.style.pointerEvents = 'none'
            el.style.left = (e.clientX - ox) + 'px'; el.style.top = (e.clientY - oy) + 'px'
            const after = [...ct.children].filter(li => !li.matches('.drag-float, .drag-hole')).find(li => e.clientY < li.getBoundingClientRect().top + li.offsetHeight / 2)
            after ? after.before(ph) : ct.appendChild(ph)
        })
        const end = () => {
            if(!el) return
            if(ph){ ph.replaceWith(el) }
            el.style.cssText = ''
            el.classList.remove('drag-float')
            if(moved) ct.dispatchEvent(new CustomEvent('sort', {bubbles: true}))
            el = ph = null
        }
        document.addEventListener('pointerup', end)
    })
}
function initRange(root = document){
    scoped(root, 'input[type="range"]').forEach(el => {
        if(el._uiggRangeInit) return
        el._uiggRangeInit = true
        el.addEventListener('input', () => rangeUpdate(el))
        rangeUpdate(el)
    })
}
function rangeUpdate(el){
    const min=parseFloat(el.min)||0
    const max=parseFloat(el.max)||100
    const pct=((parseFloat(el.value)-min)/(max-min))*100
    el.style.setProperty('--value',pct+'%')
}
function alone(elements){
    if(!elements) return
    if(typeof elements === 'string') elements = $$(elements)
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
    const element = typeof selector === 'string' ? $(selector) : selector
    if(!element || !callback) return
    if(!threshold) threshold = 100
    const prevTouchAction = element.style.touchAction
    element.style.touchAction = 'none'
    let startPos = null
    function handleStart(e){
        startPos = {x: e.pageX, y: e.pageY}
    }
    function handleEnd(e){
        if(!startPos) return
        const dx = e.pageX - startPos.x
        const dy = e.pageY - startPos.y
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
    element.addEventListener('pointerdown', handleStart)
    element.addEventListener('pointerup', handleEnd)
    return {off: () => {element.removeEventListener('pointerdown', handleStart); element.removeEventListener('pointerup', handleEnd); element.style.touchAction = prevTouchAction}}
}

// ============ State API ============
const stateMap = {load: 'load', loading: 'load', empty: 'empty', error: 'error', done: 'done'}
const stateTags = ['load', 'empty', 'error', 'done']
const stateTag = status => stateTags.includes(status) ? status : 'done'
const stateItems = box => [...box.querySelectorAll(':scope > load, :scope > empty, :scope > error, :scope > done')]
function stateContent(item, html){
    if(!item) return
    if(html === undefined){
        if(item.tagName !== 'LOAD' && !item.textContent.trim()){
            const defaults = {EMPTY: 'empty', ERROR: 'error', DONE: 'done'}
            item.textContent = defaults[item.tagName] || ''
        }
        return
    }
    item.classList.remove('default')
    if(typeof Node !== 'undefined' && html instanceof Node){
        item.replaceChildren(html)
        return
    }
    if(Array.isArray(html) && typeof Node !== 'undefined' && html.every(el => el instanceof Node)){
        item.replaceChildren(...html)
        return
    }
    if(html && typeof html === 'object'){
        if(html.html !== undefined){item.innerHTML = html.html; return}
        if(html.text !== undefined){item.textContent = html.text; return}
    }
    item.innerHTML = html
}
function state(target, status = 'done', html){
    const box = normalizeRoot(target)
    if(!box) return null
    status = stateMap[status] || status
    const tag = stateTag(status)
    let item = box.querySelector?.(`:scope > ${tag}`)
    if(!item){
        item = document.createElement(tag)
        box.appendChild(item)
    }
    stateContent(item, html)
    stateItems(box).forEach(el => el.hidden = el !== item)
    initCustomElements(box)
    return box
}
function initState(root = document){
    root = normalizeRoot(root)
    if(!root) return null
    scoped(root, 'empty, error, done').forEach(item => stateContent(item))
    return root
}

// ============ Form API ============
function gVal(el){
    if(el.tagName==='INPUT'){
        if(el.type==='file')return el.files[0]||null
        if(el.type==='checkbox')return el.checked?(el.value||'on'):''
        if(el.type==='radio')return el.checked?(el.value||'on'):null
        if(el.type==='number'||el.type==='range')return el.value===''?'':Number(el.value)
        return el.value
    }
    if(el.tagName==='TEXTAREA')return el.value
    if(el.tagName==='SELECT')return el.value
    return null
}
function sVal(el,val){
    if(el.tagName==='INPUT'){
        if(el.type==='file'){if(val==null||val==='')el.value='';return}
        if(el.type==='radio'){el.checked=Array.isArray(val)?val.map(String).includes(String(el.value||'on')):String(el.value||'on')===String(val);return}
        if(el.type==='checkbox'){el.checked=Array.isArray(val)?val.map(String).includes(String(el.value||'on')):typeof val==='boolean'?val:val==null?false:String(el.value||'on')===String(val);return}
        el.value=val
        if(el.type==='range')rangeUpdate(el)
        return
    }
    if(el.tagName==='TEXTAREA'){el.value=val;return}
    if(el.tagName==='SELECT'){el.value=val;return}
    if(typeof el.setData==='function'){el.setData(val);return}
}
function formEditor(el){
    const tm=typeof globalThis!=='undefined'?globalThis.tinymce:null
    if(!tm)return null
    if(el.id&&typeof tm.get==='function'){
        const ed=tm.get(el.id)
        if(ed)return ed
    }
    const editors=tm.editors||tm.EditorManager?.editors||[]
    const list=Array.isArray(editors)?editors:Object.values(editors)
    return list.find(ed=>{
        const target=typeof ed?.getElement==='function'?ed.getElement():ed?.targetElm
        return target===el||(el.id&&ed?.id===el.id)
    })||null
}
function formEditorVal(el){
    const ed=formEditor(el)
    return ed&&typeof ed.getContent==='function'?ed.getContent():undefined
}
function formControlVal(el){
    if(typeof el.getData==='function'){
        const val=el.getData()
        if(val!==undefined)return val
    }
    if(typeof el._uiggValue==='function'){
        const val=el._uiggValue()
        if(val!==undefined)return val
    }
    return formEditorVal(el)
}
function formIgnoreField(el){
    if(el.closest?.('.tox,.tox-tinymce,.tox-tinymce-aux'))return true
    const name=el.getAttribute('name')||''
    if(!/^mce_\d+$/.test(name))return false
    const tm=typeof globalThis!=='undefined'?globalThis.tinymce:null
    const ed=tm&&typeof tm.get==='function'?tm.get(name):null
    if(!ed)return false
    return el.tagName==='TEXTAREA'||el.type==='hidden'||el.hidden||el.getAttribute('aria-hidden')==='true'||el.style?.display==='none'
}
function formCollect(form){
    const data={}, groups={}
    form.querySelectorAll('input[name],textarea[name],select[name]').forEach(el=>{
        const name=el.name;if(!name)return
        if(formIgnoreField(el))return
        const customVal=formControlVal(el)
        if(customVal!==undefined){data[name]=customVal;return}
        const val=gVal(el)
        if(el.type==='radio'){if(val!==null)data[name]=val;return}
        if(el.type==='checkbox'){(groups[name]||(groups[name]=[])).push(val);return}
        data[name]=val
    })
    Object.entries(groups).forEach(([k,v])=>data[k]=v.filter(Boolean))
    form.querySelectorAll('images[name]').forEach(el=>{
        data[el.getAttribute('name')]=el.getData()
    })
    form.querySelectorAll('[name]').forEach(el=>{
        const n=el.getAttribute('name')
        if(formIgnoreField(el))return
        if(n in data)return
        const customVal=formControlVal(el)
        if(customVal!==undefined)data[n]=customVal
    })
    return data
}
function formSet(form,data){
    Object.entries(data).forEach(([name,val])=>{
        const els=form.querySelectorAll(`[name="${name}"]`)
        if(!els.length)return
        els.forEach(el => sVal(el,val))
    })
}
function formReset(form){
    form.querySelectorAll('input[name],textarea[name]').forEach(el=>{
        if(el.type==='checkbox'||el.type==='radio'){el.checked=el.defaultChecked;return}
        if(el.type==='file'){el.value='';return}
        el.value=el.defaultValue||(el.type==='color'?'#000000':(el.type==='range'?String((parseFloat(el.min||0)+parseFloat(el.max||100))/2):''))
        if(el.type==='range')rangeUpdate(el)
    })
    form.querySelectorAll('select[name]').forEach(el=>{el.selectedIndex=0})
    form.querySelectorAll('choice[name]').forEach(el=>{
        const first=el.querySelector('choice-list a')
        if(first){const topA=el.querySelector(':scope>a');topA.innerHTML=first.innerHTML}
    })
    form.querySelectorAll('o.toggle.active,o.checkbox.active,o.checkbox-done.active,o.radio.active,o.radio-done.active').forEach(el=>el.classList.remove('active'))
    form.querySelectorAll('scaler').forEach(el=>{
        const inp=el.querySelector('input[name]');if(inp)inp.value=inp.getAttribute('min')||'0'
    })
    form.querySelectorAll('images[name]').forEach(el=>{if(typeof el.reset==='function')el.reset()})
    form.querySelectorAll('item.error').forEach(el=>el.classList.remove('error'))
}
function formValidate(form){
    form.querySelectorAll('item.error').forEach(el=>el.classList.remove('error'))
    let allValid=true
    if(!form.checkValidity()){
        allValid=false
        form.querySelectorAll(':invalid').forEach(el=>{
            const item=el.closest('item')
            if(item)item.classList.add('error')
        })
    }
    form.querySelectorAll('.parent[required]').forEach(parent=>{
        const hasActive=parent.querySelector(':scope>o.radio.active,:scope>o.radio-done.active,:scope>o.checkbox.active,:scope>o.checkbox-done.active')
        if(!hasActive){allValid=false;const item=parent.closest('item');if(item)item.classList.add('error')}
    })
    return allValid
}
function formController(form){
    if(form._uiggForm)return form._uiggForm
    const getBtns=()=>form.querySelectorAll('.btn-submit,button[type="submit"]')
    const ctrl={
        getData:()=>formCollect(form),
        setData:d=>formSet(form,d),
        reset:()=>formReset(form),
        validate:()=>formValidate(form),
        async submit(fn){
            if(!formValidate(form)){const first=form.querySelector('item.error input,item.error select,item.error textarea');if(first)first.focus();return false}
            const btns=getBtns()
            btns.forEach(b=>b.disabled=true)
            try{
                return await fn(formCollect(form))
            }finally{
                btns.forEach(b=>b.disabled=false)
            }
        },
        toFormData:()=>{
            const fd=new FormData(), data=formCollect(form)
            const isFile=v=>typeof Blob!=='undefined'&&v instanceof Blob
            for(const [k,v] of Object.entries(data)){
                if(Array.isArray(v)){
                    const key=/\[\]$/.test(k)?k:`${k}[]`
                    v.forEach(i=>{if(i!=null)fd.append(key,i)})
                }
                else if(isFile(v)){fd.append(k,v)}
                else if(v!=null){fd.append(k,v)}
            }
            return fd
        }
    }
    return form._uiggForm=Object.assign(form,ctrl)
}
function initForm(root = document){
    scoped(root, 'form[auto]').forEach(f=>Uigg.form(f))
    if(initForm._bound) return
    initForm._bound = true
    document.addEventListener('click',e=>{
        const el=e.target.nodeType===3?e.target.parentElement:e.target
        const btn=el?.closest('[submit],[reset]')
        if(!btn)return
        const form=btn.closest('form[auto]')
        if(!form)return
        e.preventDefault()
        if(btn.hasAttribute('submit')&&form.onSubmit){
            formController(form).submit(form.onSubmit).catch(err=>console.warn('form submit error:',err))
        }else if(btn.hasAttribute('reset')){
            formController(form).reset()
        }
    })
    document.addEventListener('focusout',e=>{
        const el=e.target
        if(!el.matches('input,textarea')||!el.value)return
        const item=el.closest('item');if(!item)return
        el.validity.valid?item.classList.remove('error'):item.classList.add('error')
    })
}

// ============ Uigg Manager ============
const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn()

const Uigg = {
    inited: false,
    mount(root = document){
        root = normalizeRoot(root)
        if(!root) return null
        initCustomElements(root)
        initState(root)
        initPage(root); initFullscreen(root); initSmooth(root);
        initReturn(root); initTop(root); initPopLinks(root); initToggle(root);
        initAutoTextarea(root); initImages(root); initRandom(root); initClue(root);
        initCopy(root); initRange(root); initDrag(root); initForm(root)
        return root
    },
    init(root = document){
        const mounted = this.mount(root)
        if(!this.inited){
            initLang(); initAudio(); initNotifyClose()
            this.inited = true
        }
        return mounted
    },
    tip, alert: alertFn, confirm: confirmFn, prompt: promptFn, notify, notifyRemove, countdown(date){countdownFn(date)}, disable, mobile, touch, alone, state, setCookie, getCookie, isMobileView, $, $$, ready, form: formController, images: initImages, Images,
    lang: (key) => _langData ? (langRead(key, _langData) || key) : key,
}

// Auto-init on DOM ready
ready(() => Uigg.init())

// Attach to window for <script> tag usage
if(typeof window !== 'undefined'){
    window.Uigg = Uigg
    for(const [k,v] of [['mount', root => Uigg.mount(root)],['state',state],['tip',tip],['notify',notify],['touch',touch],['alone',alone],['lang',Uigg.lang],['form',formController],['images',initImages],['Images',Images],['disable',disable],['mobile',mobile],['setCookie',setCookie],['getCookie',getCookie],['countdown',countdownFn],['ready',ready],['initLang',initLang]]) window[k] = v
    // External scripts should use Uigg.$() and Uigg.$$() instead.
}

// ES module exports (works with import when type="module")
export {Uigg, Load, Music, Name, Nav, Tab, Pop, Menu, Scaler, Choice, Progress, Drop, Rate, Hop, Fold, Crumb, Notice, Swiper}
export {Images, state, initCustomElements, initPage, initLang, initFullscreen, initAudio, initSmooth, initReturn, initTop, initPopLinks, initToggle, initAutoTextarea, initImages, initRandom, initClue, initCopy, initNotifyClose, initRange, initDrag, initForm}
export default Uigg
