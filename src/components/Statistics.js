import React from 'react';
import { connect } from 'react-redux';
import { FaAngleDown } from 'react-icons/fa';

const stateContainer = {
	display:"flex",
	flexDirection:"column",
	marginBottom:".5rem"
}
const dropDown = {
	transform:"translateY(-100%)",
	display:"none"
}

const wrapper = {
	overflowY:"scroll",
	height:"100%"
}
export function Statistics(props){
	
	let getStat = () => {
		 
		 let date = <p> { props.country.date} </p>;
		 let provinceLeng = props.country.provinces.length;
		 let provinces = props.country.provinces;
		 let states;
		 if (provinceLeng > 0) {
		 	states = provinces.map((state, k) => {
		 					console.log(state)
		 					return ( <div style={stateContainer} key={k+33}>
		 								<div>{ state.province } <FaAngleDown className="dropBtn"/> </div>
		 									<div style={dropDown}>
		 										<div> Active: { state.active } </div>
		 										<div> Confirmed: { state.confirmed } </div>
		 										<div> Deaths: { state.deaths } </div>
		 										<div> Recovered: { state.recovered } </div>
		 									</div>
		 							</div>
		 					)
		 				})
		 }
		 return states;
	}
	return(
		<div>
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