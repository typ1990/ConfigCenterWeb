/*���ⳤ���Զ���ȡ
* ���ߣ�chi.yong
*
* */
(function ($) {
    $.fn.abridgeTitle = function(options) { //�����������ƣ�����ΪuserCp
        var dft = {
            maxSize:"18px",//����ֺ�
            maxLength:9,//��󳤶ȣ�����������ʾΪ������
            minSize:"12px",//��С�ֺ�
            minLength:"6"//��С����
        };
        //var ops = $.extend(dft,options);
        //return this.each(function() {
        //    $.extend( dft, options );
        //});
        var ThisUsername=this.text();//��ȡDOM����
        this.attr("title",ThisUsername);//��DOM������ӵ���title������
        var ThisLength=ThisUsername.length;//��ȡDOM���ݳ���
        if(ThisLength>=dft.minLength+1&&ThisLength<=dft.minLength+3){//�жϸı�����
            var i=16;
            if(ThisLength==7){i=15;}
            else if(ThisLength==dft.minLength+2){i=14;}
            else if(ThisLength==dft.minLength+3){i=13;}
            this.css("font-size",i+"px");
        }
        else if(ThisLength>=dft.maxLength+1){//��󳤶��£��ı�DOM���ݣ�����������ʾΪ������
            this.css("font-size",dft.minSize).text(ThisUsername.slice(0,dft.maxLength)+"...");
        }
    }
})(jQuery);