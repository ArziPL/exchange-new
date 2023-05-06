// Every bar with data on right side of /asset/...
type RawBar = {
  children?: any;
  title: string;
};

export default function RawBar(props: RawBar) {
  return (
    <div className="w-full h-[35px] text-lg hover:bg-slate-200 flex items-center p-2 xl:text-sm">
      {/* What data is displayed */}
      {props.title}&nbsp;
      <b>
        {/* If data exists, display it here */}
        {typeof props.children !== "undefined" && typeof props.children !== null ? props.children : "Not available"}
      </b>
    </div>
  );
}
