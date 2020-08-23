import * as React from "react";
/* global Spinner */

export interface AuthProps {

}

export default class Auth extends React.Component<AuthProps> {
  render() {
    return (
      <section className="ms-welcome__progress ms-u-fadeIn500">
        <h1> Auth </h1>
      </section>
    );
  }
}
