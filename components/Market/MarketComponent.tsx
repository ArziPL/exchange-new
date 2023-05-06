// Component with all the content rendered in /market
import useCryptoStore from "../../stores/useCryptoStore";
import ErrorData from "../common/ErrorData";
import PageContent from "../common/PageContent";
import CryptoTable from "./CryptoTable";

export default function DashboardComponent() {
  const cryptos = useCryptoStore((state) => state.crypto.data);

  return (
    <div>
      {cryptos.length == 0 ? (
        <ErrorData />
      ) : (
        <PageContent title="Market" tooltip="I highly suggest using desktop for good experience !">
          <CryptoTable cryptos={cryptos} />
        </PageContent>
      )}
    </div>
  );
}
