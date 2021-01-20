import React, { useState, useEffect } from 'react';
import Widget from '../../components/Widget';
import Loader from '../../components/Loader/Loader';

import peopleA1 from '../../images/people/a1.jpg';
import peopleA2 from '../../images/people/a2.jpg';
import peopleA5 from '../../images/people/a5.jpg';
import peopleA4 from '../../images/people/a4.jpg';
const News = () => {
	const [newsData, setNewsData] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/News')
			.then((res) => res.json())
			.then((data) => {
				setNewsData(data);
			})
			.catch((e) => console.error(e));
	}, []);
	if (!newsData) return <Loader />;
	return (
		<Widget
			title={
				<h6>
					<span className='badge badge-success mr-2'>Latest Updates</span>
				</h6>
			}
			refresh
			close
		>
			<div className='widget-body undo_padding'>
				<div className='list-group list-group-lg'>
					{newsData.map((val, index) => {
						return (
							<button key={index} className='list-group-item text-left'>
								<div>
									<i class='las la-rss-square'></i>
									<h6 style={{ display: 'inline-block' }} className='m-0'>
										{val.title}
									</h6>
									<p className='help-block text-ellipsis m-0'>{val.info}</p>
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</Widget>
	);
};

export default News;
