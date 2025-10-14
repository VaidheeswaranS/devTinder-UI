import React, { useState } from "react";

const Login = () => {
  const [emaiId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <div className="w-3/12 border border-white absolute mx-auto my-32 left-0 right-0 py-10 px-10 flex flex-col bg-base-300 items-center">
      <h1 className="mb-4 text-lg px-2 text-center">Login</h1>
      <label className="input validator">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </g>
        </svg>
        <input
          type="text"
          required
          placeholder="Email"
          pattern="[A-Za-z][A-Za-z0-9\-]*"
          minLength="3"
          maxLength="30"
          title="Only letters, numbers or dash"
          value={emaiId}
          onChange={(event) => setEmailId(event.target.value)}
        />
      </label>
      <p className="validator-hint">
        Must be 3 to 30 characters
        <br />
        containing only letters, numbers or dash
      </p>
      <label className="input validator">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input
          type="password"
          required
          placeholder="Password"
          minLength="8"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <p className="validator-hint hidden">
        Must be more than 8 characters, including
        <br />
        At least one number <br />
        At least one lowercase letter <br />
        At least one uppercase letter
      </p>
      <button
        className="bg-base-100 rounded-md p-3 text-center w-[320px] cursor-pointer mt-10"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
