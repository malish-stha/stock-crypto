import { UserRound } from "lucide-react";
import Button from "@mui/material/Button";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav>
      <div className="container mx-auto py-4 flex items-center justify-end">
        <Button
          variant="contained"
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
          sx={{ borderRadius: "10px" }}
        >
          <UserRound />
          Sign in
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
