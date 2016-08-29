var drawing = false;
var socket = io();
    
$(document).ready(function() {

    $("canvas").mousedown(function() {
        drawing = true;
        pictionary();
    });
    
    $('canvas').mouseup(function() {
        drawing = false;
        pictionary();
    });
    
});

var pictionary = function() {
    var canvas, context;

    var guessBox;

    var onKeyDown = function(event) {
        if (event.keyCode != 13) { // Enter
            return;
        }

        console.log(guessBox.val());
        guessBox.val('');
    };

    guessBox = $('#guess input');
    guessBox.on('keydown', onKeyDown);

    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI);
        context.fill();
    };

    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    console.log(drawing);

        canvas.on('mousemove', function(event) {
                if(!drawing) return;
                var offset = canvas.offset();
                var position = {x: event.pageX - offset.left,
                                y: event.pageY - offset.top};
                draw(position);
                socket.emit('draw',position);

        });
                
                socket.on('draw', draw);
    };

