/*jslint browser:true */
/*global alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */

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

function checkSolution(solution, seed) {
    "use strict";
    var i, result = "",
        // seed = "VVBB",
        pos,
        NO_POS = -1;
    ///
    for (i = 0; i < solution.length; i += 1) { //check for white peg
        if (solution[i] === seed[i]) {
            result += 'V';
        } else {
            pos = seed.indexOf(solution[i]); //position of matched color
            if (pos !== NO_POS) { //check for black peg
                result += 'S';
            } else {
                result += '_'; //color not in use
            }
        }
        seed.replace(seed[i], '*'); //mark the used pegs
    }
    if (result === 'VVVV') {
        return "#You win you are an WINNER! (quit : q)";
    }
    return result;
}

function checkInput(solution, seed) {
    "use strict";
    var colors = "RGBSVLO", //colors that are allowed to use
        i,
        pos,
        NO_POS = -1,
        CODE_LENGTH = 4;
    //
    if (solution.length < CODE_LENGTH) {
        return "#use more pegs, allowed 4";
    }
    if (solution.length > CODE_LENGTH) {
        return "#use less pegs, allowed 4";
    }
    for (i = 0; i < solution.length; i += 1) {
        pos = colors.indexOf(solution[i]);
        if (pos === NO_POS) {
            return "#illegal color, use " + colors;
        }
    }
    return checkSolution(solution, seed); //checkInput acts as a gatekeeper for checkSolution.
}

function play() {
    "use strict";
    var seed = "VVBB",
        solution = "RGBV",
        // i = 0,
        userInput = '',
        result = '';
    //
    do {
        userInput = input("enter a code");
        result = checkInput(userInput, seed);
        if (result[0] === '#') {
            output(result);
        } else {
            outputCode(userInput);
            outputCode(result);
        }
    } while (userInput !== 'Q');
    checkSolution(solution, seed);
}
//
//
//
//
//
//