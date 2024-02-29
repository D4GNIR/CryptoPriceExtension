(function() {
  // Récupérer les données du prix du Bitcoin (exemple avec l'API CoinGecko)
  const apiUrl = "https://api.coingecko.com/api/v3/coins/solana/market_chart";
  const daysToFetch = 365; // Récupérer les données pour 365 jours
  const params = {
    vs_currency: "usd",
    days: daysToFetch,
  };

  fetch(`${apiUrl}?${new URLSearchParams(params)}`)
    .then(response => response.json())
    .then(data => {
      const timestamps = data.prices.map(price => new Date(price[0]));
      const prices = data.prices.map(price => price[1]);

      // Filtrer les données pour un point par jour sur les derniers 365 jours
      const filteredTimestamps = [];
      const filteredPrices = [];

      const currentTime = new Date();
      const startTime = new Date(currentTime.getTime() - daysToFetch * 24 * 60 * 60 * 1000);

      timestamps.forEach((timestamp, index) => {
        if (timestamp >= startTime && (index === 0 || timestamp.getDate() !== timestamps[index - 1].getDate())) {
          filteredTimestamps.push(timestamp);
          filteredPrices.push(prices[index]);
        }
      });

      const formattedTimestamps = filteredTimestamps.map(timestamp => {
        // Formater la date sous forme "JJ mois"
        const day = timestamp.getDate();
        const monthNames = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
        const month = monthNames[timestamp.getMonth()];
        return `${day} ${month}`;
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
