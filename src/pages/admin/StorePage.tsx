import { TableList } from "../../components/stores";
import { Alert } from "../../components/ui";
import { useStore } from "../../hooks";

export const StorePage = () => {
  const { findStores } = useStore();

  const { data: stores = [], isLoading } = findStores();

  return (
    <>
      {isLoading ? (
        <Alert message="Loading stores.. Please wait" alert="alert-success" />
      ) : (
        <TableList stores={stores} />
      )}
    </>
  );
};
