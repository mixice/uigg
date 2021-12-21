//----------------------------------------------------------------------------------function

$(function(){
    
    //----------------------------------------------------------------------------------industry
	$('.industry').click(function(){
        $('.industry-cont').toggle();
    });
    $('.side').click(function(){
        $('.sider').toggle();
    });
    
    //----------------------------------------------------------------------------------sider
    var localUrl = window.location.href;
    var pageAllName = localUrl.substr(localUrl.lastIndexOf('/')+1);
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
     
    //----------------------------------------------------------------------------------louver
    $('.louver li').click(function(){
        $(this).toggleClass('active');
        $(this).next().toggle();
    });
    
    
});
