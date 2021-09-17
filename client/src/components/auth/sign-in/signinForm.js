import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../../actions/actionAuth";
import { Redirect } from "react-router-dom";
import classnames from "classnames";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitted: false,
      errors: false,
      loading: false,
      message: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value, errors: "" });
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
    return (
      <div id="login">
        <div className="sign-in-form">
          <div className="input-group">
            <div className="error-text">{this.state.error}</div>
            <form onSubmit={this.onSubmit}>
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
              <input
                className={classnames("login-input", {
                  invalid: errors.email || errors.emailnotfound,
                })}
                type="email"
                id="email"
                name="email"
                error={errors.email}
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChange}
                autoComplete="none"
                required
              />

              <div>
                <input
                  className={classnames("login-input", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
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
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="">
                <button className="login-btn" type="submit">
                  Launch
                </button>

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
