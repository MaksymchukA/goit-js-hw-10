import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { getRefs } from './getRefs';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchCountryInput.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
    let country = refs.searchCountryInput.value;

    return fetchCountries(country).then((data) => {
        choseCountry(data)
    }).catch().finally()
}

function choseCountry(data) {
    const markup = data.map(element => {
        return `
            <li>
            <img src="${element.flags.svg}" alt="${element.name.official}" width="40" height="20">
            <p>${element.name.official}</p>
            </li>`;
          }).join('');
      
          refs.countryList.innerHTML = markup;
}

function createCountryInfo(data) {
    const markup = data.map(element => {
    return `
    <img src=${element.flags.svg} alt="${element.name.official}" width="40" height="20">
    <h2>${element.name.official}</h2>
    <p>Capital: ${element.capital}</p>
    <p>Population: ${element.population}</p>    
    <p>Languages: ${element.languages}</p>
    `
    }).join('');

    refs.countryInfo.innerHTML = markup;
}

// function updateCountryInfo(markup) {
//     refs.countryInfo.insertAdjacentElement('beforeend', createCountryInfo(markup))
// }