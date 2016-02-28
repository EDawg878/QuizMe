var count = 0;
var threshold = 5;
var enabled = true;
//

// Quiz Vars
var qIndex = 0;
var nQuestions = 3;
var destURL = "";
var totalSet = [];

// QUIZ
function read(data) {
  data.split("\n").forEach(function(line) {
    var entry = line.split("|");
    var q = entry[0];
    var a = entry[1];
    totalSet.push([q, a]);
  });
}

function populateSet(currSet) {
  var n = 0;
  while (n < nQuestions) {
    if (qIndex == totalSet.length) qIndex = 0;
    var arr = totalSet[qIndex];
    currSet.push(arr);
    qIndex++;
    n++;
  }
}

$.get("quiz.txt", read);
//

// Background
function studyBreak(tab) {
  chrome.tabs.update(tab.id, { url : "popup.html" });
}

function log(url, tab) {
  if (enabled && ++count >= threshold) {
    destURL = url;
    studyBreak(tab);
    count = 0;
  }
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var url = changeInfo.url;
  if (url) {
    log(url, tab);
  }
})
//

// Toggle Button
chrome.browserAction.onClicked.addListener(function(tab) {
  if (enabled) {
    chrome.browserAction.setIcon({path : "disabled.png", tabId : tab.id});
    enabled = false; 
  } else {
    chrome.browserAction.setIcon({path : "enabled.png", tabId : tab.id});
    enabled = true;
  }
});