import * as React from "react";
import { Form, Field } from "react-final-form";

const Input = props => {
  const { placeholder, label, input, meta } = props;

  return (
    <div className="form-group row">
      <label className="col-md-4">{label}</label>
      <div className="col-md-7">
        <input
          type="text"
          {...input}
          placeholder={placeholder}
          className="form-control"
        />
      </div>
      <div className="col-md-1">
        {meta.error && meta.touched && (
          <span className="text-danger">{meta.error}</span>
        )}
      </div>
    </div>
    // <Field name={name} validate={validate}>
    //   {({ input, meta }) => {
    //     return <input {...input} {...rest} />;
    //   }}
    // </Field>
  );
};

export default Input;
