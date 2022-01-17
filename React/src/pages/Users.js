import * as React from 'react';

import Table from '../components/Table';
import { createData, deleteData, updateData, getDatas } from '../services/api';
import {useSnackbar} from 'notistack';

const PATH = '/client';

let columns = [
	{
		field: 'id',
		headerName: 'ID',
		flex: 1
	},
	{
		field: 'first_name',
		headerName: 'First Name',
		editable: true,
		required: true,
		flex: 1,
		validation:(value) => {
			return value !== '';
		}
	},
	{
		field: 'last_name',
		headerName: 'Last Name',
		editable: true,
		required: true,
		flex: 1,
		validation:(value) => {
			return value !== '';
		}
	},
	{
		field: 'birth_date',
		headerName: 'Birth Date',
		editable: true,
		type: 'date',
		required: true,
		flex: 1,
		validation:(value) => {
			let regex = /\d{4}-\d{2}-\d{2}/;
			return regex.test(value);
		}

	},
	{
		field: 'nb_throins',
		headerName: 'Nb Throins',
		editable: true,
		flex: 1,
		validation:(value) => {
			let regex = /^\d+.\d*$/;
			return regex.test(value);
		}
	},
	{
		field: 'email',
		headerName: 'Email',
		editable: true,
		type: 'email',
		required: true,
		flex: 1,
		validation:(value) => {
			let regex = /.+@.+\..+/;
			return regex.test(value);
		}
	},
	{
		field: 'nb_bad_reports',
		headerName: 'Nb Bad Reports',
		editable: true,
		flex: 1,
		validation:(value) => {
			let regex = /^\d+$/;
			return regex.test(value);
		}

	},
	{
		field: 'is_banned',
		headerName: 'Is Banned',
		editable: true,
		flex: 1,
		validation: (value) => {
			return value === 'true' || value === 'false';
		}
	},

];

const initState = {
	id: null,
	first_name: '',
	last_name: '',
	birth_date: '',
	email: '',
	password: ''
};

columns = columns.map((column) => {
	if (column.validation) {
		column.preProcessEditCellProps = (params) => {
			const isValid = column.validation(params.props.value);
			return { ...params.props, error: !isValid };
		};
	}
	return column;
});

const formFields = columns.filter(x => x.required);



formFields.push({
	field: 'password',
	headerName: 'Password',
	type: 'password',
	validation:(value) => {
		return value !== '';
	}
});

export default function Users() {
	const { enqueueSnackbar } = useSnackbar();
	const [paginationState, setPaginationState] = React.useState({
		page: 0,
		pageSize: 100,
		loading: false,
		rows: [],
		rowCount: 100
	});

	const setPageSize = (pageSize) => setPaginationState(prev => ({ ...prev, pageSize }));
	const setPage = (page) => setPaginationState(prev => ({ ...prev, page }));

	const getData = async () => {
		setPaginationState(prev => ({ ...prev, loading: true }));
		try {
			const result = await getDatas(PATH, paginationState.pageSize, paginationState.page);
			console.debug(result);
			setPaginationState((prev) => ({ ...prev, rows: result.items, rowCount: result.totalItems }));
		} catch(error) {
			console.log(error);
		}
		finally {
			setPaginationState(prev => ({ ...prev, loading: false }));
		}
	};

	const handleCreate = async (user) => {
		console.log(user);
		if(formFields.every(x => x.validation ? x.validation(user[x.field]) : true)) {
			try {
				await createData(PATH, user);
				await getData();
				enqueueSnackbar('Create successful', {variant: 'success'});
			} catch (e) {
				enqueueSnackbar(e.message, {variant: 'error'});
			}
		} else
			enqueueSnackbar('Bad input, try again', {variant: 'error'});



	};
	const handleEdit = React.useCallback(
		async (params) => {
			try {
				// Make the HTTP request to save in the backend
				await updateData(PATH, params.id, {
					[params.field]: params.value,
				});

				enqueueSnackbar('Modification réussie', {variant: 'success'});
			} catch (error) {
				enqueueSnackbar(error.message, {variant: 'error'});
			} finally {
				await getData();
			}
		},
		[updateData, PATH],
	);

	const handleDelete = async (trashId) => {
		await deleteData(PATH, trashId);
		await getData();
	};

	return (
		<div>
			<Table columns={columns} getData={getData} paginationState={paginationState} setPage={setPage} setPageSize={setPageSize} handleCreate={handleCreate} handleEdit={handleEdit} handleDelete={handleDelete} initState={initState} formFields={formFields} />
		</div>
	);
}

