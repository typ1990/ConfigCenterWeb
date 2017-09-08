/*倒计时插件
* 作者：chi.yong
* 2015-10-22
*
* */
(function($){
    $.fn.countdown = function(options){
        var dft = {
            initialTime :"60s",//预定时间
            timeUnit : "s",
            initialBgColor : "none",//设置为"none"
            initialText :"发送短信验证码",
            bgColor : 'none',//不用设置为"none"
            classN1 :"btn-primary",//要被classN2替换的class，不用设置为"none"
            classN2 :"btn-default",//不用设置为"none"
            method1 : true,
            method2 : true,
        };
        var t=0;
        var id = $(this);
        //获取验证码单击事件
            id.click(function() {
                if(dft.method1)
                {
                    //控制倒计时中，不可重复点击
                    if (t == 0) {
                        t = 1;
                        //初始化时间
                        id.text('重新发送('+dft.initialTime+')');
                        //初始化背景颜色
                        if(dft.initialBgColor != "none"){
                            id.css('background-color', dft.initialBgColor);
                        }
                        if(dft.classN1 != "none" || dft.classN2 != "none"){
                            id.removeClass(dft.classN1).addClass(dft.classN2);
                        }
                        //执行方法
                        dft.method2;
                        //倒计时执行
                        var a = setInterval(function () {
                            if (id.text() != "重新发送(1s)" && id.text() != dft.initialText) {
                                var paddleft = id.text().replace(/[^0-9]/ig, "");
                                var num=parseInt(paddleft)-1;
                                id.text('重新发送('+num + dft.timeUnit+')');
                            } else if (id.text() == "重新发送(1s)") {
                                id.text(dft.initialText);
                                if(dft.bgColor != "none"){
                                    id.css('background-color', dft.bgColor);
                                }
                                if(dft.classN1 != "none" || dft.classN2 != "none") {
                                    id.removeClass(dft.classN2).addClass(dft.classN1);
                                }
                                //放开点击控制
                                t = 0;
                                //清除倒计时
                                clearInterval(a);
                            }
                        }, 1000);
                    }
                }

            });
    };

})(jQuery);