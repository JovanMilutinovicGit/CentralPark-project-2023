import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  useGetBrokerDataQuery,
  useDeleteBrokerMutation,
  useDeleteOneBrokerMutation,
  useBrokerCompaniesQuery,
  useGetFilteredDataMutation,
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
  const { data: dataCompanies, isLoading: isLoadingData } =
    useBrokerCompaniesQuery();
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectValue, setSelectValue] = useState(10);
  const [broker_company_filter, setCBF] = useState("");
  const [client_company_filter, setCCF] = useState("");
  const [openDropDown, setOpenDropDown] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const v = {
    cp: currentPage,
    sv: selectValue,
  };

  const { data, isLoading } = useGetBrokerDataQuery(v);
  const [
    getFilteredData,
    { data: filter_data, isLoading: isLoadingFilterData },
  ] = useGetFilteredDataMutation();

  masks.hammerTime = "yyyy/m/d HH:MM";

  const dispatch = useDispatch();
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  /*Selektovanje svakog visit-a klikom na checkbox u zaglavlju tabele */
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(data.data.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  /*Selektovanje pojedinacnog visita u tabeli */
  const handleSelect = (e, id) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  /*Brisanje viste od jednog visit-a odjednom*/
  const deleteSelectedItems = () => {
    if (selectedItems.length > 0) {
      toast.success("Visit Deleted Successfully");
      deleteBroker(selectedItems);
      setSelectedItems([]);
    } else {
      toast.error("Please select item");
    }
  };

  /*Brisanje pojedinacnog visita */
  const deleteOneVisit = () => {
    if (selectedItems.length === 1) {
      toast.success("Visit Deleted Successfully");
      deleteOneBroker(selectedItems);
      setSelectedItems([]);
    } else {
      toast.error("Please select item");
    }
  };

  const setFilterBrokerCompany = (value) => {
    setCBF(value);
  };

  const setClientFilter = (e) => {
    setCCF(e.target.value);
  };

  const setSelVal = (event) => {
    setCurrentPage(1);
    setSelectValue(event.target.value);
  };

  const openDD = () => {
    setOpenDropDown(!openDropDown);
  };

  /*Uradjeno ovako, inace moze prostije, preko slice-a */

  const setFilterStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const setFilterEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const objFilter = {
    broker_company_data: broker_company_filter,
    start_date: startDate,
    end_date: endDate,
  };

  const replaceData = (e) => {
    e.preventDefault();
    getFilteredData(objFilter);
  };

  const resetData = (e) => {
    e.preventDefault();
    getFilteredData(null);
  };

  const modifyFilterBrokerCompany = (e) => {
    setCBF(e.target.value);
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
            <div className="col filter_form">
              <form onSubmit={replaceData}>
                <div className="bc_filter">
                  <input
                    onClick={openDD}
                    onChange={modifyFilterBrokerCompany}
                    value={broker_company_filter.title}
                    placeholder="Broker company"
                  />
                  {openDropDown && (
                    <ul className="broker_list">
                      {dataCompanies &&
                        dataCompanies.map((item) => (
                          <li
                            onClick={() => {
                              setFilterBrokerCompany(item);
                              openDD();
                            }}
                            key={item.id}
                          >
                            {item.title}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                <input
                  onChange={setClientFilter}
                  value={client_company_filter}
                  placeholder="Client company"
                />
                <input type="date" onChange={setFilterStartDate} />
                <input type="date" onChange={setFilterEndDate} />
                <button className="filter_btn">
                  <i className="fa fa-filter" aria-hidden="true"></i>
                </button>
              </form>
              <button className="reset_btn" onClick={resetData}>
                Reset
              </button>
            </div>
          </div>
          <div className="row table_with_data">
            <div className="col">
              <div className="table_D">
                <table className="table_data">
                  <thead>
                    <tr>
                      <th className="selected_item">
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
                      ? (filter_data ? filter_data.data : data.data).map(
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
                                <td className="selected_item">
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
                      : "No data"}
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
                        nextLabel="NEXT"
                        onPageChange={handlePageClick}
                        pageCount={data.total / data.per_page}
                        previousLabel={currentPage > 1 ? "PREV" : null}
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
