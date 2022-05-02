import React from "react";

// Styles
import "./style.scss";

// Images
// import PlaceholderImg from "../../img/placeholder-user.jpg";
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
								props.onSortChange("authToken");
							}}
						>
							<span className="column-sort">
								AuthToken
								<img src={SortIcon} alt="AuthToken" />
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
								<td>{superAdmin.authToken}</td>
								<td className="field-actions">
									<button
										className="primary-btn"
										onClick={() => {
											props.updatePassword(superAdmin.id);
										}}
									>New Password
									</button>
									<button
										className="field-actions__delete"
										onClick={() => props.deleteRow(superAdmin)}
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
