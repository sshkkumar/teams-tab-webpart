import * as React from "react";
import { render } from "react-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import "./App.css";
import * as Dropzone from "react-dropzone";
import "bootstrap/dist/css/bootstrap.css";

import Input from "./Input";
import Dropdown from "./Dropdown";
import { IUserProps } from "./IUserProps";
import { IUserState } from "./IUserState";
import {
  PeoplePicker,
  PrincipalType
} from "@pnp/spfx-controls-react/lib/PeoplePicker";

// interface IUserState {
//   filesToUpload: number[];
//   items: string[];
//   users: string[];
// }

const validate = val => (val ? undefined : "*");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values));
};

export default class User extends React.Component<IUserProps, IUserState> {
  constructor(props) {
    super(props);

    this.state = {
      filesToUpload: [],
      items: [],
      users: []
    };
  }

  private getPeoplePickerItems(items: any[]) {
    console.log("Items:", items);
  }

  onDrop = files => {
    console.log("files: " + files);
    // POST to a test endpoint for demo purposes
    //const req = request.post("https://httpbin.org/post");
    var fileItems = files.map((item, key) => <li key={key}>{item.name}</li>);
    this.setState({ filesToUpload: files, items: fileItems });

    // req.end();
  };

  render() {
    return (
      <Styles>
        <div>
          Please fill in the form below to request for document approval
        </div>
        <Form
          onSubmit={onSubmit}
          initialValues={{ department: "IT" }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="title"
                component={Input}
                label="Title"
                title="Title"
                placeholder="Title"
                validate={validate}
              />

              <Field name="description" validate={validate}>
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

              <Field
                name="customerName"
                component={Input}
                label="Customer Name"
                title="customerName"
                placeholder="Customer Name"
              />

              <Field
                name="department"
                component={Dropdown}
                label="Department"
                title="Department"
                validate={validate}
              />

              <Field
                name="documentType"
                component={Input}
                label="Document Type"
                title="documentType"
                placeholder="Document Type"
              />

              <Field name="approver" validate={validate}>
                {({ input, meta }) => (
                  <div className="form-group row">
                    <label className="col-md-4">Approver</label>
                    <div className="col-md-7">
                      <PeoplePicker
                        context={this.props.spContext} //titleText="People Picker"
                        personSelectionLimit={3}
                        groupName={""} // Leave this blank in case you want to filter from all users
                        showtooltip={true}
                        isRequired={true}
                        disabled={false}
                        ensureUser={true}
                        selectedItems={this.getPeoplePickerItems}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000}
                        errorMessage="Please enter approver"
                        // peoplePickerWPclassName="form-control"
                        // peoplePickerCntrlclassName="form-control"
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

              {/* <Field
                name="appprover"
                component={Input}
                label="Appprover"
                title="appprover"
                placeholder="Approver Name"
                validate={validate}
              /> */}

              <div className="text-center mt-5">
                <Dropzone.default onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      {isDragActive
                        ? "Drop here..."
                        : "Click here or drag a file to upload."}
                    </div>
                  )}
                </Dropzone.default>
              </div>
              <div className="card filePanel">
                <div className="card-header">
                  Number of files: {this.state.filesToUpload.length}
                </div>
                <div className="card-body fileList scrollable">
                  <ul className="card-text">{this.state.items}</ul>
                </div>
              </div>

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
