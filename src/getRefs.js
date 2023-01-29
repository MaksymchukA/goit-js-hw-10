export function getRefs() {
    return {
        searchCountryInput: document.querySelector('input#search-box'),
        countryList: document.querySelector('.country-list'),
        countryInfo: document.querySelector('.country-info'),
    };
}

console.log(getRefs())