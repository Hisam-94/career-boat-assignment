import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const LoginWithOtp = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const [flag, setFlag] = useState(false);
  const [result, setResult] = useState();
  const navigate = useNavigate()

  const getOTP = async (e) => {
    e.preventDefault();
    setError("");
    if (number == "" || number == undefined) 
    return setError("Please enter a valid Phone Number");
    
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="p-4 box">
      <h2 className="mb-3">Firebase Phone Auth</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={getOTP} style={{display: !flag? "block" : "none"}}>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <PhoneInput
            defaultCountry="IN"
            value={number}
            onChange={setNumber}
            placeholder="Enter Phone No"
          />
          <div id="recaptcha-container"/>
        </Form.Group>

        <div className="button-right">
          <Link to="/login">
            <Button variant="secondary">Cancel</Button>
          </Link>
          &nbsp;
          <Button type="submit" variant="primary">
            Send Otp
          </Button>
        </div>
      </Form>
      <Form onSubmit={verifyOTP} style={{display:flag? "block" : "none"}}>
        <Form.Group className="mb-3" controlId="formBasicOtp">
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Group>

        <div className="button-right">
          <Link to="/login">
            <Button variant="secondary">Cancel</Button>
          </Link>
          &nbsp;
          <Button type="submit" variant="primary">
            Verify Otp
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginWithOtp;
