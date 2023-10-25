import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./register.css";

const Register = ({ registerUser }) => {
    const [data, setData] = useState({
        login: "",
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const [formErrors, setFormErrors] = useState({
        login: "",
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        let error = "";
        switch (name) {
            case "login":
                error = !value.match(/^[A-Za-z0-9]{3,14}$/)
                    ? "Login must be alphanumeric and 3-14 characters long"
                    : "";
                break;
            case "password":
                error = !value.match(/^[A-Za-z0-9]{5,14}$/)
                    ? "Password must be alphanumeric and 5-14 characters long"
                    : "";
                break;
            case "firstName":
                error = !value.match(/^[A-Za-z]{2,30}$/)
                    ? "First Name must contain only alphabetic characters (2-30 characters)"
                    : "";
                break;
            case "lastName":
                error = !value.match(/^[A-Za-z]{2,30}$/)
                    ? "Last Name must contain only alphabetic characters (2-30 characters)"
                    : "";
                break;
            case "email":
                error = !value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                    ? "Invalid email format"
                    : "";
                break;
            default:
                break;
        }

        setData({ ...data, [name]: value });
        setFormErrors({ ...formErrors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasErrors = Object.values(formErrors).some((error) => error !== "");
        if (hasErrors) {
            console.log("Form has errors");
            return;
        }

        try {
            await registerUser(data.login, data.password, data.firstName, data.lastName, data.email);
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div style={{ height: "100vh" }} className="App">
            <Container className="signup_container">
                <Row className="signup_form_container">
                    <Col className="left" xs={12} md={4}>
                        <h1>Move to login page</h1>
                        <Link to="/login">
                            <Button
                                type="button"
                                className="mt-4"
                                size="lg"
                                variant="outline-light"
                            >
                                Sign in
                            </Button>
                        </Link>
                    </Col>
                    <Col className="right" xs={12} md={8}>
                        <Form className="form_container" onSubmit={handleSubmit}>
                            <h1>Create Account</h1>
                            <Form.Control
                                type="text"
                                placeholder="Login"
                                name="login"
                                onChange={handleChange}
                                value={data.login}
                                className="input my-2 mt-4"
                            />
                            {formErrors.login && <div className="error_msg">{formErrors.login}</div>}
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                className="input"
                            />
                            {formErrors.password && (
                                <div className="error_msg">{formErrors.password}</div>
                            )}
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                onChange={handleChange}
                                value={data.firstName}
                                className="input"
                            />
                            {formErrors.firstName && <div className="error_msg">{formErrors.firstName}</div>}
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={handleChange}
                                value={data.lastName}
                                className="input"
                            />
                            {formErrors.lastName && <div className="error_msg">{formErrors.lastName}</div>}
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                className="input"
                            />
                            {formErrors.email && <div className="error_msg">{formErrors.email}</div>}
                            <Button
                                type="submit"
                                className="my-4"
                                size="lg"
                                variant="outline-light"
                            >
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;
