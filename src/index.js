import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { getRefs } from './getRefs.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchCountryInput.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(event) {
    const country = event.target.value.trim();
    // let country = refs.searchCountryInput.value;

    return fetchCountries(country)
    .then((data) => {
        searchCountry(data)
    })
    .catch((error) => {
        Notify.failure('Oops, there is no country with that name')
    });
}

function searchCountry(countryArray) {
    if(countryArray.length === 1) {
        return markupCountryInfo(countryArray)
    };
    if(countryArray.length >= 2 && countryArray.length <= 10) {
        return markupCountriesList(countryArray)
    };
    return Notify.info('Too many matches found. Please enter a more specific name.')
}

function markupCountriesList(data) {
    const markup = data.map(element => {
        return `
            <li>
            <img src="${element.flags.svg}" alt="${element.name.official}" width="40" height="20">
            <p>${element.name.official}</p>
            </li>`;
          }).join('');
      
          refs.countryList.innerHTML = markup;
}

function markupCountryInfo(data) {
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