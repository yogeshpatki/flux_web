var SAMPLES_IN_A_WAVE = 250;

function getSquarePeriodicWave(period) {
    var periodicWave = [];
    for (var sample = 0; sample < SAMPLES_IN_A_WAVE; sample = sample + period) {
        var b = [];
        for (var i = 0; i < period; i++) {
            b.push(i < (period / 2) ? 100 : 0);
        }
        periodicWave = periodicWave.concat(b);
    }
    return periodicWave;
}

function getPeriodicWave(period, waveType, shift){
    var periodicWave;
    if(waveType == "square"){
        periodicWave = getSquarePeriodicWave(period);
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


//Shifts the array of wave data towards Left by n places
function shiftWaveDataNPlaces(waveData,n){
    var clonedWaveData = waveData.slice();
    clonedWaveData = clonedWaveData.splice(n).concat(clonedWaveData);
    return clonedWaveData;
}