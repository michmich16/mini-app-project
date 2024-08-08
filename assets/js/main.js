document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('search');
    const dropdown = document.getElementById('dropdown');
    const countryDetails = document.getElementById('country-details');
    const countryName = document.getElementById('country-name');
    const countryFlag = document.getElementById('country-flag');
    const countryCOA = document.getElementById('country-coa');
    const countryRegion = document.getElementById('country-region');
    const countrySubRegion = document.getElementById('country-subregion')
    const countryCapital = document.getElementById('country-capital');
    const countryPopulation = document.getElementById('country-population');
    const countryLanguages = document.getElementById('country-languages');
    const countryCurrency = document.getElementById('country-currency');

    let countries = [];

    // Fetch country data from the API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            countries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        })
        .catch(error => console.error('Error fetching country data:', error));

    // Filter countries based on search input
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        dropdown.innerHTML = '';

        if (query) {
            const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(query));
            filteredCountries.forEach(country => {
                const li = document.createElement('li');
                li.textContent = country.name.common;
                li.addEventListener('click', () => {
                    displayCountryDetails(country);
                    dropdown.innerHTML = '';
                });
                dropdown.appendChild(li);
            });
        }
    });

    // Display country details
    function displayCountryDetails(country) {
        countryName.textContent = country.name.common;
        countryFlag.src = country.flags.svg;
        countryCOA.src = country.coatOfArms.svg;
        countryCapital.textContent = country.capital ? country.capital[0] : 'N/A';
        countryRegion.textContent = country.region;
        countrySubRegion.textContent = country.subregion;
        countryPopulation.textContent = country.population.toLocaleString();
        countryLanguages.textContent = Object.values(country.languages).join(', ');
        countryCurrency.textContent = Object.values(country.currencies).map(currency => {return `${currency.name} ~ ${currency.symbol}`;}).join(', ');

        countryDetails.classList.remove('hidden');
        console.log(country);
    }
});