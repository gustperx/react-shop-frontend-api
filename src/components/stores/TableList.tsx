import { FC, useState } from "react";
import { toast } from "react-toastify";

import { useStore } from "../../hooks";
import { Header, Modal } from "../ui";
import { Form } from ".";

import { StoreAttributes, StoreModel } from "../../interfaces/stores.interface";
import { getStoreById } from "../../services/storesService";

interface Props {
  stores: StoreModel[];
}

export const TableList: FC<Props> = ({ stores }) => {
  const { saveStore, updateStore, deleteMutation } = useStore();

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [currentId, setCurrentId] = useState<string>();
  const [seleted, setSeleted] = useState<StoreAttributes>({
    name: "",
    url: "",
  });

  const handleModalCreate = () => {
    resetParams();
    setOpenModalCreate(!openModalCreate);
  };

  const createProduct = (data: StoreAttributes) => {
    saveStore(data);
  };

  const handleModalUpdate = async (id: string) => {
    resetParams();
    setCurrentId(id);
    const store = await getStoreById(id);
    if (store) {
      setSeleted({
        name: store.name,
        url: store.url,
      });
      setOpenModalUpdate(!openModalUpdate);
    } else {
      setCurrentId("");
      resetParams();
      toast.error("No store found");
    }
  };

  const handleEdit = async (data: StoreAttributes) => {
    if (!currentId) return;
    updateStore({
      id: currentId,
      ...data,
    });
  };

  const resetParams = () => {
    setCurrentId("");
    setSeleted({
      name: "",
      url: "",
    });
  };

  return (
    <>
      <div className="mb-4">
        <Header
          title="Stores"
          textAction="Crear nuevo"
          handleAction={handleModalCreate}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stores.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.url}</td>
                  <td>
                    <button
                      className="btn btn-ghost"
                      onClick={() => handleModalUpdate(item.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={() => deleteMutation.mutate(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal openModal={openModalUpdate} handleModal={setOpenModalUpdate}>
        <Form
          handleForm={handleEdit}
          formValues={seleted}
          handleModal={setOpenModalUpdate}
        />
      </Modal>

      <Modal openModal={openModalCreate} handleModal={setOpenModalCreate}>
        <Form
          handleForm={createProduct}
          formValues={seleted}
          handleModal={setOpenModalCreate}
        />
      </Modal>
    </>
  );
};
