import { FC, useState } from "react";
import { toast } from "react-toastify";

import { useBrand } from "../../hooks";
import { Header, Modal } from "../ui";
import { Form } from ".";

import { BrandAttributes, BrandModel } from "../../interfaces/brand.interface";
import { getBrandById } from "../../services/brandService";

interface Props {
  brands: BrandModel[];
}

export const TableList: FC<Props> = ({ brands }) => {
  const { saveBrand, updateBrand, deleteMutation } = useBrand();

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [currentId, setCurrentId] = useState<string>();
  const [seleted, setSeleted] = useState<BrandAttributes>({
    name: "",
  });

  const handleModalCreate = () => {
    resetParams();
    setOpenModalCreate(!openModalCreate);
  };

  const createProduct = (data: BrandAttributes) => {
    saveBrand(data);
  };

  const handleModalUpdate = async (id: string) => {
    resetParams();
    setCurrentId(id);
    const brand = await getBrandById(id);
    if (brand) {
      setSeleted({
        name: brand.name,
      });
      setOpenModalUpdate(!openModalUpdate);
    } else {
      setCurrentId("");
      resetParams();
      toast.error("No brand found");
    }
  };

  const handleEdit = async (data: BrandAttributes) => {
    if (!currentId) return;
    updateBrand({
      id: currentId,
      ...data,
    });
  };

  const resetParams = () => {
    setCurrentId("");
    setSeleted({
      name: "",
    });
  };

  return (
    <>
      <div className="mb-4">
        <Header
          title="Brands"
          textAction="Crear nuevo"
          handleAction={handleModalCreate}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {brands.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
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
