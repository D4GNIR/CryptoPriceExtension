(function() {
    // Récupérer les données du prix du Bitcoin (exemple avec l'API CoinGecko)
    const apiUrl = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart";
    const daysToFetch = 30; // Récupérer les données pour 30 jours
    const params = {
      vs_currency: "usd",
      days: daysToFetch,
    };
  
    fetch(`${apiUrl}?${new URLSearchParams(params)}`)
      .then(response => response.json())
      .then(data => {
        const timestamps = data.prices.map(price => new Date(price[0]));
        const prices = data.prices.map(price => price[1]);
  
        // Filtrer les données pour un point par jour
        const filteredTimestamps = [];
        const filteredPrices = [];
  
        timestamps.forEach((timestamp, index) => {
          if (index === 0 || timestamp.getDate() !== timestamps[index - 1].getDate()) {
            filteredTimestamps.push(timestamp);
            filteredPrices.push(prices[index]);
          }
        });
  
        const formattedTimestamps = filteredTimestamps.map(timestamp => {
          // Formater la date sous forme "JJ/MM/AAAA"
          const day = timestamp.getDate().toString().padStart(2, '0');
          const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
          const year = timestamp.getFullYear();
          return `${day}/${month}/${year}`;
        });
  
        const options = {
          chart: {
            type: 'line',
            toolbar: {
              show: false // Désactiver les outils du graphique
            }
          },
          series: [{
            name: 'Prix du Bitcoin (USD)',
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
  