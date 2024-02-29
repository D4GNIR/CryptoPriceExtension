(function() {
  // Récupérer les données du prix du Bitcoin (exemple avec l'API CoinGecko)
  const apiUrl = "https://api.coingecko.com/api/v3/coins/solana/market_chart";
  const params = {
    vs_currency: "usd",
    days: "1",
  };
fetch(`${apiUrl}?${new URLSearchParams(params)}`)
  .then(response => response.json())
  .then(data => {
    const timestamps = data.prices.map(price => new Date(price[0]));
    const prices = data.prices.map(price => price[1]);

    // Filtrer les données pour un point toutes les heures
    const filteredTimestamps = [];
    const filteredPrices = [];

    timestamps.forEach((timestamp, index) => {
      if (index === 0 || timestamp.getHours() !== timestamps[index - 1].getHours()) {
        filteredTimestamps.push(timestamp);
        filteredPrices.push(prices[index]);
      }
    });

    const formattedTimestamps = filteredTimestamps.map((timestamp, index) => {
      const currentHour = timestamp.getHours();
      if (index === 0 || currentHour !== filteredTimestamps[index - 1].getHours()) {
        // Afficher la date sous forme "JJ mois" à minuit
        if (currentHour === 0) {
          const monthNames = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
          return `${timestamp.getDate()} ${monthNames[timestamp.getMonth()]}`;
        }
        // Afficher l'heure sous forme "HH:00"
        return `${currentHour.toString().padStart(2, '0')}:00`;
      }
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
