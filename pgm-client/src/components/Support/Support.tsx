import React from 'react';
import { Link } from "react-router-dom"

function Support() {
  return (
    <>
      <p>Do you want to support PG Messenger?</p>
      <Link to="/">$1/mo</Link>
      <Link to="/">$5/mo</Link>
      <Link to="/">$25/mo</Link>
    </>
  );
}

export default Support;
