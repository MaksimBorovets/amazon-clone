import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
    // some fancy firebase login....
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it sucessfully created a new user with
        // email and password
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));

    // do some fancy firebase login....
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="data:image/png;base64,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"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form action="">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign in
          </button>
        </form>
        <p>
          By sign-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookie Notice and our
          Interest-Based Ads Notice
        </p>
        <button className="login__registerButton" onClick={register}>
          Create AMAZON account{" "}
        </button>

        <div className="warning">
          <p>
            !!! Attention, this site was created for a portfolio! This is a DEMO
            version, do not make purchases and do not use payment !!!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
