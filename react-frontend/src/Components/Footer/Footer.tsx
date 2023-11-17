import React from 'react'
import styles from './Footer.module.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'

function Footer() {
  return (
    <div className={styles.Footer}>
           
            <span >
                <Navbar  className={styles.footer}>
                    <Navbar.Brand href="/home" className={styles.Brand}>MailMate</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Youtube</Nav.Link>
                        <Nav.Link href="/features">Twitter</Nav.Link>
                        <Nav.Link href="/pricing">Facebook</Nav.Link>
                    </Nav>
                </Navbar>
            </span>

        </div>
  )
}

export default Footer
