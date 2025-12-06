import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/Api";
import moment from "moment";
import '../../style/Analytics.css'

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];

  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
  }, []);

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="analytics-page-content">
        <div className="blood-group-cards-section">
          <div className="d-flex flex-row flex-wrap justify-content-center">
            {data?.map((record, i) => (
              <div
                className="blood-group-card m-3"
                key={i}
                style={{ backgroundColor: `${colors[i % colors.length]}` }}
              >
                <div className="card-body">
                  <h1 className="card-title-blood-group text-center">
                    {record.bloodGroup}
                  </h1>
                  <p className="card-text-detail">
                    Total In : <b>{record.totalIn}</b> (ML)
                  </p>
                  <p className="card-text-detail">
                    Total Out : <b>{record.totalOut}</b> (ML)
                  </p>
                </div>
                <div className="card-footer-blood-group text-center">
                  Total Available : <b>{record.availabeBlood}</b> (ML)
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-transactions-section container my-5">
          <h1 className="section-title">Recent Blood Transactions</h1>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Associated Email</th>
                <th scope="col">Time & Date</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData?.map((record) => (
                <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity} (ML)</td>
                  <td>{record.email}</td>
                  <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Analytics;