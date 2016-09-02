var drawing = false;
var socket = io();

var WORDS = [
    "word", "letter", "number", "person", "pen", "class", "people",
    "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
    "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
    "land", "home", "hand", "house", "picture", "animal", "mother", "father",
    "brother", "sister", "world", "head", "page", "country", "question",
    "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
    "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
    "west", "child", "children", "example", "paper", "music", "river", "car",
    "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
    "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
    "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
    "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
    "space"
];


var word_gen = function () {
    var word_num = Math.floor((Math.random() * 100)) + 1;
    var guess_word = WORDS[word_num];
    console.log(guess_word);
    $('#word').text("Your word to draw: " + guess_word + word_num);
};
    
$(document).ready(function() {

    $("canvas").mousedown(function() {
        drawing = true;
        pictionary();
    });
    
    $('canvas').mouseup(function() {
        drawing = false;
        pictionary();
    });
    
    word_gen();
    
});

var pictionary = function() {
    var canvas, context;

    var guessBox;
    var onKeyDown = function(event) {
        if (event.keyCode != 13) { // Enter
            return;
        }
        var guess = guessBox.val();
        socket.emit('guess',guess);
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
    
    var user_guess = function(user_guess) {
        console.log(user_guess);
        $('#user_guess').text("User guessed: " + user_guess);
    };

    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;

        canvas.on('mousemove', function(event) {
                if(!drawing) return;
                var offset = canvas.offset();
                var position = {x: event.pageX - offset.left,
                                y: event.pageY - offset.top};
                draw(position);
                socket.emit('draw',position);

        });
                
                socket.on('draw', draw);
                socket.on('guess',user_guess);
    };

