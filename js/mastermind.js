/*jslint browser:true */
/*global EventUtil: false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */

var selectedColor = "",
    numColors = 0,
    code = "";
var myCol = ["lila", "red", "blue", "orange", "black", "white", "green"];
var transCode = ["A", "B", "C", "D", "E", "F", "G"];
var result_color = ["gray", "black", "white"];
var result_pattern = ["_", "S", "V"];


//
// Get color returns the classname found in list or "".
//

function getColorClass(node, list) {
    for (var i = 0; i < list.length; i = i + 1) {
        if (node.classList.contains(list[i]) === true) {
            return list[i];
        }
    }
    return ""; // Not a color class here yet
}

//
// Erase the color-class found in list, add color-class color.
//

function setColorClass(node, color, list) {
    for (var i = 0; i < list.length; i = i + 1) {
        if (node.classList.contains(list[i]) === true) {
            node.classList.remove(list[i]);
        }
    }
    // Check color => set if there were one
    if (color != "") {
        node.classList.add(color);
    }
}

function scroll(func) {
    "use strict";
    var i, j, panel1, panel2, result1, result2;

    for (i = 1; i < 15; i = i + 1) {
        panel1 = document.getElementById("row" + i).getElementsByClassName("columns");
        result1 = document.getElementById("row" + i).getElementsByClassName("pcolumns");
        panel2 = document.getElementById("row" + (i + 1)).getElementsByClassName("columns");
        result2 = document.getElementById("row" + (i + 1)).getElementsByClassName("pcolumns");
        console.log()
        for (j = 0; j < 4; j = j + 1) {
            if (func === true) {
                setColorClass(panel1[j], getColorClass(panel2[j], myCol), myCol);
                setColorClass(result1[j], getColorClass(result2[j], result_color), result_color);
            } else {
                // Cleans the fields
                setColorClass(panel1[j], "", myCol);
                setColorClass(result1[j], "", result_color);
            }
        }
        if (func === false && i === 14) {
            resetLowest();
        }
    }
}

function resetLowest() {
    "use strict";
    var panel, result;
    panel = document.getElementById("row15").getElementsByClassName("columns");
    result = document.getElementById("row15").getElementsByClassName("pcolumns");
    for (var i = 0; i < 4; i = i + 1) {
        setColorClass(panel[i], "", myCol);
        setColorClass(result[i], "", result_color);
    }
    // reset numColors
    numColors = 0;
}

function display_pattern(pattern) {
    "use strict";
    var i, j;

    // this should get our 4 result panels
    var result_panel = document.getElementById("row15").getElementsByClassName("pcolumns");

    for (i = 0; i < pattern.length; i = i + 1) {
        for (j = 0; j < result_pattern.length; j = j + 1) {
            if (pattern[i] === result_pattern[j]) {
                result_panel[i].classList.add(result_color[j]);
                break;
            }
        }
    }
}

function checkRow() {
    "use strict";
    var i, j, result = "",
        pos, solution = "",
        NO_POS = -1,
        seed = code;

    // Get solution string
    var panel = document.getElementById("row15").getElementsByClassName("droptarget");

    for (i = 0; i < panel.length; i = i + 1) {
        for (j = 0; j < myCol.length; j = j + 1) {
            if (panel[i].classList.contains(myCol[j]) === true) {
                solution = solution + transCode[j];
                break;
            }
        }
    }
    console.log("solution =" + solution);
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
    display_pattern(result);
    // If the pattern is right prepare to clean
    if (result === 'VVVV') {
        // Present winner on a place, and display the master code
        alert("You win, you are a WINNER!");
        scroll(false); // true means scroll, false clean
        code = genCode(); // Generate a new code
    }
}

function genCode() {
    "use strict";
    var i,
        code = '',
        random,
        CODE_LENGTH = 4;
    //
    for (i = 0; i < CODE_LENGTH; i += 1) {
        random = Math.floor((Math.random() * 7)); //generate nr from 0-6
        code = code + transCode[random];
    }
    return code;
}


// User selects color 

function selectColor(event) {
    "use strict";
    selectedColor = event.toElement.classList[1];
    console.log("Color selected" + selectedColor);
}

function setColor(event) {
    "use strict";
    var i = 0;

    // We must check to see if there is a color class already are there
    for (i = 0; i < myCol.length; i = i + 1) {
        if (event.target.classList.contains(myCol[i]) === true) {
            event.target.classList.remove(myCol[i]);
            numColors = numColors - 1; // Set this one before
        }
    }

    // after clensed the old color it's safe to set a new one
    event.target.classList.add(selectedColor);
    numColors = numColors + 1; // New color on dot
    if (numColors === 4) {
        checkRow();
        scroll(true); // true means scroll, false means clean.
        resetLowest();
    }
}

// wait for window to be ready, and set up for a game.
window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    var dragItem = document.querySelectorAll(".dragball"),
        dropTarget = document.querySelectorAll(".droptarget"),
        i = 0;

    code = genCode(); // Generate a code (Yes, it's global for now)

    for (i = 0; i < dropTarget.length; i = i + 1) {
        dropTarget[i].addEventListener("click", setColor);
    }

    for (i = 0; i < dragItem.length; i = i + 1) {
        dragItem[i].addEventListener("click", selectColor);
    }
});