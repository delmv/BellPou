import * as React from 'react';

import Table from '../components/Table';
import { createData, deleteData, updateData, getDatas } from '../services/api';

const PATH = '/trash';

const columns = [
	{
		field: 'id',
		headerName: 'ID',
		flex: 1
	},
	{
		field: 'is_full',
		headerName: 'is full',
		editable: true,
		flex: 1
	},
	{
		field: 'nb_alerts',
		headerName: 'nb alerts',
		editable: true,
		flex: 1
	},
	{
		field: 'qr_code',
		headerName: 'qr Code',
		editable: true,
		flex: 1
	},
	{
		field: 'last_empty',
		headerName: 'last empty',
		editable: true,
		type: 'date',
		flex: 1
	},
	{
		field: 'coordinate_x',
		headerName: 'coordinate X',
		required: true,
		valueGetter: (params) => params.row.position.coordinate_x,
		flex: 1

	},
	{
		field: 'coordinate_y',
		headerName: 'coordinate Y',
		required: true,
		valueGetter: (params) => params.row.position.coordinate_y,
		flex: 1
	},
	{
		field: 'coordinates',
		headerName: 'coordinates',
		minWidth: 350,
		valueGetter: (params) => `(${params.row.position.coordinate_x} ; ${params.row.position.coordinate_y})`,
		flex: 1
	}

];

const initState = {
	id: null,
	coordinate_x: '',
	coordinate_y: '',
};

const formFields = columns.filter(x => x.required);

export default function Trashs() {
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

	const handleCreate = async (position) => {
		const newTrash = { position };
		console.log(newTrash);
		await createData(PATH, newTrash);
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

