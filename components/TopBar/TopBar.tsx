// Top bar on top of every component (under nav bar in mobile screen)
import { useRouter } from "next/router";
import UserNav from "./UserNav";

export default function TopBar() {
  const router = useRouter();
  
  // Generate dynamic nav title based on url (asPath)
  const generateNavTitle = () => {
    if (router.asPath.substring(0, 6) == "/asset") {
      return router.asPath.substring(7).toUpperCase();
    } else if (router.asPath.substring(0, 8) == "/article") {
      return "Article";
    } else {
      return router.asPath.substring(1);
    }
  };

  return (
    <div className="w-[100%] h-[100px] bg-slate-200 flex justify-center items-center shadow-lg">
      {/* Nav title */}
      <div className="w-[40%] h-[100%] flex justify-start items-center pl-7 text-4xl capitalize font-semibold lg:text-xl">
        {generateNavTitle()}
      </div>
      {/* Right side of nav */}
      <UserNav />
    </div>
  );
}
