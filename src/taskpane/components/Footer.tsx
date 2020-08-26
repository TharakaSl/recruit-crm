import * as React from "react";
import { getClassNames } from "../../../classNames/Footer.classNames";
import { Label, Link } from "office-ui-fabric-react";
import * as ReactDOM from "react-dom";
import Initial from "./Initial";
import { Spin } from "antd";
export interface FooterProps {
  isLogged: boolean;
}

export interface FooterState {
  blocking: boolean;
  loaderType: string;
}

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props, {}) {
    super(props, {});

    this.state = {
      blocking: false,
      loaderType: "Grid"
    };
  }

  componentDidMount() {}

  render() {
    let { copyrightbl } = getClassNames();
    return (
      <div>
        {!this.state.blocking ? (
          <div className="ms-Grid" dir="ltr">
            <div
              className="ms-Grid-row"
              style={{
                backgroundColor: "#ffffff",
                minHeight: 20,
                position: "fixed",
                bottom: 0,
                left: 8,
                right: 8
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Label className={copyrightbl} style={{ display: "inline-block" }}>
                  © 2020 - v 1.0.2
                </Label>
                {this.props.isLogged && (
                  <Link
                    title="Sign out"
                    onClick={this.onDisconnect}
                    style={{ display: "inline-block", fontSize: "12px" }}
                  >
                    Sign out
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="centered">
            <Spin />
          </div>
        )}
      </div>
    );
  }

  onDisconnect = () => {
    this.setState({ blocking: true });
    Office.context.roamingSettings.remove("keyRecruitCRM");
    Office.context.roamingSettings.saveAsync((asyncResult: Office.AsyncResult<void>) => {
      console.log(asyncResult);
      setTimeout(() => {
        this.setState({ blocking: false });
        ReactDOM.render(<Initial title="Woocommerce Add in" />, document.getElementById("container"));
      }, 3000);
    });
  };
}

export default Footer;
