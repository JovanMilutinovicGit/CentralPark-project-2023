import React, { useState } from "react";
import "./Dashboard.css";
import {
  useGetBrokerDataQuery,
  useDeleteBrokerMutation,
  useDeleteOneBrokerMutation,
} from "../../services/brokerData";
import dateFormat, { masks } from "dateformat";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { openModal } from "../../services/features/EditModalSlice";
import ReactPaginate from "react-paginate";
import { ThreeCircles } from "react-loader-spinner";
import { setData } from "../../services/features/EditDataSlice";

const Dashboard = () => {
  const [deleteBroker] = useDeleteBrokerMutation();
  const [deleteOneBroker] = useDeleteOneBrokerMutation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectValue, setSelectValue] = useState(10);

  const v = {
    cp: currentPage,
    sv: selectValue,
  };
  const { data, isLoading } = useGetBrokerDataQuery(v);
  masks.hammerTime = "yyyy/m/d HH:MM";

  const dispatch = useDispatch();

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

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
      setSelectedItems([]);
    } else {
      toast.error("Please select item");
    }
  };

  const deleteOneVisit = () => {
    if (selectedItems.length === 1) {
      toast.success("Visit Deleted Successfully");
      deleteOneBroker(selectedItems);
      setSelectedItems([]);
    } else {
      toast.error("Please select item");
    }
  };

  const setSelVal = (event) => {
    setCurrentPage(1);
    setSelectValue(event.target.value);
  };

  return (
    <div className="dashboard">
      {isLoading && (
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="#009EF7"
          innerCircleColor="#C0EAFF"
          middleCircleColor="#009EF7"
        />
      )}
      {!isLoading && (
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
                            broker: { name: broker_name },
                            office_size: { min, max, id: size_id },
                            office_type: {
                              title: office_t,
                              id: visit_office_type_id,
                            },
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
                                  {min} {max ? `- ${max}` : ""}
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
                                    onClick={() => {
                                      dispatch(openModal(true));
                                      dispatch(
                                        setData({
                                          id,
                                          title,
                                          name,
                                          size_id,
                                          office_t,
                                          introduced_via_mail,
                                          first_visit,
                                          broker_name,
                                          visit_office_type_id,
                                        })
                                      );
                                    }}
                                    className="fa fa-pencil edit"
                                    aria-hidden="true"
                                  ></i>
                                  <i
                                    className="fa fa-trash delete"
                                    aria-hidden="true"
                                    onClick={deleteOneVisit}
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
                    {selectedItems.length > 0 && (
                      <button
                        className="deleteMoreThanOne_btn"
                        onClick={deleteSelectedItems}
                      >
                        Delete
                      </button>
                    )}
                    <select className="showNitems" onChange={setSelVal}>
                      <option value="10">10</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="250">250</option>
                    </select>
                  </div>
                  <div className="bottom_dashboard_right">
                    <>
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={handlePageClick}
                        pageCount={data.total / data.per_page}
                        previousLabel="Prev"
                        renderOnZeroPageCOunt={null}
                      />
                    </>
                  </div>
                </div>
              </row>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
