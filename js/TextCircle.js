
function TextCircle(option) {
    this._init(option);
}

TextCircle.prototype = {
    constructor: TextCircle,
    _init:function (option) {//属性
        option = option || {};

        this.x = option.x || 0;
        this.y = option.y || 0;
        this.innerRadius = option.innerRadius || 0;
        this.outerRadius = option.outerRadius || 0;

        //填充颜色
        this.innerFill = option.innerFill || 'blue';
        this.outerFill = option.outerFill || 'gray';//圆环填充色

        //中心文字
        this.text = option.text || 'XMG';
        this.textColor = option.textColor || 'white';

        //圆环透明度
        this.opacity = option.opacity || 1;

    },

    //绘制
    render :function (layerOrGroup) {
        //1.创建组
        var group = new Konva.Group({
            x:this.x,
            y:this.y
        });
        layerOrGroup.add(group);

        //2.内圆
        var innerCircle = new Konva.Circle({
            radius:this.innerRadius,
            fill:this.innerFill
        });
        group.add(innerCircle);

        //3.圆环
        var outerCircle = new Konva.Ring({
            innerRadius:this.innerRadius,
            outerRadius:this.outerRadius,
            fill:this.outerFill,
            opacity:this.opacity
        });
        group.add(outerCircle);

        //4.中心文字
        var centerText = new Konva.Text({
            x:-this.innerRadius,
            y:-9,
            text:this.text,
            fill:this.textColor,
            fontSize:18,
            align:"center",
            width:this.innerRadius * 2
        });
        group.add(centerText);

    }
};
