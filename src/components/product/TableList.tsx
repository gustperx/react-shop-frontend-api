import { FC, useState } from "react";
import { toast } from "react-toastify";

import { useProduct } from "../../hooks";
import { Header, Modal } from "../ui";
import { Form } from ".";
import { ProductResponse } from "../../interfaces";
import { ProductAttributes } from "../../interfaces/product.interface";
import { getProductById } from "../../services/productService";
import { getYearMonthDay } from "../../helpers";

interface Props {
  products: ProductResponse[];
}

export const TableList: FC<Props> = ({ products }) => {
  const { saveProduct, updateProduct, deleteMutation } = useProduct();

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [currentId, setCurrentId] = useState<string>();
  const [seletedProduct, setSeletedProduct] = useState<ProductAttributes>({
    title: "",
    brand: "",
    model: "",
    price: "",
    release_date: "",
    stores: [],
  });

  const handleModalCreate = () => {
    resetParams();
    setOpenModalCreate(!openModalCreate);
  };

  const createProduct = (data: ProductAttributes) => {
    saveProduct(data);
  };

  const handleModalUpdate = async (id: string) => {
    resetParams();
    setCurrentId(id);
    const product = await getProductById(id);
    if (product) {
      setSeletedProduct({
        title: product.title,
        brand: product.brand ? product.brand.id : "",
        model: product.model,
        price: `${product.price}`,
        release_date: getYearMonthDay(product.release_date),
        stores: product.stores.map((item) => item.id),
      });
      setOpenModalUpdate(!openModalUpdate);
    } else {
      setCurrentId("");
      resetParams();
      toast.error("No product found");
    }
  };

  const handleEdit = async (data: ProductAttributes) => {
    if (!currentId) return;
    updateProduct({
      id: currentId,
      ...data,
    });
  };

  const resetParams = () => {
    setCurrentId("");
    setSeletedProduct({
      title: "",
      model: "",
      price: "",
      release_date: "",
      brand: "",
      stores: [],
    });
  };

  return (
    <>
      <div className="mb-4">
        <Header
          title="Products"
          textAction="Crear nuevo"
          handleAction={handleModalCreate}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{getYearMonthDay(item.release_date)}</td>
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
          formValues={seletedProduct}
          handleModal={setOpenModalUpdate}
        />
      </Modal>

      <Modal openModal={openModalCreate} handleModal={setOpenModalCreate}>
        <Form
          handleForm={createProduct}
          formValues={seletedProduct}
          handleModal={setOpenModalCreate}
        />
      </Modal>
    </>
  );
};
