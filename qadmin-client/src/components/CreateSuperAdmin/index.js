import React, {useState} from "react";

const CreateSuperAdmin = props => {
  const [superAdmin, setSuperAdmin] = useState({email: "", password: "", authToken: ""});

  const onInputChange = event => {
    const {name, value} = event.target;

    setSuperAdmin({...superAdmin, [name]: value});
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({active: false});
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!superAdmin.email) return;
        props.createSuperAdmin(superAdmin);
      }}
    >
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={superAdmin.email}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Create</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateSuperAdmin;
