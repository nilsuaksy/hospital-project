import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,

} from 'reactstrap';
import Image from '../33777.png';
import '../style.css';
import { Link } from 'react-router-dom';




export default function NavbarAuth() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <Navbar style={{ paddingTop: '0px', paddingBottom: '0px' }} expand={'lg'} color='light' fixed='top' >
                <NavbarBrand href="/"> <img src={Image} alt="hospital" style={{ width: '50px', height: '50px', marginLeft: '10px' }} /> </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto mb-2 mb-lg-0" >
                        <NavItem className="navcolor" style={{ paddingLeft: '20px' }}>
                            <Link className='nav-link' to='/auth'>Anasayfa</Link>
                            {/* <NavLink aria-current='page' href="/#">Anasayfa</NavLink> */}
                        </NavItem>
                        <NavItem style={{ paddingLeft: '20px' }}>
                            <Link className='nav-link' to='/auth/signup'>Üye Ol</Link>

                            {/* <NavLink className="nav-link" aria-current='page' href="/#">Üye Ol</NavLink> */}
                        </NavItem>
                        <NavItem style={{ paddingLeft: '20px' }}>
                            <Link className='nav-link' to='/auth/signin'>Giriş Yap</Link>

                            {/* <NavLink className='nav-link' aria-current='page' href="/#">Giriş Yap</NavLink> */}
                        </NavItem>


                    </Nav>
                </Collapse>
            </Navbar >
        </>);
};