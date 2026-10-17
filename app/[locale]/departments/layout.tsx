import Loader from "@/components/loader";
import { ReactNode, Suspense } from "react";

const DepartmentLayout = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default DepartmentLayout;
