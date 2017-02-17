var SAMPLES_IN_A_WAVE = 250;

function getImpulse(width){
    var impulse = [];
    for(var i=0; i<width;i++){
        impulse.push(100);
    }
    return impulse;
}

function periodicWave(period, waveType, shift){
    var periodicWave = [];
    if(waveType == "square"){
        for(var sample=0; sample<SAMPLES_IN_A_WAVE; sample=sample+period) {
            var b = [];
            for (var i = 0; i < period; i++) {
                b.push(i < (period / 2) ? 100 : 0);
            }
            periodicWave =periodicWave.concat(b);
        }
    }
    return shiftWaveDataNPlaces(periodicWave,shift);
}

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