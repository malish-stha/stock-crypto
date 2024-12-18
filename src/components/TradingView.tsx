import React, { useEffect, useRef, memo } from "react";

// Type for the ref to make TypeScript aware of its type
const TradingViewWidget: React.FC = () => {
  // Ref to the container div
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current) {
      // Clear the previous content of the container to avoid multiple charts
      container.current.innerHTML = "";

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "width": "1000",
          "height": "500",
          "symbol": "BITSTAMP:BTCUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "gridColor": "rgba(0, 0, 0, 0.06)",
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": false,
          "save_image": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;

      // Append the script to the container
      container.current.appendChild(script);
    }

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (container.current) {
        container.current.innerHTML = ""; // This clears the widget when unmounted
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
