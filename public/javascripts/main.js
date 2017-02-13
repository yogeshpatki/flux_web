// Values for the Data Plot, they can also be obtained from a external file
var sample1 =  [0, 0, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var sample2 =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function generateExpectedResult(samples) {
    var shiftedSamples = [];
    var result = [];
    for(var sample in samples){
        if(samples.hasOwnProperty(sample)){
            shiftedSamples.push(shiftWaveDataNPlaces(samples[sample], Math.floor(Math.random() * 7) - 3 ));
        }
    }
    for(var i=0;i<shiftedSamples[0].length;i++){
        var net = 0;
        for(var j=0;j<shiftedSamples.length;j++){
            net += shiftedSamples[j][i]
        }
        result.push(net/shiftedSamples.length);
    }
    return result;
}

var expectedResult = generateExpectedResult([sample1,sample2]);
console.log(expectedResult);

$(function(){
    init("#wave_first", [sample1]);
    init("#wave_second", [sample2]);
    plotResult();
    $('button').click(shift);
});

function shift(){
    var array = $(this).parent().data('plot'),
        shiftDirection = $(this).attr('id'),
        shiftedData = shiftWaveDataNPlaces(array,shiftDirection == "left" ? 1 : -1);
    $(this).parent().data('plot',shiftedData);
    var canvas = $(this).parent().find('canvas')[0];
    resetCanvas(canvas);
    init('#'+$(this).parent().find('canvas').attr('id'),[shiftedData]);
    plotResult();
}

//Shifts the array of wave data towards Left by n places
function shiftWaveDataNPlaces(waveData,n){
    var clonedWaveData = waveData.slice();
    clonedWaveData = clonedWaveData.splice(n).concat(clonedWaveData);
    return clonedWaveData;
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
    var gameResult = true;
    for(var i=0;i<canvasData1.length; i++) {
        var currentElement = (parseInt(canvasData1[i]) + parseInt(canvasData2[i]))/2;
        addition.push(currentElement);
        gameResult = gameResult && currentElement == expectedResult[i];
    }
    init("#wave_resultant",[addition,expectedResult],["black","cyan"]);
    if(gameResult){
        alert("You win!")
    }
}
