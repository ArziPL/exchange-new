// Right side of top bar with Search/Settings/Login buttons and logic behind logging in/out
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Dialog, Snackbar, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useUserStore from "../../stores/useUserStore";
import { UserLoginInput } from "../../types/types";
import Trademark from "../common/Trademark";
import Search from "./Search";

export default function UserNav() {
  const router = useRouter();
  // State for every user input
  const [userInputs, setUserInputs] = useState<UserLoginInput>({
    loginEmail: "",
    loginPassword: "",
    loginResponse: "",
    registerNick: "",
    registerEmail: "",
    registerPassword: "",
    registerResponse: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openMenu, setMenuOpen] = React.useState(false);
  const isLogged = useUserStore((state) => state.isLogged);
  const login = useUserStore((state) => state.login);

  // LOGIN/LOGOFF BUTTON HANDLING + INPUT STATE HANDLING
  // Handle button login/logut click
  const handleLoginButtonClick = () => {
    if (isLogged) {
      router.replace("/logoff");
    } else {
      handleMenuOpen();
    }
  };
  // Handle open of login panel on button click
  const handleMenuOpen = () => {
    setMenuOpen(true);
    setUserInputs({
      loginEmail: "",
      loginPassword: "",
      loginResponse: "",
      registerNick: "",
      registerEmail: "",
      registerPassword: "",
      registerResponse: "",
    });
  };
  // Function to handle/set state for every input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInputs((values) => ({ ...values, [name]: value }));
  };

  // HANDLING USER LOGIN/REGISTER INSIDE MUI DIALOG
  // Handle login on click and all things after
  const handleMenuLogin = () => {
    fetch("/api/loginUser", {
      method: "POST",
      body: JSON.stringify({ email: userInputs.loginEmail, password: userInputs.loginPassword }),
    })
      .then((res) => {
        res.status === 200 ? setMenuOpen(false) : setMenuOpen(true);
        return res.json();
      })
      .then((data) => {
        setUserInputs((values) => ({ ...values, loginEmail: "", loginPassword: "" }));
        setSnackbarMessage(data.message);
        setOpenSnackbar(true);
        if (data.status === 200) {
          login({
            id: data.user.id,
            nick: data.user.nick,
            email: data.user.email,
            createdAt: data.user.createdAt,
            menuChoose: data.user.menuChoose,
            prints: data.prints,
          });
        }
      });
  };
  // Handle register on click and all things after
  const handleMenuRegister = () => {
    fetch("/api/registerUser", {
      method: "POST",
      body: JSON.stringify({
        nick: userInputs.registerNick,
        email: userInputs.registerEmail,
        password: userInputs.registerPassword,
        menuChoose: "1h",
      }),
    })
      .then((res) => {
        res.status === 200 ? setMenuOpen(false) : setMenuOpen(true);
        return res.json();
      })
      .then((data) => {
        setUserInputs((values) => ({ ...values, registerNick: "", registerEmail: "", registerPassword: "" }));
        setSnackbarMessage(data.message);
        setOpenSnackbar(true);
      });
  };

  // HANDLING ALL MUI OPENS/CLOSES, ACTIONS TO SNACKBAR/DIALOGS
  // Handle close of login panel
  const handleMenuClose = () => {
    setMenuOpen(false);
    setUserInputs((values) => ({ ...values, loginResponse: "", registerResponse: "" }));
  };
  // Snackbar open when user not logged/click on account
  const handleSnackbarOpen = () => {
    if (isLogged) {
      router.push("account");
    } else {
      setSnackbarMessage("Log in first to open the settings");
      setOpenSnackbar(true);
    }
  };
  // Snackbar closing
  const handleSnackbarClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  // Snackbar closing - jsx
  const action = (
    <React.Fragment>
      <IconButton size="small" onClick={handleSnackbarClose} aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="w-[60%] h-full flex justify-end items-center gap-4 lg:gap-0">
      {/* Search icon with all logic */}
      <Search />

      {/* Settings icon */}
      <IconButton size="medium" edge="start" color="inherit" aria-label="menu" onClick={handleSnackbarOpen}>
        <SettingsIcon fontSize="medium" color="disabled" />
      </IconButton>

      {/* Login button */}
      <Button
        variant="contained"
        className="w-[150px] h-[40px] mr-4 lg:w-auto lg:h-auto"
        onClick={handleLoginButtonClick}
      >
        {isLogged ? (
          <>
            <LogoutIcon className="mr-2 lg:hidden" />
            Log out
          </>
        ) : (
          <>
            <LoginIcon className="mr-2 lg:hidden" />
            Log in
          </>
        )}
      </Button>

      {/* Snackbar on settings click if not logged */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={action}
      />

      {loginDialog()}
    </div>
  );

  // Login dialog after clicking LOGIN button
  function loginDialog() {
    return (
      <Dialog
        open={openMenu}
        onClose={handleMenuClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <div className="flex flex-col w-[1000px] h-[600px] xl:w-[350px] sm:w-[250px] overflow-hidden xl:overflow-auto">
          {/* Trademark  */}
          <div className="w-full h-[30%] flex justify-center items-center sm:hidden">
            <Trademark />
          </div>
          <div className="flex w-full h-[70%] xl:flex-col xl:gap-5">
            {/* Login container */}
            <div className="w-1/2 h-full flex flex-col justify-start items-center gap-6 mt-5 xl:w-full xl:gap-10">
              <div className="font-semibold text-2xl xl:text-lg">Welcom again !</div>
              <TextField
                value={userInputs.loginEmail}
                name="loginEmail"
                onChange={handleInputChange}
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                type="email"
                className="xl:w-[180px] xl:h-[30px]"
              />
              <TextField
                value={userInputs.loginPassword}
                name="loginPassword"
                onChange={handleInputChange}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                className="xl:w-[180px] xl:h-[30px]"
              />
              <Button type="submit" variant="contained" onClick={handleMenuLogin}>
                Log in
              </Button>
              <div className="text-sm mb-5">{userInputs.loginResponse}</div>
            </div>
            {/* Horizontal line */}
            <div className="border-[0.5px] border-solid border-slate-200 h-[90%] sm:hidden"></div>
            {/* Register container */}
            <div className="w-1/2 h-full flex flex-col justify-start items-center gap-6 xl:w-full xl:justify-center">
              <div className="font-semibold text-2xl xl:text-lg lg:text-sm">Never made good money before ?</div>
              <TextField
                value={userInputs.registerNick}
                name="registerNick"
                onChange={handleInputChange}
                id="outlined-basic"
                label="Nick"
                variant="outlined"
                type="email"
              />
              <TextField
                value={userInputs.registerEmail}
                name="registerEmail"
                onChange={handleInputChange}
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                type="email"
              />
              <TextField
                value={userInputs.registerPassword}
                name="registerPassword"
                onChange={handleInputChange}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
              />
              <Button type="submit" variant="contained" onClick={handleMenuRegister}>
                Register
              </Button>
              <div className="text-sm mb-5">{userInputs.registerResponse}</div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
