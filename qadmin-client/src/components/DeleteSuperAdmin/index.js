import React, { useState, useEffect } from "react";

const DeleteSuperAdmin = props => {
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
        props.deleteSuperAdmin(superAdmin.id);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {superAdmin.email} {superAdmin.password}?
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
