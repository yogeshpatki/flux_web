// Values for the Data Plot, they can also be obtained from a external file
//1x250 data sets.generally periodic wave forms need to be generated.
var sample1 =  getSineWave(50,"square", 2);
var sample2 =  getPeriodicWave(50,"square", 8);
var audio = $('audio')[0];
audio.playbackRate = 0.5;
var expectedResult = generateExpectedResult([sample1,sample2]);

$(function(){
    $('audio').attr('src','/audio/Intro.mp3');

    if($('audio')[0].readyState != 4) {
        $(audio).on('loadeddata', dataLoaded);
    }else{
        dataLoaded();
    }
});

function dataLoaded() {
    $('audio')[0].play();
    $('.pageLoader').fadeOut(1500,function(){
        $('.graphs').fadeIn();
        init("#wave_first", [sample1], ["#5aecfc"]);
        bindEventsToCanvas($('#wave_first')[0], shiftByN);
        init("#wave_second", [sample2], ["#ffff00"]);
        bindEventsToCanvas($('#wave_second')[0], shiftByN);
        plotResult();
        $('button').click(shift);
    });


}

function shift(){
    var array = $(this).closest('.row').find('.canvasContainer').data('plot'),
        shiftDirection = $(this).attr('id'),
        shiftedData = shiftWaveDataNPlaces(array,shiftDirection == "left" ? 1 : -1);
    $(this).parent().data('plot',shiftedData);
    var canvas = $(this).closest('.row').find('.canvasContainer').find('canvas')[0];
    resetCanvas(canvas);
    init('#'+$(this).closest('.row').find('.canvasContainer').find('canvas').attr('id'),[shiftedData]);
    var error = plotResult();
    if(error > 4000){
        audio.playbackRate = 0.5;
    }else{
        audio.playbackRate = 0.5 + (0.5 * (4000-error))/4000;
        console.log(0.5 + (0.5 * (4000-error))/4000);
    }
}


function shiftByN(canvas,n){
    var array = $(canvas).parent().data('plot'),
        shiftedData = shiftWaveDataNPlaces(array, n);
    $(canvas).parent().data('plot',shiftedData);
    resetCanvas(canvas);
    init('#'+$(canvas).attr('id'),[shiftedData]);
    var error = plotResult();
    if(error > 8000){
        audio.playbackRate = 0.1;
    }else{
        audio.playbackRate = 0.1 + (0.9 * (8000-error))/8000;
    }
}