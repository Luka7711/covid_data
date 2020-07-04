import React from 'react';
import Chart from './Chart';
import MapContainer from './MapContainer';
import Statistics from './Statistics';

const result = {
	display:"flex",
	flexDirection:"row",
	height:"30rem",
	marginTop:"1rem"
}

export default function Result(){
	return(
		<div className="resultContainer" style={ result }>
			<Statistics/>
			<Chart/>
			<MapContainer/>
		</div>
	)
}