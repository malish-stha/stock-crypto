// import React, { useState, useEffect } from "react";
// import StockCard from "./Cryptocard";
// import {
//   useGetCryptosQuery,
//   useGetCryptoHistoryQuery,
//   useGetCryptoDetailsQuery,
// } from "../services/cryptoApi";
// import { CircularProgress } from "@mui/material";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { useParams } from "react-router-dom";

// // Register chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const CryptoTab: React.FC = () => {
//   const { coinId } = useParams();
//   const [timePeriod, setTimePeriod] = useState("7d");
//   const { data: cryptoList, isFetching, error } = useGetCryptosQuery({});
//   const [selectedCrypto, setSelectedCrypto] = useState<string>(coinId || "");

//   const { data: coinHistory } = useGetCryptoHistoryQuery({
//     coinId: selectedCrypto,
//     timePeriod,
//   });

//   const { data: selectedCryptoData, isFetching: isFetchingCryptoData } =
//     useGetCryptoDetailsQuery(selectedCrypto, {
//       skip: !selectedCrypto,
//     });

//   const handleCryptoChange = (cryptoUuid: string) => {
//     setSelectedCrypto(cryptoUuid);
//   };

//   const handleTimePeriodChange = (period: string) => {
//     setTimePeriod(period);
//   };

//   if (isFetching || isFetchingCryptoData) return <CircularProgress />;
//   if (error) {
//     console.error("Error fetching data:", error);
//     return <div>Error: </div>;
//   }

//   // Prepare data for the line chart
//   const chartData = coinHistory?.data
//     ? {
//         labels: coinHistory.data.history
//           .map((entry: any) =>
//             new Date(entry.timestamp * 1000).toLocaleDateString()
//           )
//           .reverse(), // Reverse the dates
//         datasets: [
//           {
//             label: "Price",
//             data: coinHistory.data.history
//               .map((entry: any) => entry.price)
//               .reverse(), // Reverse the data values to match the reversed dates
//             borderColor: "rgba(75, 192, 192, 1)",
//             backgroundColor: "rgba(75, 192, 192, 0.2)",
//             fill: true,
//             tension: 0.4,
//           },
//         ],
//       }
//     : null;

//   return (
//     <>
//       <div>
//         <StockCard
//           symbol={selectedCryptoData?.data?.coin?.symbol || "BTC"}
//           name={selectedCryptoData?.data?.coin?.name || "Bitcoin"}
//           iconUrl={
//             selectedCryptoData?.data?.coin?.iconUrl ||
//             "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
//           }
//           lastPrice={selectedCryptoData?.data?.coin?.price || "0"}
//           changePercent={parseFloat(
//             selectedCryptoData?.data?.coin?.change || "0"
//           )}
//           volume={selectedCryptoData?.data?.coin?.["24hVolume"] || "0"}
//           onCryptoChange={handleCryptoChange}
//           cryptoList={cryptoList?.data?.coins || []}
//         />
//         <div className="mt-6 flex items-center px-14">
//           <select
//             onChange={(e) => handleTimePeriodChange(e.target.value)}
//             value={timePeriod}
//           >
//             <option value="7d">7 Days</option>
//             <option value="30d">30 Days</option>
//             <option value="1y">1 Year</option>
//           </select>
//         </div>

//         {chartData && <Line data={chartData} />}
//       </div>
//     </>
//   );
// };

// export default CryptoTab;

// import React, { useState, useEffect } from "react";
// import StockCard from "./Cryptocard";
// import {
//   useGetCryptosQuery,
//   useGetCryptoHistoryQuery,
//   useGetCryptoDetailsQuery,
// } from "../services/cryptoApi";
// import { CircularProgress } from "@mui/material";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { useParams } from "react-router-dom";

// // Register chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const CryptoTab: React.FC = () => {
//   const { coinId } = useParams();
//   const [timePeriod, setTimePeriod] = useState("7d");
//   const { data: cryptoList, isFetching, error } = useGetCryptosQuery({});
//   const [selectedCrypto, setSelectedCrypto] = useState<string>(coinId || "");

//   const { data: coinHistory } = useGetCryptoHistoryQuery({
//     coinId: selectedCrypto,
//     timePeriod,
//   });

//   const { data: selectedCryptoData, isFetching: isFetchingCryptoData } =
//     useGetCryptoDetailsQuery(selectedCrypto, {
//       skip: !selectedCrypto,
//     });

