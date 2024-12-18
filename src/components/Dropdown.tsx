import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface CryptoSelectProps {
  onCryptoChange: (cryptoUuid: string) => void;
  cryptoList: { uuid: string; name: string }[];
}

const CryptoSelect: React.FC<CryptoSelectProps> = ({
  onCryptoChange,
  cryptoList,
}) => {
  const [selectedCrypto, setSelectedCrypto] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setSelectedCrypto(selectedValue);
    onCryptoChange(selectedValue);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="crypto-select-label">Select Crypto</InputLabel>
        <Select
          labelId="crypto-select-label"
          id="crypto-select"
          value={selectedCrypto}
          label="Select Crypto"
          onChange={handleChange}
        >
          {cryptoList.map((coin) => (
            <MenuItem key={coin.uuid} value={coin.uuid}>
              {coin.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CryptoSelect;
