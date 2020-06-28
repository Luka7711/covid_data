import React from 'react';
import { connect } from 'react-redux';
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa';
import '../style/statistics.css';
import { useEffect, useState } from 'react';
import { updateProvince, addProvinceStat } from '../actions/index';

let wrapper = {
	overflowY:"scroll",
	height:"100%"
}
export function Statistics(props){
	const [recentDays, setRecentDays] = useState([]);
	
	useEffect(() => {
		setRecentDays(getRecentDays());
	},[]);

	function combineRecentStats(provinceLng){
		if (provinceLng > 1) {
			// if country has provinces update
		} else {

		}
	}

	function getProvinceStat(date, country) {
		fetch(`https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=${date}&name=${country}`, {
			method:"GET",
			headers:{
				"X-RapidAPI-Key": "d7b6266c9dmsh60f21d2416025a0p14c9f4jsn6b24624bc0e5"
			}
		})
		.then(response => response.json())
		.then(data => {

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
		
		for(let i=-7; i<0; i++){
			let eachDay = today.toDateFromDays(i).toISOString().substr(0,10);
			recentDates.push(eachDay);
		}
		console.log(recentDates)
		return recentDates
	}

	function toggleStat(event){
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

	let getStat = () => {
		 
		 let date = <p> { props.country.date} </p>;
		 let provinceLeng = props.country.provinces.length;
		 let provinces = props.country.provinces;
		 let states;
		 	states = provinces.map((state, k) => {
		 				return (
		 					<div className="stateContainer" key={k+33}>
		 						<div onClick={(e) => toggleStat(e)} className="provinceContainer">{ state.province } 
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
		// update province state after searched country found
		props.updateProvince(provinces[0].province);
		
		// get stats for last 7d with current province
		
		return states;
	}
	return(
		<div className="mainContainer">
			<p>Statistics on</p>
			<div style={wrapper}>	
				{ props.country.provinces ? getStat() : null }
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		country: state.country[0]
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateProvince: (province) => dispatch(updateProvince(province)),
		addProvinceStat: (stat) => dispatch(addProvinceStat(stat))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Statistics)