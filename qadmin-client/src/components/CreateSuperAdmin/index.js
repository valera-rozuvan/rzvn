import React, {useState} from "react";

const CreateSuperAdmin = props => {
  const [superAdmin, setSuperAdmin] = useState({
    email: "",
    isActive: false,
  });

  const onInputChange = event => {
    const {name, value} = event.target;

    if (name === "isActive") {
      setSuperAdmin({ ...superAdmin, [name]: !superAdmin.isActive});
    } else {
      setSuperAdmin({...superAdmin, [name]: value});
    }
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({active: false});
  };

  const submit = event => {
    event.preventDefault();
    props.createSuperAdmin(superAdmin);
  };

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={superAdmin.email}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Is active</label>
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={superAdmin.isActive}
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
