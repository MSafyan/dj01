import React, { useState } from 'react';
import { Table, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Progress } from 'reactstrap';
import { useDropzone } from 'react-dropzone';

import Loader from '../../components/Loader/Loader';

const Diagnose = () => {
	const [user, setUser] = useState({
		projectName: '',
		description: '',
		type: '',
	});

	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [DiagnoseData, setDiagnoseData] = useState([]);

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});
	const images = files.map((file) => (
		<div key={file.name}>
			<div>
				<img src={file.preview} style={{ width: '50px' }} alt='preview' />
			</div>
		</div>
	));

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
		console.log(user);
	};

	const onClickHandler = () => {
		const formData = new FormData();
		formData.append('projectName', user.projectName);
		formData.append('description', user.desctiption);
		formData.append('type', user.type);
		formData.append('file', files[0]);
		console.log({ user, formData, files });
		setLoading(true);
		fetch('http://localhost:5000/diagnoseData', formData)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setDiagnoseData(data);
			})
			.catch((e) => console.log(e));
		setLoading(false);
	};
	return (
		<div>
			<Row>
				<Col xm='12' md='4'>
					<Form
						style={{
							maxWidth: '360px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						<FormGroup>
							<Label for='projectName'>Project Name</Label>
							<Input
								name='projectName'
								id='projectName'
								placeholder='Required'
								onChange={onChange}
								value={user.projectName}
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label for='description'>Description</Label>
							<Input
								name='description'
								id='description'
								placeholder='Optional'
								value={user.description}
								onChange={onChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='type'>Type</Label>
							<Input
								name='type'
								id='type'
								placeholder='Optional'
								value={user.type}
								onChange={onChange}
							/>
						</FormGroup>
						<div
							{...getRootProps()}
							style={{
								display: 'flex',
								height: '120px',
								border: 'solid',
								flexDirection: 'column',
								justifyContent: 'flex-end',
								alignItems: 'center',
							}}
						>
							<input
								type='file'
								name='file'
								onChange={onChange}
								{...getInputProps()}
							/>
							<div>{images}</div>

							<p style={{}}>Drop files here</p>
						</div>
						<button
							type='button'
							style={{ maxWidth: '200px', margin: '1rem' }}
							class='btn btn-success btn-block'
							onClick={() => onClickHandler()}
						>
							Upload
						</button>
					</Form>
				</Col>
				<Col sm='12' md='8'>
					{!loading ? (
						<Table>
							<thead>
								<tr>
									<th>Abnormality</th>
									<th>Detected</th>
									<th>Probability</th>
									<th>Risk</th>
								</tr>
							</thead>
							<tbody>
								{DiagnoseData.map((val) => (
									<tr>
										<th scope='row'>1</th>
										<td>Mark</td>
										<td>
											<Progress
												className={`bg-custom-dark progress-xs mt-1`}
												value='30'
											/>
										</td>
										<td>High</td>
									</tr>
								))}
							</tbody>
						</Table>
					) : (
						<>
							<p>Please Add the X-Ray image</p>
							<Loader />
						</>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default Diagnose;
