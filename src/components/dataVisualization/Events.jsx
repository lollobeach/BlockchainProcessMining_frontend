import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDataView } from "../../context/DataViewContext";


// const data = [
//   { id: 0, smartContract: '0x1234567890123456789012345678901234567890', eventName: 'Transfer', occurrences: 4234},
//   { id: 1, smartContract: '0x1234567890123456789012345678901234567890', eventName: 'Approval', occurrences:5650 },
// ];

const columns = [
	{ field: "contractAddress", headerName: "Smart Contract", width: 400 },
	{ field: "eventName", headerName: "Event Name", width: 200 },
	{ field: "count", headerName: "Occurrences", width: 200 },
];

export default function Events() {
    const { data } = useDataView();
    return (
        <div>
            <h1>Events</h1>
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
                      data: data.map((item) => item.count),
                    },
                  ]}
                  height={290}
                  width={400}
                  xAxis={[{ data: data.map((item) => item.eventName) }]}
                />
              </Box>
              <Box sx={{
                flexGrow: 1,
                width: "100%",
                height: 400
              }}>
                <DataGrid rows={
                  data.map((item, index) => ({
                    id: index,
                    ...item,
                    timestamp: new Date(Date.parse(item.timestamp))
                  }))
                } columns={columns} />
              </Box>
            </Box>

        </div>
    )
}
