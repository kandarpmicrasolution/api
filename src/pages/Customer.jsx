import React, { useEffect, useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCustomer, getCustomer } from "../store/customer/slice";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Customer = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [editData, setEditData] = useState({});

  const clickOnDelete = () => {
    setDeleteOpen(true);
  };
  const clickOnEdit = (item) => {
    setEditData(item);
    setEditOpen(true);
  };

  const editConfirmation = () => {
    setEditOpen(false);
  };

  const dispatch = useDispatch();
  const customerResponse = useSelector((state) => state.customer.getCustomer);

  useEffect(() => {
    dispatch(getCustomer());
  }, []);

  return (
    <>
      <h2 className="text-center my-10 text-2xl font-bold">Customers</h2>
      <div className="px-10">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="text-center font-black">Name</th>
              <th className="text-center font-black">Mail</th>
              <th className="text-center font-black">Phone Number</th>
              <th className="text-center font-black">Company Name</th>
              <th className="text-center font-black">Due Bill Payment</th>
              <th className="text-center font-black">Action</th>
            </tr>

            {/* ============STATIC START============ */}
            {/* <tr>
                 <td className="text-center font-medium">Kandarp Dudhatra</td>
                 <td className="text-center font-medium">kd@gmail.com</td>
                 <td className="text-center font-medium">95128 22276</td>
                 <td className="text-center font-medium">Abstract</td>
                 <td className="text-center font-medium">15000</td>
                 <td className="text-center py-2">
                   <button
                     className="bg-green-500 px-3 py-2 text-white font-medium hover:bg-green-800 rounded-lg text-sm"
                     onClick={clickOnEdit}
                   >
                     <FontAwesomeIcon icon={faEdit} />
                   </button>
                   <button
                     className="bg-red-500 px-3 py-2 text-white font-medium ml-5 hover:bg-red-800 rounded-lg text-sm"
                     onClick={clickOnDelete}
                   >
                     <FontAwesomeIcon icon={faTrashCan} />
                   </button>
                 </td>
               </tr> */}
            {/* ============STATIC END============ */}

            {customerResponse?.data?.data.map((item, index) => (
              <tr key={index}>
                <td className="text-center font-medium">
                  {item.firstname + " " + item.lastname}
                </td>
                <td className="text-center font-medium">{item.email}</td>
                <td className="text-center font-medium">{item.phone_number}</td>
                <td className="text-center font-medium">{item.company_name}</td>
                <td className="text-center font-medium">
                  {item.due_bill_payment}
                </td>
                <td className="text-center py-2">
                  <button
                    className="bg-green-500 px-3 py-2 text-white font-medium hover:bg-green-800 rounded-lg text-sm"
                    onClick={() => clickOnEdit(item)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="bg-red-500 px-3 py-2 text-white font-medium ml-5 hover:bg-red-800 rounded-lg text-sm"
                    onClick={clickOnDelete}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Formik
        initialValues={{
          firstname: editData?.firstname || "",
          lastname: editData?.lastname || "",
          email: editData?.email || "",
          phone_number: editData?.phone_number || "",
          company_name: editData?.company_name || "",
          due_bill_payment: editData?.due_bill_payment || "",
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().required("First Name is required"),
          lastname: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          phone_number: Yup.string().required("Phone number is required"),
          company_name: Yup.string().required("Company name is required"),
          due_bill_payment: Yup.string().required("Bill Payment is required"),
        })}
        onSubmit={(fields) => {
          dispatch(editCustomer(fields));
          setEditOpen(false);
        }}
      >
        {({ values }) => (
          <Form>
            <Transition.Root show={editOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={setEditOpen}
              >
                <div className="flex min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
                      <div className="bg-white px-10">
                        <div className="mt-3">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-medium text-gray-900"
                          >
                            Edit
                          </Dialog.Title>
                          <Form>
                            <div className="container mx-auto w-96 mt-5 text-left">
                              <div className="my-2">
                                <label className="font-medium mt-2">
                                  First Name
                                </label>
                                <Field
                                  name="firstname"
                                  type="text"
                                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                                  value={values.firstname}
                                />
                                <ErrorMessage
                                  name="firstname"
                                  component="div"
                                  className="text-red-600 text-sm mb-2"
                                />
                              </div>
                              <div className="my-2">
                                <label className="font-medium mt-2">
                                  Last Name
                                </label>
                                <Field
                                  name="lastname"
                                  type="text"
                                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                                  defaultValue={editData?.lastname}
                                  value={values.lastname}
                                />
                                <ErrorMessage
                                  name="lastname"
                                  component="div"
                                  className="text-red-600 text-sm mb-2"
                                />
                              </div>
                              <div className="my-2">
                                <label className="font-medium mt-2">
                                  Email
                                </label>
                                <Field
                                  name="email"
                                  type="text"
                                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                                  defaultValue={editData?.email}
                                />
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="text-red-600 text-sm mb-2"
                                />
                              </div>
                              <div className="my-2">
                                <label className="font-medium mt-2">
                                  Phone Number
                                </label>
                                <Field
                                  name="phone_number"
                                  type="number"
                                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                                  defaultValue={editData?.phone_number}
                                />
                                <ErrorMessage
                                  name="phone_number"
                                  component="div"
                                  className="text-red-600 text-sm mb-2"
                                />
                              </div>
                              <div className="my-2">
                                <label className="font-medium mt-2">
                                  Company Name
                                </label>
                                <Field
                                  name="company_name"
                                  type="text"
                                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                                  defaultValue={editData?.company_name}
                                />
                                <ErrorMessage
                                  name="company_name"
                                  component="div"
                                  className="text-red-600 text-sm mb-2"
                                />
                              </div>
                              <div className="my-2">
                                <label className="font-medium mt-2">
                                  Bill Payment
                                </label>
                                <Field
                                  name="due_bill_payment"
                                  type="number"
                                  className="w-full bg-gray-200 form-input px-2 py-1 rounded-md"
                                  defaultValue={editData?.due_bill_payment}
                                />
                                <ErrorMessage
                                  name="due_bill_payment"
                                  component="div"
                                  className="text-red-600 text-sm mb-2"
                                />
                              </div>
                              <div className="py-3 flex flex-row-reverse">
                                <button
                                  type="button"
                                  className="bg-green-500 px-4 py-2 text-white font-medium ml-5 hover:bg-green-800 rounded-lg text-sm"
                                  onClick={editConfirmation}
                                >
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  className="bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-800 rounded-lg text-sm"
                                  onClick={() => setEditOpen(false)}
                                  ref={cancelButtonRef}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <Transition.Root show={deleteOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={setDeleteOpen}
              >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-lg leading-6 font-medium text-gray-900"
                            >
                              Alert
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to Delete your account?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                          // onClick={() => setDeleteOpen(false)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setDeleteOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Customer;
