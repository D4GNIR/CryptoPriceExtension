(function() {
    // Récupérer les données du prix du Bitcoin (exemple avec l'API CoinGecko)
    const apiUrl = "https://api.coingecko.com/api/v3/coins/solana/market_chart";
    const params = {
      vs_currency: "usd",
      days: "7",
    };

fetch(`${apiUrl}?${new URLSearchParams(params)}`)
  .then(response => response.json())
  .then(data => {
    const timestamps = data.prices.map(price => new Date(price[0]));
    const prices = data.prices.map(price => price[1]);

    // Filtrer les données pour un point par heure pendant 7 jours
    const filteredTimestamps = [];
    const filteredPrices = [];

    timestamps.forEach((timestamp, index) => {
      if (index === 0 || timestamp.getHours() !== timestamps[index - 1].getHours()) {
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
