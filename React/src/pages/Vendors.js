import * as React from 'react';

import Table from '../components/Table';
import { createData, deleteData, updateData, getDatas } from '../services/api';
import {useSnackbar} from 'notistack';



const PATH = '/vendor';

let columns = [
	{
		field: 'id',
		headerName: 'ID',
		flex: 1
	},
	{
		field: 'name_fr',
		headerName: 'Nom',
		editable: true,
		required: true,
		flex: 1,
		validation:(value) => {
			return value !== '';
		}

	},
	{
		field: 'name_en',
		headerName: 'Name',
		editable: true,
		required: true,
		flex: 1,
		validation:(value) => {
			return value !== '';
		}

	},
	{
		field: 'description_fr',
		headerName: 'Description FR',
		editable: true,
		required: true,
		flex: 1,
		validation:(value) => {
			return value !== '';
		}

	},
	{
		field: 'description_en',
		headerName: 'Description EN',
		editable: true,
		required: true,
		flex: 1,
		validation:(value) => {
			return value !== '';
		}
	},
	{
		field: 'coordinate_x',
		headerName: 'coordinate X',
		required: true,
		editable: true,
		valueGetter: (params) => params.row.position.coordinate_x,
		flex: 1,
		validation:(value) => {
			let regex = /^\d+?.\d+$/;
			return regex.test(value);
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
			let regex = /^\d+?.\d+$/;
			return regex.test(value);
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
	name_fr: '',
	name_en: '',
	description_fr: '',
	description_en: '',
	coordinate_x:'',
	coordinate_y:''
};

export default function Vendors() {
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

	const handleCreate = async (vendor) => {
		if(formFields.every(x => x.validation ? x.validation(vendor[x.field]) : true)) {
			try {
				await createData(PATH, { ...vendor, position: { coordinate_x: vendor.coordinate_x, coordinate_y: vendor.coordinate_y }});
				await getData();
				enqueueSnackbar('Create successful', {variant: 'success'});
			} catch(e){
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