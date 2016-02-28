var background = chrome.extension.getBackgroundPage();

var currSet = [];
var nIncorrect = 0;
var nMaxIncorrect = 3;
var nTimeout = 1000;
var displayAns = false;
var displayNotification = false;

var time;
var question;
var curr;

background.populateSet(currSet);
nextQuestion();

function nextQuestion() {
    if (currSet.length == 0) {
        green("Completed Set!");
        setTimeout(() => {
            window.location.href = background.destURL;
        }, nTimeout);
    } else {
        var arr = currSet.pop();
        var q = arr[0];
        setQuestion(q);
        curr = arr;
    }
}

function check(userAns) {
    var q = curr[0];
    var a = curr[1];
    if (displayAns) {
        if (eq(userAns, a)) {
            green("Good!");
            setTimeout(() => {
                reset();
                displayAns = false;
                nIncorrect = 0;
                nextQuestion();
            }, nTimeout);
        } else {
            red("You must copy the answer!");
            setTimeout(reset, nTimeout);
        }
    } else if (eq(userAns, a)) {
        green("Correct!");
        setTimeout(() => {
            reset();
            nIncorrect = 0;
            nextQuestion();
        }, nTimeout);
    } else if (++nIncorrect >= nMaxIncorrect) {
        red("Wrong! Here's the answer");
        setTimeout(() => {
            reset(q + " | " + a);
            displayAns = true;
        }, nTimeout);
    } else {
        red("Wrong!");
        setTimeout(reset, nTimeout);
    }
}

function setQuestion(txt) {
    question = txt;
    $("#question").html(txt);
}

function reset(txt) {
    displayNotification = false;
    if (txt) {
        setQuestion(txt);
    } else {
        $("#question").html(question);
    }
    $("#box").removeAttr("style");
}

function green(txt) {
    displayNotification = true;
    $("#question").html(txt);
    $("#box").css("background-color", "#82ed82");
}

function red(txt) {
    displayNotification = true;
    $("#question").html(txt);
    $("#box").css("color", "#EEDEDF");
    $("#box").css("background-color", "#d61a1a");
}

function eq(q, a) {
    return q.toUpperCase().trim() === a.toUpperCase().trim();
}

function submit() {
    if (displayNotification) return;
    var userAns = $("#answer").val();
    check(userAns);
    $("#answer").val("");
}

$("#submit").click(submit);

$(document).keypress(function (e) {
    if (e.which == 13) submit();
});