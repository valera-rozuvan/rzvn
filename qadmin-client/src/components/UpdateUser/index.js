import React, { useState } from "react";

const UpdateUser = props => {
  const [userId] = useState(props.currentUser.id);

  const [user, setUser] = useState({
    firstName: props.currentUser.firstName,
    lastName: props.currentUser.lastName,
    email: props.currentUser.email,
    isActive: props.currentUser.isActive,
  });

  const onInputChange = event => {
    const {name, value} = event.target;

    if (name === "isActive") {
      setUser({ ...user, [name]: !user.isActive});
    } else {
      setUser({...user, [name]: value});
    }
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({active: false});
  };

  const submit = event => {
    event.preventDefault();
    props.updateUser(userId, user);
  };

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>E-Mail</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Is active</label>
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={user.isActive}
          onChange={onInputChange}
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

export default UpdateUser;
