import React from "react";
import CreateButton from "../buttons/CreateBtn/CreateButton";
import RequiredStar from "../RequiredStar/RequiredStar";
import "./OfficeType.css";

const OfficeType = () => {
  return (
    <div className="office_type">
      <form className="office_type_form">
        <div className="title_office">
          <h2>New office type</h2>
        </div>
        <div className="office_type_name">
          <p>
            Office type
            <RequiredStar />
          </p>
          <input required />
        </div>
        <div className="btn_create">
          <CreateButton />
        </div>
      </form>
    </div>
  );
};

export default OfficeType;
