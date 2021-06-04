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
