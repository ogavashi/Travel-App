import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const navigate = useNavigate();

  const onChangePasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const onChangeEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  const onChangeNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordValue.length >= 3 && passwordValue.length <= 20 && emailValue && nameValue)
      navigate("/login");
  };

  return (
    <main className="sign-up-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form onSubmit={onFormSubmit} className="sign-up-form" autoComplete="off">
        <h2 className="sign-up-form__title">Sign Up</h2>
        <label className="trip-popup__input input">
          <span className="input__heading">Full name</span>
          <input onChange={onChangeNameValue} minLength={1} name="full-name" type="text" required />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Email</span>
          <input onChange={onChangeEmailValue} name="email" type="email" required />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Password</span>
          <input
            onChange={onChangePasswordValue}
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={3}
            required
          />
        </label>
        <button className="button" type="submit">
          Sign Up
        </button>
      </form>
      <span>
        Already have an account?
        <Link to="/sign-in" className="sign-up-form__link">
          Sign In
        </Link>
      </span>
    </main>
  );
};

export default SignUp;
