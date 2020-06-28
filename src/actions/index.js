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

export const updateProvince = (province) => {
	return {
		type:'updateProvince',
		province:province
	}
}

export const addProvinceStat = (stat) => {
	return {
		type: "addProvinceStat",
		stat: stat
	}
}

export const cleanUp = (stat) => {
	return {
		type: "cleanUp"
	}
}