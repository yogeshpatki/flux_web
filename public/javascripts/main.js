// Values for the Data Plot, they can also be obtained from a external file
var sample1 =  [0, 0, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var sample2 =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

$(function(){
    init("#wave_first", sample1);
    init("#wave_second", sample2);
    plotResult();

    $('.right').click(function(){
        var array = $(this).parent().data('plot').split(','),
        shift = array.splice(array.length - 1);
        array = shift.concat(array);
        $(this).parent().attr('data-plot',array);
        var canvas = $(this).parent().find('canvas')[0];
        resetCanvas(canvas);
        init('#'+$(this).parent().find('canvas').attr('id'),array);
    }); 
});

function resetCanvas(canvas){
    context = canvas.getContext("2d");
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
}