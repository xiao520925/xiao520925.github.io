$.fn.extend({
    enter: function (name, ratio, bw, bh) {
        var self = this;
        var obj = $(name);
        this.on('mouseenter', function (event) {
            var event = event || window.event;
            //��ȡ��ǰ����ֵ
            var clientX = event.clientX;//��ʼX
            var clientY = event.clientY;//��ʼY
            //console.log(clientX,clientY)
            perX = -clientX / (bw / obj.get(0).offsetWidth);
            perY = -clientY / (bh / obj.get(0).offsetHeight);
            console.log(perX, perY);
            obj.css({transform: 'translate(' + perX + 'px,' + perY + 'px)', transition: 'all 0.2s'});
            self.move(obj, ratio, bw, bh);

        })
    },
    move: function (obj, ratio, bw, bh) {
        this.on('mousemove', function (event) {
            var event = event || window.event;
            var moveX = event.clientX;
            var moveY = event.clientY;
            perX = -moveX / (bw / obj.get(0).offsetWidth) * ratio;
            perY = -moveY / (bh / obj.get(0).offsetHeight) * ratio;
            obj.css({transform: 'translate(' + perX + 'px,' + perY + 'px)'});
        });
    },
    prog:function (obj1,obj2,className,r){
    this.on('scroll', function () {
        //��ȡ�����ĸ߶�
        var scrollTop = document.body.scrollTop;
        var progressTop = obj1.offset().top - r;
        if (scrollTop >= progressTop) {
            obj2.addClass(className);
        } else if(scrollTop < progressTop){
            obj2.removeClass(className);
        }
    });
}
});