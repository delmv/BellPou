import React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { IconButton } from '@mui/material';
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
		</div>
	);

}
