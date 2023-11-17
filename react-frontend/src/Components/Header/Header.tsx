import React,{useState} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css'
import Nav from 'react-bootstrap/Nav';
import { NavLink} from 'react-router-dom'

function Header() {



    return (
        <header>
            <Navbar className={styles.navbar}>
                <Container>
                    <Navbar.Brand className={styles.brand} href="/home">MailMate</Navbar.Brand>
                    <Nav className={styles.centerlinks}>
                        <NavLink activeClassName={styles.active} to="/home">Home</NavLink>
                         <NavLink activeClassName={styles.active} to="/login">Login</NavLink>
                        
                        <NavLink activeClassName={styles.active} to="/signup">Sign Up</NavLink>
                 

                        <NavLink activeClassName={styles.active} to="/logout">LogOut</NavLink>

                    </Nav>

                </Container>
                
            </Navbar>
        </header>
    )
}

export default Header
