import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css'
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom'
import {  useSelector } from 'react-redux/es/hooks/useSelector';

function Header() {

    const login = useSelector((state: any) => state.auth)
    //console.log(login)

    return (
        <header>
            <Navbar className={styles.navbar}>
                <Container>
                    <Navbar.Brand className={styles.brand} href="/home">MailMate</Navbar.Brand>
                    <Nav className={styles.centerlinks}>
                        <NavLink activeClassName={styles.active} to="/home">Home</NavLink>
                        {!login.isLoggedIn && <NavLink activeClassName={styles.active} to="/login">Login</NavLink>}

                        {!login.isLoggedIn && <NavLink activeClassName={styles.active} to="/signup">Sign Up</NavLink>}

                        {login.isLoggedIn && <NavLink activeClassName={styles.active} to="/logout">LogOut</NavLink>}

                    </Nav>
                    <div>
                        {login.isLoggedIn && <p>{login.emailId}</p>}
                    </div>
                </Container>

            </Navbar>
        </header>
    )
}

export default Header
