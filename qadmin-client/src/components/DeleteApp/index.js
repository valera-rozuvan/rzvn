import React, { useState, useEffect } from "react";

const DeleteApp = props => {
  const [app, setApp] = useState(props.currentApp);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setApp(props.currentApp);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.deleteApp(app.id);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {app.serviceName} ?
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
