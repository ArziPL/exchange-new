// Page container for every sepearate content on every page, title with possible tooltip and place for childrens
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";

type PageContent = {
  children?: any;
  title: string;
  tooltip: "" | string;
};
export default function PageContent(props: PageContent) {
  // Mui tooltip styling
  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  // Generate tooltip
  const generateHoverHelp = () => {
    if (props.tooltip != "") {
      return (
        <>
          <IconButton size="small" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            {" "}
            <BootstrapTooltip title={props.tooltip}>
              <QuestionMarkIcon fontSize="small" color="disabled" />
            </BootstrapTooltip>
          </IconButton>
        </>
      );
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center mt-10">
      <div className="w-[90%] h-[50px] text-2xl font-semibold flex items-center gap-2">
        {/* Title and tooltip above */}
        {props.title} {generateHoverHelp()}
      </div>
      {/* Place for content */}
      {props.children}
    </div>
  );
}
