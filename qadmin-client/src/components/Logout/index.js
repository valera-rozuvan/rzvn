import * as React from 'react';

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: "SET_EMAIL", data: ""});
    dispatch({type: "SET_PASSWORD", data: ""});
    dispatch({type: "SET_AUTH_TOKEN", data: ""});

    navigate('/login');
  }, [navigate, dispatch]);

  return (
    <div>logout ...</div>
  );
}
