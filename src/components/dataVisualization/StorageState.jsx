import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDataView } from "../../context/DataViewContext";

// const data = [
//   { id: 0, smartContract: '0x1234567890123456789012345678901234567890', variableName: '_decimals', occurrences: 4400},
//   { id: 1, smartContract: '0x1234567890123456789012345678901234567890', variableName: '_totalSupply', occurrences:5430 },
//   { id: 2, smartContract: '0x1234567890123456789012345678901234567890', variableName: 'sushi', occurrences:1256},
// ];

const columns = [
  { field: 'smartContract', headerName: 'Smart Contract', width: 400 },
  { field: 'variableName', headerName: 'Variable Name', width: 200 },
  { field: 'occurrences', headerName: 'Occurrences', width: 200 },
];

export default function StorageState() {
    const { data } = useDataView();
    return (
        <div>
            <h1>Storage State</h1>
            <Box sx={{
              display: 'flex',
              flexDirection: "column",
              alignItems: "center",
              gap: 2
            }}>
              <Box sx={{
                width: "100%",
                minWidth: { md: '400px' },
                display: 'flex',
                justifyContent: "center"
              }}>
                <BarChart
                  series={[
                    {
                      data: data.map((item) => item.occurrences),
                    },
                  ]}
                  height={290}
                  width={400}
                  xAxis={[{ data: data.map((item) => item.variableName) }]}
                />
              </Box>
              <Box sx={{
                flexGrow: 1,
                width: "100%",
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
