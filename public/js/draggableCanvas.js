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

    function handleMouseUp() {
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

    $(canvas).mousedown(function(e){handleMouseDown(e);});
    $(canvas).mousemove(function(e){handleMouseMove(e);});
    $(canvas).mouseup(function(e){handleMouseUp(e);});
    $(canvas).mouseout(function(e){handleMouseOut(e);});
}
