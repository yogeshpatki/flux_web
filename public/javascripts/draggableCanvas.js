function bindEventsToCanvas(canvas,drawingMethod) {
    var canvasOffset = $(canvas).offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var draggingStartedAt;
    var isDragging = false;

    function handleMouseDown(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        isDragging = true;
        draggingStartedAt = canMouseX;
    }

    function handleMouseUp(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        isDragging = false;
    }

    function handleMouseOut(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        isDragging=false;
    }

    function handleMouseMove(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        if (isDragging) {
            drawingMethod(canvas,draggingStartedAt - canMouseX);
            draggingStartedAt = canMouseX;
        }

    }

    $(canvas).mousedown(function(e){handleMouseDown(e);});
    $(canvas).mousemove(function(e){handleMouseMove(e);});
    $(canvas).mouseup(function(e){handleMouseUp(e);});
    $(canvas).mouseout(function(e){handleMouseOut(e);});
}
