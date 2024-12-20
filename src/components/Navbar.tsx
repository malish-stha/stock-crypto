import { UserRound } from "lucide-react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useState } from "react";
import SignInDialog from "./SignIn";

type Props = {};

const Navbar = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        color: "#000",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          StockCrypto
        </Typography>
        <Button
          variant="contained"
          startIcon={<UserRound />}
          onClick={handleClickOpen}
          sx={{ borderRadius: "10px" }}
        >
          Sign in
        </Button>
        <SignInDialog open={open} onClose={handleClose} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
