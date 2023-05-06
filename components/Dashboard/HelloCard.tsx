// Card with user greeting
type HelloCard = {
  isLogged: boolean;
  nick: string;
};

function HelloCard(props: HelloCard) {
  return (
    <div className="flex justify-center mt-8">
      <div className="w-[95%] h-[100px] text-3xl flex justify-center items-center bg-white xl:w-[90%] xl:text-lg">
        {props.isLogged ? (
          <span>
            Hi <b>{props.nick}</b> again! Hope you have a great day
          </span>
        ) : (
          <span>Welcome to Exchange Dashboard, there&apos;s a lot of money to be made today!</span>
        )}
      </div>
    </div>
  );
}

export default HelloCard;
