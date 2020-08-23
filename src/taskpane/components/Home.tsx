import * as React from "react";
/* global Spinner */

export interface HomeProps {
    
}

export default class Home extends React.Component<HomeProps> {
  render() {
    return (
      <section className="ms-welcome__progress ms-u-fadeIn500">
        <h1> Home </h1>
      </section>
    );
  }
}
