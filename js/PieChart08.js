
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
        //0.备份指针
        var self = this;
        
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
        
        //5.绘制外圆
        var outerCircle = new Konva.Circle({
            x:this.x,
            y:this.y,
            radius:this.outerRadius,
            stroke:'gray',
            strokeWidth:6
        });
        this.group.add(outerCircle);
        
        //6.根据数据绘制扇形
        var beginAngle = -90;

        this.dateArray.forEach(function (item, index) {
            var tempAngle = item.value *360;
            //6.1 绘制里面的扇形
            var wedge = new Konva.Wedge({
                x:self.x,
                y:self.y,
                radius:this.innterRadius,
                fill:item.color,
                // angle:item.value *360,
                angle:tempAngle,
                rotation:beginAngle
            });
            //6.2 加入组
            self.wedgeGroup.add(wedge);

            //6.3 绘制比例文字
            //计算文字角度
            var textAngle = beginAngle + tempAngle * 0.5;
            var textX = self.x + (self.outerRadius + 30) * Math.cos(textAngle * Math.PI/180);
            var textY = self.y + (self.outerRadius + 30) * Math.sin(textAngle * Math.PI/180);
            var valueText = new Konva.Text({
                x:textX,
                y:textY,
                fill:item.color,
                fontSize:18,
                text:item.value * 100 + "%"
            });
            self.ratioGroup.add(valueText);


            //更新起始角度, 注意:一定要在最后更新角度
            beginAngle += tempAngle;
        });
        
    }
}