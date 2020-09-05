import * as React from "react";
import { PageHeader } from "antd";
import ReactDOM from "react-dom";
import Initial from "./Initial";

export interface HeaderProps {
  head: string;
}

export default class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <div className="site-page-header-ghost-wrapper">
        <PageHeader className="site-page-header" onBack={this.goToHome} title="" subTitle={this.props.head} />
      </div>
    );
  }

  goToHome = () => {
    ReactDOM.render(
      <Initial title="Recruit CRM" keyVal={new Date().getTime().toString()} />,
      document.getElementById("container")
    );
  };
}
