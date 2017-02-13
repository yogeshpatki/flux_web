// Values for the Data Plot, they can also be obtained from a external file
var sample1 =  [0, 0, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var sample2 =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//var Nokia =   [20, -10, -20, -25, -40, 5, 10, 28, 30, 43, 65, 80];

$(function(){
    init("#wave_first", sample1);
    init("#wave_second", sample2);
    plotResult();

    $('.right').click(function(){
        var array = $(this).parent().data('plot').split(',');
        array = array.splice(1).concat(array);
        $(this).parent().attr('data-plot',array);
        var canvas = $(this).parent().find('canvas')[0],
        context = canvas.getContext("2d");
        //context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        //context.restore();
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log(array);
        init('#'+$(this).parent().find('canvas').attr('id'),array);
    });
});