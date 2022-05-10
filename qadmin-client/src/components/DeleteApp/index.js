import React, { useState } from "react";

const DeleteApp = props => {
  const [appId] = useState(props.currentApp.id);
  const [serviceName] = useState(props.currentApp.serviceName);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  const submit = event => {
    event.preventDefault();
    props.deleteApp(appId);
  };

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        Are you sure you want to delete "{serviceName}"?
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

export default DeleteApp;
