import React from 'react';
import { TextField, Box, Button } from '@mui/material';

const Create = ({ initState, formFields, createData }) => {

	const [item, setItem] = React.useState(initState);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setItem({ ...item, [name]: value });
	};

	const saveItem = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await createData(item);
	};

	return (
		<div className='submit-form'>

			<Box
				component='form'
				onSubmit={saveItem}
				noValidate
				sx={{ mt: 1 }}
			>
				{formFields.map(f => (
					<TextField
						error={f.validation ? !f.validation(item[f.field]) : false}
						size='small'
						margin='normal'
						required
						id={f.field}
						label={f.headerName}
						type={f.type}
						name={f.field}
						key={f.field}
						onChange={handleInputChange}
					/>
				))}
				<Button type='submit' variant='contained' sx={{ mt: 2, mb: 10 }}>
					Submit
				</Button>
			</Box>

		</div>
	);
};

export default Create;
