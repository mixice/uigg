/*
 * uigg 2.1 (build 20211111)
 * Project: https://ui.gg
 * Author: http://www.mixice.com
 * Github: https://github.com/mixice/uigg
 * license: MIT
 */

//----------------------------------------------------------------------------------rem
(function(doc, win){
    var docElement = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function(){
        var viewWidth = docElement.clientWidth;
        if(viewWidth > 640){
            viewWidth = 640;
        }
        if(viewWidth < 320){
            viewWidth = 320;
        }
        docElement.style.fontSize = 100 * (viewWidth / 640) + 'px';
    };
    recalc();
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);

//----------------------------------------------------------------------------------load
document.onreadystatechange = function(){
    if(document.readyState == 'complete'){
        $('load').hide();
    }
};
setTimeout(function(){
    $('load').hide();
},6000);

//----------------------------------------------------------------------------------browser
$(function(){
    var OsObject = navigator.userAgent;
    if(OsObject.indexOf('MSIE') != -1 || OsObject.indexOf('Trident') != -1){
        $('body').html('<msie>please use another browser</msie>');
    }
    //else if(OsObject.indexOf('Chrome') != -1){}
    //else if(OsObject.indexOf('Firefox') != -1){}
    //else if(OsObject.indexOf('Safari') != -1){}
});

//----------------------------------------------------------------------------------music
$(function(){
    $('music').addClass('ico');
    $('music audio').attr('id','music');
    $('music audio').attr('autoplay','');
    $('music audio').attr('loop','');
    document.addEventListener('DOMContentLoaded',function(){
        function audioAutoPlay(){
            var audio = document.getElementById('music');
                audio.play();
            document.addEventListener('WeixinJSBridgeReady',function(){
                audio.play();
            }, false);
        }
        audioAutoPlay();
    });
    if(typeof($('music').attr('pause')) == 'undefined'){}else{
        $('#music')[0].pause();
    };
    $('music').click(function(){
        if(typeof($(this).attr('pause')) == 'undefined'){
            $(this).attr('pause','');
            $('#music')[0].pause();
        }else{
            $(this).removeAttr('pause');
            $('#music')[0].play();
        };
    });
});

//----------------------------------------------------------------------------------fullscreen
$(document).on('click','.fullscreen', function toggleFullScreen(){
    if((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)){
        if(document.documentElement.requestFullScreen){
            document.documentElement.requestFullScreen();
        }else if(document.documentElement.mozRequestFullScreen){
            document.documentElement.mozRequestFullScreen();
        }else if(document.documentElement.webkitRequestFullScreen){
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }else{
        if(document.cancelFullScreen){
            document.cancelFullScreen();
        }else if(document.mozCancelFullScreen){
            document.mozCancelFullScreen();
        }else if(document.webkitCancelFullScreen){
            document.webkitCancelFullScreen();
        }
    }
});
$(function(){
    $('.fullscreen').addClass('ico');
    $('.fullscreen').click(function(){
        $(this).toggleClass('active');
    });
});

//----------------------------------------------------------------------------------touch
jQuery.fn.bindmove = function(newdirect,newfn){
    $(this).on('touchstart', function(e){
        if(e.cancelable){
            if(!e.defaultPrevented){
                e.preventDefault();
            }
        }
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
    });
    $(this).on('touchend', function(e){
        if(e.cancelable){
            if(!e.defaultPrevented){
                e.preventDefault();
            }
        }
        moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;
        console.log(X,Y,newdirect);
        if((X != 0 || Y != 0) && newdirect=='touchall'){
            eval(newfn); return;
        }
        if( X > 30  && newdirect=='touchright'){
            eval(newfn); return;
        }else if( X < -30  && newdirect=='touchleft'){
            eval(newfn); return;
        }else if( Y > 30 && newdirect=='touchdown'){
            eval(newfn); return;
        }else if( Y < -30  && newdirect=='touchup'){
            console.log(newfn);
            eval(newfn); return;
        }
    });
};

//----------------------------------------------------------------------------------swiper
$(function(){
    $('.swiper-button-next').addClass('ico ico-alone-right');
    $('.swiper-button-prev').addClass('ico ico-alone-left');
});
function lug(){
    $('.lug-thumbs a').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    var mySwiper = new Swiper('.lug-top',{
        on: {
            touchEnd: function(swiper,event){
                var swiperIndex = $('.lug-top .swiper-slide-active').index();
                $('.lug-thumbs a').eq(swiperIndex).addClass('active').siblings().removeClass('active');
            },
        },
    });
};

//----------------------------------------------------------------------------------random
$(function(){
    $('[src~="uigg-img"]').each(function(){
        $(this).attr('src','https://ui.gg/lib/images/img?=' + Math.floor(Math.random() * 100));
    });
    $('[src~="uigg-product"]').each(function(){
        $(this).attr('src','https://ui.gg/lib/images/product?=' + Math.floor(Math.random() * 100));
    });
    $('[src~="uigg-bg"]').each(function(){
        $(this).attr('src','https://ui.gg/lib/images/bg?=' + Math.floor(Math.random() * 100));
    });
    $('[src~="uigg-avatar"]').each(function(){
        $(this).attr('src','https://ui.gg/lib/images/avatar?=' + Math.floor(Math.random() * 100));
    });
    $('[src~="uigg-color"]').each(function(){
        $(this).attr('src','https://ui.gg/lib/images/color?=' + Math.floor(Math.random() * 100));
    });
    $('[style~="uigg-img"]').each(function(){
        $(this).attr('style','background-image: url(https://ui.gg/lib/images/img?=' + Math.floor(Math.random() * 100) +');');
    });
    $('[style~="uigg-product"]').each(function(){
        $(this).attr('style','background-image: url(https://ui.gg/lib/images/product?=' + Math.floor(Math.random() * 100) +');');
    });
    $('[style~="uigg-bg"]').each(function(){
        $(this).attr('style','background-image: url(https://ui.gg/lib/images/bg?=' + Math.floor(Math.random() * 100) +');');
    });
    $('[style~="uigg-avatar"]').each(function(){
        $(this).attr('style','background-image: url(https://ui.gg/lib/images/avatar?=' + Math.floor(Math.random() * 100) +');');
    });
    $('[style~="uigg-color"]').each(function(){
        $(this).attr('style','background-image: url(https://ui.gg/lib/images/color?=' + Math.floor(Math.random() * 100) +');');
    });
    $('.avatar').each(function(){
        if($(this).css('background-image') == 'none'){
            $(this).attr('style','background-image: url(https://ui.gg/lib/images/avatar?=' + Math.floor(Math.random() * 100) +');');
        }
    });

    $('uigg-title').each(function(){
        var len = 10;
        var rnd = Math.floor(Math.random() * len);
        var txt = new Array(len);
        txt[0]='Lorem ipsum dolor sit amet consectetur adipisicing elit';
        txt[1]='Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
        txt[2]='Ut enim ad minim veniam';
        txt[3]='Quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat';
        txt[4]='Duis aute irure dolor in reprehenderit in voluptate';
        txt[5]='Velit esse cillum dolore eu fugiat';
        txt[6]='Excepteur sint occaecat cupidatat non proident';
        txt[7]='Sunt in culpa qui officia deserunt mollit anim id est laborum';
        txt[8]='Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium';
        txt[9]='Totam rem aperiam eaque ipsa quae ab illo inventore veritatis enim';
        $(this).append(txt[rnd]);
    });
    $('uigg-txt').append('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.');

    var arr = new Array();
    for(var i = 1;i <= 100;i++){
        arr[i] = i;
        $('uigg-emot').append('<s style="background-image: url(https://ui.gg/lib/emot/' + i + '.svg)"></s>');
    };
});

//----------------------------------------------------------------------------------disable
//disable right click menu
function disable(){
    document.oncontextmenu = function(event){
        if(window.event){
            event = window.event;
        }
        try {
            var the = Event.srcElement;
            if(!((the.tagName == 'INPUT' && the.type.toLowerCase() == 'text') || the.tagName == 'TEXTAREA')){
                return false;
            }
            return true;
        } catch (e){
            return false;
        }
    }
    //disable Ctrl+U
    var arr = [123, 17, 18];
    document.oncontextmenu = new Function('event.returnValue=false'),

        window.onkeydown = function(e){
            var keyCode = e.keyCode || e.which || e.charCode;
            var ctrlKey = e.ctrlKey || e.metaKey;
            console.log(keyCode + '--' + keyCode);
            if(ctrlKey && keyCode == 85){
                e.preventDefault();
            }
            if(ctrlKey && keyCode == 83){
                e.preventDefault();
            }
            if(arr.indexOf(keyCode) > -1){
                e.preventDefault();
            }
        }
    //disable F12
    document.onkeydown = function (event){
        if(KeyboardEvent.keyCode == 123){
            return false;
        }
    }
    window.onhelp = function(){
        return false;
    }
};

//----------------------------------------------------------------------------------smooth
$(function(){
    $('.smooth').click(function(){
        $('html,body').animate({scrollTop: ($($(this).attr('href')).offset().top -0)},1000);
    });
});

//----------------------------------------------------------------------------------return
$(function(){
    $('.return').click(function(){
        history.back(-1);
    });
});

//----------------------------------------------------------------------------------anew
$(function(){
    $('.anew.btn').addClass('ico ico-alone-top');
    $('.anew').click(function(){
		$('html,body').animate({scrollTop:'0px'},1000);
	});
    $(document).scroll(function(){
        var winTop = $(window).scrollTop();
        var winHeight = $(window).height();
        if(winTop > winHeight){
            $('.anew').css('opacity','1');
        }else{
            $('.anew').css('opacity','0');
        };
    });
});

//----------------------------------------------------------------------------------tab
$(function(){
    $('tab-group').addClass('anime-fade-in');
    $('tab-list li').click(function(){
        tabIndex = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().next().children().eq(tabIndex).addClass('active').siblings().removeClass('active');
    });
});

//----------------------------------------------------------------------------------pop
$(function(){
    $('pop').append('<x></x>');
    $('pop').addClass('anime-fade-in');
    $('pop-main').wrap('<div class="full center"></div>');
    $('pop-main').addClass('anime-zoom-in');
    $('pop-choice').addClass('anime-fade-in-up');
    $('pop-title .close').addClass('ico');
    $('pop .close, pop x').click(function(){
        $(this).parents('pop').hide();
    });
    if($('pop-sider').css('left') == 'auto'){
        $('pop-sider').addClass('anime-fade-in-right');
    }else{
        $('pop-sider').addClass('anime-fade-in-left');
    };
});

//----------------------------------------------------------------------------------menu
$(function(){
    $('menu').append('<x class="ico"></x>');
    $('menu x').click(function(){
        $('menu-cont').toggle();
    });
    $('menu-cont,menu-group').addClass('anime-fade-in');
    var docWidth = $(document).width();
    if(docWidth <= 640){
        $('menu-cont li').click(function(){
            var menuGroup = $(this).children('menu-group');
            if(menuGroup.css('display') == 'block'){
                menuGroup.hide();
            }else{
                $('menu-group').hide();
                menuGroup.show();
            };
        });
    }
});

//----------------------------------------------------------------------------------toggle
$(function(){
    $('o.checkbox,o.checkbox-done,o.checkbox-cancel,o.favorite,o.star,o.visibility,o.password,o.mic,o.volume,o.muzak,o.phonecard,o.telecamera,o.camera,o.aim,o.semaphore,o.suitcase,o.toggle').click(function(){
        $(this).toggleClass('active');
    });
    $(document).on('click','o.radio,o.radio-done',function(){
        $(this).parent().parent().parent().find('o.radio,o.radio-done').removeClass('active');
        $(this).addClass('active');
    });
    $('o.checkbox-all').click(function(){
        if($(this).hasClass('active')){
            $(this).parent().parent().parent().parent().find('o.checkbox,o.checkbox-done').addClass('active');
        }else{
            $(this).parent().parent().parent().parent().find('o.checkbox,o.checkbox-done').removeClass('active');
        }
    });
    $('o.password').click(function(){
        var inputType = $(this).siblings('input').attr('type');
        if(inputType == 'password'){
            $(this).siblings('input').attr('type','text');
        }else{
            $(this).siblings('input').attr('type','password');
        };
    });
});

//----------------------------------------------------------------------------------scaler
$(function(){
    $('scaler input').before('<a class="ico ico-reduce"></a>');
    $('scaler input').after('<a class="ico ico-add"></a>');
    $('scaler .ico-add').click(function(){
        var calcInput = $(this).siblings('input');
        calcInput.val(parseInt(calcInput.val()) + 1);
    });
    $('scaler .ico-reduce').click(function(){
        var calcInput = $(this).siblings('input');
        if(calcInput.val() > 0){
            calcInput.val(parseInt(calcInput.val()) - 1);
        }
    });
});

//----------------------------------------------------------------------------------upload
$(function(){
    $('.upload-add').click(function(){
        $(this).before('<div class="ico upload-group"><input type="file"><x class="ico"></x></div>');
        uploadImg();
    });
    $(document).on('click','.upload-group x',function(){
        $(this).parent().remove();
    });
    function uploadImg(){
        $('.upload-group input').on('change',function(){
            var imgValue = $(this).val();
            var fileFormat = imgValue.substring(imgValue.lastIndexOf('.')).toLowerCase();
            var imgUrl = window.URL.createObjectURL(this.files[0]);
            if(!fileFormat.match(/.png|.jpg|.jpeg|.svg|.webp|.gif/)){
                alert('File format must be: png/jpg/jpeg/svg/webp/gif');
            }else{
                $(this).parent().attr('style','background-image:url(' + imgUrl + ');');
                $(this).parent().css('color','transparent');
            };
        });
    };
    uploadImg();
});

//----------------------------------------------------------------------------------tip
var tipVal;
function tip(){
    $('body').append('<tip class="anime-zoom-in">' + tipVal + '</tip>');
    var tipHeight = $('tip').height();
    var tipWidth = $('tip').width();
    $('tip').css('margin-top', -tipHeight/2-11 + 'px');
    $('tip').css('margin-left', -tipWidth/2-20 + 'px');
    setTimeout(function(){
         $('tip').hide();
    },3000);
}

//----------------------------------------------------------------------------------drop
$(function(){
    $('drop-list').before('<i class="ico ico-alone-right"></i>');
    $('drop').append('<drop-cont></drop-cont>');
    var dropFirst = $(this).find('drop-list li').html();
    $(this).find('drop-cont').html(dropFirst);
    $('drop-cont').click(function(){
        $(this).parent().toggleClass('active');
    });
    $('drop-list').addClass('anime-fade-in');
    $('drop-list ul').before('<x></x>');
    $('drop-list li').click(function(){
        if($(this).children('drop-list').length){}else{
            var dropFirst = $(this).html();
            $(this).parents('drop').find('drop-cont').html(dropFirst);
            $(this).parents('drop').removeClass('active');
        };
    });
    $('drop x').click(function(){
        $(this).parents('drop').removeClass('active');
    });
});

//----------------------------------------------------------------------------------alone
var alone;
$(function(){
    $(alone).each(function(){
        txt = $(this).html();
        aloneEl = txt.match(/./g);
        element = '';
        for (var i = 0; i < aloneEl.length; i++){
            word = aloneEl[i];
            element += '<z>' + word + '</z>';
         }
         $(this).html(element);
    });
});

//----------------------------------------------------------------------------------rate
$(function(){
    $('rate').html('<i></i><i></i><i></i><i></i><i></i>');
    $('rate i').addClass('ico ico-star').filter(':lt('+$('rate').attr('value')+')').addClass('active');
    $('rate[edit] i').click(function(){
        $(this).parent().attr('value',$(this).index()+1);
        $(this).siblings().removeClass('active');
        $(this).prevAll().addClass('active');
        $(this).addClass('active');
    });
});

//----------------------------------------------------------------------------------name
$(function(){
    $('name').addClass('anime-fade-in-down');
    $('name-search input').before('<i class="ico ico-search"></i>');
    $('name h2,name-logo').after('<u></u>');
});

//----------------------------------------------------------------------------------nav
$(function(){
    $('nav').before('<space></space>');
    $('nav').addClass('anime-fade-in-up');
});

//----------------------------------------------------------------------------------countdown
var countDate;
function countdown(){
    var date = new Date();
    var now = date.getTime();
    var endDate = new Date(countDate);
    var end = endDate.getTime();
    var leftTime = end-now;
    var d,h,m,s;
    if(leftTime>=0){
        d = Math.floor(leftTime/1000/60/60/24);
        h = Math.floor(leftTime/1000/60/60%24);
        m = Math.floor(leftTime/1000/60%60);
        s = Math.floor(leftTime/1000%60);
    }
    function digit(num,n){
        return (Array(n).join(0) + num).slice(-n);
    };
    $('countdown d').html(d);
    $('countdown h').html(digit(h,2));
    $('countdown m').html(digit(m,2));
    $('countdown s').html(digit(s,2));
    setTimeout(countdown,1000);
};

//----------------------------------------------------------------------------------notify
var notifyVal;
function notifyAdd(){
    $('notify').append('<li class="anime-bounce-in-right"><x class="ico ico-close"></x>'+ notifyVal +'</li>');
    $('notify audio')[0].play();
};
function notify(){
    if($('notify').length == 0){
        $('body').append('<notify><audio src="https://ui.gg/lib/media/notify.mp3"></audio></notify>');
        notifyAdd();
    }else{
        notifyAdd();
    }
};
$(document).on('click','notify x',function(){
    $(this).parent().addClass('anime-flip-out-x');
    var notifyThis = $(this).parent();
    setTimeout(function(){
        notifyThis.hide();
    },500);
});

//----------------------------------------------------------------------------------btn
$(function(){
    $('.btn').attr('onselectstart','return false');
});

//----------------------------------------------------------------------------------copy
var copy, copyNum;
$(function(){
    copy = $('[copy-btn]');
    $(copy).click(function(){
        copyNum = $(this).attr('copy-btn');
        copyFunction();
    });
    function copyFunction(){
        if(copyNum == ''){var copyEl = $('[copy-val]');}else{var copyEl = $('[copy-val='+copyNum+']');};
        if(copyEl.is('input')){var copyVal = copyEl.val();}else{var copyVal = copyEl.html();};
        var copyInput = document.createElement('input');
        copyInput.value = copyVal;
        document.body.appendChild(copyInput);
        copyInput.select();
        document.execCommand('Copy');
        copyInput.remove();
    };
});

//----------------------------------------------------------------------------------empty
$(function(){
    $('empty').each(function(){
        if($(this).is(':empty')){
            $(this).addClass('default');
        };
    });
});

//----------------------------------------------------------------------------------hop
$(function(){
    $('hop-cont').before('<x></x>');
    $('hop-cont').addClass('anime-fade-in');
    $('hop-cont a:first-child').after('<corner></corner>');
    var hopWidth = $('hop > a').width();
    var cornerWidth = $('hop-cont corner').width();
    $('hop-cont corner').css('right',(hopWidth+cornerWidth)/2+'px');
    $('hop > a').click(function(){
        $(this).siblings('hop-cont').toggle();
        $(this).siblings('x').toggle();
    });
    $('hop x').click(function(){
        $(this).siblings('hop-cont').hide();
        $(this).hide();
    });
});

//----------------------------------------------------------------------------------chat
$(function(){
    $('chat-cont,chat-tip').addClass('anime-fade-in');
    function chatNew(){
        $('chat-message').animate({scrollTop: '999999999'},1000);
    };
    chatNew();
    $('.ico-emot-smile').click(function(){
        $(this).next().toggle();
    });
    $('chat uigg-emot s').click(function(){
        $(this).parent().parent().hide();
        console.log(1);
        $('chat-control aside').append($(this));
    });
    $('chat-title x.ico-close').click(function(){
        $(this).parent().parent().hide();
    });
    $(document).on('click','chat aside img',function(){
        $('chat').append('<pop class="anime-fade-in center"><img src="' + $(this).attr('src') + '"></pop>');
    });
    $(document).on('click','chat pop',function(){
        $(this).remove();
    });
    $('chat-list li').click(function(){
        $('chat-cont').css('display','flex');
        chatNew();
    });
    $('chat-control a').click(function(){
        var messageVal = $('chat-control aside').html();
        var date = new Date();
        var time = date.toLocaleTimeString();
        if(messageVal == ''){}else{
            $('chat-message').append('<li class="mine"><em class="avatar" style="background-image: "></em><cite>' + time + '</cite><aside>' + messageVal + '</aside></li>');
            $('chat-control aside').html('');
            chatNew();
        };
    });
    $('chat-tool .ico-folder-empty input').on('change',function(){
        var fileValue = $(this).val();
        var fileFormat = fileValue.substring(fileValue.lastIndexOf('.')).toLowerCase();
        var fileName = fileValue.substring(fileValue.lastIndexOf('\\')+1);
        var fileUrl = window.URL.createObjectURL(this.files[0]);
        if(fileFormat.match(/.png|.jpg|.jpeg|.svg|.webp|.gif/)){
            $('chat-control aside').append('<img src="' + fileUrl + '">');
            return;
        }if(fileFormat.match(/.mp4|.webm/)){
            $('chat-control aside').append('<video src="' + fileUrl + '" controls></video>');
            return;
        }if(fileFormat.match(/.mp3|.ogg|.wav|.midi/)){
            $('chat-control aside').append('<audio src="' + fileUrl + '" controls></audio>');
            return;
        }else{
            $('chat-control aside').append('<a download href="' + fileUrl + '"><i class="ico ico-file"></i>' + fileName + '</a>');
        };
    });
});

//----------------------------------------------------------------------------------fold
$(function(){
    $('fold > li').append('<s class="ico ico-alone-bottom"></s>');
    $('fold aside').addClass('anime-fade-in');

    if(typeof($('fold').attr('show')) == 'undefined'){
        $('fold > li').click(function(){
            var foldCont = $(this).next();
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                foldCont.hide();
            }else{
                foldCont.show().siblings('fold aside').hide();
                $(this).addClass('active').siblings().removeClass('active');
            }
        });
    }else{
        $('fold > li').addClass('active');
        $('fold aside').css('display','block');
        $('fold > li').click(function(){
            $(this).toggleClass('active');
            $(this).next().toggle();
        });
    };
});

//----------------------------------------------------------------------------------
$(function(){

});








