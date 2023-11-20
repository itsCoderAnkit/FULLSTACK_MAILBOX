import React from 'react'
import { Container } from 'react-bootstrap'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import styles from './ViewMail.module.css'

function ViewMail() {
const mail = useSelector((state)=>state.mail)
console.log(mail)

  return (
    <Container className={styles.Container}>
      <p>From : {mail.sender}</p><br></br>
      <p>Subject: {mail.subject}</p><br></br>
      <p>Content:</p>
      <div dangerouslySetInnerHTML={{ __html: mail.content }} />
    </Container>
  )
}

export default ViewMail
