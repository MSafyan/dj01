import React, { useState, useEffect } from 'react';
import { Progress } from 'reactstrap';
import Loader from '../../components/Loader/Loader';
const Deaths = () => {
	const [deathData, setDeathData] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/DeathsData')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setDeathData(data);
			})
			.catch((e) => console.error(e));
	}, []);
	if (!deathData) return <Loader />;
	return (
		<>
			<div style={{ text: 'center' }}>
				<h5>New Cases</h5>
				<h4>23232</h4>
			</div>
			{deathData.map((val) => (
				<div style={{ borderBottom: 'solid 1px', marginBottom: '1rem' }}>
					<p style={{ display: 'inline-block', margin: '1px' }}>
						<span style={{ fontWeight: '700' }}>{val.country}</span>:{' '}
						{val.deaths}
					</p>
					<p style={{ margin: '1px' }}>
						Percentile Increase: {val.percentileInc}
					</p>
					<Progress
						className={`bg-custom-dark progress-xs mt-1`}
						color='danger'
						value={val.percentileInc}
					/>
				</div>
			))}
		</>
	);
};

export default Deaths;
