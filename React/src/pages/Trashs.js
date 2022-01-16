import * as React from 'react';

import Table from '../components/Table';
import { createData, deleteData, updateData, getDatas } from '../services/api';
import {useSnackbar} from 'notistack';

const PATH = '/trash';

let columns = [
	{
		field: 'id',
		headerName: 'ID',
		flex: 1,
		validation:(value) => {
			return !isNaN(value);
		}
	},
	{
		field: 'is_full',
		headerName: 'is full',
		editable: true,
		flex: 1, 
		validation: (value) => { 
			return value === 'true' || value === 'false';
		}
	},
	{
		field: 'nb_alerts',
		headerName: 'nb alerts',
		editable: true,
		flex: 1, 
		validation:(value) => {
			return !isNaN(value);
		}
		
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
		flex: 1, 
	},
	{
		field: 'coordinate_x',
		headerName: 'coordinate X',
		required: true,
		editable: true,
		valueGetter: (params) => params.row.position.coordinate_x,
		flex: 1,
		validation:(value) => {
			return !isNaN(value);
		}
	},
	{
		field: 'coordinate_y',
		headerName: 'coordinate Y',
		required: true,
		editable: true,
		valueGetter: (params) => params.row.position.coordinate_y,
		flex: 1,
		validation:(value) => {
			return !isNaN(value);
		}
	},
	{
		field: 'coordinates',
		headerName: 'coordinates',
		minWidth: 350,
		valueGetter: (params) => `(${params.row.position.coordinate_x} ; ${params.row.position.coordinate_y})`,
		flex: 1
	}

];

const formFields = columns.filter(x => x.required);

columns = columns.map((column) => {
	if (column.validation) {
		column.preProcessEditCellProps = (params) => {
			const isValid = column.validation(params.props.value);
			return { ...params.props, error: !isValid };
		};
	}
	return column;
});

const initState = {
	id: null,
	coordinate_x: '',
	coordinate_y: '',
};


export default function Trashs() {
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
			setPaginationState((prev) => ({ ...prev, rows: result.items, rowCount: result.totalItems }));
		} catch(error) {
			enqueueSnackbar(error.message, {variant: 'error'});
		}
		finally {
			setPaginationState(prev => ({ ...prev, loading: false }));
		}
	};

	const handleCreate = async (position) => {
		const newTrash = { position };
		if(formFields.every(x => x.validation(position[x.field]))){
			try{
				await createData(PATH, newTrash);
				await getData();
				enqueueSnackbar('Ajout réussi', {variant: 'success'});

			}catch(e){
				enqueueSnackbar(e.message, {variant: 'error'});
			}
		}	else{
			enqueueSnackbar('fail', {variant: 'error'});

		}	
			
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

			} finally{
				await getData();
			}
		},
		[updateData, PATH],
	);

	const handleDelete = async (trashId) => {
		try{
			await deleteData(PATH, trashId);
			await getData();
			enqueueSnackbar('Suppression réussie', {variant: 'success'});
		}catch(e){
			enqueueSnackbar(e.message, {variant: 'error'});
		}
		
	};

	return (
		<div>
			<Table columns={columns} getData={getData} paginationState={paginationState} setPage={setPage} setPageSize={setPageSize} handleCreate={handleCreate} handleEdit={handleEdit} handleDelete={handleDelete} initState={initState} formFields={formFields} />
		</div>
	);
}

