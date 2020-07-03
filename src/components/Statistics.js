import React from 'react';
import { connect } from 'react-redux';
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa';
import '../style/statistics.css';
import { useEffect, useState } from 'react';
import { updateProvince, addProvinceStat, cleanUp } from '../actions/index';
import ReactDOM from 'react-dom';
import store from '../index.js';


let wrapper = {
	height:"100%"
}
export function Statistics(props){
	const [recentDays, setRecentDays] = useState([]);
	const [stopAction, setStopAction] = useState(false);
	const [data, setData] = useState("");

	useEffect(() => {
		setRecentDays(getRecentDays());
	},[]);

	useEffect(() => {
		let state = store.getState();
		setData(state);
	});

	useEffect(() => {
		if(typeof(data.country) === "object"){
			getStat();
		}
	}, [data])

	function combineRecentStats(clickedProvince, index){
		store.dispatch({type:"cleanUp"})
		
		let currentProvince;
		let country = data.country[0].country;

		if (clickedProvince && clickedProvince !== data.province.province) {
			// props.updateProvince(clickedProvince);
			store.dispatch({type:"updateProvince", province:clickedProvince})
		// find latest stats data of clicked province
			for (let i=0; i < recentDays.length; i++) {
	    		getProvinceStat(recentDays[i], country, clickedProvince, true, index);
	   		}

		} else if(!clickedProvince) {
			currentProvince = data.country[0].provinces[0].province;
			store.dispatch({type:'updateProvince', province:currentProvince});
				for (let i=0; i < recentDays.length; i++) {
					if (stopAction === true) {
						store.dispatch({type:'cleanUp'});
						break;
					} else {
	    				getProvinceStat(recentDays[i], country, currentProvince, false);
					}
	   		}	
		}
		
	}

	 function getProvinceStat(date, country, province, search, index) {
		fetch(`https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=${date}&name=${country}`, {
			method:"GET",
			headers:{
				"X-RapidAPI-Key": "d7b6266c9dmsh60f21d2416025a0p14c9f4jsn6b24624bc0e5"
			}
		})
		.then(response => response.json())
		.then(info => {
			
			let objKeys = Object.keys(info[0].provinces[0]);

			if (objKeys.length > 1) {	
				// save specific province stat
				if (search === true) {
					let newDat = info[0].provinces[index];
					newDat.day = date;
					store.dispatch({type:"addProvinceStat", stat:newDat})
				} else {
					let newData = info[0].provinces[0];
					newData.day = date;
					store.dispatch({type:"addProvinceStat", stat:newData});
				}
			}
		})
	}

	function getRecentDays(){
		Date.prototype.toDateFromDays = function(daysBefore){
			daysBefore = parseInt(daysBefore) || 0;
			let newDate = new Date(this.getTime());
			newDate.setDate(this.getDate() + daysBefore);
			return newDate
		}
		let today = new Date();
		let recentDates = [];
		
		for(let i=-20; i<0; i++){
			let eachDay = today.toDateFromDays(i).toISOString().substr(0,10);
			recentDates.push(eachDay);
		}
		return recentDates
	}

	function toggleStat(event, index){
		combineRecentStats(event.currentTarget.textContent, index);
		// toggle class which will slide down and slide up the window
		let dropDown = event.currentTarget.nextSibling;
		let currentClass = dropDown.getAttribute("class");
		let container = event.currentTarget.parentNode;

		if (currentClass === "slideIn") {
			//remove slideIn and add slideOut
			dropDown.classList.remove("slideIn");
			dropDown.classList.add("slideOut");
			container.style.height = "10rem";
		} else {
			//remove slideout and add slideIn
			dropDown.classList.remove("slideOut");
			dropDown.classList.add("slideIn");
			container.style.height = "2rem";
		}

	}

	function getStat(){
		 let date = <p> { data.country[0].date} </p>;
		 let provinces = data.country[0].provinces;		 
		 let states;
		 	states = provinces.map((state, k) => {
		 				return (
		 					<div className="stateContainer" key={k+33}>
		 						<div onClick={(e) => { setStopAction(true); toggleStat(e,k)}} className="provinceContainer">{ state.province } 
		 							<FaAngleUp className="upBtn"/> <FaAngleDown className="dropBtn"/> 
		 						</div>
		 						<div className="slideIn">
		 							<div> active: { state.active } </div>
		 							<div> confirmed: { state.confirmed } </div>
		 							<div> deaths: { state.deaths } </div>
		 							<div> recovered: { state.recovered } </div>
		 						</div>
		 					</div>
		 				)
		 			});
		 let div = document.getElementById("content");
		 ReactDOM.render(states, div);

		 combineRecentStats();
		return states;
	}

	return(
		<div className="mainContainer">
			<div id="content" style={wrapper}>
			</div>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		cleanUp: () => dispatch(cleanUp())
	}
}

export default connect(
	mapDispatchToProps
)(Statistics);


