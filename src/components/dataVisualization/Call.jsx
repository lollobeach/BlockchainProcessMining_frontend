import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


const data = [
  { id: 0, smartContract: '0x1234567890123456789012345678901234567890', callType: 'CALL', occurrences: 4234},
  { id: 1, smartContract: '0x1234567890123456789012345678901234567890', callType: 'STATICCALL', occurrences:5650 },
];

const columns = [
  { field: 'smartContract', headerName: 'Smart Contract', width: 400 },
  { field: 'callType', headerName: 'Call Type', width: 200 },
  { field: 'occurrences', headerName: 'Occurrences', width: 200 },
];

export default function Call() {
    return (
        <div>
            <h1>Call</h1>
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 2
            }}>
              <Box sx={{
                width: { xs: '100%', md: '50%' },
                minWidth: { md: '400px' },
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <BarChart
                  series={[
                    {
                      data: data.map((item) => item.occurrences),
                    },
                  ]}
                  height={290}
                  width={400}
                  xAxis={[{ data: data.map((item) => item.callType) }]}
                />
              </Box>
              <Box sx={{
                flexGrow: 1,
                width: { xs: '100%', md: '50%' },
                height: 400
              }}>
                <DataGrid rows={
                  data.map((item) => ({
                    ...item,
                    occurrences: item.occurrences || 0
                  }))
                } columns={columns} />
              </Box>
            </Box>

        </div>
    )
}
