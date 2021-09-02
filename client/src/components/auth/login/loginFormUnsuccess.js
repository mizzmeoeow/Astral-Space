import React, { Component } from "react";
import LoginUnsuccessClouds from "../../body/clouds/loginUnsuccessClouds";

class LoginFormUnsuccess extends Component {
  render() {
    return (
      <div className="form-content-right">
        <div className="form-success">
          <LoginUnsuccessClouds />
        </div>
      </div>
    );
  }
}

export default LoginFormUnsuccess;
