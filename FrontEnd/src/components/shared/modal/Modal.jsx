import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "./../Form/InputType";
import API from "../../../services/Api";
import { toast } from 'react-toastify';
import './modal.css';


const Modal = ({ onSuccess }) => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);

  const closeModal = () => {
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      if (window.bootstrap && window.bootstrap.Modal) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement) || new window.bootstrap.Modal(modalElement);
        modalInstance.hide();
      } else {
        const closeButton = modalElement.querySelector('.btn-close');
        if (closeButton) {
          closeButton.click();
        }
      }
    }
  };

  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity || !email) {
        return toast.error("Please Provide All Required Fields (Blood Group, Quantity, Email)");
      }

      const parsedQuantity = parseInt(quantity);
      if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        return toast.error("Quantity must be a positive number.");
      }

      console.log("User data:", user);

      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity: parsedQuantity,
      });

      if (data?.success) {
        toast.success("New Record Created Successfully!");
        closeModal();
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Error creating inventory:", error);
      toast.error(error.response?.data?.message || "Failed to create record. Please try again.");
    }
  };

  

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal-content">
            <div className="modal-header custom-modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body custom-modal-body">
              <div className="d-flex mb-3 align-items-center">
                <span className="me-3 fw-bold">Blood Type:</span>
                <div className="form-check me-3">
                  <input
                    type="radio"
                    name="inventoryTypeRadio"
                    id="inRadio"
                    defaultChecked
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="inRadio" className="form-check-label">
                    IN
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="inventoryTypeRadio"
                    id="outRadio"
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="outRadio" className="form-check-label">
                    OUT
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="bloodGroupSelect" className="form-label">Blood Group</label>
                <select
                  className="form-select custom-select"
                  aria-label="Select Blood Group"
                  onChange={(e) => setBloodGroup(e.target.value)}
                  value={bloodGroup}
                  id="bloodGroupSelect"
                >
                  <option value="">Select Blood Group</option>
                  <option value={"O+"}>O+</option>
                  <option value={"O-"}>O-</option>
                  <option value={"AB+"}>AB+</option>
                  <option value={"AB-"}>AB-</option>
                  <option value={"A+"}>A+</option>
                  <option value={"A-"}>A-</option>
                  <option value={"B+"}>B+</option>
                  <option value={"B-"}>B-</option>
                </select>
              </div>
              <InputType
                labelText={inventoryType === "in" ? "Donor Email" : "Hospital Email"}
                labelFor={"email"}
                inputType={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                customClass="mb-3"
              />
              <InputType
                labelText={"Quantity (ML)"}
                labelFor={"quantity"}
                inputType={"Number"}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="modal-footer custom-modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary custom-submit-btn"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;