import * as React from "react";
import Footer from "./Footer";
import Home from "./Home";
import Auth from "./Auth";

export interface InitialProps {
  title: string;
  keyVal: string;
}

export interface InitialState {
  isLogged: boolean;
}

class Initial extends React.Component<InitialProps, InitialState> {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false
    };
  }

  componentDidMount() {
    const authKey = Office.context.roamingSettings.get("keyRecruitCRM");
    if (authKey) {
      this.setState({ isLogged: true });
    }
  }

  render() {
    return (
      <div className="ms-welcome">
        {this.state.isLogged ? (
          <div>
            {/* <Header title={this.props.title} /> */}
            <div
              style={{
                marginBottom: 40
              }}
            >
              <Home key={this.props.keyVal}/>
            </div>
          </div>
        ) : (
          <Auth />
        )}
        <Footer isLogged= {this.state.isLogged}/>
      </div>
    );
  }
}

export default Initial;
