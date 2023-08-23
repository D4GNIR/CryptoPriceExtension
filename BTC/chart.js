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
