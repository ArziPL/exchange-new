// Component with all the content rendered in /account
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useUserStore from "../../stores/useUserStore";

export default function AccountComponent() {
  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const router = useRouter();
  const userData = useUserStore();
  const amountOfPrints = useUserStore((state) => state.prints.length);

  // Change user time period choice of displaying best changes in dashboard based on select change
  const handleChange = (event: SelectChangeEvent) => {
    useUserStore.setState({ menuChoose: event.target.value as string });
    fetch("/api/changeChoice", {
      method: "POST",
      body: JSON.stringify({
        id: userData.id,
        menuChoose: event.target.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => setSnackbarMessage(data))
      .then((data) => setOpen(true));
  };

  // Delete user on button click
  const handleDeleteUser = () => {
    fetch("/api/deleteUser", {
      method: "POST",
      body: JSON.stringify({ id: userData.id }),
    })
      .then((res) => res.json())
      .then((data) => setSnackbarMessage(data))
      .then((data) => setOpen(true))
      .then((data) => {
        setTimeout(() => {
          router.push("/logoff");
        }, 2000);
      });
  };

  // Closing snackbar
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Closing snackbar - jsx
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="w-full h-auto flex mt-[5%] flex-col items-center gap-5">
      <TextField
        className="w-[300px]"
        variant="outlined"
        label="ID"
        value={userData.id}
        inputProps={{ readOnly: true }}
      />
      <TextField
        className="w-[300px]"
        variant="outlined"
        label="Name"
        value={userData.nick}
        inputProps={{ readOnly: true }}
      />
      <TextField
        className="w-[300px]"
        variant="outlined"
        label="E-mail"
        value={userData.email}
        inputProps={{ readOnly: true }}
      />
      <TextField
        className="w-[300px]"
        variant="outlined"
        label="Created at"
        value={userData.createdAt}
        inputProps={{ readOnly: true }}
      />
      <TextField
        className="w-[300px]"
        variant="outlined"
        label="Amount of prints"
        value={amountOfPrints}
        inputProps={{ readOnly: true }}
      />
      <FormLabel id="demo-radio-buttons-group-label">Dashboard time frame choice</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="1h"
        name="radio-buttons-group"
        value={userData.menuChoose}
        onChange={handleChange}
      >
        <FormControlLabel value="1h" control={<Radio />} label="1h" />
        <FormControlLabel value="24h" control={<Radio />} label="24h" />
        <FormControlLabel value="7d" control={<Radio />} label="7d" />
      </RadioGroup>
      <Button variant="contained" color="error" onClick={handleDeleteUser}>
        DELETE ACCOUNT
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={snackbarMessage} action={action} />
    </div>
  );
}
