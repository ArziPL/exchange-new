// Displayed if user has no prints
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

export default function PrintsEmpty() {
  return (
    <div className="w-full h-full flex flex-col mt-[10%] items-center gap-5">
      <SentimentDissatisfiedIcon className="w-[100px] h-[100px]" />
      <div className="text-xl">You don&apos;t have any prints yet, go get some!</div>
    </div>
  );
}
