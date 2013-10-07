/*global alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
//global variables
var code = '';
//
var player = {};

function genPlayer(name, score, played) {
    "use strict";
    var that = {
        "name": name,
        "score": score,
        "played": played
    };
    return that;
}

function parseInput(input) { //prepares the input for usage
    "use strict";
    input = input.toUpperCase(); //uppercase
    return input.replace(/\s+/g, ''); //removes all whitespaces in string
}

function input(message) { //
    "use strict";
    return parseInput(prompt(message));
}

function colorization(color) { //
    "use strict";
    //
    switch (color) {
    case 'R':
        return 'background: #FF0000; color: #FFFFFF';
    case 'G':
        return 'background: #00FF00; color: #000000';
    case 'B':
        return 'background: #0000FF; color: #FFFFFF';
    case 'S':
        return 'background: #000000; color: #FFFFFF';
    case 'V':
        return 'background: #FFFFFF; color: #000000';
    case 'L':
        return 'background: #800080; color: #FFFFFF';
    case 'O':
        return 'background: #FFA500; color: #FFFFFF';
    case '_':
        return 'background: #929292; color: #929292';
    }
}

function output(Message) {
    "use strict";
    Message = Message.replace('#', ''); //the # is not ment to be outputed it is an indictor, 
    ///                                 ///to tell if it is an message or an code
    console.log(Message);
}

function outputCode(code) {
    "use strict";
    if (code.length !== 4) { //ensure the length is 4
        return undefined;
    }
    var outCode = "",
        i;
    for (i = 0; i < code.length; i += 1) {
        outCode += ' %c ' + code[i];
    }
    outCode += ' '; //proper format
    //
    console.log(outCode, colorization(code[0]), colorization(code[1]), colorization(code[2]), colorization(code[3]));
}

function checkSolution(solution) {
    "use strict";
    var i, result = "",
        pos,
        NO_POS = -1,
        seed = code;
    ///
    for (i = 0; i < solution.length; i += 1) { //check for white peg
        if (solution[i] === seed[i]) {
            result += 'V';
            seed = seed.replace(seed[i], '*'); //mark the used pegs
        } else {
            pos = seed.indexOf(solution[i]); //position of matched color
            if (pos !== NO_POS) { //check for black peg
                result += 'S';
                seed = seed.replace(seed[pos], '*'); //mark the used pegs
            } else {
                result += '_'; //color not in use
            }
        }
    }
    if (result === 'VVVV') {
        return "#You win you are an WINNER!";
    }
    return result;
}

function checkInput(solution) {
    "use strict";
    var colors = "RGBSVLO", //colors that are allowed to use
        i,
        pos,
        NO_POS = -1,
        CODE_LENGTH = 4;
    //
    if (solution.length < CODE_LENGTH) {
        return "#use more pegs, currently allowed 4 pegs";
    }
    if (solution.length > CODE_LENGTH) {
        return "#use less pegs, currently allowed 4 pegs";
    }
    for (i = 0; i < solution.length; i += 1) {
        pos = colors.indexOf(solution[i]);
        if (pos === NO_POS) {
            return "#illegal color, use " + colors;
        }
    }
    return checkSolution(solution); //checkInput acts as a gatekeeper for checkSolution.
}
//generate random code
//try to implement 

function genCode() {
    "use strict";
    var i,
        code = '',
        random,
        CODE_LENGTH = 4;
    //
    for (i = 0; i < CODE_LENGTH; i += 1) {
        random = Math.floor((Math.random() * 7)); //generate nr from 0-6
        switch (random) {
        case 0:
            code += 'R';
            break;
        case 1:
            code += 'G';
            break;
        case 2:
            code += 'B';
            break;
        case 3:
            code += 'S';
            break;
        case 4:
            code += 'V';
            break;
        case 5:
            code += 'L';
            break;
        case 6:
            code += 'O';
            break;
        default:
            code += '';
        }
    }
    return code;
}

function outputStatus() {
    "use strict";
    output("name: " + player.name);
    output("Score: " + player.score);
    output("nr games played: " + player.played);
}

function play() {
    "use strict";
    // i = 0,
    code = genCode();
    var userInput = '',
        result = '', //the ret from checkInput och checkSolution
        counter = 0,
        MAX_TRIES = 15,
        NO_POS = -1;
    //
    code = genCode();
    //
    player.played += 1; //
    //
    do {
        userInput = input("Use colors R,G,B,S,V,L,O \nenter a code:    " + String(MAX_TRIES - counter) + ": tries left");
        result = checkInput(userInput);
        if (result[0] === '#') {
            output(result);
            //
            if (result.indexOf("WINNER") !== NO_POS) {
                //
                player.score += (MAX_TRIES - counter);
                outputStatus();
                //
                output("would you like to play again= (y/n)");
                userInput = input("would you like to play again? (y/n)");
                switch (userInput) {
                case 'Y':
                case 'YES':
                    return true;
                case 'N':
                case 'NO':
                    return false;
                default:
                    return false;
                }
            }
        } else {
            outputCode(userInput);
            outputCode(result);
        }
        counter += 1;
    } while (userInput !== 'Q' && counter < MAX_TRIES);
}

function main() {
    "use strict";
    output("--- Welcome to Master mind, where you will master your mind ---");
    player = genPlayer(input("what's your name: "), 0, 0);
    do {
        output("let the game begin");
    } while (play());
}
//
//
//
//
//
//