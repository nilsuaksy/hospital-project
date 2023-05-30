import { Container } from "reactstrap";
import NavbarCustom from "../components/NavbarCustom";
import AdminCustom from "../components/AdminPanel";
import SignUpCustom from "../components/SignUp";
import SignInCustom from "../components/SignIn";
import CardCustom from "../components/CardCustom";
import '../style.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MainLayout({ children }) {
    const navigate = useNavigate();

    useEffect(function () {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/auth');
        }
    }, []);

    return (
        <>
            <section class="min-vh-100 gradient-custom">

                <NavbarCustom />
                <Container style={{ marginTop: "3.7rem" }}>
                    <Outlet />
                </Container>
            </section>
        </>
    );
}


