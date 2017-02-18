function bindEventsToCanvas(canvas,drawingMethod) {
    var canvasOffset = $(canvas).offset(),
        offsetX = canvasOffset.left,
        draggingStartedAt,
        isDragging = false;

    function handleMouseDown(e) {
        var xCoordinateOfPointerOnCanvas = parseInt(e.clientX - offsetX);
        isDragging = true;
        draggingStartedAt = xCoordinateOfPointerOnCanvas;
    }

    function handleTouchStart(e){
        var xCoordinateOfTouchOnCanvas = parseInt(e.touches[0].clientX - offsetX);
        isDragging = true;
        draggingStartedAt = xCoordinateOfTouchOnCanvas;
    }

    function handleMouseUp() {
        isDragging = false;
    }

    function handleTouchEnd(){
        isDragging = false;
    }

    function handleMouseOut() {
        isDragging=false;
    }

    function handleMouseMove(e) {
        var xCoordinateOfPointerOnCanvas = parseInt(e.clientX - offsetX);
        if (isDragging) {
            drawingMethod(canvas,draggingStartedAt - xCoordinateOfPointerOnCanvas);
            draggingStartedAt = xCoordinateOfPointerOnCanvas;
        }
    }

    function handleTouchMove(e){
        var xCoordinateOfTouchOnCanvas = parseInt(e.touches[0].clientX - offsetX);
        drawingMethod(canvas,draggingStartedAt - xCoordinateOfTouchOnCanvas);
        draggingStartedAt = xCoordinateOfTouchOnCanvas;
    }

    $(canvas).mousedown(function(e){handleMouseDown(e);});
    $(canvas).mousemove(function(e){handleMouseMove(e);});
    $(canvas).mouseup(function(e){handleMouseUp(e);});
    $(canvas).mouseout(function(e){handleMouseOut(e);});
    $(canvas).on('touchstart',function(e){handleTouchStart(e);});
    $(canvas).on('touchend',function(e){handleTouchEnd(e);});
    $(canvas).on('touchmove',function(e){handleTouchMove(e);});
}
