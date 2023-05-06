// Trademark/logo of Exchange
import Image from "next/image";

type Trademark = {
  className?: string;
};

export default function Trademark(props: Trademark) {
  return (
    <div className={"flex flex-col sm:scale-50 " + props.className}>
      <div className="flex justify-center items-center">
        <div>
          <Image src="/static/exchange.png" width={64} height={64} objectFit="contain" alt="Exchange logo" />
        </div>
        <div className="text-4xl mt-2">Exchange</div>
      </div>

      <div className="text-base opacity-70 tracking-wider text-center sm:text-lg">Trade with confidence</div>
    </div>
  );
}