//   const handleCryptoChange = (cryptoUuid: string) => {
//     setSelectedCrypto(cryptoUuid);
//   };

//   const handleTimePeriodChange = (period: string) => {
//     setTimePeriod(period);
//   };

//   if (isFetching || isFetchingCryptoData) return <CircularProgress />;
//   if (error) {
//     console.error("Error fetching data:", error);
//     return <div>Error: </div>;
//   }

//   // Prepare data for the line chart
//   const chartData = coinHistory?.data
//     ? {
//         labels: coinHistory.data.history
//           .map((entry: any) =>
//             new Date(entry.timestamp * 1000).toLocaleDateString()
//           )
//           .reverse(), // Reverse the dates
//         datasets: [
//           {
//             label: "Price",
//             data: coinHistory.data.history
//               .map((entry: any) => entry.price)
//               .reverse(), // Reverse the data values to match the reversed dates
//             borderColor: "rgba(75, 192, 192, 1)",
//             backgroundColor: "rgba(75, 192, 192, 0.2)",
//             fill: true,
//             tension: 0.4,
//           },
//         ],
//       }
//     : null;

//   return (
//     <>
//       <div className="overflow-hidden">
//         {" "}
//         {/* Prevent overflow here */}
//         <StockCard
//           symbol={selectedCryptoData?.data?.coin?.symbol || "BTC"}
//           name={selectedCryptoData?.data?.coin?.name || "Bitcoin"}
//           iconUrl={
//             selectedCryptoData?.data?.coin?.iconUrl ||
//             "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
//           }
//           lastPrice={selectedCryptoData?.data?.coin?.price || "0"}
//           changePercent={parseFloat(
//             selectedCryptoData?.data?.coin?.change || "0"
//           )}
//           volume={selectedCryptoData?.data?.coin?.["24hVolume"] || "0"}
//           onCryptoChange={handleCryptoChange}
//           cryptoList={cryptoList?.data?.coins || []}
//         />
//         <div className="mt-6 flex items-center px-14 overflow-hidden">
//           {" "}
//           {/* Prevent overflow here */}
//           <select
//             onChange={(e) => handleTimePeriodChange(e.target.value)}
//             value={timePeriod}
//           >
//             <option value="7d">7 Days</option>
//             <option value="30d">30 Days</option>
//             <option value="1y">1 Year</option>
//           </select>
//         </div>
//         {chartData && (
//           <div style={{ width: "100%", height: "400px" }}>
//             {" "}
//             {/* Set a fixed height */}
//             <Line data={chartData} options={{ maintainAspectRatio: true }} />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CryptoTab;

// import React, { useState, useEffect } from "react";
// import StockCard from "./Cryptocard";
// import {
//   useGetCryptosQuery,
//   useGetCryptoHistoryQuery,
//   useGetCryptoDetailsQuery,
// } from "../services/cryptoApi";
// import { CircularProgress } from "@mui/material";

// import { useParams } from "react-router-dom";
// import ChartComponent from "./ChartComponent";
// import CryptoTable from "./TableData";

// const CryptoTab: React.FC = () => {
//   const { coinId } = useParams();
//   const [timePeriod, setTimePeriod] = useState("7d");
//   const { data: cryptoList, isFetching, error } = useGetCryptosQuery({});
//   const [selectedCrypto, setSelectedCrypto] = useState<string>(coinId || "");

//   const { data: coinHistory } = useGetCryptoHistoryQuery({
//     coinId: selectedCrypto,
//     timePeriod,
//   });

//   const { data: selectedCryptoData, isFetching: isFetchingCryptoData } =
//     useGetCryptoDetailsQuery(selectedCrypto, {
//       skip: !selectedCrypto,
//     });

//   const handleCryptoChange = (cryptoUuid: string) => {
//     setSelectedCrypto(cryptoUuid);
//   };

//   const handleTimePeriodChange = (period: string) => {
//     setTimePeriod(period);
//   };

//   if (isFetching || isFetchingCryptoData) return <CircularProgress />;
//   if (error) {
//     console.error("Error fetching data:", error);
//     return <div>Error: </div>;
//   }

