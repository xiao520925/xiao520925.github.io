
/*日历  begin*/
//1.获取标签
var op = document.getElementById('op');
var oSpan = document.getElementById('oSpan');

//2.设置日期
var myDay = new Date();
//2.1获取年份
var year = myDay.getFullYear();
//月份
var month = myDay.getMonth()+1;
var day = myDay.getDate();
var weekDay = myDay.getDay();
var weeKArray = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
op.innerHTML = year +'年'+month + '月'+ day +'日'+weeKArray[weekDay];
oSpan.innerHTML = day;
op.style.color = 'pink'
oSpan.style.color = 'green'
/*日历  end*/

/*吸顶效果*****begin**********/
var fix = document.getElementById('fix');
var sec = document.getElementById('sec');

var begin = 0 , end = 0, timer = null;
window.onscroll = function () {
    // var fixLeft = fix.offsetLeft;
    var secLeft = sec.offsetLeft;
    // console.log(secLeft);
    /*吸顶效果*****begin**********/
    if(scroll().top > 305){
        fix.className = 'fixed';
        fix.style.left = (secLeft + 85 ) + 'px';
    }else{
        fix.className = '';
    }
    /*吸顶效果*****end**********/

    /*返回顶部********begin****/
    var scrollTop = scroll().top;
    // console.log(scrollTop)
    // 1.2 显示或影藏
    // scrollTop > 0 ? show($('to_top')) : hide($('to_top'));
    if(scrollTop > 135){
        show($('to_top'))
    }else {
        hide($('to_top'))
    }
    begin = scrollTop;
}
// 2. 监听点击
$('to_top').onclick = function () {
    clearInterval(timer);
    timer = setInterval(function () {
        begin = begin + (end - begin) / 10;
        window.scrollTo(0, begin);
        if(parseInt(begin) == parseInt(end)){
            // console.log(begin, end);
            clearInterval(timer);
        }
    }, 20);
}
/*返回顶部********end****/



// window.onscroll = function () {
//     // 兼容的写法
//     var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
//     var scrollLeft = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft;
//     console.log(scrollTop);
// }










