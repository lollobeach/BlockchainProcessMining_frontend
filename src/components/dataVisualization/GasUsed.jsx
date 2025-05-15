import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const data = [
  {
    id: 0,
    gasUsed: 234123,
    activity: "Approve",
    smartContract: "0x1234567890123456789012345678901234567890",
    count: 5351
  },
  {
    id: 1,
    gasUsed: 3555213,
    activity: "Transfer",
    smartContract: "0x1234567890123456789012345678901234567890",
    count: 8668
  },
  {
    id: 2,
    gasUsed: 1231443,
    activity: "Leave",
    smartContract: "0x1234567890123456789012345678901234567890",
    count: 1234
  },
  {
    id: 3,
    gasUsed: 435346,
    activity: "Enter",
    smartContract: "0x1234567890123456789012345678901234567890",
    count: 5432
  },
  {
    id: 4,
    gasUsed: 345362,
    activity: "Transfer",
    smartContract: "0x1234567890123456789012345678901234567890",
    count: 1234
  },

]

const columns = [
  { field: 'smartContract', headerName: 'Smart Contract', width: 400 },
  { field: 'activity', headerName: 'Activity', width: 200 },
  { field: 'gasUsed', headerName: 'Gas Used', width: 200 },
];

export default function GasUsed() {
    return (
        <div>
            <h1>Gas Used</h1>
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 2
            }}>
              <Box sx={{
                width: { xs: '100%', md: 'auto' },
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <PieChart
                  series={[
                    {
                      data: data.map((item) => ({
                        id: item.id,
                        value: item.gasUsed,
                        label: item.activity,
                      })),
                      innerRadius: 11,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cx: 150,
                      cy: 150,
                    },
                  ]}
                  width={400}
                  height={400}
                />
              </Box>
              <Box sx={{
                flexGrow: 1,
                width: '100%',
                height: 400
              }}>
                <DataGrid rows={data} columns={columns} />
              </Box>
            </Box>
        </div>
    )
}
