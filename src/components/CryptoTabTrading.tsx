import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptosQuery,
} from "../services/cryptoApi";
import StockCard from "./Cryptocard";
import CryptoTable from "./TableData";
import TradingView from "./TradingView";
import forecastImage from "../assets/forecast.png";

const CryptoTabs: React.FC = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data: cryptoList, isFetching, error } = useGetCryptosQuery({});
  const [selectedCrypto, setSelectedCrypto] = useState<string>(
    coinId || "Qwsogvtv82FCd"
  ); // Default to Bitcoin (BTC)

  // Effect to update `selectedCrypto` if `coinId` changes
  useEffect(() => {
    if (coinId) {
      setSelectedCrypto(coinId);
    }
  }, [coinId]);

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

  if (isFetching || isFetchingCryptoData) return <CircularProgress />;
  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error: Unable to fetch data</div>;
  }

  const tradingViewSymbol = `${
    selectedCryptoData?.data?.coin?.exchange || "BITSTAMP"
  }:${selectedCryptoData?.data?.coin?.symbol || "BTC"}USD`;

  return (
    <>
      <div className="py-4">
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
      </div>
      <div className="flex flex-col md:flex-row space-x-8 py-4">
        <div className="flex-1">
          <TradingView symbol={tradingViewSymbol} />
        </div>
        <div className="flex-1">
          <img src={forecastImage} alt="Forecast" className="w-full h-auto" />
        </div>
      </div>
      <div>
        <CryptoTable selectedCrypto={selectedCrypto} timePeriod={timePeriod} />
      </div>
    </>
  );
};

export default CryptoTabs;
