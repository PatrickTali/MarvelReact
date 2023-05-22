import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { CharacterForm } from '../CharacterForm'


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150,
        editable: true,
    },
    {
        field: 'comics_appeared_in',
        headerName: 'Comics_appeared_in',
        width: 110,
        editable: true,
        type: 'number'
    },
    {
        field: 'super_power',
        headerName: 'Super_power',
        width: 160
    },

    {
        field: 'date_created',
        headerName: 'Date_created',
        width: 110,
        editable: true
    },

   
];

interface gridData {
    data: {
        id?: string
    }
}

export const DataTable = () => {
    let { characterData, getData } = useGetData()
    let [open, setOpen] = useState(false)
    let [gridData, setData] = useState<GridRowSelectionModel>([])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }

    console.log(gridData) 

    const MyAuth =localStorage.getItem('myAuth')
    console.log(MyAuth)

    if (MyAuth == 'true'){
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <h2>Characters in Inventory</h2>
            <DataGrid
                rows={characterData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                onRowSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel) }}
                {...characterData}
            />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
            
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id="form-dialog-title">Update a Character</DialogTitle>
                <DialogContent>
                    <DialogContentText>Character id: {gridData[0]}</DialogContentText>
                    <CharacterForm id={`${gridData[0]}`} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
} else {
    return(

    <div>
        <h3>Please Sign In To View Your Collection</h3>
    </div>    

    )}

}