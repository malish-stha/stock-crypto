import * as React from "react";
import {
  useGetCryptoHistoryQuery,
  useGetCryptoDetailsQuery,
} from "../services/cryptoApi";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";

interface Data {
  date: string;
  name: string;
  price: number;
  signal: string;
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
      const currentPrice = selectedCryptoData.data.coin.price;
      const history = coinHistory.data.history;

      // Helper function to calculate price changes
      const calculateChange = (mostRecentPrice: number, pastPrice: number) =>
        mostRecentPrice && pastPrice
          ? ((mostRecentPrice - pastPrice) / pastPrice) * 100
          : 0;

      // Filter for today's data
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      ).getTime(); // Start of today
      const endOfDay = startOfDay + 24 * 60 * 60 * 1000; // End of today

      const todayEntry = history.find(
        (entry: any) =>
          entry.timestamp * 1000 >= startOfDay &&
          entry.timestamp * 1000 < endOfDay
      );

      if (todayEntry) {
        const signal = "Buy";

        // Calculate past prices for 24h and 3d
        const price24hAgo =
          history.find(
            (e: any) =>
              new Date(e.timestamp * 1000).getTime() <=
              Date.now() - 24 * 60 * 60 * 1000
          )?.price || 0;

        const price3dAgo =
          history.find(
            (e: any) =>
              new Date(e.timestamp * 1000).getTime() <=
              Date.now() - 3 * 24 * 60 * 60 * 1000
          )?.price || 0;

        // Create the row
        setRows([
          {
            date: new Date(todayEntry.timestamp * 1000).toLocaleDateString(),
            name: selectedCryptoData.data.coin.name || "Bitcoin",
            price: todayEntry.price,
            signal,
            "24h": price24hAgo,
            "3d": price3dAgo,
            "24hChange": calculateChange(todayEntry.price, price24hAgo),
            "3dChange": calculateChange(todayEntry.price, price3dAgo),
          },
        ]);
      }
    }
  }, [coinHistory, selectedCrypto, selectedCryptoData]);

  const columns = React.useMemo(
    () => [
      { accessorKey: "date", header: "Date" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "signal", header: "Signal" },
      { accessorKey: "24h", header: "24h Price" },
      { accessorKey: "3d", header: "3 Days Price" },
      { accessorKey: "24hChange", header: "24h Change (%)" },
      { accessorKey: "3dChange", header: "3 Days Change (%)" },
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
        enablePagination={true}
        enableColumnResizing={true}
      />
    </Box>
  );
};

export default CryptoTable;
