chrome.runtime.onInstalled.addListener(function(){
  fetch('https://blockchain.info/ticker').then(function(response) {
    return response.json();
  }).then(function(data) {
    let price = Math.floor(data.USD.last);
    chrome.action.setBadgeText({text: price.toString()});
  });
});
chrome.tabs.onUpdated.addListener(function(){
  fetch('https://blockchain.info/ticker').then(function(response) {
    return response.json();
  }).then(function(data) {
    let price = Math.floor(data.USD.last);
    chrome.action.setBadgeText({text: price.toString()});
  });
});