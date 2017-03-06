
function ProgressBar(option) {
    this._init(option);
}

ProgressBar.prototype = {
    constructor: ProgressBar,
    _init:function (option) {//属性
        option = option || {};
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.width = option.width || 0;
        this.height = option.height || 0;

        this.fill = option.fill || 'gray';
        this.stroke = option.stroke || 'black';
        this.strokeWidth = option.strokeWidth || 5;

        this.cornerRadius = option.cornerRadius;
        this.value = option.value;
    },

    render :function (layer) {
        //1.创建组
        this.group = new Konva.Group({
            x:0,
            y:0
        });
        layer.add(this.group);

        //2.创建里面矩形
        var innerRect = new Konva.Rect({
            x:this.x,
            y:this.y,
            width: this.width * this.value,
            height:this.height,
            fill:this.fill,
            id:"innerRect"

        });
        this.group.add(innerRect);

        //3.创建外边的矩形
        var outerRect = new  Konva.Rect({
            x:this.x,
            y:this.y,
            width:this.width,
            height:this.height,

            stroke:this.stroke,
            strokeWidth:this.strokeWidth,
            cornerRadius:this.cornerRadius
        });
        this.group.add(outerRect);

    },
    //更新
    update :function () {
        //拿到里面矩形处理
        var innerRect = this.group.findOne("#innerRect");
        innerRect.to({
            width:this.width,
            duration:1.0, //s
            easing:Konva.Easings.EaseInOut() //两头慢,中间快
        });
    }
}