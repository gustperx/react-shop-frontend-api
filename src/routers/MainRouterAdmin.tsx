import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layouts";
import { Error404 } from "../components";

import { DashboardPage } from "../pages/admin/DashboardPage";
import { BrandPage } from "../pages/admin/BrandPage";
import { StorePage } from "../pages/admin/StorePage";

export const MainRouterAdmin = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/brands" element={<BrandPage />} />
        <Route path="/stores" element={<StorePage />} />

        {/* Error */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </MainLayout>
  );
};
