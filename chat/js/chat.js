document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('chat-cont,chat-tip').forEach(el => el.classList.add('anime-fade-in'))
    const chatMsg = document.querySelector('chat-message')
    const chatControlAside = document.querySelector('chat-control aside')
    const chatCont = document.querySelector('chat-cont')
    const chatNew = () => chatMsg && Uigg.scrollAnim(chatMsg, chatMsg.scrollTop, chatMsg.scrollHeight, 300)
    chatNew()
    const emotBtn = document.querySelector('chat-tool .ico-emot-smile')
    emotBtn?.addEventListener('click', () => {
        const next = emotBtn.nextElementSibling
        next && (next.style.display = next.style.display === 'block' ? 'none' : 'block')
    })
    const focusEnd = el => {
        if(!el) return
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
        el.focus()
    }
    document.querySelectorAll('chat [uigg="emot"] s').forEach(s => {
        s.addEventListener('click', () => {
            const tip = s.closest('chat-tip')
            tip && (tip.style.display = 'none')
            chatControlAside && chatControlAside.appendChild(s)
            focusEnd(chatControlAside)
        })
    })
    const closeBtn = document.querySelector('chat-title x.ico-close')
    closeBtn?.addEventListener('click', () => {
        chatCont && (chatCont.style.display = 'none')
    })
    document.addEventListener('click', e => {
        if(e.target.matches?.('chat aside img')){
            const imgSrc = e.target.getAttribute('src')
            const pop = document.createElement('pop')
            pop.className = 'anime-fade-in center'
            pop.innerHTML = `<img src="${imgSrc}">`
            document.querySelector('chat')?.appendChild(pop)
        }
        if(e.target.closest('chat pop')){e.target.closest('chat pop').remove()}
    })
    document.querySelectorAll('chat-list li').forEach(li => {
        li.addEventListener('click', () => {
            chatCont && (chatCont.style.display = 'flex')
            chatNew()
        })
    })
    const doSend = () => {
        const messageVal = chatControlAside?.innerHTML || ''
        if(messageVal === '') return
        const time = new Date().toLocaleTimeString()
        const msgLi = document.createElement('li')
        msgLi.className = 'mine'
        msgLi.innerHTML = `<em class="avatar" style="background-image: "></em><cite>${time}</cite><aside>${messageVal}</aside>`
        chatMsg?.appendChild(msgLi)
        chatControlAside.innerHTML = ''
        chatNew()
    }
    const sendBtn = document.querySelector('chat-control a')
    sendBtn?.addEventListener('click', doSend)
    chatControlAside?.addEventListener('keydown', e => {
        if(e.key === 'Enter' && !e.ctrlKey){e.preventDefault(); doSend()}
        if(e.key === 'Enter' && e.ctrlKey){e.preventDefault(); document.execCommand('insertLineBreak')}
    })
    const fileInput = document.querySelector('chat-tool .ico-folder-empty input')
    fileInput?.addEventListener('change', () => {
        const fileValue = fileInput.value
        const fileFormat = fileValue.substring(fileValue.lastIndexOf('.')).toLowerCase()
        const fileName = fileValue.substring(fileValue.lastIndexOf('\\') + 1)
        const fileUrl = URL.createObjectURL(fileInput.files[0])
        if(!chatControlAside) return
        if(/\.(png|jpg|jpeg|webp|gif)$/.test(fileFormat)) chatControlAside.innerHTML += `<img src="${fileUrl}">`
        else if(/\.(mp4|webm)$/.test(fileFormat)) chatControlAside.innerHTML += `<video src="${fileUrl}" controls></video>`
        else if(/\.(mp3|ogg|wav|midi)$/.test(fileFormat)) chatControlAside.innerHTML += `<audio src="${fileUrl}" controls></audio>`
        else chatControlAside.innerHTML += `<a download href="${fileUrl}"><i class="ico ico-file"></i>${fileName}</a>`
        focusEnd(chatControlAside)
    })
})
