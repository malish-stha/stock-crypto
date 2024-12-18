// import React from "react";
// import CryptoSelect from "./Dropdown";
// import { Button } from "@mui/material";

// type StockCardProps = {
//   symbol: string;
//   name: string;
//   iconUrl: string;
//   lastPrice: string;
//   changePercent: number;
//   volume: string;
//   onCryptoChange: (cryptoUuid: string) => void;
//   cryptoList: { uuid: string; name: string }[];
// };

// const StockCard: React.FC<StockCardProps> = ({
//   symbol,
//   name,
//   iconUrl,
//   lastPrice,
//   changePercent,
//   volume,
//   onCryptoChange,
//   cryptoList,
// }) => {
//   return (
//     <div className="w-full flex items-center justify-between p-4 border rounded-lg shadow-md bg-white">
//       {/* Logo and Symbol */}
//       <div className="flex items-center space-x-3">
//         <div className="flex items-center justify-center w-12 h-12">
//           <img src={iconUrl} alt={name} className="w-12 h-12 rounded-full" />
//         </div>
//         <div>
//           <h1 className="text-gray-900 font-bold text-base">{symbol}</h1>
//         </div>
//       </div>

//       {/* Dropdown */}
//       <div className="border-r-2 pr-4">
//         <CryptoSelect onCryptoChange={onCryptoChange} cryptoList={cryptoList} />
//       </div>

//       {/* Price and Change */}
//       <div className="flex flex-col items-end border-r-2 pr-4">
//         <p
//           className={`text-sm ${
//             changePercent < 0 ? "text-red-500" : "text-green-500"
//           }`}
//         >
//           ${lastPrice}
//         </p>
//         <p>Last market price</p>
//       </div>
//       <div className="flex flex-col items-end border-r-2 pr-4">
//         <p
//           className={`text-sm ${
//             changePercent < 0 ? "text-red-500" : "text-green-500"
//           }`}
//         >
//           {changePercent > 0 ? "+" : ""}
//           {changePercent.toFixed(2)}%
//         </p>
//         <p>Last 24h change</p>
//       </div>

//       {/* Market Details */}
//       <div className="flex flex-col items-end space-y-1">
//         <p className="text-gray-500 text-sm">
//           <span className="text-gray-900 font-semibold">{volume}</span>
//           <p>Market volume</p>
//         </p>
//       </div>
//       <Button variant="contained">Add to watchlist</Button>
//       <h1>Current Signal: Buy</h1>
//     </div>
//   );
// };

// export default StockCard;

import React from "react";
import CryptoSelect from "./Dropdown";
import { Button } from "@mui/material";

type StockCardProps = {
  symbol: string;
  name: string;
  iconUrl: string;
  lastPrice: string;
  changePercent: number;
  volume: string;
  onCryptoChange: (cryptoUuid: string) => void;
  cryptoList: { uuid: string; name: string }[];
};

const StockCard: React.FC<StockCardProps> = ({
  symbol,
  name,
  iconUrl,
  lastPrice,
  changePercent,
  volume,
  onCryptoChange,
  cryptoList,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg shadow-md bg-white">
      {/* Logo and Symbol */}
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <div className="flex items-center justify-center w-12 h-12">
          <img src={iconUrl} alt={name} className="w-12 h-12 rounded-full" />
        </div>
        <div>
          <h1 className="text-gray-900 font-bold text-base">{symbol}</h1>
        </div>
      </div>

      {/* Dropdown */}
      <div className="border-r-0 md:border-r-2 pr-0 md:pr-4 mb-4 md:mb-0">
        <CryptoSelect onCryptoChange={onCryptoChange} cryptoList={cryptoList} />
      </div>

      {/* Price and Change */}
      <div className="flex flex-col items-end border-r-0 md:border-r-2 pr-0 md:pr-4 mb-4 md:mb-0">
        <p
          className={`text-sm ${
            changePercent < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          ${lastPrice}
        </p>
        <p>Last market price</p>
      </div>
      <div className="flex flex-col items-end border-r-0 md:border-r-2 pr-0 md:pr-4 mb-4 md:mb-0">
        <p
          className={`text-sm ${
            changePercent < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {changePercent > 0 ? "+" : ""}
          {changePercent.toFixed(2)}%
        </p>
        <p>Last 24h change</p>
      </div>

      {/* Market Details */}
      <div className="flex flex-col items-end space-y-1 mb-4 md:mb-0">
        <p className="text-gray-500 text-sm">
          <span className="text-gray-900 font-semibold">{volume}</span>
          <p>Market volume</p>
        </p>
      </div>
      <Button variant="contained" className="mb-4 md:mb-0">
        Add to watchlist
      </Button>
      <h1 className="text-center md:text-left">Current Signal: Buy</h1>
    </div>
  );
};

export default StockCard;
