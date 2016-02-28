var background = chrome.extension.getBackgroundPage();

var currSet = [];
var nIncorrect = 0;
var nMaxIncorrect = 3;

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
  if (userAns == a) {
    alert("You are correct!");
    nextQuestion(); 
  } else if (++nIncorrect >= nMaxIncorrect) {
    alert("Skipping problem...");
    currSet.unshift(curr);
    nIncorrect = 0;
    nextQuestion();
  } else {
    alert("You are WRONG!!! TRY AGAINAINA");
  }
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