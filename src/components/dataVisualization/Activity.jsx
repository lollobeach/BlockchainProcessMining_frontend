import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react';
import { data } from './GasUsed';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'smartContract', headerName: 'Smart Contract', width: 400 },
  { field: 'activity', headerName: 'Activity', width: 200 },
  { field: 'count', headerName: 'Count', width: 200 },
];

export default function Activity() {
    return (
        <div>
            <h1>Activity</h1>
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
                      data: data.map((item) => item.count),
                    },
                  ]}
                  height={290}
                  width={400}
                  xAxis={[{ data: data.map((item) => item.activity) }]}
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
                    count: item.count || 0
                  }))
                } columns={columns} />
              </Box>
            </Box>

        </div>
    )
}
