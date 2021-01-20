import React from 'react';
import { Row, Col, Progress, Table, Label, Input } from 'reactstrap';

import Widget from '../../components/Widget';

import Calendar from './components/calendar/Calendar';
import Map from './components/am4chartMap/am4chartMap';
import Rickshaw from './components/rickshaw/Rickshaw';
import Deaths from './Deaths';
import NewCases from './NewCases';
import Recovered from './Recovered';
import News from './News';
import se from '../components/charts/Charts.module.scss';
import ApexChart from 'react-apexcharts';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import { chartData, liveChart } from '../components/charts/mock';
import s from './Dashboard.module.scss';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cd: chartData,
			ld: liveChart,
			initEchartsOptions: {
				renderer: 'canvas',
			},
			graph: null,
			checkedArr: [false, false, false],
		};
		this.checkTable = this.checkTable.bind(this);
	}

	checkTable(id) {
		let arr = [];
		if (id === 0) {
			const val = !this.state.checkedArr[0];
			for (let i = 0; i < this.state.checkedArr.length; i += 1) {
				arr[i] = val;
			}
		} else {
			arr = this.state.checkedArr;
			arr[id] = !arr[id];
		}
		if (arr[0]) {
			let count = 1;
			for (let i = 1; i < arr.length; i += 1) {
				if (arr[i]) {
					count += 1;
				}
			}
			if (count !== arr.length) {
				arr[0] = !arr[0];
			}
		}
		this.setState({
			checkedArr: arr,
		});
	}

	render() {
		const { cd, ld, initEchartsOptions, sparklineData } = this.state;

		return (
			<div className={(s.root, se.root)}>
				<h1 className='page-title'>
					Dashboard &nbsp;
					<small>
						<small>The Lucky One</small>
					</small>
				</h1>

				<Row>
					<Col lg={7}>
						<Widget className='bg-transparent'>
							<Map />
						</Widget>
					</Col>
					<Col lg={1} />

					<Col lg={4}>
						<Widget
							className='bg-transparent'
							title={
								<h5>
									{' '}
									Map
									<span className='fw-semi-bold'>&nbsp;Statistics</span>
								</h5>
							}
							settings
							refresh
							close
						>
							<p>
								Status: <strong>Live</strong>
							</p>
							<Deaths />
							{/* <p>
								<span className='circle bg-default text-white'>
									<i className='fa fa-map-marker' />
								</span>{' '}
								&nbsp; 146 Countries, 2759 Cities
							</p> */}
							{/* <div className='row progress-stats'>
								<div className='col-md-9 col-12'>
									<h6 className='name fw-semi-bold'>Foreign Visits</h6>
									<p className='description deemphasize mb-xs text-white'>
										Some Cool Text
									</p>
									<Progress
										color='primary'
										value='60'
										className='bg-custom-dark progress-xs'
									/>
								</div>
								<div className='col-md-3 col-12 text-center'>
									<span className='status rounded rounded-lg bg-default text-light'>
										<small>
											<AnimateNumber value={75} />%
										</small>
									</span>
								</div>
							</div>
							<div className='row progress-stats'>
								<div className='col-md-9 col-12'>
									<h6 className='name fw-semi-bold'>Local Visits</h6>
									<p className='description deemphasize mb-xs text-white'>
										P. to C. Conversion
									</p>
									<Progress
										color='danger'
										value='39'
										className='bg-custom-dark progress-xs'
									/>
								</div>
								<div className='col-md-3 col-12 text-center'>
									<span className='status rounded rounded-lg bg-default text-light'>
										<small>
											<AnimateNumber value={84} />%
										</small>
									</span>
								</div>
							</div>
							<div className='row progress-stats'>
								<div className='col-md-9 col-12'>
									<h6 className='name fw-semi-bold'>Sound Frequencies</h6>
									<p className='description deemphasize mb-xs text-white'>
										Average Bitrate
									</p>
									<Progress
										color='success'
										value='80'
										className='bg-custom-dark progress-xs'
									/>
								</div>
								<div className='col-md-3 col-12 text-center'>
									<span className='status rounded rounded-lg bg-default text-light'>
										<small>
											<AnimateNumber value={92} />%
										</small>
									</span>
								</div>
							</div>
							<h6 className='fw-semi-bold mt'>Map Distributions</h6>
							<p>
								Tracking: <strong>Active</strong>
							</p>
							<p>
								<span className='circle bg-default text-white'>
									<i className='fa fa-cog' />
								</span>
								&nbsp; 391 elements installed, 84 sets
							</p>
							<div className='input-group mt'>
								<input
									type='text'
									className='form-control bg-custom-dark border-0'
									placeholder='Search Map'
								/>
								<span className='input-group-btn'>
									<button
										type='submit'
										className={`btn btn-subtle-blue ${s.searchBtn}`}
									>
										<i className='fa fa-search text-light' />
									</button>
								</span>
							</div> */}
						</Widget>
					</Col>
				</Row>
				<Row>
					<Col lg={7} xs={12}>
						<Widget
							title={
								<h5>
									Apex <span className='fw-semi-bold'>Column Chart</span>
								</h5>
							}
							close
							collapse
						>
							<ApexChart
								className='sparkline-chart'
								height={350}
								series={cd.apex.column.series}
								options={cd.apex.column.options}
								type={'bar'}
							/>
						</Widget>
					</Col>
					<Col lg={5} xs={12}>
						<Widget
							title={
								<h5>
									Echarts <span className='fw-semi-bold'>Line Chart</span>
								</h5>
							}
							close
							collapse
						>
							<ReactEchartsCore
								echarts={echarts}
								option={cd.echarts.line}
								opts={initEchartsOptions}
								style={{ height: '365px' }}
							/>
						</Widget>
					</Col>
				</Row>
				<Row>
					<Col lg={4} xs={12}>
						<News />
					</Col>
					<Col lg={6} xl={4} xs={12}>
						<Widget title={<h6> TRAFFIC VALUES </h6>} close settings>
							<NewCases />
						</Widget>
					</Col>
					<Col lg={6} xl={4} xs={12}>
						<Widget title={<h6> Recovered People </h6>} close settings>
							<Recovered />
						</Widget>
					</Col>
				</Row>

				<Row>
					<Col lg={4} xs={12}>
						<Widget
							title={<h6>Calendar</h6>}
							settings
							close
							bodyClass={'pt-2 px-0 py-0'}
						>
							<Calendar />
						</Widget>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Dashboard;
