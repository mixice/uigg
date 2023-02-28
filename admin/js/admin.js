//----------------------------------------------------------------------------------function
$(function(){
    //----------------------------------------------------------------------------------sider
    $('.sider-toggle').click(function(){$('.sider').toggle()})

    let localUrl = window.location.href,
        pageAllName = localUrl.substring(localUrl.lastIndexOf('/') + 1),
        pageName = pageAllName.substring(0,pageAllName.indexOf('.'))
    //if(pageName == ''){pageName = ''}
    $('.sider a[href="'+pageName+'.php"]').parents('fold-group').addClass('active')
})
