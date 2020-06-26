import React from 'react';
import { connect } from 'react-redux';
import { FaAngleDown } from 'react-icons/fa';
import '../style/statistics.css';

let stateContainer = {
	display:"flex",
	flexDirection:"column",
	marginBottom:"1rem",
	height:"1.3rem"
}
let hide = {
	transform:"translateY(-100%)",
	visibility:"hidden"
}

let wrapper = {
	overflowY:"scroll",
	height:"100%"
}
export function Statistics(props){

	function showStat(e){
		let container = document.querySelector(".stateContainer");
		let drop = document.querySelector(".drop");
		container.style.height = "9rem";
		drop.style = {animation:"slidein"};
		drop.style.height = '5rem;'
	}
	
	let getStat = () => {
		 
		 let date = <p> { props.country.date} </p>;
		 let provinceLeng = props.country.provinces.length;
		 let provinces = props.country.provinces;
		 let states;
		 if (provinceLeng > 0) {
		 	states = provinces.map((state, k) => {
		 				return (
		 					<div className="stateContainer" style={stateContainer} key={k+33}>
		 						<div class="provinceContainer">{ state.province } <FaAngleDown onClick={(e) => showStat(e)} className="dropBtn"/> </div>
		 						<div className="drop" style={hide}>
		 							<div> active: { state.active } </div>
		 							<div> confirmed: { state.confirmed } </div>
		 							<div> deaths: { state.deaths } </div>
		 							<div> recovered: { state.recovered } </div>
		 						</div>
		 					</div>
		 				)
		 			})
		 }
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

export default connect(
	mapStateToProps
)(Statistics)