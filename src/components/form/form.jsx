import React from "react";

const form = (props) => {
  return (
    <>
      <form onSubmit={props.handlerSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            value={props.first_name}
            onChange={props.handlerFirstName}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            value={props.last_name}
            onChange={props.handlerLastName}
          />
        </div>
        <button
          htmltype="submit"
          className="btn btn-primary"
          style={{ marginTop: "10px" }}
          disabled={props.buttonDisabled}
        >
          Submit
        </button>
      </form>
      ;
    </>
  );
};

export default form;
