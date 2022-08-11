import { Route, Routes } from "react-router-dom";
import { Error404 } from "../components";
import { ShopLayout } from "../components/layouts";
import { HomePage, SimpleProductPage } from "../pages/public";

export const MainRouterPublic = () => {
  return (
    <ShopLayout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<SimpleProductPage />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </ShopLayout>
  );
};
