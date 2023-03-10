import React from "react";

import "./style.scss";
import SortIcon from "../../img/sort-icon.png";

const DataTableUsers = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th
              onClick={() => {
                props.onSortChange("firstName");
              }}
            >
              <span className="column-sort">
                First Name
                <img src={SortIcon} alt="First Name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("lastName");
              }}
            >
              <span className="column-sort">
                Last Name
                <img src={SortIcon} alt="Last Name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("email");
              }}
            >
              <span className="column-sort">
                E-Mail
                <img src={SortIcon} alt="E-Mail" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("createdAt");
              }}
            >
							<span className="column-sort">
								Created At
								<img src={SortIcon} alt="Created At" />
							</span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("isActive");
              }}
            >
							<span className="column-sort">
								Is active
								<img src={SortIcon} alt="Is active" />
							</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length ? (
            props.users.map(user => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>{user.isActive ? 'true' : 'false'}</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(user);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableUsers;
