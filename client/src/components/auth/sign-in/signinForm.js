import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../../actions/actionAuth";
import { Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitted: false,
      errors: "",
    };
  }

  componentDidUpdate(props) {
    if (props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (props.errors) {
      return {
        errors: props.errors,
      };
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    if (this.props.auth.isAuthenticated) return <Redirect to="/dashboard" />;
    else
      return (
        <div id="login">
          <div className="sign-in-form">
            <div className="input-group">
              <form onSubmit={this.onSubmit}>
                <div className="error-text">{this.state.errors}</div>

                <input
                  className="login-input"
                  type="email"
                  id="email"
                  name="email"
                  error={this.state.errors}
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                  autoComplete="none"
                  required
                />

                <div>
                  <input
                    className="login-input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    autoComplete="none"
                    required
                  />
                </div>
                <div className="">
                  <Popup
                    trigger={
                      <button className="login-btn" type="submit">
                        Launch
                      </button>
                    }
                    position="right center"
                  >
                    <div>
                      You have entered a wrong email or password, please try
                      again.
                    </div>
                  </Popup>

                  <a href="/">
                    <button type="button" className="back-btn">
                      Go Back
                    </button>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm));
