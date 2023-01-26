import React, { useState } from "react";
import "./Dashboard.css";
import {
  useBrokerDataQuery,
  useDeleteBrokerMutation,
} from "../../services/brokerData";
import dateFormat, { masks } from "dateformat";
import { toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import Modal from "react-modal";

const Dashboard = () => {
  const { data, isLoading } = useBrokerDataQuery();
  const [deleteBroker] = useDeleteBrokerMutation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nViewItems, setNViewItems] = useState(10);
  masks.hammerTime = "yyyy/m/d HH:MM";

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(data.data.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelect = (e, id) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  const deleteSelectedItems = () => {
    if (selectedItems.length > 0) {
      toast.success("Visit Deleted Successfully");
      deleteBroker(selectedItems);
    } else {
      toast.error("Please select item");
    }
  };

  const setPageNumberP = () => {
    setCurrentPage(currentPage + 1);
  };
  const setPageNumberN = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="dashboard">
      {!isLoading ? (
        <div className="container-fluid">
          <div className="row form_inputs">
            <div className="col">
              <form>
                <input placeholder="Broker company" />
                <input placeholder="Client company" />
                <input type="date" />
                <input type="date" />
                <button className="filter_btn">
                  <i className="fa fa-filter" aria-hidden="true"></i>
                </button>
                <button className="reset_btn">Reset</button>
              </form>
            </div>
          </div>
          <div className="row table_with_data">
            <div className="col">
              <div className="table_D">
                <table className="table_data">
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" onChange={handleSelectAll} />
                      </th>
                      <th>Broker company</th>
                      <th>Date</th>
                      <th>Client company</th>
                      <th>Office type</th>
                      <th>Office size</th>
                      <th>Introduced via mail</th>
                      <th>First visit</th>
                      <th className="actions_title">Actions</th>
                    </tr>
                    {data
                      ? data.data.map(
                          ({
                            id,
                            broker_company: { title },
                            created_at,
                            client: { name },
                            office_size: { min },
                            office_type: { title: office_t },
                            introduced_via_mail,
                            first_visit,
                          }) => {
                            return (
                              <tr key={id}>
                                <td>
                                  <input
                                    type="checkbox"
                                    onChange={(e) => handleSelect(e, id)}
                                    checked={selectedItems.includes(id)}
                                  />
                                </td>
                                <td>{title}</td>
                                <td>{dateFormat(created_at, "hammerTime")}</td>
                                <td>{name}</td>
                                <td>{office_t}</td>
                                <td>
                                  {min}
                                  <sub>sq ft</sub>
                                </td>
                                <td>
                                  <span
                                    style={
                                      introduced_via_mail === 0
                                        ? {
                                            backgroundColor: "#FFF5F8",
                                            color: "#F1416C",
                                          }
                                        : {
                                            backgroundColor: "#E8FFF3",
                                            color: "#50CD89",
                                          }
                                    }
                                  >
                                    {introduced_via_mail === 0 ? "No" : "Yes"}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    style={
                                      first_visit === 0
                                        ? {
                                            backgroundColor: "#FFF5F8",
                                            color: "#F1416C",
                                          }
                                        : {
                                            backgroundColor: "#E8FFF3",
                                            color: "#50CD89",
                                          }
                                    }
                                  >
                                    {first_visit === 0 ? "No" : "Yes"}
                                  </span>
                                </td>
                                <td className="actions">
                                  <i
                                    className="fa fa-pencil edit"
                                    aria-hidden="true"
                                  ></i>
                                  <i
                                    className="fa fa-trash delete"
                                    aria-hidden="true"
                                    onClick={deleteSelectedItems}
                                  ></i>
                                </td>
                              </tr>
                            );
                          }
                        )
                      : ""}
                  </thead>
                </table>
              </div>
              <row>
                <div className="bottom_dashboard">
                  <div className="bottom_dashboard_left">
                    <select>
                      <option value="10">10</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="250">250</option>
                    </select>
                  </div>
                  <div className="bottom_dashboard_right">
                    {currentPage > 1 ? (
                      <p onClick={setPageNumberN}>Prev</p>
                    ) : (
                      ""
                    )}
                    <p onClick={setPageNumberP}>Next</p>
                  </div>
                </div>
                {/* <button
                  className="deleteMoreThanOne_btn"
                  onClick={deleteSelectedItems}
                >
                  Delete
                </button> */}
              </row>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="#009EF7"
            innerCircleColor="#F1FAFF"
            middleCircleColor="#009EF7"
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
