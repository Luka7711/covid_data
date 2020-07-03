
const province = (state={province:"", stats:[]}, action) => {
	
	switch(action.type){
		
		case "updateProvince":
			state.province = action.province;
			return state;
		
		case "addProvinceStat":
			state.stats.push(action.stat);
			return state;
		
		case "cleanUp":
			state.stats = []
			return state;
		default:
			return state
	}
} 

export default province;