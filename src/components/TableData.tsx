// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { useGetCryptosQuery } from "../services/cryptoApi"; // Assuming this is the correct hook to fetch crypto data

// interface Column {
//   id: "name" | "symbol" | "price24h" | "price7d" | "price30d";
//   label: string;
//   minWidth?: number;
//   align?: "right";
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: "name", label: "Name", minWidth: 170 },
//   { id: "symbol", label: "Symbol", minWidth: 100 },
//   { id: "price24h", label: "24h Change", minWidth: 100, align: "right" },
//   { id: "price7d", label: "7d Change", minWidth: 100, align: "right" },
//   { id: "price30d", label: "30d Change", minWidth: 100, align: "right" },
// ];

// interface Data {
//   name: string;
//   symbol: string;
//   price24h: number;
//   price7d: number;
//   price30d: number;
// }

// export default function CryptoTable() {
//   const { data: cryptoList, isFetching, error } = useGetCryptosQuery({});
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   // Function to calculate the price change
//   const calculatePriceChange = (history: any[], timePeriod: number): number => {
//     const now = history[history.length - 1]?.price; // Most recent price
//     const past = history.find(
//       (entry) =>
//         new Date(entry.timestamp * 1000).getTime() <= Date.now() - timePeriod
//     )?.price;

//     return now && past ? ((now - past) / past) * 100 : 0; // Calculate percentage change
//   };

//   // Prepare rows data
//   const rows: Data[] =
//     cryptoList?.data?.coins.map((coin: any) => {
//       const history = coin.history || [];
//       return {
//         name: coin.name,
//         symbol: coin.symbol,
//         price24h: calculatePriceChange(history, 24 * 60 * 60 * 1000), // 24 hours in ms
//         price7d: calculatePriceChange(history, 7 * 24 * 60 * 60 * 1000), // 7 days in ms
//         price30d: calculatePriceChange(history, 30 * 24 * 60 * 60 * 1000), // 30 days in ms
//       };
//     }) || [];

//   if (isFetching) return <div>Loading...</div>;
//   if (error) {
//     console.error("Error fetching data:", error);
//     return <div>Error</div>;
//   }

//   return (
//     <Paper sx={{ width: "100%", overflow: "hidden" }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="crypto table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow
//                     hover
//                     role="checkbox"
//                     tabIndex={-1}
//                     key={row.symbol}
//                   >
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === "number"
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useGetCryptoHistoryQuery } from "../services/cryptoApi";

// interface CryptoTableProps {
//   selectedCrypto: string;
//   timePeriod: string;
// }

// const CryptoTable: React.FC<CryptoTableProps> = ({
//   selectedCrypto,
//   timePeriod,
// }) => {
//   const { data: coinHistory } = useGetCryptoHistoryQuery({
//     coinId: selectedCrypto,
//     timePeriod,
//   });

//   const [rows, setRows] = useState<any[]>([]);

//   useEffect(() => {
//     if (coinHistory?.data?.history) {
//       const history = coinHistory.data.history;

//       // Process the data for the table
//       const calculateChange = (period: string) => {
//         const mostRecentPrice = history[history.length - 1].price;
//         const pastPrice = history.find(
//           (entry: any) =>
//             new Date(entry.timestamp * 1000).getTime() <=
//             Date.now() - Number(period)
//         )?.price;
//         return mostRecentPrice && pastPrice
//           ? ((mostRecentPrice - pastPrice) / pastPrice) * 100
//           : 0;
//       };

//       setRows([
//         {
//           period: "24h",
//           change: calculateChange((24 * 60 * 60 * 1000).toString()), // 24 hours
//         },
//         {
//           period: "3d",
//           change: calculateChange((3 * 24 * 60 * 60 * 1000).toString()), // 3 days
//         },
//         {
//           period: "7d",
//           change: calculateChange((7 * 24 * 60 * 60 * 1000).toString()), // 7 days
//         },
//         {
//           period: "1m",
//           change: calculateChange((30 * 24 * 60 * 60 * 1000).toString()), // 1 month
//         },
//       ]);
//     }
//   }, [coinHistory, timePeriod]);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Period</th>
//           <th>Price Change (%)</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((row, index) => (
//           <tr key={index}>
//             <td>{row.period}</td>
//             <td>{row.change.toFixed(2)}%</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default CryptoTable;

// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import {
//   useGetCryptoHistoryQuery,
//   useGetCryptoDetailsQuery,
// } from "../services/cryptoApi"; // assuming you have a query to get historical data

// interface Column {
//   id: "name" | "24h" | "3d" | "7d" | "1m";
//   label: string;
//   minWidth?: number;
//   align?: "right";
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: "name", label: "Name", minWidth: 170 },
//   { id: "24h", label: "24h Change (%)", minWidth: 100, align: "right" },
//   { id: "3d", label: "3 Days Change (%)", minWidth: 100, align: "right" },
//   { id: "7d", label: "7 Days Change (%)", minWidth: 100, align: "right" },
//   { id: "1m", label: "1 Month Change (%)", minWidth: 100, align: "right" },
// ];

