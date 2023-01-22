import React from "react";
import NewBroker from "../../Components/NewBroker.js/NewBroker";
import OfficeType from "../../Components/OfficeType/OfficeType";
import "./AddNew.css";
import OfficeSize from "../../Components/OfficeSize/OfficeSize";

const AddNew = () => {
  return (
    <div className="add_new">
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <NewBroker />
            </div>
            <div className="col">
              <OfficeType />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <OfficeSize />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
