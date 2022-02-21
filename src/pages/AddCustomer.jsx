import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
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
      render={({ errors, touched }) => (
        <Form>
          <div className="jumbotron mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3"></div>
                <div className="form-group">
                  <label>First Name</label>
                  <Field
                    name="firstname"
                    type="text"
                    className={
                      "form-control" +
                      (errors.firstname && touched.firstname
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Last Name</label>
                  <Field
                    name="lastname"
                    type="text"
                    className={
                      "form-control" +
                      (errors.lastname && touched.lastname ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Email</label>
                  <Field
                    name="email"
                    type="text"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Phone Number</label>
                  <Field
                    name="phone_number"
                    type="number"
                    className={
                      "form-control" +
                      (errors.phone_number && touched.phone_number
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Address</label>
                  <Field
                    name="address"
                    type="text"
                    className={
                      "form-control" +
                      (errors.address && touched.address ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Company Name</label>
                  <Field
                    name="company_name"
                    type="text"
                    className={
                      "form-control" +
                      (errors.company_name && touched.company_name
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="company_name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Bill Payment</label>
                  <Field
                    name="due_bill_payment"
                    type="number"
                    className={
                      "form-control" +
                      (errors.due_bill_payment && touched.due_bill_payment
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="due_bill_payment"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group mt-3">
                  <button type="submit" className="btn btn-primary mr-2">
                    Register
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    />
  );
};

export default AddCustomer;
