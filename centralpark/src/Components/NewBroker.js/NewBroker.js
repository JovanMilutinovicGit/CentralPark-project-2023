import React, { useState } from "react";
import RequiredStar from "../RequiredStar/RequiredStar";
import "./NewBroker.css";
import { useNewBrokerMutation } from "../../services/brokerData";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const NewBroker = () => {
  const initialState = {
    broker_company: "",
    broker_name: "",
  };
  const [newBroker] = useNewBrokerMutation();
  const [formValue, setFormValues] = useState(initialState);
  const { broker_company, broker_name } = formValue;
  const dispatch = useDispatch();

  const handleBrokerCompanyChange = (e) => {
    setFormValues({
      ...formValue,
      broker_company: e.target.value,
    });
  };
  const handleBrokerNameChange = (e) => {
    setFormValues({
      ...formValue,
      broker_name: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    if (broker_company && broker_name) {
      toast.success("Broker created");
      dispatch(newBroker(formValue));
    } else if (!broker_company && !broker_name) {
      toast.error("Empty fields");
    } else if (!broker_name) {
      toast.error("Broker name is empty");
    }
  };

  return (
    <div className="new_broker">
      <form className="new_broker_form" onSubmit={submit}>
        <div className="title_broker">
          <h2>New Broker</h2>
        </div>
        <div className="broker_company">
          <p>
            Broker Company
            <RequiredStar />
          </p>
          <input
            type="text"
            value={broker_company}
            onChange={handleBrokerCompanyChange}
          />
        </div>
        <div className="broker_name">
          <p>Broker name</p>
          <input
            type="text"
            value={broker_name}
            onChange={handleBrokerNameChange}
          />
        </div>
        <div className="btn_create">
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

export default NewBroker;
