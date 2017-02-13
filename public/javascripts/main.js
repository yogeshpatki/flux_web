// Values for the Data Plot, they can also be obtained from a external file
var sample1 =  [0, 0, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var sample2 =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

$(function(){
    init("#wave_first", sample1);
    init("#wave_second", sample2);
    plotResult();
    $('button').click(shift);
});

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
    var result = [];
    for(var i=0;i<canvasData1.length; i++) {
        result.push( (parseInt(canvasData1[i]) + parseInt(canvasData2[i]))/2 );
    }
    init("#wave_resultant",result,"black");
}

function shift(){

    var array = $(this).parent().data('plot'),
        shiftDirection = $(this).attr('id');
        shiftedData = shiftWaveDataNPlaces(array,shiftDirection == "left" ? 1 : -1);
    $(this).parent().data('plot',shiftedData);
    var canvas = $(this).parent().find('canvas')[0];
    resetCanvas(canvas);
    init('#'+$(this).parent().find('canvas').attr('id'),shiftedData);
    plotResult();
}

//Shifts the array of wave data towards Left by n places
function shiftWaveDataNPlaces(waveData,n){
    waveData = waveData.splice(n).concat(waveData);
    return waveData;
}