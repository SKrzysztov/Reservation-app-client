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
                    ? "Mogą być tylko litery łacinskie i liczby (musi zawierac od 3 do 14 znaków)"
                    : "";
                break;
            case "password":
                error = !value.match(/^[A-Za-z0-9]{5,14}$/)
                    ? "Mogą być tylko litery łacinskie i liczby (musi zawierac od 3 do 14 znaków)"
                    : "";
                break;
            case "firstName":
                error = !value.match(/^[A-Za-z]{2,30}$/)
                    ? "Imie moze zawierac tylko litery lacinskie oraz musi miec od 2 do 30 znaków"
                    : "";
                break;
            case "lastName":
                error = !value.match(/^[A-Za-z]{2,30}$/)
                    ? "Imie moze zawierac tylko litery lacinskie oraz musi miec od 2 do 30 znaków"
                    : "";
                break;
            case "email":
                error = !value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                    ? "Nieprawidlowy email"
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
        <div className="login_container">
            <Container>
                <Row className="login_form_container">
                    <Col className="left" xs={12} md={8}>
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
                                placeholder="Hasło"
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
                                placeholder="Imię"
                                name="firstName"
                                onChange={handleChange}
                                value={data.firstName}
                                className="input"
                            />
                            {formErrors.firstName && <div className="error_msg">{formErrors.firstName}</div>}
                            <Form.Control
                                type="text"
                                placeholder="Nazwisko"
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
                                Zarejestruj się
                            </Button>
                        </Form>
                    </Col>
                    <Col className="right" xs={0} md={4}> {/* Ukryj kolumnę w wersji mobilnej */}
                        <h1>Masz już konto? Zaloguj się</h1>
                        <Link to="/login">
                            <Button
                                type="button"
                                className="mt-4"
                                size="lg"
                                variant="outline-light"
                            >
                               Zaloguj
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;
