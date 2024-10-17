// Get DOM elements
const searchInput = document.getElementById('search');
const searchButton = document.createElement('button'); // Create a button dynamically
searchButton.textContent = 'Search';
searchButton.style.marginLeft = '10px'; // Style the button
searchButton.style.padding = '8px 12px';
searchButton.style.border = 'none';
searchButton.style.backgroundColor = '#4CAF50';
searchButton.style.color = 'white';
searchButton.style.cursor = 'pointer';
searchButton.style.borderRadius = '5px';
searchButton.style.transition = 'background-color 0.3s';

// Add the search button to the search container
const searchContainer = document.querySelector('.search-container');
searchContainer.appendChild(searchButton);

// Add event listener for the search button
searchButton.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        saveSearchTerm(searchTerm);
        performSearch(searchTerm);
        searchInput.value = ''; // Clear the input field after search
    } else {
        alert('Please enter a species to search for.');
    }
});

// Perform the search functionality
function performSearch(term) {
    console.log(`Searching for: ${term}`); // Debugging line
    alert(`Searching for ${term}...`);
}

// Save search term to local storage
function saveSearchTerm(term) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.push(term);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Add event listener for enter key to search
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchButton.click(); // Trigger search button click on Enter
    }
});
