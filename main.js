const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'd0bc9fee';
const APP_key = '9b2b354586f608e89645c3849ca35d2f';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = 'https://api.edamam.com/search?q='; // Base URL without query parameters
    const completeURL = `${baseURL}${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`; // Construct URL with query parameters using string interpolation
    const response = await fetch(completeURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data); // Log the response for debugging
}

function generateHTML(results) {
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
        `
            <div class="item">
                <img src="${result.recipe.image}" alt="">
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
                    </div>
                    <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                    <p class="item-data">Preparation time: ${result.recipe.totalTime}</p>
                    <p class="item-data">Diet label: ${result.recipe.dietLabels.length>0?result.recipe.dietLabels : 'No Data Found'}</p>
                    <p class="item-data">Health Label: ${result.recipe.healthLabels.length>7?result.recipe.healthLabels.slice(0,7):result.recipe.healthLabels}</p>
            </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}
