
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
        
        this.animationIndex = 0;//动画索引属性
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

            //6.4 文字特殊情况处理
            if(textAngle > 90 && textAngle < 270){
                valueText.x(textX - valueText.width());
            }
            self.ratioGroup.add(valueText);

            //6.4 创建区域中内容
            var tempX = self.x + self.outerRadius + 200;
            var tempY = self.y + index * 30;
            var tempWidth = 60;
            var tempHeight = 20;
            var areaRect = new Konva.Rect({
                x:tempX,
                y:tempY,
                width:tempWidth,
                height:tempHeight,
                fill:item.color
            });
            self.areaGroup.add(areaRect);
            
            //区域内容
            var areaText = new Konva.Text({
                x:tempX + tempWidth + 10,
                y:tempY,
                text:item.name,
                fill:item.color,
                fontSize:20
            });
            self.areaGroup.add(areaText);

            //更新起始角度, 注意:一定要在最后更新角度
            beginAngle += tempAngle;
        });
        
    },

    //执行动画
    playAnimation:function () {
        //备份指针
        var self = this;

        //初始状态-->让所有的扇形的角度为0
        if(this.animationIndex == 0 ){
            this.wedgeGroup.getChildren().each(function (item, index) {
               item.angle(0);
            });
        }

        //结束状态
        var wedge =  this.wedgeGroup.getChildren()[this.animationIndex];
        wedge.to({
            angle:this.dateArray[this.animationIndex].value * 360,
            duration: this.dateArray[this.animationIndex].value, //1s内,做动画时间
            onFinish:function () {
                //让索引++
                self.animationIndex++;
                //过滤
                if(self.animationIndex >= self.dateArray.length){
                    console.log(self.animationIndex);
                    self.animationIndex = 0;
                    return;
                }
                
                //递归调用
                self.playAnimation();
            }
        });

    }

};