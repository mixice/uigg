//----------------------------------------------------------------------------------function

$(function(){
    //----------------------------------------------------------------------------------sider
    $('.sider-toggle').click(function(){
        $('.sider').toggle();
    });

    var localUrl = window.location.href;
    var pageAllName = localUrl.substring(localUrl.lastIndexOf('/')+1);
    var pageName = pageAllName.substring(0,pageAllName.indexOf('.'));
    //if(pageName == ''){pageName = ''};
    $('.sider-list a[href="'+pageName+'.php"]').addClass('active');

    $('.sider-list li > a').click(function(){
        $('.sider-group').hide();
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).next().hide();
        }else{
            $('.sider-list li > a').removeClass('active');
            $(this).addClass('active');
            $(this).next().show();
        };
    });

});
