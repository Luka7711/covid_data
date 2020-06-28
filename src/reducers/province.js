
const province = (state={province:"", stats:[]}, action) => {
	
	switch(action.type){
		
		case "updateProvince":
			state.province = action.province;
			return state.province
		
		case "addProvinceStat":
			state.stats.push(action.stat);
			return state.stats;
		
		default:
			return state
	}
} 

export default province;