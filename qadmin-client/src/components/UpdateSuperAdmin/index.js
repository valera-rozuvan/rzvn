import React, { useState, useEffect } from "react";

const UpdateSuperAdmin = props => {
	const [superAdmin, setSuperAdmin] = useState(props.currentSuperAdmin);


	const cancel = event => {
		event.preventDefault();
		props.setActiveModal({ active: false });
	};


	useEffect(() => {
		setSuperAdmin(props.currentSuperAdmin);
	}, [props]);

	return (
		<form
			onSubmit={event => {
				event.preventDefault();
				props.updateSuperAdmin(superAdmin.id, superAdmin);
			}}
		>
			<div className="form-group">
				<label>E-Mail</label>
				<input
					type="email"
					name="email"
					value={superAdmin.email}
				/>
			</div>
			<div className="form-group">
				<label>Password</label>
				<input
					type="text"
					name="password"
					value={superAdmin.password}
				/>
			</div>
			<div className="form-group form-group--actions">
				<button className="primary-btn">Update</button>
				<button className="cancel-btn" onClick={cancel}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default UpdateSuperAdmin;
