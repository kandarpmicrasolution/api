import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="bg-white w-full shadow py-3 text-center">
        <ul className="">
          <Link to="/home" className="px-3">
            <span className="font-semibold">Home</span>
          </Link>
          <Link to="/customer" className="px-3">
            <span className="font-semibold">Customer</span>
          </Link>
          <Link to="/addcustomer" className="px-3">
            <span className="font-semibold">Add Customer</span>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Header;
