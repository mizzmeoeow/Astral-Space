import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../../actions/actionAuth";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitted: false,
      errorText: "",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      this.setState({ error: false });
    } catch (error) {
      alert("you have entered the wrong credentials, bring try again.");
    }
  }

  componentDidUpdate(props) {
    if (props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value, errorText: "" });
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
    if (this.props.auth.isAuthenticated) return <Redirect to="/dashboard" />;
    return (
      <div id="login">
        <div className="sign-in-form">
          <div className="input-group">
            <div className="error-text">{this.state.errorText}</div>

            <form onSubmit={this.onSubmit}>
              <input
                className="login-input"
                type="email"
                id="email"
                name="email"
                error={this.state.errorText}
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
                  error={this.state.errorText}
                  autoComplete="none"
                  required
                />
              </div>
              <div className="">
                <button className="login-btn" type="submit">
                  Launch
                </button>

                <a href="/">
                  <button
                    onClick={this.handleClick}
                    type="button"
                    className="back-btn"
                  >
                    Go Back
                  </button>
                </a>
              </div>
              {/* <div>
                <p
                  aria-atomic="true"
                  data-testid="login-error-message"
                  id="slfErrorAlert"
                  role="alert"
                >
                  Sorry, your email or password was incorrect. Please
                  double-check your credentials.
                </p>
              </div> */}
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
