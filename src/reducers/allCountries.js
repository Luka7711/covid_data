const allCountries = (state=[], action) => {
	switch(action.type){
		case "saveAll":
			return action.countries;
		default:
			return state;
	}
} 

export default allCountries;