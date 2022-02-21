import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../store/customer/slice";
import "./Customer.css";

const Customer = () => {
  const dispatch = useDispatch();
  const customerResponse = useSelector((state) => state.customer.getCustomer);

  useEffect(() => {
    dispatch(getCustomer());
  }, []);

  return (
    <>
      <h2 className="text-center my-10 text-2xl font-bold">Hello</h2>

      <div className="px-10">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="text-center">Person 1</th>
              <th className="text-center">Person 2</th>
              <th className="text-center">Person 3</th>
            </tr>
            {customerResponse?.data?.data.map((item, index) => (
              <>
                <tr key={index}>
                  <td className="text-center">{item.firstname}</td>
                  <td className="text-center">{item.email}</td>
                  <td className="text-center">{item.phone_number}</td>
                  <button className="bg-alert">Edit</button>
                  <button className="ml-10">Delete</button>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Customer;
