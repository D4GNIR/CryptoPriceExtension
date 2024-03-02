document.addEventListener("DOMContentLoaded", function () {
  // Générer le conteneur initial pour le graphique
  generateChartContainer();

  // Charger le script correspondant à la périodicité par défaut (1d)
  loadScript('chart1d.js');
  
  // Récupération de tous les boutons avec la classe "time-button"
  var boutons = document.querySelectorAll(".time-button");

  // Ajout de l'événement de clic à chaque bouton
  boutons.forEach(function(bouton) {
    bouton.addEventListener("click", function() {
      // Récupérer le nom du script à partir de l'attribut "data-script"
      var scriptName = bouton.getAttribute("data-script");

      // Supprimer l'ancien graphique s'il existe
      var oldChart = document.querySelector(".chart-box");
      if (oldChart) {
        oldChart.innerHTML = ''; // Supprimer le contenu de l'ancien graphique
      }

      // Générer un nouveau conteneur pour le graphique
      generateChartContainer();

      // Charger le script dynamiquement
      loadScript(scriptName);
    });
  });
});

// Fonction pour générer le conteneur du graphique
function generateChartContainer() {
  var chartContainer = document.createElement("div");
  chartContainer.id = "chart";
  chartContainer.classList.add("chart"); // Ajouter des classes si nécessaire
  document.querySelector(".chart-box").appendChild(chartContainer);
}

// Fonction pour charger un script dynamiquement
function loadScript(scriptName) {
  var script = document.createElement("script");
  script.src = scriptName;
  document.head.appendChild(script);
}



document.addEventListener('DOMContentLoaded', function() {
  var inputElement = document.getElementById('valeur');
  var sauvegarderButton = document.getElementById('sauvegarder');
  var soldeActuel = localStorage.getItem('soldeSolana');

  // si pas de valeur dans le local storage on initialise
  if (!soldeActuel) {
    soldeActuel = 1;
    localStorage.setItem('soldeSolana', soldeActuel);
  }
  // on met à jour la zone de saisie
  inputElement.value = soldeActuel;

  //click sur le bouton sauvegarder
  sauvegarderButton.addEventListener('click', function() {
    // on récupère la valeur saisie, on la met dans le local storage et on l'affiche dans la saisie + appel au calcul
    var nouveauSolde = inputElement.value;
    localStorage.setItem('soldeSolana', nouveauSolde);
    inputElement.value = nouveauSolde;
    conversion()
  });
  conversion()
});


function conversion() {
  var affichageDiv = document.getElementById('affichageValeur');
  var soldeActuel = localStorage.getItem('soldeSolana');

  fetch('https://api.coingecko.com/api/v3/coins/solana').then(function(response) {
    return response.json();
  }).then(function(data) {
    let price = data.market_data.current_price.usd;
    let sous = soldeActuel*parseFloat(price)
    affichageDiv.textContent = sous.toFixed(2) + " USD (" + parseFloat(price).toFixed(2) + ")" ;
  });
}

