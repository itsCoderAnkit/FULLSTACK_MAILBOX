
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import styles from './Welcome.module.css'
import MailList from '../MailList/MailList';
import Table from 'react-bootstrap/Table';
import MailTable from '../Table/MailTable';


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
  //const [allMails,setAllMails]= useState<Mail[]>([])
  // const [previewMail, setPreviewMail] = useState([])
  // const [showMail,setShowMail] = useState()
  // const [viewMail,setViewMail] = useState(false)
  
  const history = useHistory()
  const [allMails, setAllMails] = useState([])
  const [mailType, setMailType] = useState('inbox')
  const[unSeen,setUnSeen] = useState()

  const composeMailHandler = () => {
    history.push('/compose-mail')
  }

  // useEffect(() => {

  //   if (!firstLoad) {
  //     console.log("useEffect of dependency")
  //     console.log(">>",allMails)

  //     const updateMails = allMails.map((item, index) =>
  //     //console.log(item,index)
  //     (<tr key={index}>
  //       {/* <td>{index + 1}</td> */}
  //       {!item.seen? <td><span className={styles.dot}/></td>:<td></td> }
        
  //       {mailType === 'inbox' ? <td>{item.sender}</td> : <td>{item.receiver}</td>}
  //       {/* <td>{item.sender}</td> */}
  //       <td>{item.subject}</td>
  //       <td>{item.createdAt}</td>
  //       <td>{<Button variant="primary" type="submit" onClick={viewMailHandler} id={item.id}>View</Button>}</td>
  //       <td>{<Button variant="primary" type="submit" onClick={deleteMailHandler} id={item.id}>Delete</Button>}</td>
  //     </tr>)
  //     )

  //     setPreviewMail(updateMails)
  //   }

  // }, [allMails])

  useEffect(() => {
    console.log(">first time useEffect")
    if (mailType === 'inbox') {
      
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

              let unSeenCount=0
            for(let i=0;i<data.data.length;i++){
              if(data.data[i].seen===false){
                unSeenCount++
              }
            }
            setUnSeen(unSeenCount)
            console.log("allmails>>>",allMails)
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
      //setInterval(getInboxMails,2000)
       getInboxMails()

    }

    else if (mailType === 'sentbox') {
      async function getSentMails() {
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


  // const viewMailHandler = async (e) => {
  //   try {
  //     console.log("VIEWING MAIL", e.target.id)

  //     const response = await fetch(`http://localhost:8000/view-mail/${e.target.id}`)

  //     console.log(response)

  //     if (response.status === 200) {
  //       const data = await response.json()
  //       console.log(data.data)


  //     const viewedMail =(<div>
  //     <p>{`Sender: ${data.data.sender}`}</p>
  //     <p>{`Subject: ${data.data.subject}`}</p>
  //     <p>Content :</p>
  //     <div dangerouslySetInnerHTML={{ __html: data.data.content }} />
        
  //     </div>)

  //     //viewFunc()
  //      setShowMail(viewedMail)
  //      setViewMail(true)
  //     }
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }
  const getData = (data,id)=>{
    console.log("welcome get data", data,id)
    setAllMails((prevMails) => {
      console.log("get data prev",prevMails)
      const updatedMails = prevMails.filter((mail) => mail.id !== id);
      console.log(updatedMails)
      return updatedMails
    })
  }


  return (
    <div>
      <div className={styles.div}>
        <h1>WELCOME TO MAIL BOX</h1>

        <Button variant="primary" type="submit" onClick={composeMailHandler}>
          Compose Mail
        </Button>
      </div >

      <div className={styles.div}>
        <Button variant="primary" type="submit" onClick={() => { setMailType('inbox') }}>
          Inbox {unSeen}
        </Button>
        <Button variant="primary" type="submit" onClick={() => { setMailType('sentbox') }}>
          Sent Mail
        </Button>
      </div>
      <Container className={styles.container}>
       
        <h1>{mailType === 'inbox' ? "Inbox" : "Sent-Mails"}</h1>
       <MailTable getAllMails={allMails} load={firstLoad} mailSpec={mailType} onGettingData={getData}/>
      </Container>

      
<div>
  {/* {viewMail && showMail} */}
</div>
    </div>
  )
}

export default Welcome