// interface Data {
//   name: string;
//   "24h": number;
//   "3d": number;
//   "7d": number;
//   "1m": number;
// }

// function createData(
//   name: string,
//   h24: number,
//   h3d: number,
//   h7d: number,
//   h1m: number
// ): Data {
//   return { name, "24h": h24, "3d": h3d, "7d": h7d, "1m": h1m };
// }

// const CryptoTable = ({
//   selectedCrypto,
//   timePeriod,
// }: {
//   selectedCrypto: string;
//   timePeriod: string;
// }) => {
//   const { data: coinHistory } = useGetCryptoHistoryQuery({
//     coinId: selectedCrypto,
//     timePeriod,
//   });

//   const { data: selectedCryptoData } = useGetCryptoDetailsQuery(
//     selectedCrypto,
//     {
//       skip: !selectedCrypto,
//     }
//   );

//   const [rows, setRows] = React.useState<Data[]>([]);

//   React.useEffect(() => {
//     if (coinHistory?.data?.history) {
//       // Calculate the price changes for each period
//       const history = coinHistory.data.history;

//       const calculateChange = (period: number) => {
//         const mostRecentPrice = history[history.length - 1].price;
//         const pastPrice = history.find(
//           (entry: any) =>
//             new Date(entry.timestamp * 1000).getTime() <= Date.now() - period
//         )?.price;
//         return mostRecentPrice && pastPrice
//           ? ((mostRecentPrice - pastPrice) / pastPrice) * 100
//           : 0;
//       };

//       // Populate rows with the calculated percentage changes for each period
//       setRows([
//         {
//           name: selectedCryptoData?.data?.coin?.name || "Bitcoin", // Get the crypto name from selectedCryptoData
//           "24h": calculateChange(24 * 60 * 60 * 1000), // 24 hours
//           "3d": calculateChange(3 * 24 * 60 * 60 * 1000), // 3 days
//           "7d": calculateChange(7 * 24 * 60 * 60 * 1000), // 7 days
//           "1m": calculateChange(30 * 24 * 60 * 60 * 1000), // 1 month
//         },
//       ]);
//     }
//   }, [coinHistory, selectedCrypto, selectedCryptoData]);

//   return (
//     <Paper sx={{ width: "100%", overflow: "hidden" }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
//                 {columns.map((column) => {
//                   const value = row[column.id];
//                   return (
//                     <TableCell key={column.id} align={column.align}>
//                       {column.format && typeof value === "number"
//                         ? column.format(value)
//                         : value}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={10} // Update this according to your needs
//         page={0} // Assuming you only have one row for now (one cryptocurrency)
//         onPageChange={() => {}}
//       />
//     </Paper>
//   );
// };

// export default CryptoTable;

// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import {
//   useGetCryptoHistoryQuery,
//   useGetCryptoDetailsQuery,
// } from "../services/cryptoApi"; // assuming you have a query to get historical data

// interface Column {
//   id: "name" | "price" | "24h" | "3d" | "24hChange" | "3dChange";

//   label: string;
//   minWidth?: number;
//   align?: "right";
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: "name", label: "Name", minWidth: 170 },
//   { id: "price", label: "Price", minWidth: 100, align: "right" },
//   { id: "24h", label: "24h Price", minWidth: 100, align: "right" },
//   { id: "3d", label: "3 Days Price", minWidth: 100, align: "right" },

//   { id: "24hChange", label: "24h Change (%)", minWidth: 100, align: "right" },
//   { id: "3dChange", label: "3 Days Change (%)", minWidth: 100, align: "right" },
// ];

// interface Data {
//   name: string;
//   price: number;
//   "24h": number;
//   "3d": number;
//   "24hChange": number;
//   "3dChange": number;
// }

// function createData(
//   name: string,
//   price: number,
//   h24: number,
//   h3d: number,

//   h24Change: number,
//   h3dChange: number
// ): Data {
//   return {
//     name,
//     price,
//     "24h": h24,
//     "3d": h3d,

//     "24hChange": h24Change,
//     "3dChange": h3dChange,
//   };
// }

// const CryptoTable = ({
//   selectedCrypto,
//   timePeriod,
// }: {
//   selectedCrypto: string;
//   timePeriod: string;
// }) => {
//   const { data: coinHistory } = useGetCryptoHistoryQuery({
//     coinId: selectedCrypto,
//     timePeriod,
//   });

//   const { data: selectedCryptoData } = useGetCryptoDetailsQuery(
//     selectedCrypto,
//     {
//       skip: !selectedCrypto,
//     }
//   );

//   const [rows, setRows] = React.useState<Data[]>([]);

//   React.useEffect(() => {
//     if (coinHistory?.data?.history && selectedCryptoData?.data?.coin) {
//       // Get the current price of the selected crypto
//       const currentPrice = selectedCryptoData.data.coin.price;

