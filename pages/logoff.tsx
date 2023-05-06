// Logging off user, user is redirected here when click on logoff button, it was easier to do separate page for that + it shows logoff component while logging off user
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Trademark from "../components/common/Trademark";
import useUserStore from "../stores/useUserStore";

function LogoffPage() {
  const router = useRouter();
  const logoff = useUserStore((state) => state.logoff);
  useEffect(() => {
    logoff();
    router.push("dashboard");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-200 absolute left-0 top-0 flex flex-col justify-center items-center">
      <Trademark />
      <div>We are logging you out now, please wait!</div>
      <CircularProgress />
    </div>
  );
}

export default LogoffPage;
