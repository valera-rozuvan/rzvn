import React, { useState } from "react";

const DeleteUser = props => {
  const [userId] = useState(props.currentUser.id);
  const [email] = useState(props.currentUser.email);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  const submit = event => {
    event.preventDefault();
    props.deleteUser(userId);
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

export default DeleteUser;
