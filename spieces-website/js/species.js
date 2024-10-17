// Initialize map centered on India by default
const map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Example: Adding species markers to the map
function showSpeciesOnMap(locations) {
  locations.forEach(location => {
    L.marker([location.lat, location.lng]).addTo(map)
      .bindPopup(location.description)
      .openPopup();
  });
}

// Chart.js for population chart
var ctx = document.getElementById('population-chart').getContext('2d');
var populationChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['2000', '2005', '2010', '2015', '2020'],
    datasets: [{
      label: 'Population over time',
      data: [1000, 900, 850, 800, 750],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Autocomplete functionality
document.getElementById('species-input').addEventListener('input', function() {
  const query = this.value;
  if (query.length >= 2) {
    fetch(`https://api.gbif.org/v1/species/suggest?q=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        displayAutocompleteSuggestions(data);
      })
      .catch(error => {
        console.error('Error fetching suggestions:', error);
      });
  } else {
    document.getElementById('autocomplete-suggestions').innerHTML = '';
  }
});

function displayAutocompleteSuggestions(suggestions) {
  const suggestionsContainer = document.getElementById('autocomplete-suggestions');
  suggestionsContainer.innerHTML = '';

  suggestions.forEach(species => {
    const suggestionItem = document.createElement('div');
    suggestionItem.classList.add('suggestion-item');
    suggestionItem.textContent = species.scientificName;
    suggestionItem.addEventListener('click', function() {
      document.getElementById('species-input').value = species.scientificName;
      suggestionsContainer.innerHTML = '';
      fetchSpeciesData(species.scientificName);
    });
    suggestionsContainer.appendChild(suggestionItem);
  });
}

// Function to make multiple API calls
async function fetchSpeciesData(speciesName) {
  try {
    const wikipediaResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(speciesName)}`);
    const wikipediaData = await wikipediaResponse.json();

    const iucnKey = 'your-api-key';
    const iucnResponse = await fetch(`https://apiv3.iucnredlist.org/api/v3/species/${encodeURIComponent(speciesName)}?token=${iucnKey}`);
    const iucnData = await iucnResponse.json();

    displaySpeciesData(wikipediaData, iucnData);
  } catch (error) {
    console.error('Error fetching species data:', error);
    showErrorMessage("Error fetching data. Please try again.");
  }
}

// Function to display species data
function displaySpeciesData(wikipediaData, iucnData) {
  const speciesName = document.getElementById('species-name');
  const speciesDescription = document.getElementById('species-description');
  const speciesDetails = document.getElementById('species-details');
  const conservationStatus = document.getElementById('conservation-status');

  speciesName.textContent = wikipediaData.title;
  speciesDescription.textContent = wikipediaData.extract;
  if (wikipediaData.thumbnail) {
    speciesDetails.innerHTML = `<img src="${wikipediaData.thumbnail.source}" alt="${wikipediaData.title}" />`;
  } else {
    speciesDetails.innerHTML = '';
  }

  if (iucnData && iucnData.result) {
    conservationStatus.textContent = `Conservation Status: ${iucnData.result[0].category}`;
  } else {
    conservationStatus.textContent = 'Conservation Status: Not available';
  }

  showSpeciesOnMap([{ lat: 20.5937, lng: 78.9629, description: 'India' }]);
  updatePopulationChart([1000, 800, 500]);
}

// Function to display error message
function showErrorMessage(message) {
  document.getElementById('species-name').textContent = message;
  document.getElementById('species-description').textContent = '';
  document.getElementById('species-details').innerHTML = '';
  document.getElementById('conservation-status').textContent = '';
}

// Event listener for search button
document.getElementById('search-btn').addEventListener('click', function() {
  const speciesName = document.getElementById('species-input').value;
  if (speciesName) {
    fetchSpeciesData(speciesName);
  } else {
    alert("Please enter a species name!");
  }
});

// Function to update population chart with new data
function updatePopulationChart(data) {
  populationChart.data.datasets[0].data = data;
  populationChart.update();
}
