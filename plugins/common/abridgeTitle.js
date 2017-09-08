/*标题长度自动截取
* 作者：chi.yong
*
* */
(function ($) {
    $.fn.abridgeTitle = function(options) { //定义插件的名称，这里为userCp
        var dft = {
            maxSize:"18px",//最大字号
            maxLength:9,//最大长度，超出部分显示为。。。
            minSize:"12px",//最小字号
            minLength:"6"//最小长度
        };
        //var ops = $.extend(dft,options);
        //return this.each(function() {
        //    $.extend( dft, options );
        //});
        var ThisUsername=this.text();//获取DOM内容
        this.attr("title",ThisUsername);//将DOM内容添加到，title属性中
        var ThisLength=ThisUsername.length;//获取DOM内容长度
        if(ThisLength>=dft.minLength+1&&ThisLength<=dft.minLength+3){//判断改变区间
            var i=16;
            if(ThisLength==7){i=15;}
            else if(ThisLength==dft.minLength+2){i=14;}
            else if(ThisLength==dft.minLength+3){i=13;}
            this.css("font-size",i+"px");
        }
        else if(ThisLength>=dft.maxLength+1){//最大长度下，改变DOM内容，超出部分显示为。。。
            this.css("font-size",dft.minSize).text(ThisUsername.slice(0,dft.maxLength)+"...");
        }
    }
})(jQuery);