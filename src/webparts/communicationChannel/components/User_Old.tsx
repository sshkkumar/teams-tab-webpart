  //import React, { Component } from "react";
import * as React from "react";
import { render } from "react-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import "./App.css";
import * as Dropzone from "react-dropzone";
import "bootstrap/dist/css/bootstrap.css";
import styled, { css } from "styled-components";
import Input from "./Input";
import Dropdown from "./Dropdown";

const required = val => (val ? undefined : "*");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values));
};

interface IUserState {
  filesToUpload: string[];
  items: string[];
}

class User extends React.Component<any, IUserState> {
  constructor(props) {
    super(props);
    // this.state = {
    //   filesToUpload: [],
    //   items: []
    // };
  }

  // onDrop = files => {
  //   console.log(files);
  //   // POST to a test endpoint for demo purposes
  //   //const req = request.post("https://httpbin.org/post");
  //   var items1 = files.map((item, key) => <li key={key}>{item.name}</li>);
  //   this.setState({ filesToUpload: files, items: items1 });

  //   // req.end();
  // };

  render() {
    return (
        <Styles>
          <h1>🏁 React Final Form with Dropzone</h1>
          <a href="https://github.com/erikras/react-final-form#-react-final-form">
            Read Docs
          </a>
        <Form
          onSubmit={onSubmit}
          initialValues={{ stooge: "larry", employed: false }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="firstName"
                component={Input}
                label="Title"
                title="First Name"
                placeholder="First Name"
                validate={required}
              />

              <Field name="description" validate={required}>
                {(
                  { input, meta } //destructuring of fieldstate which has 3 keys in it
                ) => (
                  <div className="form-group row">
                    <label className="col-md-4">Description</label>
                    <div className="col-md-7">
                      <textarea
                        {...input}
                        placeholder="Please provide description"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-1">
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </div>
                  </div>
                )}
              </Field>

              {/* <Field name="toppingsA" component="select">
                  <option value="chicken">Chicken</option>
                  <option value="ham">Ham</option>
                  <option value="mushrooms">Mushrooms</option>
                  <option value="cheese">Cheese</option>
                  <option value="tuna">Tuna</option>
                  <option value="pineapple">Pineapple</option>
                </Field> */}
              <Field
                name="department"
                component={Dropdown}
                label="Department"
                title="Department"
                validate={required}
              />

              {/* <div className="text-center mt-5">
                <Dropzone.default>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      {isDragActive
                        ? "Drop here..."
                        : "Click me or drag a file to upload."}
                    </div>
                  )}
                </Dropzone.default>
              </div> */}
              {/* <div className="card filePanel">
                <div className="card-header">
                  Number of files: {this.state.filesToUpload.length}
                </div>
                <div className="card-body fileList scrollable">
                  <ul className="card-text">{this.state.items}</ul>
                </div>
              </div> */}
              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
      </Styles>
    );
  }
}

export default User;
