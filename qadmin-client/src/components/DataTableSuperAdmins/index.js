import React from "react";

import "./style.scss";
import SortIcon from "../../img/sort-icon.png";

const DataTableSuperAdmins = props => {
	return (
		<div className="table-wrapper">
			<table className="data-table">
				<thead>
					<tr>
						<th
							onClick={() => {
								props.onSortChange("email");
							}}
						>
							<span className="column-sort">
								Email
								<img src={SortIcon} alt="Email" />
							</span>
						</th>
						<th
							onClick={() => {
								props.onSortChange("password");
							}}
						>
							<span className="column-sort">
								Password
								<img src={SortIcon} alt="Password" />
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
					{props.superAdmins.length ? (
						props.superAdmins.map(superAdmin => (
							<tr key={superAdmin.id}>
								<td>{superAdmin.email}</td>
								<td>{superAdmin.password}</td>
								<td>{superAdmin.createdAt}</td>
								<td>{superAdmin.isActive ? 'true' : 'false'}</td>
								<td className="field-actions">
									<button
										className="primary-btn"
										onClick={() => {
											props.updatePassword(superAdmin.id);
										}}
									>
										New Password
									</button>
									<button
										className="primary-btn"
										onClick={() => {
											props.updateRow(superAdmin);
										}}
									>
										Update
									</button>
									<button
										className="field-actions__delete"
										onClick={() => {
											props.deleteRow(superAdmin);
										}}
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

export default DataTableSuperAdmins;
