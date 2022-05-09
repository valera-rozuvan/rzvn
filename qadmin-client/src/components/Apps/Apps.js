// Library deps
import React, {useEffect, useState, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

// API utilities
import {AppsApi} from "../../api";
import {logApiError, isUnauthorizedError} from "../../api/tools";

// Styles
import "./Apps.scss";

// Components
import DataTableApps from "../../components/DataTableApps";
import CreateApp from "../../components/CreateApp";
import UpdateApp from "../../components/UpdateApp";
import DeleteApp from "../../components/DeleteApp";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import MySwal from "../../index";

// Constants
import { AppsActionTypes } from '../../constants/actions/AppsActionTypes';

const copyAppData = ({id, serviceName, publicKey, privateKey, isActive, callbackUrl, createdAt}) => ({
  id,
  serviceName,
  publicKey,
  privateKey,
  isActive,
  callbackUrl,
  createdAt,
});

function Apps() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apps = useSelector(state => state.apps);
  const authUser = useSelector(state => state.authUser);
  const authToken = useMemo(() => authUser.authToken, [authUser]);

  const [loading, setLoading] = useState(true);

  const [currentApp, setCurrentApp] = useState(copyAppData({
    id: '',
    serviceName: '',
    publicKey: '',
    privateKey: '',
    isActive: false,
    callbackUrl: '',
    createdAt: '',
  }));
  const [activeModal, setActiveModal] = useState({name: "", active: false});
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const appsLastIndex = currentPage * pageSize;
  const appsFirstIndex = appsLastIndex - pageSize;
  const currentApps = apps.slice(appsFirstIndex, appsLastIndex);

  const setModal = modal => {
    setActiveModal({name: modal, active: true});
  };

  const clearModal = () => {
    setActiveModal({name: "", active: false});
  };

  const paginate = page => {
    setCurrentPage(page);
  };

  // Invoke "Create App" modal dialog
  const createRow = () => {
    setModal("Create App");
  };

  // Invoke "Update App" modal dialog
  const updateRow = (app) => {
    setCurrentApp(copyAppData(app));

    setModal("Update App");
  };

  // Invoke "Delete App" modal dialog
  const deleteRow = (app) => {
    setCurrentApp(copyAppData(app));

    setModal("Delete App");
  };

  // Handles creation of a new App.
  const createApp = (newAppData) => {
    async function callCreateAppApi() {
      try {
        const api = new AppsApi(authToken);
        const result = await api.createApp({
          serviceName: newAppData.serviceName,
          publicKey: newAppData.publicKey,
          privateKey: newAppData.privateKey,
          callbackUrl: newAppData.callbackUrl,
          isActive: newAppData.isActive,
        });
        const newApp = result.data;

        await MySwal.fire({
          icon: "success",
          title: "App created successfully."
        });

        dispatch({
          type: AppsActionTypes.createApp,
          data: newApp
        });
      } catch (err) {
        logApiError(err);

        if (isUnauthorizedError(err)) {
          return false;
        }

        await MySwal.fire({
          icon: "error",
          title: "Failed to create app."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callCreateAppApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  };

  // Handles updating of an existing App.
  const updateApp = (id, updatedAppData) => {
    async function callUpdateAppApi() {
      try {
        const api = new AppsApi(authToken);
        const result = await api.updateApp(id, {
          serviceName: updatedAppData.serviceName,
          publicKey: updatedAppData.publicKey,
          privateKey: updatedAppData.privateKey,
          callbackUrl: updatedAppData.callbackUrl,
          isActive: updatedAppData.isActive,
        });
        const updatedApp = result.data;

        await MySwal.fire({
          icon: "success",
          title: "App updated successfully."
        });

        dispatch({
          type: AppsActionTypes.updateApp,
          data: updatedApp
        });
      } catch (err) {
        logApiError(err);

        if (isUnauthorizedError(err)) {
          return false;
        }

        await MySwal.fire({
          icon: "error",
          title: "Failed to update app."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callUpdateAppApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  };

  // Handles deletion of an existing App.
  const deleteApp = (id) => {
    async function callDeleteAppApi() {
      try {
        const api = new AppsApi(authToken);
        await api.deleteApp(id);

        await MySwal.fire({
          icon: "success",
          title: "App deleted successfully."
        });

        dispatch({
          type: AppsActionTypes.deleteApp,
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
          title: "Failed to delete app."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callDeleteAppApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  };

  // Populates the App list.
  useEffect(() => {
    async function callGetAppsApi() {
      try {
        const api = new AppsApi(authToken);
        const result = await api.getApps();
        const appList = result.data;

        dispatch({type: AppsActionTypes.setApps, data: appList});
      } catch (err) {
        logApiError(err);

        if (isUnauthorizedError(err)) {
          return false;
        }

        await MySwal.fire({
          icon: "error",
          title: "Failed to fetch apps."
        });
      }

      return true;
    }

    clearModal();
    setLoading(true);

    callGetAppsApi().then((isAuthorized) => {
      if (!isAuthorized) {
        navigate('/logout');
        return;
      }

      setLoading(false);
    });
  }, [dispatch, navigate, authToken,]);

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
                Create New App
              </button>
            </div>
            <DataTableApps
              apps={currentApps}
              updateRow={updateRow}
              deleteRow={deleteRow}
            />
            <Pagination
              totalResults={apps.length}
              currentPage={currentPage}
              pageSize={pageSize}
              paginate={paginate}
            />
          </div>
        )}
      </div>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Create App" && (
            <CreateApp
              createApp={createApp}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update App" && (
            <UpdateApp
              currentApp={currentApp}
              updateApp={updateApp}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete App" && (
            <DeleteApp
              currentApp={currentApp}
              deleteApp={deleteApp}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
    </main>
  );
}

export default Apps;
