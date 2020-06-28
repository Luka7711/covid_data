import countryReducer from './country';
import allCountriesReducer from './allCountries';
import provinceReducer from './province';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	country: countryReducer,
	allCountries: allCountriesReducer,
	province: provinceReducer
});

export default allReducers;