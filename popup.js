function reopenSession() {
    chrome.storage.sync.get(['session1'], function(result) {
        // var i = 0;
        // for (i = 0; i<result.length; i++) {
        //     console.log(result.session1[i]);
        //     chrome.tabs.create({url: result.session1[i]});
        // }
        // console.log(result.session1);
        result.session1.forEach(function(urlSession) {
            chrome.tabs.create({url: urlSession});
        })
    });
}

document.addEventListener("DOMContentLoaded", function(){
  document.querySelector("#saveCurrentWindow").addEventListener("click", function() {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
    	var urlArray = [];
    	tabs.forEach(function(tab) {
    		urlArray.push(tab.url);
    	})
    	console.log(urlArray);
    	chrome.storage.sync.set({session1 : urlArray}, function(){
    		console.log('"session1" has been saved successfully.')
    	});
    });
  });
  document.querySelector("#session").addEventListener("click", reopenSession);
});