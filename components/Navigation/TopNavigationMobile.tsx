// Top navigation (above top bar with login button) while in mobile fixed on every page
import CopyrightIcon from "@mui/icons-material/Copyright";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import MenuIcon from "@mui/icons-material/Menu";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from "@mui/icons-material/Store";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useUserStore from "../../stores/useUserStore";

export default function TopNavigationMobile() {
  const [openPopup, setOpenPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isLogged = useUserStore((state) => state.isLogged);
  const openMenu = Boolean(anchorEl);

  // Handle nav menu open
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle nav menu close
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Handle copyright dialog popup
  const handleClickOpenPopup = () => {
    setOpenPopup(true);
  };

  // Handle copyright dialog close
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <div>
      {/* App bar */}
      <AppBar className="w-full h-[100px] bg-white flex flex-row justify-between items-center gap-5 pl-10 pr-10">
        {/* Exchange img */}
        <Image src="/static/exchange.png" width={64} height={64} alt="exchange logo" />
        {/* Wrapper for buttons */}
        <div className="mt-4">
          {/* Button for triggering menu */}
          <IconButton
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleClickMenu}
          >
            <MenuIcon fontSize="large"></MenuIcon>
          </IconButton>

          {/* Menu */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            className="w-[170px]"
          >
            {/* Every sepparate link in menu */}
            <Link href="/dashboard">
              <MenuItem onClick={handleCloseMenu}>
                <DashboardIcon />
                Dashboard
              </MenuItem>
            </Link>
            <Link href="/market">
              <MenuItem onClick={handleCloseMenu}>
                <StoreIcon />
                Market
              </MenuItem>
            </Link>
            <Link href="/news">
              <MenuItem onClick={handleCloseMenu}>
                <NewspaperIcon />
                News
              </MenuItem>
            </Link>
            {isLogged ? (
              <>
                <Link href="/prints">
                  <MenuItem onClick={handleCloseMenu}>
                    <FolderIcon />
                    Prints
                  </MenuItem>
                </Link>
                <Link href="/account">
                  <MenuItem onClick={handleCloseMenu}>
                    <SettingsIcon />
                    Account
                  </MenuItem>
                </Link>
              </>
            ) : (
              <></>
            )}
            <MenuItem onClick={handleClickOpenPopup}>
              <CopyrightIcon />
              Copyright
            </MenuItem>

            {/* Dialog with copyrights */}
            {CopyrightDialog()}
          </Menu>
        </div>
      </AppBar>
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
