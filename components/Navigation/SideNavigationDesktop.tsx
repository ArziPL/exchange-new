// Side navigation while in desktop fixed on every page
import CopyrightIcon from "@mui/icons-material/Copyright";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from "@mui/icons-material/Store";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import useUserStore from "../../stores/useUserStore";
import Trademark from "../common/Trademark";
import NavButton from "./NavButton";

export default function SideNavigationDesktop() {
  const [openPopup, setOpenPopup] = useState(false);
  const isLogged = useUserStore((state) => state.isLogged);

  // Handle copyright dialog popup
  const handleClickOpenPopup = () => {
    setOpenPopup(true);
  };

  // Handle copyright dialog close
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    // Side nav
    <div className="w-[300px] h-screen flex flex-col items-start fixed left-0">
      {/* Exchange trademark */}
      <Trademark className="ml-4" />
      {/* Wrapper for all buttons */}
      <div className="mt-12 flex flex-col h-full gap-2">
        <NavButton title="Dashboard">
          <DashboardIcon fontSize="medium" />
        </NavButton>
        <NavButton title="Market">
          <StoreIcon fontSize="medium" />
        </NavButton>
        <NavButton title="News">
          <NewspaperIcon fontSize="medium" />
        </NavButton>
        {/* Divider */}
        {isLogged ? (
          <>
            <div className="ml-4 mt-10 text-slate-400 tracking-wider text-sm">PROFILE</div>
            <NavButton title="Prints">
              <FolderIcon fontSize="medium" />
            </NavButton>
            <NavButton title="Account">
              <SettingsIcon fontSize="medium" />
            </NavButton>
          </>
        ) : (
          <></>
        )}

        {/* Copyright button at the end */}
        <div
          className="w-[300px] h-[40px] flex justify-start items-center gap-3 pl-4 cursor-pointer border-0 border-solid border-sky-500 hover:bg-slate-200 mt-auto"
          onClick={handleClickOpenPopup}
        >
          <CopyrightIcon fontSize="medium" />
          <div className="text-xl">Copyright</div>
        </div>

        {/* Dialog with copyrights */}
        {CopyrightDialog()}
      </div>
    </div>
  );

  // Dialog with copyrights extracted for better readability
  function CopyrightDialog() {
    return (
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Copyright</DialogTitle>
        <DialogContent>
          <DialogContentText>
            - Site design inpired by{" "}
            <a
              href="https://dribbble.com/shots/17121221-NFT-Marketplace-Web-App"
              target="_blank"
              rel="noreferrer"
              className="text-black"
            >
              Barly Vallendito
            </a>{" "}
            from{" "}
            <a href="https://dribbble.com/" className="text-black" target="_blank" rel="noreferrer">
              Dribble
            </a>
          </DialogContentText>
          <DialogContentText>
            - Site design inpired by{" "}
            <a
              href="https://dribbble.com/shots/16043502-Xtrades-Alert-Page/attachments/7887690?mode=media"
              target="_blank"
              rel="noreferrer"
              className="text-black"
            >
              Clint Kadera
            </a>{" "}
            from{" "}
            <a href="https://dribbble.com/" target="_blank" rel="noreferrer" className="text-black">
              Dribble
            </a>
          </DialogContentText>
          <DialogContentText>
            - Exchange logo by{" "}
            <a
              href="https://unsplash.com/@peiobty?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              target="_blank"
              rel="noreferrer"
              className="text-black"
            >
              Pierre Borthiry
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com/s/photos/trading?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
              target="_blank"
              rel="noreferrer"
              className="text-black"
            >
              Unsplash
            </a>
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClosePopup} className="mt-8">
              Great !
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}
