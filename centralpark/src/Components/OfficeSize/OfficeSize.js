import React from "react";
import CreateButton from "../buttons/CreateBtn/CreateButton";
import RequiredStar from "../RequiredStar/RequiredStar";
import "./OfficeSize.css";

const OfficeSize = () => {
  return (
    <div className="new_office_size">
      <form className="new_office_size_form">
        <div className="title_office_size">
          <h2>New office size</h2>
        </div>
        <div className="min_size">
          <p>Min size</p>
          <input />
        </div>
        <div className="max_size">
          <p>Max size</p>
          <input />
        </div>
        <div className="m_unit">
          <p>
            Measurement unit
            <RequiredStar />
          </p>
          <select required>
            <option value="sq ft">sq ft</option>
          </select>
        </div>
        <div className="btn_create">
          <CreateButton />
        </div>
      </form>
    </div>
  );
};

export default OfficeSize;
