import React from "react";
import CreateButton from "../buttons/CreateBtn/CreateButton";
import RequiredStar from "../RequiredStar/RequiredStar";
import "./NewBroker.css";

const NewBroker = () => {
  return (
    <div className="new_broker">
      <form className="new_broker_form">
        <div className="title_broker">
          <h2>New Broker</h2>
        </div>
        <div className="broker_company">
          <p>
            Broker Company
            <RequiredStar />{" "}
          </p>
          <input required />
        </div>
        <div className="broker_name">
          <p>Broker name</p>
          <input />
        </div>
        <div className="btn_create">
          <CreateButton />
        </div>
      </form>
    </div>
  );
};

export default NewBroker;
