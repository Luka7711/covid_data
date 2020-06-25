const country = (state="usa", action) => {
	switch(action.type){
		case "update":
			return action.country;
		default:
			return state;
	}
}

export default country;
