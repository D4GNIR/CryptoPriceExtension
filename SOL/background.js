chrome.runtime.onInstalled.addListener(function(){
  fetch('https://api.coingecko.com/api/v3/coins/solana').then(function(response) {
    return response.json();
  }).then(function(data) {
    let price = data.market_data.current_price.usd;
    chrome.action.setBadgeText({ text: price.toFixed(1) });

  });
});
chrome.tabs.onUpdated.addListener(function(){
  fetch('https://api.coingecko.com/api/v3/coins/solana').then(function(response) {
    return response.json();
  }).then(function(data) {
    let price = data.market_data.current_price.usd;
    chrome.action.setBadgeText({ text: price.toFixed(1) });
  });
});