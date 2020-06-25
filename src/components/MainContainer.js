import React, { Component } from 'react';
import { update, saveAll } from '../actions/index';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Result from './Result'

const wrapper = {
	width:"70%",
	vh:"60%",
	margin:"0 auto"
}

export class MainContainer extends Component {
	constructor(props){
		super(props);
		this.updateCountry = this.updateCountry.bind(this);
	}

	componentDidMount(){
		
		this.dataByCountryName();
		
		setTimeout(() => {
			this.saveAllCountries();
			this.createTitle();
		}, 2000);

	}

	saveAllCountries(){
		const url = "https://covid-19-data.p.rapidapi.com/help/countries?format=json";
		fetch(url, {
			method:"GET",
			headers: {
				"X-RapidAPI-Key": "d7b6266c9dmsh60f21d2416025a0p14c9f4jsn6b24624bc0e5"
			}
		})
		.then(response => response.json())
		.then(data => this.props.saveAll(data))
	}

	dataByCountryName(findCountry){
		let findFor;
		
		if (findCountry) findFor = findCountry;
		else findFor = this.props.country;

		const url = `https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=2020-04-01&name=${findFor}`;
		fetch(url, {
			method:"GET",
			headers:{
				"X-RapidAPI-Key": "d7b6266c9dmsh60f21d2416025a0p14c9f4jsn6b24624bc0e5"
			}
		})
		.then(response => response.json())
		.then(data => {
			if ("message" in data == false){
				this.props.update(data);
			} 
		});
	}

	matchByCountryName(findCountry){
		
		// if searched country is exist call DataByCountry name function
		let allCountries = this.props.allCountries;
			
		findCountry = findCountry 

		let foundIndex = allCountries.indexOf(findCountry);
		
		if(foundIndex !== -1){
			this.dataByCountryName(findCountry);
		}
	}

	async updateCountry(event){
		// check if searched country exist in store
		this.matchByCountryName(event.target.value);
	}

	createTitle(){
		if (this.props.country[0].country !== undefined) {
			return (
				`in ${this.props.country[0].country}`
			)
		} else {
			return null
		} 
	}

	render(){
	
		return(
			<div className="wrapper" style={ wrapper }>
				<h1>Hello World</h1>
				<p>Situation around Covid-19 {this.createTitle()} </p>
				<input placeholder="country" onChange={(e) => this.updateCountry(e)}/>
				<Result/>
			</div>
		)
	}
} 

const mapStateToProps = state => {
	return {
		country: state.country,
		allCountries: state.allCountries
	}
}

const mapDispatchToProps = dispatch => {
	return {
		update: (country) => dispatch(update(country)),
		saveAll: (countries) => dispatch(saveAll(countries))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainContainer)




