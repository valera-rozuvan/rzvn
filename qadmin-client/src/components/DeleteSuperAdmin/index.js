import React, { useState } from "react";

const DeleteSuperAdmin = props => {
  const [superAdminId] = useState(props.currentSuperAdmin.id);
  const [email] = useState(props.currentSuperAdmin.email);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  const submit = event => {
    event.preventDefault();
    props.deleteSuperAdmin(superAdminId);
  };

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        Are you sure you want to delete "{email}"?
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Delete</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DeleteSuperAdmin;
