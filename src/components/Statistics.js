import React from 'react';
import { connect } from 'react-redux';

export function Statistics(props){
	
	let getStat = () => {
		 
		 let date = <p> { props.country.date} </p>;
		 let provinceLeng = props.country.provinces.length;
		 let provinces = props.country.provinces;
		 let states;
		 if (provinceLeng > 1) {
		 	states = provinces.map((state, k) => {
		 					console.log(state)
		 					return ( <ul key={k+33}>
		 								<li key={k+44}> { state.province } </li>
		 								<li key={k+55}> Active: { state.active } </li>
		 								<li key={k+66}> Confirmed: { state.confirmed } </li>
		 								<li key={k+77}> Deaths: { state.deaths } </li>
		 								<li key={k+88}> Recovered: { state.recovered } </li>
		 							</ul>
		 					)
		 				})
		 }
		 return states;
	}
	return(
		<div>
			<p>Statistics on</p>
			<div>	
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