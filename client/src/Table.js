import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'called', headerName: 'Called', width: 130 },
    { field: 'caller', headerName: 'Caller', width: 130 },
    { field: 'direction', headerName: 'Direction', width: 130 },
    { field: 'callStatus', headerName: 'Call Status', width: 130 },
    { field: 'CallTime', headerName: 'Call Time', width: 130 },
    { field: 'callDuration', headerName: 'Call Duration', width: 130 },
    { field: 'callerCountry', headerName: 'Caller Country', width: 130 },
    { field: 'calledCountry', headerName: 'Called Country', width: 130 },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];



export default function Table() {
    const [data, setData] = useState([]);

    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {
        (async () => {
            const result = await axios.get("http://localhost:8080/ivr/logsData");
            console.log(result.data)
            setData(result.data);
        })();
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    );
}