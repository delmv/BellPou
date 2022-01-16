import * as React from 'react';

import Table from '../components/Table';
import { createData, deleteData, updateData, getDatas } from '../services/api';

const PATH = '/client';

const columns = [
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
		flex: 1
	},
	{
		field: 'last_name',
		headerName: 'Last Name',
		editable: true,
		required: true,
		flex: 1
	},
	{
		field: 'birth_date',
		headerName: 'Birth Date',
		editable: true,
		type: 'date',
		required: true,
		flex: 1

	},
	{
		field: 'nb_throins',
		headerName: 'Nb Throins',
		editable: true,
		flex: 1
	},
	{
		field: 'email',
		headerName: 'Email',
		editable: true,
		type: 'email',
		required: true,
		flex: 1
	},
	{
		field: 'nb_bad_reports',
		headerName: 'Nb Bad Reports',
		editable: true,
		flex: 1

	},
	{
		field: 'is_banned',
		headerName: 'Is Banned',
		flex: 1
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

const formFields = columns.filter(x => x.required);

formFields.push({
	field: 'password',
	headerName: 'Password',
	type: 'password'
});

export default function Users() {
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
		await createData(PATH, user);
		await getData();
	};
	const handleEdit = React.useCallback(
		async (params) => {
			try {
				// Make the HTTP request to save in the backend
				await updateData(PATH, params.id, {
					[params.field]: params.value,
				});

				await getData();
			} catch (error) {
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

