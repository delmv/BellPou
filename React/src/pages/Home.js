import * as React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { getDatas, emptyTrash } from '../services/api';
import Table from '../components/Table';
import TrashMap from '../components/TrashMap';
import {useSnackbar} from 'notistack';

const columns = [
	{
		field: 'id',
		headerName: 'ID'
	},
	{
		field: 'is_full',
		headerName: 'is full',
		editable: false
	},
	{
		field: 'nb_alerts',
		headerName: 'nb alerts',
		editable: false,
	},
	{
		field: 'qr_code',
		headerName: 'qr Code',
		editable: false,
	},
	{
		field: 'last_empty',
		headerName: 'last empty',
		editable: true,
		type: 'date'
	},
	{
		field: 'coordinate_x',
		headerName: 'coordinate X',
		required: true,
		valueGetter: (params) => params.row.position.coordinate_x

	},
	{
		field: 'coordinate_y',
		headerName: 'coordinate Y',
		required: true,
		valueGetter: (params) => params.row.position.coordinate_y
	},
	{
		field: 'coordinates',
		headerName: 'coordinates',
		minWidth: 350,
		valueGetter: (params) => `(${params.row.position.coordinate_x} ; ${params.row.position.coordinate_y})`
	},
	
];

export default function Trash() {
	const { enqueueSnackbar } = useSnackbar();
	const [paginationState, setPaginationState] = React.useState({
		page: 0,
		pageSize: 5,
		loading: false,
		rows: [],
		rowCount: 100
	});

	const setPageSize = (pageSize) => setPaginationState(prev => ({ ...prev, pageSize }));
	const setPage = (page) => setPaginationState(prev => ({ ...prev, page }));

	const getData = async () => {
		setPaginationState(prev => ({ ...prev, loading: true }));
		try {
			const result = await getDatas('/trash', paginationState.pageSize, paginationState.page);
			setPaginationState((prev) => ({ ...prev, rows: result.items, rowCount: result.totalItems }));
		} catch(error) {
			enqueueSnackbar(error.message, {variant: 'error'});
		}
		finally {
			setPaginationState(prev => ({ ...prev, loading: false }));
		}
	};



	const handleEmpty = async (event, cellValues,isFull) => {
		const id = cellValues.row.id;
		try {
			await emptyTrash(id, isFull);
			await getData();
			enqueueSnackbar('trash actualis??e', {variant: 'success'});

		} catch (error) {
			enqueueSnackbar(error.message, {variant: 'error'});
		}
	};

	const columnsToDisplay = [...columns,
		{
			field: 'empty',
			renderCell: (cellValues) => {
				return (
					<IconButton aria-label='empty'
						variant='contained'
						color='success'
						onClick={(event) => {
							handleEmpty(event, cellValues,false);
						}}
					>
						<DeleteIcon />
					</IconButton>
				);
			}
		},
		{
			field: 'full',
			renderCell: (cellValues) => {
				return (
					<IconButton aria-label='full'
						variant='contained'
						color='error'
						onClick={(event) => {
							handleEmpty(event, cellValues,true);
						}}
					>
						<DeleteIcon />
					</IconButton>
				);
			}
		}];

	return (
		<div>
			<Table columns={columnsToDisplay} getData={getData} paginationState={paginationState} setPage={setPage} setPageSize={setPageSize} />
			<TrashMap paginationState={paginationState} getData={getData}/>
		</div>
	);
}