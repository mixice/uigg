$(function(){
    $('.sider u').click(function(){$('.sider').toggleClass('active')})
    $('fold a').click(function(){
        $('fold a').removeClass('active')
        $(this).addClass('active')
    })
    $('xmp').click(function(){
        navigator.clipboard.writeText($(this).html())
        tipVal = 'Copy successful'
        tip()
    })


});







