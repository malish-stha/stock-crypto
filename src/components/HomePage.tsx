import { useState } from "react";
import StockTab from "./StockTab";
import CryptoTab from "./CryptoTab";
import CryptoTabs from "./CryptoTabTrading";

type Props = {};

const Tabs = (props: Props) => {
  const [activeTab, setActiveTab] = useState("stock");

  return (
    <div className="w-full h-screen">
      {/* Tabs Navigation */}
      <div className="flex items-center space-x-4 border-b border-gray-200 px-4">
        <button
          className={`px-4 py-2 text-center text-lg font-medium transition-colors ${
            activeTab === "stock"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("stock")}
        >
          Stock
        </button>

        <button
          className={`px-4 py-2 text-center text-lg font-medium transition-colors ${
            activeTab === "crypto"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("crypto")}
        >
          Crypto
        </button>
      </div>

      {/* Tab Content */}
      <div className="h-full overflow-auto p-6">
        {activeTab === "stock" && <StockTab />}
        {activeTab === "crypto" && <CryptoTabs />}
      </div>
    </div>
  );
};

export default Tabs;