//   // Prepare data for the line chart
//   const chartData = coinHistory?.data
//     ? {
//         labels: coinHistory.data.history
//           .map((entry: any) =>
//             new Date(entry.timestamp * 1000).toLocaleDateString()
//           )
//           .reverse(), // Reverse the dates
//         datasets: [
//           {
//             label: "Price",
//             data: coinHistory.data.history
//               .map((entry: any) => entry.price)
//               .reverse(), // Reverse the data values to match the reversed dates
//             borderColor: "rgba(75, 192, 192, 1)",
//             backgroundColor: "rgba(75, 192, 192, 0.2)",
//             fill: true,
//             tension: 0.4,
//           },
//         ],
//       }
//     : null;

//   return (
//     <>
//       <div className="overflow-hidden">
//         <StockCard
//           symbol={selectedCryptoData?.data?.coin?.symbol || "BTC"}
//           name={selectedCryptoData?.data?.coin?.name || "Bitcoin"}
//           iconUrl={
//             selectedCryptoData?.data?.coin?.iconUrl ||
//             "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
//           }
//           lastPrice={selectedCryptoData?.data?.coin?.price || "0"}
//           changePercent={parseFloat(
//             selectedCryptoData?.data?.coin?.change || "0"
//           )}
//           volume={selectedCryptoData?.data?.coin?.["24hVolume"] || "0"}
//           onCryptoChange={handleCryptoChange}
//           cryptoList={cryptoList?.data?.coins || []}
//         />
//         <div className="mt-6 flex items-center px-14 overflow-hidden">
//           <select
//             onChange={(e) => handleTimePeriodChange(e.target.value)}
//             value={timePeriod}
//           >
//             <option value="7d">7 Days</option>
//             <option value="30d">30 Days</option>
//             <option value="1y">1 Year</option>
//           </select>
//         </div>
//         {chartData && <ChartComponent chartData={chartData} />}{" "}
//       </div>
//       <div>
//         <CryptoTable />
//       </div>
//     </>
//   );
// };

// export default CryptoTab;

import React, { useState } from "react";
import StockCard from "./Cryptocard";
import {
  useGetCryptosQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoDetailsQuery,
} from "../services/cryptoApi";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import ChartComponent from "./ChartComponent";
import CryptoTable from "./TableData";
import TradingView from "./TradingView";

const CryptoTab: React.FC = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data: cryptoList, isFetching, error } = useGetCryptosQuery({});
  const [selectedCrypto, setSelectedCrypto] = useState<string>(coinId || "");

  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId: selectedCrypto,
    timePeriod,
  });

  const { data: selectedCryptoData, isFetching: isFetchingCryptoData } =
    useGetCryptoDetailsQuery(selectedCrypto, {
      skip: !selectedCrypto,
    });

  const handleCryptoChange = (cryptoUuid: string) => {
    setSelectedCrypto(cryptoUuid);
  };

  const handleTimePeriodChange = (period: string) => {
    setTimePeriod(period);
  };

  if (isFetching || isFetchingCryptoData) return <CircularProgress />;
  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error: </div>;
  }

  // Prepare data for the line chart
  const chartData = coinHistory?.data
    ? {
        labels: coinHistory.data.history
          .map((entry: any) =>
            new Date(entry.timestamp * 1000).toLocaleDateString()
          )
          .reverse(), // Reverse the dates
        datasets: [
          {
            label: "Price",
            data: coinHistory.data.history
              .map((entry: any) => entry.price)
              .reverse(), // Reverse the data values to match the reversed dates
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      }
    : null;

  return (
    <>
      <div className="overflow-hidden">
        <StockCard
          symbol={selectedCryptoData?.data?.coin?.symbol || "BTC"}
          name={selectedCryptoData?.data?.coin?.name || "Bitcoin"}
          iconUrl={
            selectedCryptoData?.data?.coin?.iconUrl ||
            "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
          }
          lastPrice={selectedCryptoData?.data?.coin?.price || "0"}
          changePercent={parseFloat(
            selectedCryptoData?.data?.coin?.change || "0"
          )}
          volume={selectedCryptoData?.data?.coin?.["24hVolume"] || "0"}
          onCryptoChange={handleCryptoChange}
          cryptoList={cryptoList?.data?.coins || []}
        />
        <div className="mt-6 flex items-center px-14 overflow-hidden">
          <select
            onChange={(e) => handleTimePeriodChange(e.target.value)}
            value={timePeriod}
          >
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="1y">1 Year</option>
          </select>
        </div>
        {chartData && <ChartComponent chartData={chartData} />}
      </div>

      <div>
        <CryptoTable selectedCrypto={selectedCrypto} timePeriod={timePeriod} />
      </div>
    </>
  );
};

export default CryptoTab;
