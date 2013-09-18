/*jslint browser:true */
/*global alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */

function colorization(color) { //
    "use strict";
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

function output(str) {
    "use strict";
    if (str.length !== 4) { //ensure the length is 4
        return undefined;
    }
    var outStr = "",
        i;
    for (i = 0; i < str.length; i += 1) {
        outStr += ' %c ' + str[i];
    }
    outStr += ' '; //proper format
    console.log(outStr, colorization(str[0]), colorization(str[1]), colorization(str[2]), colorization(str[3]));
}

function checkSolution(solution, seed) {
    "use strict";
    var i, result = "",
        // seed = "VVBB",
        pos,
        NO_POS = -1;
    ///
    solution = solution.trim();
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
    solution = solution.trim(); //remove unecessary whitespaces from user input
    if (solution.length < CODE_LENGTH) {
        return "use more pegs, allowed 4";
    }
    if (solution.length > CODE_LENGTH) {
        return "use less pegs, allowed 4";
    }
    for (i = 0; i < solution.length; i += 1) {
        pos = colors.indexOf(solution[i]);
        if (pos === NO_POS) {
            return "illegal color, use " + colors;
        }
    }
    return checkSolution(solution, seed); //checkInput acts as a gatekeeper for checkSolution.
}

function play() {
    "use strict";
    var seed = "VVBB",
        solution = "RGBV",
        i;
    for () {}
    checkSolution(solution, seed);
}