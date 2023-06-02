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




export default function NavbarCustom() {
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
                            <Link className='nav-link' to='/'>Anasayfa</Link>
                            {/* <NavLink aria-current='page' href="/#">Anasayfa</NavLink> */}
                        </NavItem>


                        <UncontrolledDropdown style={{ paddingLeft: '20px' }} nav inNavbar>
                            <DropdownToggle className='nav-link' nav caret>
                                Kayıtlar
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className='dropdown-item'>
                                    <Link className='nav-link' to='/hastaneler'>Hastaneler</Link>
                                </DropdownItem>
                                <DropdownItem className='dropdown-item'>
                                    <Link className='nav-link' to='/patients'>Hastalar</Link>
                                </DropdownItem>
                                <DropdownItem className='dropdown-item'>
                                    <Link className='nav-link' to='/departments'>Muayeneler</Link>
                                </DropdownItem>
                                <DropdownItem className='dropdown-item'>
                                    <Link className='nav-link' to='/recipients'>Reçeteler</Link>
                                </DropdownItem>
                                <DropdownItem className='dropdown-item'>
                                    <Link className='nav-link' to='/alldetails'>Tablolar</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar >
        </>);
};