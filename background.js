// main.htmlを新しいタブで開く
var showMainPage = function() {
  chrome.tabs.create({
    url:'main.html'
  });
};

(function() {
  chrome.browserAction.onClicked.addListener(showMainPage);
}) ();
