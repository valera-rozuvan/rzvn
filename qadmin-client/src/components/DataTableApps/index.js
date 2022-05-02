import React from "react";

// Styles
import "./style.scss";

// Images
// import PlaceholderImg from "../../img/placeholder-user.jpg";
import SortIcon from "../../img/sort-icon.png";

const DataTableApps = props => {
	return (
		<div className="table-wrapper">
			<table className="data-table">
				<thead>
					<tr>
						<th
							onClick={() => {
								props.onSortChange("serviceName");
							}}
						>
							<span className="column-sort">
								Service name
								<img src={SortIcon} alt="service name" />
							</span>
						</th>
						<th
							onClick={() => {
								props.onSortChange("publicKey");
							}}
						>
							<span className="column-sort">
								Public key
								<img src={SortIcon} alt="public key" />
							</span>
						</th>
						<th
							onClick={() => {
								props.onSortChange("privateKey");
							}}
						>
							<span className="column-sort">
								Private key
								<img src={SortIcon} alt="private key" />
							</span>
						</th>
						<th
							onClick={() => {
								props.onSortChange("callbackUrl");
							}}
						>
							<span className="column-sort">
							Callback url
								<img src={SortIcon} alt="callback url" />
							</span>
						</th>
						<th
							onClick={() => {
								props.onSortChange("createdAt");
							}}
						>
							<span className="column-sort">
							Created
								<img src={SortIcon} alt="created" />
							</span>
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{props.apps.length ? (
						props.apps.map(app => (
							<tr key={app.id}>
								<td>{app.serviceName}</td>
								<td>{app.publicKey}</td>
								<td>{app.privateKey}</td>
								<td>{app.callbackUrl}</td>
								<td>{app.createdAt}</td>
								<td className="field-actions">
									<button
										className="primary-btn"
										onClick={() => {
											props.updateRow(app);
										}}
									>
										Update
									</button>
									<button
										className="field-actions__delete"
										onClick={() => props.deleteRow(app)}
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

export default DataTableApps;
