import React, { Component } from 'react';
import DayNames from './DayNames';
import uuid from 'uuid/v4';
import Week from './Week';
import moment from 'moment/moment';
import s from './Calendar.module.scss';
import Loader from '../../../../components/Loader/Loader';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMonth: moment(),
			selectedDay: moment().startOf('day'),
			selectedMonthEvents: [],
			showEvents: false,
		};
	}
	componentDidMount() {
		fetch('http://localhost:5000/selectedMonthEvents')
			.then((res) => res.json())
			.then((data) => {
				console.error(data);
				this.setState({ selectedMonthEvents: data });
			});
	}

	previous = () => {
		this.setState({
			selectedMonth: this.state.selectedMonth.subtract(1, 'month'),
		});
	};

	next = () => {
		this.setState({
			selectedMonth: this.state.selectedMonth.add(1, 'month'),
		});
	};

	renderMonthLabel = () => {
		return (
			<span className={`${s.calendarItemContainer} ${s.monthLabel}`}>
				{this.state.selectedMonth.format('MMMM YYYY')}
			</span>
		);
	};

	renderWeeks = () => {
		const currentMonthView = this.state.selectedMonth;
		const currentSelectedDay = this.state.selectedDay;

		let weeks = [];
		let done = false;
		let previousCurrentNextView = currentMonthView
			.clone()
			.startOf('month')
			.subtract(1, 'd')
			.day('Sunday');
		let count = 0;
		let monthIndex = previousCurrentNextView.month();

		while (!done) {
			weeks.push(
				<Week
					key={uuid()}
					selectedMonthEvents={this.state.selectedMonthEvents}
					previousCurrentNextView={previousCurrentNextView.clone()}
					currentMonthView={currentMonthView}
					selected={currentSelectedDay}
				/>
			);
			previousCurrentNextView.add(1, 'w');
			done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
			monthIndex = previousCurrentNextView.month();
		}
		return weeks;
	};

	render() {
		if (this.state.selectedMonthEvents[0] === undefined) return <Loader />;
		return (
			<>
				<div className={`${s.calendarRectangle}`}>
					<div>
						<section className={`${s.mainCalendar}`}>
							<header className={`${s.calendarHeader}`}>
								<div className={`${s.calendarRow} ${s.titleHeader}`}>
									<i
										className={`${s.calendarItemContainer} ${s.arrow} la la-arrow-left`}
										onClick={this.previous}
									/>
									<div className={`${s.calendarItemContainer} ${s.headerText}`}>
										{this.renderMonthLabel()}
									</div>
									<i
										className={`${s.calendarItemContainer} ${s.arrow} la la-arrow-right`}
										onClick={this.next}
									/>
								</div>
								<DayNames />
							</header>
							<div className={`${s.daysContainer}`}>{this.renderWeeks()}</div>
						</section>
					</div>
				</div>
				<div className='list-group fs-mini'>
					<button className='list-group-item text-ellipsis'>
						<span className='badge badge-pill badge-primary float-right'>
							6:45
						</span>
						{this.state.selectedMonthEvents[0].title}
					</button>
					<button className='list-group-item text-ellipsis'>
						<span className='badge badge-pill badge-success float-right'>
							9:41
						</span>
						{this.state.selectedMonthEvents[1].title}
					</button>
				</div>
			</>
		);
	}
}

export default Calendar;
