import * as React from 'react';

import Table from '../components/Table';
import { createData, deleteData, updateData, getDatas } from '../services/api';

const PATH = '/reward';
const columns = [
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
		flex: 1
	},
	{
		field: 'name_en',
		headerName: 'Name',
		editable: true,
		required: true,
		flex: 1

	},
	{
		field: 'description_fr',
		headerName: 'Description FR',
		editable: true,
		required: true,
		flex: 1

	},
	{
		field: 'description_en',
		headerName: 'Description EN',
		editable: true,
		required: true,
		flex: 1

	},
	{
		field: 'throins_cost',
		headerName: 'throins cost',
		editable: true,
		required: true,
		type:'number',
		flex: 1

	},
	{
		field: 'real_cost',
		headerName: 'real cost',
		editable: true,
		required: true,
		type:'number',
		flex: 1


	},
	{
		field: 'vendor_id',
		headerName: 'vendor',
		editable: false,
		required: true,
		type:'number',
		flex: 1
		
	}
];

const initState = {
	id: null,
	name_fr: '',
	name_en: '',
	description_fr: '',
	description_en: '',
	throins_cost:'',
	real_cost:'',
	vendor_id:''
};

const formFields = columns.filter(x => x.required);

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

	const handleCreate = async (reward) => {
		console.log(reward);
		await createData(PATH, { 
			reward_name_fr: reward.name_fr,
			reward_name_en: reward.name_en,
			reward_description_fr: reward.description_fr,
			reward_description_en: reward.description_en,
			throins_cost: reward.throins_cost,
			real_cost: reward.real_cost,
			vendor: {id: reward.vendor_id}
		});
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