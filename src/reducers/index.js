import countryReducer from './country';
import allCountriesReducer from './allCountries';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	country: countryReducer,
	allCountries: allCountriesReducer
});

export default allReducers;