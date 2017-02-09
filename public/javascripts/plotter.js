var canvas ;
var context ;
var Val_max;
var Val_min;
var sections;
var xScale;
var yScale;

function init(canvasId,canvasData,color) {
    // set these values for your data
    sections = 32;
    Val_max = 100;
    Val_min = 0;
    var columnSize = 10;
    var rowSize = 5;
    var margin = 10;

    canvas = $(canvasId)[0];
    $(canvas).parent().attr('data-plot',canvasData);
    context = canvas.getContext("2d");

    yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);  //unit on Y axis
    xScale = (canvas.width - rowSize) / sections; //unit on X axis

    context.translate(rowSize,canvas.height + Val_min * yScale);
    context.scale(1,-1 * yScale);

    // Color of each dataplot items

    context.strokeStyle= color == undefined ? "#FF0066" : color ;
    plotData(canvasData);
}

function plotData(dataSet) {
    context.beginPath();
    context.moveTo(0, dataSet[0]);
    for (var i=1;i<sections;i++) {
        context.lineTo(i * xScale, dataSet[i]);
    }
    context.stroke();
}

function plotResult(){
    var canvasData1 = $('#wave_first').parent().data('plot').split(',');
    console.log(canvasData1);

    var canvasData2 = $('#wave_second').parent().data('plot').split(',');
    console.log(canvasData2);

    var result = [];
    for(var i=0;i<canvasData1.length; i++) {
        result.push( (parseInt(canvasData1[i]) + parseInt(canvasData2[i]))/2 );
    }
    console.log(result);
    init("#wave_resultant",result,"black");
}