function reopenSession() {
  var urlArray = JSON.parse(localStorage.getItem("session1"));
  urlArray.forEach(function(urlSession) {
    chrome.tabs.create({url: urlSession});
  })
}

function deleteSession() {
    localStorage.removeItem("session1");
}

document.addEventListener("DOMContentLoaded", function(){
  document.querySelector("#saveCurrentWindow").addEventListener("click", function() {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      var urlArray = [];
      tabs.forEach(function(tab) {
        urlArray.push(tab.url);
      })
      localStorage.setItem("session1", JSON.stringify(urlArray));
      console.log(localStorage.getItem("session1"));
    });
  });
  document.querySelector("#opener").addEventListener("click", reopenSession);
  document.querySelector("#deleter").addEventListener("click", deleteSession);
});