//       // Calculate the price changes for each period
//       const history = coinHistory.data.history;

//       const calculateChange = (period: number) => {
//         const mostRecentPrice = history[history.length - 1].price;
//         const pastPrice = history.find(
//           (entry: any) =>
//             new Date(entry.timestamp * 1000).getTime() <= Date.now() - period
//         )?.price;
//         return mostRecentPrice && pastPrice
//           ? ((mostRecentPrice - pastPrice) / pastPrice) * 100
//           : 0;
//       };

//       const calculatePriceForPeriod = (period: number) => {
//         const pastPrice = history.find(
//           (entry: any) =>
//             new Date(entry.timestamp * 1000).getTime() <= Date.now() - period
//         )?.price;
//         return pastPrice || 0;
//       };

//       // Populate rows with the calculated percentage changes for each period and the price
//       setRows([
//         {
//           name: selectedCryptoData.data.coin.name || "Bitcoin", // Get the crypto name from selectedCryptoData
//           price: currentPrice, // Add the current price here
//           "24h": calculatePriceForPeriod(24 * 60 * 60 * 1000), // 24 hours price
//           "3d": calculatePriceForPeriod(3 * 24 * 60 * 60 * 1000), // 3 days price
//           "24hChange": calculateChange(24 * 60 * 60 * 1000), // 24h change in percentage
//           "3dChange": calculateChange(3 * 24 * 60 * 60 * 1000), // 3 days change in percentage
//         },
//       ]);
//     }
//   }, [coinHistory, selectedCrypto, selectedCryptoData]);

//   return (
//     <Paper sx={{ width: "100%", overflow: "hidden" }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
//                 {columns.map((column) => {
//                   const value = row[column.id];
//                   return (
//                     <TableCell key={column.id} align={column.align}>
//                       {column.format && typeof value === "number"
//                         ? column.format(value)
//                         : value}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// };

// export default CryptoTable;

import * as React from "react";
import {
  useGetCryptoHistoryQuery,
  useGetCryptoDetailsQuery,
} from "../services/cryptoApi"; // assuming you have a query to get historical data
import { MaterialReactTable } from "material-react-table";

import { Box } from "@mui/material";

interface Data {
  name: string;
  price: number;
  "24h": number;
  "3d": number;
  "24hChange": number;
  "3dChange": number;
}

const CryptoTable = ({
  selectedCrypto,
  timePeriod,
}: {
  selectedCrypto: string;
  timePeriod: string;
}) => {
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId: selectedCrypto,
    timePeriod,
  });

  const { data: selectedCryptoData } = useGetCryptoDetailsQuery(
    selectedCrypto,
    {
      skip: !selectedCrypto,
    }
  );

  const [rows, setRows] = React.useState<Data[]>([]);

  React.useEffect(() => {
    if (coinHistory?.data?.history && selectedCryptoData?.data?.coin) {
      // Get the current price of the selected crypto
      const currentPrice = selectedCryptoData.data.coin.price;

      // Calculate the price changes for each period
      const history = coinHistory.data.history;

      const calculateChange = (period: number) => {
        const mostRecentPrice = history[history.length - 1].price;
        const pastPrice = history.find(
          (entry: any) =>
            new Date(entry.timestamp * 1000).getTime() <= Date.now() - period
        )?.price;
        return mostRecentPrice && pastPrice
          ? ((mostRecentPrice - pastPrice) / pastPrice) * 100
          : 0;
      };

      const calculatePriceForPeriod = (period: number) => {
        const pastPrice = history.find(
          (entry: any) =>
            new Date(entry.timestamp * 1000).getTime() <= Date.now() - period
        )?.price;
        return pastPrice || 0;
      };

      // Populate rows with the calculated percentage changes for each period and the price
      setRows([
        {
          name: selectedCryptoData.data.coin.name || "Bitcoin", // Get the crypto name from selectedCryptoData
          price: currentPrice, // Add the current price here
          "24h": calculatePriceForPeriod(24 * 60 * 60 * 1000), // 24 hours price
          "3d": calculatePriceForPeriod(3 * 24 * 60 * 60 * 1000), // 3 days price
          "24hChange": calculateChange(24 * 60 * 60 * 1000), // 24h change in percentage
          "3dChange": calculateChange(3 * 24 * 60 * 60 * 1000), // 3 days change in percentage
        },
      ]);
    }
  }, [coinHistory, selectedCrypto, selectedCryptoData]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "24h",
        header: "24h Price",
      },
      {
        accessorKey: "3d",
        header: "3 Days Price",
      },
      {
        accessorKey: "24hChange",
        header: "24h Change (%)",
      },
      {
        accessorKey: "3dChange",
        header: "3 Days Change (%)",
      },
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <MaterialReactTable
        columns={columns}
        data={rows}
        enableColumnFilters={false}
        enableSorting={true}
        enablePagination={false}
        enableColumnResizing={true}
      />
    </Box>
  );
};

export default CryptoTable;
