import React from 'react';
import { connect } from 'react-redux';

export function Chart(props){
	return(
		<div>
			<p>Chart</p>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		province: state.province.province
	}
}

export default connect(
	mapStateToProps
)(Chart)