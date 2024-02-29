(function() {
    // Récupérer les données du prix du Bitcoin (exemple avec l'API CoinGecko)
    const apiUrl = "https://api.coingecko.com/api/v3/coins/solana/market_chart";
    const hoursToFetch = 1; // Récupérer les données pour 1 heure
    const minutesInterval = 5; // Intervalle de temps en minutes
    const params = {
      vs_currency: "usd",
      days: 1,
    };
  
    fetch(`${apiUrl}?${new URLSearchParams(params)}`)
      .then(response => response.json())
      .then(data => {
        const timestamps = data.prices.map(price => new Date(price[0]));
        const prices = data.prices.map(price => price[1]);
  
        // Filtrer les données pour un point toutes les 5 minutes sur la dernière heure
        const filteredTimestamps = [];
        const filteredPrices = [];
  
        const currentTime = new Date();
        const startTime = new Date(currentTime.getTime() - hoursToFetch * 60 * 60 * 1000);
  
        timestamps.forEach((timestamp, index) => {
          if (timestamp >= startTime && (index === 0 || timestamp.getMinutes() % minutesInterval === 0)) {
            filteredTimestamps.push(timestamp);
            filteredPrices.push(prices[index]);
          }
        });
  
        const formattedTimestamps = filteredTimestamps.map(timestamp => {
          // Formater l'heure sous forme "HH:MM"
          const hours = timestamp.getHours().toString().padStart(2, '0');
          const minutes = timestamp.getMinutes().toString().padStart(2, '0');
          return `${hours}:${minutes}`;
        });
  
        const options = {
          chart: {
            type: 'line',
            toolbar: {
              show: false // Désactiver les outils du graphique
            }
          },
          series: [{
            name: 'Prix Solana (USD)',
            data: filteredPrices
          }],
          xaxis: {
            categories: formattedTimestamps
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return Math.floor(value).toString();
              }
            }
          }
        };
  
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      });
  })();
  