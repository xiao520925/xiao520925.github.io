
function PieChart(option) {
    this._init(option);
}

PieChart.prototype = {
    constructor: PieChart,
    _init:function (option) {//属性
        option = option || {};
        this.x = option.x ||0;
        this.y = option.y ||0;
        this.innterRadius = option.innterRadius || 0;
        this.outerRadius = option.outerRadius || 0;

        this.outerCircleColor = option.outerCircleColor || 'gray';
        this.outerCircleWidth = option.outerCircleWidth || 5;
        this.dateArray = option.dateArray || []; 
    },

    //渲染
    render:function (layer) {
        //1.创建总组
        this.group = new Konva.Group({
            x:0,
            y:0
        });
        layer.add(this.group);

        //2.扇形组
        this.wedgeGroup = new Konva.Group({
            x:0,
            y:0
        });
        this.group.add(this.wedgeGroup);

        //3.区域组
        this.areaGroup = new Konva.Group({
            x:0,
            y:0
        });
        this.group.add(this.areaGroup);

        //4.比例组
        this.ratioGroup = new Konva.Group({
            x:0,
            y:0
        });
        this.group.add(this.ratioGroup);
        
    }
}