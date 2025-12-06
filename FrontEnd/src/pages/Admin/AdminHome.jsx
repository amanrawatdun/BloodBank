import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage QuickRed App </h3>
          <hr />
          <p>
            Welcome to the QuickRed Blood Management System. As an admin, you have full control to manage donors, hospitals, and organizations efficiently.
            Monitor blood inventory levels, oversee donations, and ensure smooth collaboration between all stakeholders to save lives and improve healthcare.
          </p> 
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
