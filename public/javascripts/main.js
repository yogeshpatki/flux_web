// Values for the Data Plot, they can also be obtained from a external file
//1x250 data sets.generally periodic wave forms need to be generated.
var sample1 =  getSineWave(50,"square", 2);
var sample2 =  getPeriodicWave(50,"square", 8);


var expectedResult = generateExpectedResult([sample1,sample2]);

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