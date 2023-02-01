import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./EditModal.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/features/EditModalSlice";
import { selectEditData } from "../../services/features/EditDataSlice";
import { useUpdateMutation } from "../../services/brokerData";

const EditModal = () => {
  const [update] = useUpdateMutation();

  const dispatch = useDispatch();
  const data = useSelector(selectEditData);

  const {
    id,
    title,
    name,
    broker_name: b_name,
    visit_office_type_id,
    introduced_via_mail,
    first_visit,
    size_id,
  } = data;

  const initialState = {
    id: id,
    broker_company: title,
    broker_name: b_name,
    client_detail: name,
    introduced_via_maill: introduced_via_mail,
    first_visitt: first_visit,
    office_type_id: visit_office_type_id,
    office_size_id: size_id,
  };

  const [formValue, setFormValues] = useState(initialState);

  const {
    broker_company,
    broker_name,
    client_detail,
    office_type_id,
    introduced_via_maill,
    first_visitt,
    office_size_id,
  } = formValue;

  const handleBrokerCompany = (e) => {
    setFormValues({ ...formValue, broker_company: e.target.value });
  };

  const handleBrokerName = (e) => {
    setFormValues({ ...formValue, broker_name: e.target.value });
  };

  const handleClientDetail = (e) => {
    setFormValues({ ...formValue, client_detail: e.target.value });
  };

  const handleOfficeType = (e) => {
    setFormValues({ ...formValue, office_type_id: e.target.value });
  };

  const handleOfficeSize = (e) => {
    setFormValues({ ...formValue, office_size_id: e.target.value });
  };

  const handleIVM = (e) => {
    setFormValues({ ...formValue, introduced_via_maill: e.target.value });
  };

  const handleFV = (e) => {
    setFormValues({
      ...formValue,
      first_visitt: e.target.value,
      title: "e.target.value",
    });
  };

  const updateData = (e) => {
    e.preventDefault();
    update(formValue);
    dispatch(closeModal());
  };

  return ReactDOM.createPortal(
    <div className="edit_modal">
      <div className="title_modal">
        <h4>Edit visit</h4>
        <i
          onClick={() => {
            dispatch(closeModal());
          }}
          className="fa fa-times"
          aria-hidden="true"
        ></i>
      </div>
      <form onSubmit={updateData}>
        <div className="broker_company_name">
          <div className="broker__parent">
            <label htmlFor="broker__input">Broker Company</label>
            <input
              onChange={handleBrokerCompany}
              value={broker_company}
              className="broker__input"
              placeholder="Broker company"
            />
          </div>
          <div className="company__parent">
            <label htmlFor="company_name_input">Broker name</label>
            <input
              onChange={handleBrokerName}
              value={broker_name}
              className="company_name_input"
              placeholder="Broker name"
            />
          </div>
        </div>
        <div className="client_details_parent">
          <label htmlFor="client_details">Client details</label>
          <input
            onChange={handleClientDetail}
            value={client_detail}
            className="client_details"
            placeholder="Client company"
          />
        </div>
        <div className="office_type_parent">
          <label htmlFor="select_office_type">Office type</label>
          <select
            onChange={handleOfficeType}
            value={office_type_id}
            className="select_office_type"
          >
            <option value="1">Office type 1</option>
            <option value="2">Office type 2</option>
            <option value="3">Office type 3</option>
            <option value="4">Office type 4</option>
          </select>
        </div>
        <div className="office_size_parent">
          <label htmlFor="select_office_size">Office size</label>
          <select
            onChange={handleOfficeSize}
            value={office_size_id}
            className="select_office_size"
          >
            <option value="1">1 - 3000 sq ft</option>
            <option value="2">3000 - 6000 sq ft</option>
            <option value="3">6000 - 10000 sq ft</option>
            <option value="4">10000 sq ft</option>
          </select>
        </div>
        <div className="introduced_via_mail_parent">
          <label htmlFor="introduced_via_mail_select">
            Introduced via mail
          </label>
          <select
            onChange={handleIVM}
            value={introduced_via_maill}
            className="introduced_via_mail_select"
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className="first_visit_parent">
          <label htmlFor="first_visit_select">First visit</label>
          <select
            onChange={handleFV}
            value={first_visitt}
            className="first_visit_select"
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <button className="edit_btn">Edit</button>
      </form>
      <div className="bottom_modal">
        <button
          className="btn_close"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default EditModal;
