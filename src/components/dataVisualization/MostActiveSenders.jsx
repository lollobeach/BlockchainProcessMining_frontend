import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const data = [
  {
    id: 0,
    sender: "0x1234567890123456789012345678901234567890",
    numberOfTransactions: 100,
    averageGasUsed: 124453
  },
  {
    id: 1,
    sender: "0x1234567890123456789012345678901234567890",
    numberOfTransactions: 100,
    averageGasUsed: 124453
  },
  {
    id: 2,
    sender: "0x1234567890123456789012345678901234567890",
    numberOfTransactions: 100,
    averageGasUsed: 124453
  },
  {
    id: 3,
    sender: "0x1234567890123456789012345678901234567890",
    numberOfTransactions: 100,
    averageGasUsed: 124453
  },
  {
    id: 4,
    sender: "0x1234567890123456789012345678901234567890",
    numberOfTransactions: 100,
    averageGasUsed: 124453
  },
  {
    id: 5,
    sender: "0x1234567890123456789012345678901234567890",
    numberOfTransactions: 100,
    averageGasUsed: 124453
  }
]
const columns = [
  { field: 'sender', headerName: 'Sender', width: 400 },
  { field: 'numberOfTransactions', headerName: 'Number of Transactions', width: 200 },
  { field: 'averageGasUsed', headerName: 'Average Gas Used', width: 200 },
];

export default function MostActiveSenders() {
    return (
        <div>
            <h1>Most Active Senders</h1>
            <Box sx={{
                flexGrow: 1,
                width: { xs: '100%', md: '100%' },
                height: 400
              }}>
                <DataGrid rows={
                  data.map((item) => ({
                    ...item,
                    numberOfTransactions: item.numberOfTransactions || 0,
                    averageGasUsed: item.averageGasUsed || 0
                  }))
                } columns={columns} />
              </Box>
        </div>
    )
}
