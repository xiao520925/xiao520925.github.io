
function XMGRect(option) {
    this._init(option);
}

XMGRect.prototype = {
    constructor: XMGRect,
    _init:function (option) {//属性
        option = option || {};
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.width = option.width || 100;
        this.height = option.height || 100;

        //描边
        this.stroke = option.stroke || 'black';
        this.strokeWidth = option.strokeWidth || 5;

        //填充
        this.fill = option.fill || 'gray';

        //旋转
        this.angle = option.angle ||0;
        //位移
        this.translateX = option.translateX || 0;
        this.translateY = option.translateY || 0;
        //缩放
        this.scaleX = option.scaleX || 1;
        this.scaleY = option.scaleY || 1;
    },

    //绘制
    render:function (ctx) {
        ctx.save();
        ctx.beginPath();
        
        //旋转
        ctx.rotate(this.angle * Math.PI /180);
        //位移
        ctx.translate(this.translateX, this.translateY);
        //缩放
        ctx.scale(this.scaleX, this.scaleY);
        
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = this.fill;
        ctx.fillRect(this.x, this.y, this.width,this.height);
        
        ctx.restore();

    }

}