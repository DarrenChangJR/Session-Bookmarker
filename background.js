chrome.runtime.onInstalled.addListener(() => {
	chrome.tabs.query({currentWindow: true}, function(tabs) {
		var urlArray = [];
		tabs.forEach(function(tab) {
			urlArray.push(tab.url);
		})
		console.log(urlArray)
	});
})


// chrome.runtime.onInstalled.addListener(() => {
// 	chrome.tabs.query({currentWindow: true}, function(tabs) {
		// var urlArray = [];
		// for(tab in tabs){
		// 	urlArray.push(tab["url"]);
		// 	console.log(tab);
		// }
// 		console.log(urlArray);
// 	});
// })