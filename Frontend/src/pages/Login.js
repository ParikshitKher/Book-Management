import axios from "axios";
import React, { useContext, useState } from "react";
import { GiBurningBook } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../context/Context";
import { clientId } from "../googleCredentials";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

function Login() {
  const [errorMsg, setErrorMsg] = useState("");

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useContext(LoginContext);

  const handleGoogle = () => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    // initClient();
    // gapi.load("client:auth2", initClient);
  };

  const onSuccess = (res) => {
    setIsLogged(true);
    if (isLogged) {
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("userId", res.googleId);
      localStorage.setItem("isGoogleLogged", true);
      navigate("/home");
    }
  };
  const onFailure = (err) => {
    // console.log("Failed :", err);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3002/user/signin", {
      email: emailText,
      password: passwordText,
    });
    localStorage.setItem("userId", res.data.userId);
    if (res.data.status === parseInt("401")) {
      setErrorMsg(res.data.response.message);
      setIsLogged(false);
      setEmailText("");
      setPasswordText("");
      navigate("/");
    } else {
      localStorage.setItem("token", res.data.token);
      setIsLogged(true);
      navigate("/home");
    }
  };

  const handleEmail = (e) => {
    setEmailText(e.target.value);
  };
  const handlePassword = (e) => {
    setPasswordText(e.target.value);
  };
  return (
    <div className="flex justify-center">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 ">
          <div>
            <GiBurningBook className="mx-auto h-16  w-auto" />
          </div>
          <div className=" block max-w-lg p-10 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="name@company.com"
                    value={emailText}
                    onChange={handleEmail}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value={passwordText}
                    onChange={handlePassword}
                  />
                </div>
              </div>
              <div className="mt-1">{errorMsg ? errorMsg : null}</div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign in
                </button>
              </div>
              <hr />
              <div className="flex justify-center" onClick={handleGoogle}>
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                  theme="dark"
                />
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/signup"}
                  className="font-medium hover:underline hover:text-blue-600 text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
