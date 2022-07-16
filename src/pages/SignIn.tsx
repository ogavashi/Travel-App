import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const navigate = useNavigate();

  const onChangePasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const onChangeEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordValue.length >= 3 && passwordValue.length <= 20 && emailValue) navigate("/login");
  };

  return (
    <main className="sign-in-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form onSubmit={onFormSubmit} className="sign-in-form" autoComplete="off">
        <h2 className="sign-in-form__title">Sign In</h2>
        <label className="trip-popup__input input">
          <span className="input__heading">Email</span>
          <input
            onChange={onChangeEmailValue}
            value={emailValue}
            name="email"
            type="email"
            required
          />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Password</span>
          <input
            onChange={onChangePasswordValue}
            name="password"
            type="password"
            value={passwordValue}
            autoComplete="new-password"
            minLength={3}
            maxLength={12}
            required
          />
        </label>
        <button className="button" type="submit">
          Sign In
        </button>
      </form>
      <span>
        Already have an account?
        <Link to="/sign-up" className="sign-in-form__link">
          Sign Up
        </Link>
      </span>
    </main>
  );
};

export default SignIn;
