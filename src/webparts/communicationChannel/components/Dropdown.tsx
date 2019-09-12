import * as React from "react";
import { render } from "react-dom";

export default class Dropdown extends React.Component<any, any> {
  render() {
    const { placeholder, label, input, meta } = this.props;

    return (
      <div className="form-group row">
        <label className="col-md-4">{label}</label>
        <div className="col-md-7">
          <select
            name={input.name}
            onChange={input.onChange}
            className="form-control"
          >
            <option value="finance">Finance</option>
            <option value="hr">HR</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="it">IT</option>

            {/* {props.options.map((x) => {
                    return (
                        <option key={x.key} value={x.value}>{x.text}</option>
                    )
                })} */}
          </select>
        </div>
      </div>
      // <Field name={name} validate={validate}>
      //   {({ input, meta }) => {
      //     return <input {...input} {...rest} />;
      //   }}
      // </Field>
    );
  }
}
