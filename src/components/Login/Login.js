import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    console.log(action.val);
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};
const passwordReducer=(state,action)=>{
  if (action.type === "USER_INPUT") {
    console.log(action.val);
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredCollegeName, setEnteredCollegeName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  // const [emailIsValid, setEmailIsValid] = useState();
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [collegenameIsValid, setCollegenameIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const {isValid:emailIsValid}=emailState;
  const {isValid:passwordIsValid}=passwordState;
  
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid &&
          passwordIsValid &&
          enteredCollegeName.trim().length > 0
      );
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, enteredCollegeName]);
 
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
 
    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.value.trim().length > 6 &&
        enteredCollegeName.trim().length > 1
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value })
    // setEnteredPassword(event.target.value);
    setFormIsValid(
      emailState.isValid &&
        event.target.value.trim().length > 6 &&
        enteredCollegeName.trim().length > 1
    );
  };
  const collegenameChangeHandler = (event) => {
    setEnteredCollegeName(event.target.value);
    setFormIsValid(
      emailState.isValid &&
        passwordState.value.trim().length > 6 &&
        event.target.value.trim().length > 1
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const validateCollegenameHandler = () => {
    setCollegenameIsValid(enteredCollegeName.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegenameIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collegename">College Name</label>
          <input
            id="collegename"
            value={enteredCollegeName}
            onChange={collegenameChangeHandler}
            onBlur={validateCollegenameHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
