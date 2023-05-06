// Error component showed if user visit market/news without visiting dashboard before, showin that data was not loaded
import ErrorIcon from "@mui/icons-material/Error";

export default function ErrorData() {
  return (
    <div className="w-full h-full flex flex-col mt-[10%] items-center gap-5 p-10">
      <ErrorIcon className="w-[100px] h-[100px]" />
      <div className="text-xl">Data that was supposed to be on this page has not been loaded</div>
      <div>
        <b>Potential fix {`=>`} try to visit Dashboard and then comeback! There is a chance it will work!</b>
      </div>
    </div>
  );
}
