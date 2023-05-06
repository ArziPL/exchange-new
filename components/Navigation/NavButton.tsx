// Every button in side nav
import Link from "next/link";
import { useRouter } from "next/router";

type NavButton = {
  children?: any;
  title: string;
};

export default function NavButton(props: NavButton) {
  const router = useRouter();

  // Border left on button of current rendered page
  const handleCurrentButton = () => {
    if (`/${props.title.toLowerCase()}` == router.pathname) {
      return " border-l-[4px]";
    } else {
      return "";
    }
  };

  return (
    <Link href={{ pathname: "/" + props.title.toLowerCase() }}>
      <div
        className={
          "w-full h-[40px]  flex justify-start items-center gap-3 pl-4 cursor-pointer border-0 border-solid border-sky-500 hover:bg-slate-200" +
          handleCurrentButton()
        }
      >
        {props.children}
        <div className={"text-xl"}>{props.title}</div>
      </div>
    </Link>
  );
}
