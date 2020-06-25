export const update = (country) => {
	return {
		type:'update',
		country:country
	}
}

export const saveAll = (countries) => {
	let countryNames = [];
	for(let i=0; i < countries.length; i++){
		countryNames.push(countries[i].name.toLowerCase());
	}
	return {
		type:"saveAll",
		countries: countryNames
	}
}