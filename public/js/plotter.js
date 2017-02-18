var canvas ;
var context ;
var Val_max;
var Val_min;
var sections;
var xScale;
var yScale;

function init(canvasId,canvasData,color) {
    // set these values for your data
    sections = canvasData[0].length;
    Val_max = 100;
    Val_min = 0;
    var columnSize = 10;
    var rowSize = 5;
    var margin = 10;
    var strokeWidth = 2;

    canvas = $(canvasId)[0];
    $(canvas).parent().data('plot',canvasData[0]);
    context = canvas.getContext("2d");

    yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);  //unit on Y axis
    xScale = (canvas.width - rowSize) / sections; //unit on X axis

    context.translate(rowSize, canvas.height - strokeWidth  + Val_min * yScale);
    context.scale(1,-1 * yScale);
    context.lineWidth = strokeWidth;
    // Color of each dataplot items
    for(var i = 0; i < canvasData.length; i++) {
        if(color != undefined && color[i] != undefined) {
            context.strokeStyle =  color[i];
        }
        plotData(canvasData[i]);
    }
}


function plotData(dataSet) {
    context.beginPath();
    context.moveTo(0, dataSet[0]);
    for (var i=1;i<sections;i++) {
        context.lineTo(i * xScale, dataSet[i]);
    }
    context.stroke();
}

function resetCanvas(canvas){
    context = canvas.getContext("2d");
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function plotResult(){
    resetCanvas($('#wave_resultant')[0]);
    var canvasData1 = $('#wave_first').parent().data('plot');
    var canvasData2 = $('#wave_second').parent().data('plot');
    var addition = [];
    var error = 0;
    for(var i=0;i < sections; i++) {
        var currentElement = (canvasData1[i] + canvasData2[i])/2;
        addition.push(currentElement);
        error += Math.abs(currentElement - expectedResult[i]);
    }
    init("#wave_resultant",[addition,expectedResult],["white","black"]);
    if(error == 0){
        alert("You win!")
    }
    return error;
}

