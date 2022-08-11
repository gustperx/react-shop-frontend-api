import { FC, ReactNode } from "react";
import { Footer, Navbar } from "../ui";

interface Props {
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div data-theme="night">
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-auto container sm:mx-auto mt-16 mb-12">
          {children}
        </div>

        <Footer />
      </div>
    </div>
  );
};
