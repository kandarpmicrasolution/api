import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createCustomer } from "../store/customer/slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddCustomer = () => {
  const dispatch = useDispatch();

  const createCustomerResponse = useSelector(
    (state) => state?.customer?.createCustomer?.data
  );

  useEffect(() => {
    // console.log(
    //   "____________________createCustomerResponse_______________",
    //   createCustomerResponse.data.message
    // );
    toast.success(createCustomerResponse?.message);
  }, [createCustomerResponse]);

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        address: "",
        company_name: "",
        due_bill_payment: "",
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().required("First Name is required"),
        lastname: Yup.string().required("Last Name is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        phone_number: Yup.string().required("Phone number is required"),
        address: Yup.string().required("Address is required"),
        company_name: Yup.string().required("Company name is required"),
        due_bill_payment: Yup.string().required("Bill Payment is required"),
      })}
      onSubmit={(fields, { resetForm }) => {
        dispatch(createCustomer(fields));
        resetForm({ values: "" });
      }}
      render={() => (
        <Form>
          <div className="bg-gray-100 py-5">
            <div className="container mx-auto mt-5">
              <div className="my-2">
                <label>First Name</label>
                <Field
                  name="firstname"
                  type="text"
                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="text-red-600 text-sm mb-2"
                />
              </div>
              <div className="my-2">
                <label>Last Name</label>
                <Field
                  name="lastname"
                  type="text"
                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="text-red-600 text-sm mb-2"
                />
              </div>
              <div className="my-2">
                <label>Email</label>
                <Field
                  name="email"
                  type="text"
                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mb-2"
                />
              </div>
              <div className="my-2">
                <label>Phone Number</label>
                <Field
                  name="phone_number"
                  type="number"
                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                />
                <ErrorMessage
                  name="phone_number"
                  component="div"
                  className="text-red-600 text-sm mb-2"
                />
              </div>
              <div className="my-2">
                <label>Address</label>
                <Field
                  name="address"
                  type="text"
                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-600 text-sm mb-2"
                />
              </div>
              <div className="my-2">
                <label>Company Name</label>
                <Field
                  name="company_name"
                  type="text"
                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                />
                <ErrorMessage
                  name="company_name"
                  component="div"
                  className="text-red-600 text-sm mb-2"
                />
              </div>
              <div className="my-2">
                <label>Bill Payment</label>
                <Field
                  name="due_bill_payment"
                  type="number"
                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                />
                <ErrorMessage
                  name="due_bill_payment"
                  component="div"
                  className="text-red-600 text-sm mb-2"
                />
              </div>
              <div className="mt-3 flex flex-row-reverse">
                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 text-white font-medium ml-5 hover:bg-blue-800 rounded-lg text-sm"
                >
                  Register
                </button>
                <button
                  type="reset"
                  className="bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-800 rounded-lg text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    />
  );
};

export default AddCustomer;
