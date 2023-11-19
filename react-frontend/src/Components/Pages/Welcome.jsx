import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import styles from './Welcome.module.css'
import MailList from '../MailList/MailList';
import Table from 'react-bootstrap/Table';
import { findAllByTestId } from '@testing-library/react';


let firstLoad = true

// interface Mail {
//   content: string;
//   createdAt: string;
//   id: number;
//   receiver: string;
//   sender: string;
//   subject: string | null;
//   updatedAt: string;
//   userId: number;
// }

function Welcome() {


  const history = useHistory()

  //const [allMails,setAllMails]= useState<Mail[]>([])
  const [allMails, setAllMails] = useState([])
  const [previewMail, setPreviewMail] = useState([])
  const [mailType, setMailType] = useState('inbox')

  const composeMailHandler = () => {
    history.push('/compose-mail')
  }

  useEffect(() => {

    if (!firstLoad) {
      console.log("useEffect of dependency")
      console.log(allMails)

      const updateMails = allMails.map((item, index) =>
      //console.log(item,index)
      (<tr key={index}>
        <td>{index + 1}</td>
        {mailType==='inbox'?<td>{item.sender}</td>:<td>{item.receiver}</td>}
        {/* <td>{item.sender}</td> */}
        <td>{item.subject}</td>
        <td>{item.createdAt}</td>
        <td>{<Button variant="primary" type="submit" onClick={viewMailHandler} id={item.id}>Edit</Button>}</td>
        <td>{<Button variant="primary" type="submit" onClick={deleteMailHandler} id={item.id}>Delete</Button>}</td>
      </tr>)
      )

      setPreviewMail(updateMails)
    }

  }, [allMails])

  useEffect(() => {
    console.log(">first time useEffect")
    if(mailType==='inbox'){
      async function getInboxMails() {
        try {
          console.log("getall mails func")
          const token = localStorage.getItem('token')
          const response = await fetch('http://localhost:8000/getInboxMails', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token ?? ''
            }
          })
          console.log("res bef")
          console.log(response)
          if (response.status === 200) {
            const data = await response.json()
            console.log(data.data)
  
            setAllMails((prevMails) => [...prevMails, ...data.data])
  
            firstLoad = false
  
          }
          else {
            console.log("not getting 200 response")
          }
        }
        catch (err) {
          console.log(err)
        }
    }
    getInboxMails()

    }

    else if(mailType==='sentbox'){
      async function getSentMails(){
        try {
          console.log("getall mails func")
          const token = localStorage.getItem('token')
          const response = await fetch('http://localhost:8000/getSentMails', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token ?? ''
            }
          })
          console.log("res bef")
          console.log(response)
          if (response.status === 200) {
            const data = await response.json()
            console.log(data.data)
  
            setAllMails((prevMails) => [...prevMails, ...data.data])
  
            firstLoad = false
  
          }
          else {

            console.log("not getting 200 response")
          }
        }
        catch (err) {
          console.log(err)
        }

      }
      getSentMails()

    }

    
    console.log("AFTER GETING MAILS")

  }, [mailType])

  const deleteMailHandler = async (e) => {
    e.preventDefault()
    console.log(e.target.id)

    const response = await fetch(`http://localhost:8000/deleteInboxMails/${e.target.id}`, {
      method: 'delete'
    })
    console.log(response)
    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      setAllMails((prevMails) => {
        // const updatedMails = [...prevMails]

        // console.log(updatedMails)

        // delete updatedMails[e.target.id]

        // console.log(updatedMails)

        // console.log(updatedMails)
        console.log(prevMails)
        const updatedMails = prevMails.filter((mail) => mail.id !== e.target.id);
        console.log(updatedMails)
        return updatedMails
      })
    }
  }

  const viewMailHandler = () => {
    console.log("VIEWING MAIL")
  }


  return (
    <div>
      <div className={styles.div}>
        <h1>WELCOME TO MAIL BOX</h1>

        <Button variant="primary" type="submit" onClick={composeMailHandler}>
          Compose Mail
        </Button>
      </div >

      <div>
        <Button variant="primary" type="submit" onClick={() => { setMailType('inbox') }}>
          Inbox
        </Button>
        <Button variant="primary" type="submit" onClick={() => { setMailType('sentbox') }}>
          Sent Mail
        </Button>
      </div>
      <Container className={styles.container}>
        <h1>{mailType==='inbox'?"Inbox":"Sent-Mails"}</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              {mailType==='inbox'?<th>Sender</th>:<th>Receiver</th>}
              <th>Subject</th>
              <th>Time</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {previewMail}

          </tbody>
        </Table>

      </Container>

    </div>
  )
}

export default Welcome
