var background = chrome.extension.getBackgroundPage();

var currSet = [];
var nIncorrect = 0;
var nMaxIncorrect = 3;
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
    setTimeout(()=> {
      window.location.href = background.destURL;
    }, 1500);
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
      setTimeout(()=> {
        reset();
        displayAns = false;
        nIncorrect = 0;
        nextQuestion();
      }, 1500);
    } else {
        red("You must copy the answer!");
        setTimeout(reset, 1500);
    }
} else if (eq(userAns, a)) {
    green("Correct!");
    setTimeout(()=> {
      reset();
      nIncorrect = 0;
      nextQuestion();
    }, 1500);
  } else if (++nIncorrect >= nMaxIncorrect) {
      red("Wrong! Here's the answer");
      setTimeout(()=> {
        reset(q + " | " + a);
        displayAns = true;
      }, 1500);
  } else {
    red("Wrong!");
    setTimeout(reset, 1500);
  }
}

function setQuestion(txt) {
  question = txt;
  $("#question").html(txt);
}

function reset(txt) {
  displayNotification = false;
  if (txt) {
    $("#question").html(txt);
  } else {
    $("#question").html(question);
  }
  $("#box").removeAttr("style");
}

function green(txt) {
  displayNotification = true;
  $("#question").html(txt);
  $("#box").css("background-color", "#00ff00");
}

function red(txt) {
  displayNotif = true;
  $("#question").html(txt);
  $("#box").css("background-color", "#620000");
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

$(document).keypress(function(e) {
  if (e.which == 13) submit();
});