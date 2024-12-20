import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "S4ZDNSWQXJ0TDAGK";

const baseUrl = "https://www.alphavantage.co/query";

const createRequest = (url: string) => ({
  url,
  params: { apikey: API_KEY },
});

export const stocksApi = createApi({
  reducerPath: "stocksApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStocksList: builder.query({
      query: (symbols: string[]) => {
        const symbolString = symbols.join(",");
        return createRequest(
          `?function=BATCH_STOCK_QUOTES&symbols=${symbolString}`
        );
      },
    }),

    // Fetch stock data by symbol
    getStockData: builder.query({
      query: (symbol: string) =>
        createRequest(
          `?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact`
        ),
    }),
  }),
});

export const { useGetStocksListQuery, useGetStockDataQuery } = stocksApi;
