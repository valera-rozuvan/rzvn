// Library deps
import React, {useEffect, useState, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

// API utilities
import {UsersApi} from "../../api";
import {logApiError, isUnauthorizedError} from "../../api/tools";

// Styles
import "./Users.scss";

// Components
import DataTableUsers from "../../components/DataTableUsers";
import CreateUser from "../../components/CreateUser";
import UpdateUser from "../../components/UpdateUser";
import DeleteUser from "../../components/DeleteUser";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import MySwal from "../../index";

// Constants
import { UsersActionTypes } from '../../constants/actions/UsersActionTypes';

const copyUserData = ({id, firstName, lastName, email, isActive, createdAt}) => ({
  id,
  firstName,
  lastName,
  email,
  isActive,
  createdAt,
});

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users);
  const authUser = useSelector(state => state.authUser);
  const authToken = useMemo(() => authUser.authToken, [authUser]);

  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(copyUserData({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    isActive: false,
    createdAt: "",
  }));
  const [activeModal, setActiveModal] = useState({name: "", active: false});
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const usersLastIndex = currentPage * pageSize;
  const usersFirstIndex = usersLastIndex - pageSize;
  const currentUsers = users.slice(usersFirstIndex, usersLastIndex);

  const setModal = modal => {
    setActiveModal({name: modal, active: true});
  };

  const clearModal = () => {
    setActiveModal({name: "", active: false});
  };

  const paginate = page => {
    setCurrentPage(page);
  };

  // Invoke "Create User" modal dialog
  const createRow = () => {
    setModal("Create User");
  };

  // Invoke "Update User" modal dialog
  const updateRow = (user) => {
    setCurrentUser(copyUserData(user));

    setModal("Update User");
  };

  // Invoke "Delete User" modal dialog
  const deleteRow = (user) => {
    setCurrentUser(copyUserData(user));

    setModal("Delete User");
  };

  // Handles creation of a new User.
  const createUser = (newUserData) => {
    async function callCreateUserApi() {
      try {
        const api = new UsersApi(authToken);
        const result = await api.createUser({
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          email: newUserData.email,
          isActive: newUserData.isActive,
        });
        const newUser = result.data;

        await MySwal.fire({
          icon: "success",
          title: "User created successfully."
        });

        dispatch({
          type: UsersActionTypes.createUser,
          data: newUser
        });
      } catch (err) {
        logApiError(err);

        if (isUnauthorizedError(err)) {
          return false;
        }

        await MySwal.fire({
          icon: "error",
          title: "Failed to create user."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callCreateUserApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  };

  // Handles updating of an existing User.
  const updateUser = (id, updatedUserData) => {
    async function callUpdateUserApi() {
      try {
        const api = new UsersApi(authToken);
        const result = await api.updateUser(id, {
          firstName: updatedUserData.firstName,
          lastName: updatedUserData.lastName,
          email: updatedUserData.email,
          isActive: updatedUserData.isActive,
        });
        const updatedUser = result.data;

        await MySwal.fire({
          icon: "success",
          title: "User updated successfully."
        });

        dispatch({
          type: UsersActionTypes.updateUser,
          data: updatedUser
        });
      } catch (err) {
        logApiError(err);

        if (isUnauthorizedError(err)) {
          return false;
        }

        await MySwal.fire({
          icon: "error",
          title: "Failed to update user."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callUpdateUserApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  };

  // Handles deletion of an existing User.
  const deleteUser = (id) => {
    async function callDeleteUserApi() {
      try {
        const api = new UsersApi(authToken);
        await api.deleteUser(id);

        await MySwal.fire({
          icon: "success",
          title: "User deleted successfully."
        });

        dispatch({
          type: UsersActionTypes.deleteUser,
          data: {id}
        });

        setCurrentPage(1);
      } catch (err) {
        logApiError(err);

        if (isUnauthorizedError(err)) {
          return false;
        }

        await MySwal.fire({
          icon: "error",
          title: "Failed to delete user."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callDeleteUserApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  };

  // Populates the User list.
  useEffect(() => {
    async function callGetUsersApi() {
      try {
        const api = new UsersApi(authToken);
        const result = await api.getUsers();
        const userList = result.data;

        dispatch({type: UsersActionTypes.setUsers, data: userList});
      } catch (err) {
        logApiError(err);

        if (isUnauthorizedError(err)) {
          return false;
        }

        await MySwal.fire({
          icon: "error",
          title: "Failed to fetch users."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callGetUsersApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  }, [dispatch, navigate, authToken]);

  return (
    <main className="content">
      <div className="container">
        {loading ? (
          <Loader/>
        ) : (
          <div className="content-wrapper">
            <div className="toolbar">
              <button
                className="primary-btn"
                onClick={() => createRow()}
              >
                Create New User
              </button>
            </div>
            <DataTableUsers
              users={currentUsers}
              updateRow={updateRow}
              deleteRow={deleteRow}
            />
            <Pagination
              totalResults={users.length}
              currentPage={currentPage}
              pageSize={pageSize}
              paginate={paginate}
            />
          </div>
        )}
      </div>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Create User" && (
            <CreateUser
              createUser={createUser}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update User" && (
            <UpdateUser
              currentUser={currentUser}
              updateUser={updateUser}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete User" && (
            <DeleteUser
              currentUser={currentUser}
              deleteUser={deleteUser}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
    </main>
  );
}

export default Users;
