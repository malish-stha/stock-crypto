import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface SignInDialogProps {
  open: boolean;
  onClose: () => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({ open, onClose }) => {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      const tokenResponse = await axios.get(
        `http://localhost:8080/auth/google/callback?code=${codeResponse.code}`
      );
      console.log("tokenResponse", tokenResponse);
    },
    flow: "auth-code",
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Sign in</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your sign-in details.
        </DialogContentText>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Sign in
        </Button>
      </DialogActions>
      <div className="flex justify-center p-4">
        <Button variant="contained" onClick={() => login()}>
          Signin with Google
        </Button>
      </div>
    </Dialog>
  );
};

export default SignInDialog;
