chrome.runtime.onInstalled.addListener(function(){
  fetch('https://api.coingecko.com/api/v3/coins/matic-network').then(function(response) {
    return response.json();
  }).then(function(data) {
    let price = data.market_data.current_price.usd;
    chrome.action.setBadgeText({text: price.toString()});
  });
});
chrome.tabs.onUpdated.addListener(function(){
  fetch('https://api.coingecko.com/api/v3/coins/matic-network').then(function(response) {
    return response.json();
  }).then(function(data) {
    let price = data.market_data.current_price.usd;
    chrome.action.setBadgeText({text: price.toString()});
  });
});