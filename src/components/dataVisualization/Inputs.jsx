import { BarChart } from '@mui/x-charts/BarChart';
import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDataView } from "../../context/DataViewContext";

// const data = [
//   { id: 0, smartContract: '0x1234567890123456789012345678901234567890', inputName: 'amount', inputType: "uint256", occurrences: 4234},
//   { id: 1, smartContract: '0x1234567890123456789012345678901234567890', inputName: 'share', inputType: "uint256", occurrences:5650 },
//   { id: 2, smartContract: '0x1234567890123456789012345678901234567890', inputName: 'amount', inputType: "uint256", occurrences: 6344 },
//   { id: 3, smartContract: '0x1234567890123456789012345678901234567890', inputName: 'recipient', inputType: "uint256", occurrences: 2352 },
//   { id: 4, smartContract: '0x1234567890123456789012345678901234567890', inputName: 'spender', inputType: "uint256", occurrences: 1345 },
//   { id: 5, smartContract: '0x1234567890123456789012345678901234567890', inputName: 'subtractedValue', inputType: "uint256", occurrences: 2340 },
// ];

const columns = [
  { field: 'smartContract', headerName: 'Smart Contract', width: 400 },
  { field: 'inputName', headerName: 'Input Name', width: 200 },
  { field: 'inputType', headerName: 'Input Type', width: 200 },
  { field: 'occurrences', headerName: 'Occurrences', width: 200 },
];

export default function Inputs() {
    const { data } = useDataView();
    return (
			<div>
				<h1>Inputs</h1>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						gap: 2,
					}}>
					<Box
						sx={{
							width: "100%",
							minWidth: { md: "400px" },
							display: "flex",
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
							xAxis={[{ data: data.map((item) => item.inputName) }]}
						/>
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							width: "100%",
							height: 400,
						}}>
						<DataGrid
							rows={data.map((item) => ({
								...item,
								occurrences: item.occurrences || 0,
							}))}
							columns={columns}
						/>
					</Box>
				</Box>
			</div>
		);
}
