var background = chrome.extension.getBackgroundPage();

var currSet = [];
var nIncorrect = 0;
var nMaxIncorrect = 3;
var displayAns = false;

var curr;

background.populateSet(currSet);
nextQuestion();

function nextQuestion() {
  if (currSet.length == 0) {
    alert("FINISHED");
    window.location.href = background.destURL;
  } else {
    var arr = currSet.pop();
    var q = arr[0];
    $("#question").html(q);
    curr = arr;
  }
}

function check(userAns) {
  var q = curr[0];
  var a = curr[1];
  if (displayAns) {
    if (eq(userAns, a)) {
      alert("Good");
      displayAns = false;
      nIncorrect = 0;
      nextQuestion();
    } else {
      alert("Copy the answer you N00B");
    }
  } else if (eq(userAns, a)) {
    alert("You are correct!");
    nIncorrect = 0;
    nextQuestion();
  } else if (++nIncorrect >= nMaxIncorrect) {
      alert("SHOWING THE ANSWER YOU N00B");
      $("#question").html(q + " | " + a);
      displayAns = true;
  } else {
    alert("You are WRONG!!! TRY AGAINAINA");
  }
}

function eq(q, a) {
  return q.toUpperCase().trim() === a.toUpperCase().trim();
}

function submit() {
  var userAns = $("#answer").val();
  check(userAns);
  $("#answer").val("");
}

$("#submit").click(submit);

$(document).keypress(function(e) {
  if (e.which == 13) submit();
});