$(function(){
    $('.sider x').click(function(){$('.sider').toggleClass('active')})
    $('fold a').click(function(){
        $('fold a').removeClass('active')
        $(this).addClass('active')
    })
    $('xmp').click(function(){
        navigator.clipboard.writeText($(this).text().trim())
        .then(() => tip(copyRight),err => tip(copyErr + err))
    })
});







