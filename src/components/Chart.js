import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import '../style/chart.css';
import store from '../index'
import ReactDOM from 'react-dom';
import {Bar} from 'react-chartjs-2'; 


let data = {
  datasets: [
    {
      label:'Active',
      backgroundColor: 'rgba(255,99,132, 0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)'
    }
  ]
};

export default function Chart(props){
	const [stats, setStats] = useState("");
	const [provinceName, setProvinceName] = useState("");
	const [chartObj, setChartObj] = useState(data)

	useEffect(() => {
		setInterval(() => {
			let dat = store.getState();
			setProvinceName(dat.province.province);
		}, 5000)
	});




	useEffect(() => {
		let dat = store.getState();
		setStats(dat);
		displayChart();
	}, [provinceName])

	function displayChart(a){
		if (stats.province !== undefined && stats.province.province !== "") {
			let element = document.querySelector(".title");
			let content = <h2>Region - { stats.province.province }</h2>;

			console.log(stats.province, "stats province")

			let daysData = stats.province.stats.map((province) => province.day);
			data.labels = daysData; 

			let active = stats.province.stats.map((province) => province.active);
			data.datasets[0].data = active;

			console.log(data)
			setChartObj(data);
			ReactDOM.render(content, element);
			
		}
	}

	return(
		<div className="chart">
			
			<div className="title" id="char">
			</div>
			
			<div style={{width:"100%", height:"70%"}}>
       			<Bar
         			data={chartObj}
         			width={100}
          			height={50}
          			options={{
            				maintainAspectRatio: false
          			}}
        		/>
      		</div>
		</div>
	)
}




