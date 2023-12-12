import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const {data, loading, error} = useFetch(`/${path}`);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleView = async (id) => {
    try {
      if (path === "hotels") {
        const response = await axios.get(`/${path}/find/${id}`);
        var selectedItem = response.data;
        navigate(`/${path}/find/${id}`);
      } else if (path === "users") {
        const response = await axios.get(`/${path}/${id}`);
        selectedItem = response.data;
        navigate(`/${path}/${id}/edit`);
      } else {
        const response = await axios.get(`/${path}/${id}`);
        selectedItem = response.data;
        navigate(`/${path}/${id}`);
      }
      setSelectedItem(selectedItem);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="viewButton"
              onClick={() => handleView(params.row._id)}
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
