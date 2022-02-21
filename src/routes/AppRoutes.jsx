import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/defaultLayout/DefaultLayout";
import HomePage from "../pages/Home";
import CustomerPage from "../pages/Customer";
import AddCustomer from "../pages/AddCustomer";

const AppRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route exact path="/" element={<DefaultLayout />}>
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/customer" element={<CustomerPage />} />
          <Route exact path="/addcustomer" element={<AddCustomer />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
export default AppRoutes;
