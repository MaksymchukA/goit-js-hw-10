import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { getRefs } from './getRefs.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.countryList.style.listStyle = 'none';

refs.searchCountryInput.addEventListener(
  'input',
  debounce(onInputCountry, DEBOUNCE_DELAY)
);

function onInputCountry(event) {
  // console.log(event);

  const country = event.target.value.trim();
  // console.log('🚀 ~ onInputCountry ~ country', country);

  if (country) {
    return fetchCountries(country)
      .then(data => {
        console.log(data);
        searchCountry(data);
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        clearCounries();
      });
  }
  clearCounries();
}

function searchCountry(countryArray) {
  clearCounries();

  if (countryArray.length === 1) {
    refs.countryList.innerHTML = '';
    return markupCountryInfo(countryArray);
  }
  if (countryArray.length >= 2 && countryArray.length <= 10) {
    refs.countryInfo.innerHTML = '';
    return markupCountriesList(countryArray);
  }
  return Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function clearCounries() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function markupCountriesList(data) {
  const markup = data
    .map(element => {
      return `
        <li class="country-flex">
        <img class="country-flag" src="${element.flags.svg}" alt="${element.name.official}" width="40" height="20" ${element.name.official}>
        <h2 class="country-name">${element.name.official}</h2>
        </li>`;
    })
    .join('');

  refs.countryList.innerHTML = markup;
}

function markupCountryInfo(data) {
  const markup = data
    .map(element => {
      return `
        <div class="country-flex">
        <img class="country-flag" src="${element.flags.svg}" alt="${
        element.name.official
      }" width="40" height="20">
        <h2 class="country-name-info">${element.name.official}</h2></div>
        <p class="country-info">Capital: ${element.capital}</p>
        <p class="country-info">Population: ${element.population}</p>
        <p class="country-info">Languages: ${Object.values(
          element.languages
        ).join(', ')}</p>
        `;
    })
    .join('');

  refs.countryInfo.innerHTML = markup;
}

// function markupCountry(data) {
//   const markup = data
//     .map(element => {
//       const elemLang = element.languages.map(lang => lang.name).join(', ');

//       return `
//         <p class="country-info">Languages: ${elemLang}</p>
//         `;
//     })
//     .join('');
//   console.log("🚀 ~ markupCountryInfo ~ markup", markup)

//   refs.countryInfo.innerHTML = markup;
// }
