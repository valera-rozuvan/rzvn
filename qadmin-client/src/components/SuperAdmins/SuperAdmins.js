// Library deps
import React, {useEffect, useState, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

// API utilities
import {SuperAdminsApi} from "../../api";
import {logApiError, isUnauthorizedError} from "../../api/tools";

// Styles
import "./SuperAdmins.scss";

// Components
import DataTableSuperAdmins from "../DataTableSuperAdmins";
import CreateSuperAdmin from "../CreateSuperAdmin";
import UpdateSuperAdmin from "../UpdateSuperAdmin";
import DeleteSuperAdmin from "../DeleteSuperAdmin";
import Modal from "../Modal";
import Pagination from "../Pagination";
import Loader from "../Loader";
import MySwal from "../../index";

// Constants
import { SuperAdminsActionTypes } from '../../constants/actions/SuperAdminsActionTypes';

const copySuperAdminData = ({id, email, password, isActive, createdAt}) => ({
  id,
  email,
  password,
  isActive,
  createdAt,
});

function SuperAdmins() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const superAdmins = useSelector(state => state.superAdmins);
  const authUser = useSelector(state => state.authUser);
  const authToken = useMemo(() => authUser.authToken, [authUser]);

  const [loading, setLoading] = useState(true);

  const [currentSuperAdmin, setCurrentSuperAdmin] = useState(copySuperAdminData({
    id: "",
    email: "",
    password: "",
    isActive: false,
    createdAt: "",
  }));
  const [activeModal, setActiveModal] = useState({name: "", active: false});
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const superAdminsLastIndex = currentPage * pageSize;
  const superAdminsFirstIndex = superAdminsLastIndex - pageSize;
  const currentSuperAdmins = superAdmins.slice(superAdminsFirstIndex, superAdminsLastIndex);

  const setModal = modal => {
    setActiveModal({name: modal, active: true});
  };

  const clearModal = () => {
    setActiveModal({name: "", active: false});
  };

  const paginate = page => {
    setCurrentPage(page);
  };

  // Invoke "Create SuperAdmin" modal dialog
  const createRow = () => {
    setModal("Create SuperAdmin");
  };

  // Invoke "Update superAdmin" modal dialog
  const updateRow = (superAdmin) => {
    setCurrentSuperAdmin(copySuperAdminData(superAdmin));

    setModal("Update SuperAdmin");
  };

  // Invoke "Delete superAdmin" modal dialog
  const deleteRow = (superAdmin) => {
    setCurrentSuperAdmin(copySuperAdminData(superAdmin));

    setModal("Delete SuperAdmin");
  };

  // Handles of updating the password for a SuperAdmin.
  const updatePassword = (id) => {
    async function callUpdateSuperAdminPasswordApi() {
      try {
        const api = new SuperAdminsApi(authToken);
        const result = await api.updateSuperAdminPassword(id);
        const updatedSuperAdmin = result.data;

        await MySwal.fire({
          icon: "success",
          title: "Super admin password updated successfully."
        });

        dispatch({
          type: SuperAdminsActionTypes.updateSuperAdmin,
          data: updatedSuperAdmin
        });
      } catch (err) {
        logApiError(err);

        if (isUnauthorizedError(err)) {
          return false;
        }

        await MySwal.fire({
          icon: "error",
          title: "Failed to update super admin."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callUpdateSuperAdminPasswordApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  };

  // Handles creation of a new SuperAdmin.
  const createSuperAdmin = (newSuperAdminData) => {
    async function callCreateSuperAdminApi() {
      try {
        const api = new SuperAdminsApi(authToken);
        const result = await api.createSuperAdmin({
          email: newSuperAdminData.email,
          isActive: newSuperAdminData.isActive,
        });
        const newSuperAdmin = result.data;

        await MySwal.fire({
          icon: "success",
          title: "Super admin created successfully."
        });
        dispatch({
          type: SuperAdminsActionTypes.createSuperAdmin,
          data: newSuperAdmin
        });
      } catch (err) {
        logApiError(err);

        if (isUnauthorizedError(err)) {
          return false;
        }

        await MySwal.fire({
          icon: "error",
          title: "Failed to create SuperAdmin."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callCreateSuperAdminApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  };

  // Handles updating of an existing SuperAdmin.
  const updateSuperAdmin = (id, updatedSuperAdminData) => {
    async function callUpdateSuperAdminApi() {
      try {
        const api = new SuperAdminsApi(authToken);
        const result = await api.updateSuperAdmin(id, {
          email: updatedSuperAdminData.email,
          isActive: updatedSuperAdminData.isActive,
        });
        const updatedSuperAdmin = result.data;

        await MySwal.fire({
          icon: "success",
          title: "Super admin updated successfully."
        });

        dispatch({
          type: SuperAdminsActionTypes.updateSuperAdmin,
          data: updatedSuperAdmin
        });
      } catch (err) {
        logApiError(err);

        if (isUnauthorizedError(err)) {
          return false;
        }

        await MySwal.fire({
          icon: "error",
          title: "Failed to update super admin."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callUpdateSuperAdminApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  };

  // Handles deletion of an existing SuperAdmin.
  const deleteSuperAdmin = (id) => {
    async function callDeleteSuperAdminApi() {
      try {
        const api = new SuperAdminsApi(authToken);
        await api.deleteSuperAdmin(id);

        await MySwal.fire({
          icon: "success",
          title: "Super admin deleted successfully."
        });

        dispatch({
          type: SuperAdminsActionTypes.deleteSuperAdmin,
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
          title: "Failed to delete super admin."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callDeleteSuperAdminApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  };

  // Populates the SuperAdmin list.
  useEffect(() => {
    async function callGetSuperAdminsApi() {
      try {
        const api = new SuperAdminsApi(authToken);
        const result = await api.getSuperAdmins();
        const superAdminList = result.data;

        dispatch({type: SuperAdminsActionTypes.setSuperAdmins, data: superAdminList});
      } catch (err) {
        logApiError(err);

        if (isUnauthorizedError(err)) {
          return false;
        }

        await MySwal.fire({
          icon: "error",
          title: "Failed to fetch SuperAdmin."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callGetSuperAdminsApi().then((isAuthorized) => {
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
                create new super admin
              </button>
            </div>
            <DataTableSuperAdmins
              superAdmins={currentSuperAdmins}
              updatePassword={updatePassword}
              updateRow={updateRow}
              deleteRow={deleteRow}
            />
            <Pagination
              totalResults={superAdmins.length}
              currentPage={currentPage}
              pageSize={pageSize}
              paginate={paginate}
            />
          </div>
        )}
      </div>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Create SuperAdmin" && (
            <CreateSuperAdmin
              createSuperAdmin={createSuperAdmin}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update SuperAdmin" && (
            <UpdateSuperAdmin
              currentSuperAdmin={currentSuperAdmin}
              updateSuperAdmin={updateSuperAdmin}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete SuperAdmin" && (
            <DeleteSuperAdmin
              currentSuperAdmin={currentSuperAdmin}
              deleteSuperAdmin={deleteSuperAdmin}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
    </main>
  );
}

export default SuperAdmins;
