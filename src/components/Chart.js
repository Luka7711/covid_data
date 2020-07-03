import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import '../style/chart.css';
import store from '../index'
import ReactDOM from 'react-dom';

export default function Chart(props){
	const [stats, setStats] = useState("");

	useEffect(() => {
		setInterval(() => {
			let data = store.getState();
			setStats(data);
			displayChart();
		}, 1000)
	});

	function displayChart(){
		
		if (stats.province !== undefined && stats.province.province !== "") {
			let element = document.querySelector(".title");
			let content = <h1>{ stats.province.province }</h1>;
			ReactDOM.render(content, element);
		}
	}

	return(
		<div className="chart">
			<div className="title">
			</div>
		</div>
	)
}




