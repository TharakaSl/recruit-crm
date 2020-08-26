import * as React from "react";
import Progress from "./Progress";
import Initial from "./Initial";


export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {

}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: []
    };
  }

  componentDidMount() {

  }

  click = async () => {
    /**
     * Insert your Outlook code here
     */
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    return (
      <div>
        <Initial title={this.props.title}/>
      </div>
    );
  }
}
