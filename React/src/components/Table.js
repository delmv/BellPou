import React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Create from './Create';

export default function Table({ columns, getData, paginationState, setPage, setPageSize, initState, formFields, handleCreate, handleEdit, handleDelete }) {
	const columnsToDisplay = [...columns];
	if (handleDelete) {
		columnsToDisplay.push({
			field: 'Delete',
			renderCell: (cellValues) => {
				return (
					<IconButton aria-label='delete'
						variant='contained'
						color='error'
						onClick={() => {
							handleDelete(cellValues.row.id);
						}}
					>
						<DeleteIcon />
					</IconButton>
				);
			}
		});
	}

	React.useEffect(() => {
		getData();
	}, [paginationState.page, paginationState.pageSize]);

	return (
		<div style={{ width: '100%' }}>
			{ initState && formFields && handleCreate && <Create initState={initState} formFields={formFields} createData={handleCreate} />}
			<Box
				sx={{
					height: 400,
					width: 1,
					'& .Mui-error': {
						bgcolor: (theme) =>
							`rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
						color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
					},
				}}
			>
				<DataGridPro
					columns={columnsToDisplay}
					{...paginationState}
					onPageSizeChange={setPageSize}
					onPageChange={setPage}
					rowsPerPageOptions={[2, 5, 10, 100]}
					paginationMode="server"
					pagination
					autoHeight
					onCellEditCommit={handleEdit ? handleEdit : () => {}}
				/>    
			</Box>
			
		</div>
	);

}
