import { Container } from "reactstrap";
import NavbarCustom from "../components/NavbarCustom";
import AdminCustom from "../components/AdminPanel";
import SignUpCustom from "../components/SignUp";
import SignInCustom from "../components/SignIn";
import CardCustom from "../components/CardCustom";
import '../style.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavbarAuth from "../components/NavbarAuth";

export default function AuthLayout({ children }) {


    return (
        <>
            <section class="min-vh-100 gradient-custom">

                <NavbarAuth />
                <Container style={{ marginTop: "3.7rem" }}>
                    <Outlet />
                </Container>
            </section>
        </>
    );
}


