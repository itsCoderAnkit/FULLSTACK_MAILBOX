import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import styles from './MailType.module.css'
import ButtonComp from '../UI/ButtonComp';


function MailTable(props) {

    //console.log("mail table props>>>>>",props)

    const [previewMail, setPreviewMail] = useState([])

    const handleIncomingData = (data,id)=>{

      console.log("incoming data",data,id)
      props.onGettingData(data,id)
    } 

    useEffect(() => {

        if (!props.load) {
          //console.log("useEffect of dependency")
          //console.log(">>++++",props.getAllMails,props.load, props.mailSpec)
    
          const updateMails = props.getAllMails.map((item, index) =>
         
          (<tr key={index}>
            {!item.seen? <td><span className={styles.dot}/>{index+1}</td>:<td></td> }
            
            {props.mailSpec === 'inbox' ? <td>{item.sender}</td> : <td>{item.receiver}</td>}
            <td>{item.subject}</td>
            <td>{item.createdAt}</td>
            <td><ButtonComp title="Inbox" id={item.id} onButtonClick={handleIncomingData}/></td>
            <td><ButtonComp title="Delete" id={item.id} onButtonClick={handleIncomingData}/></td>
          </tr>)
          )
    
          setPreviewMail(updateMails)
         }
    
      }, [props.getAllMails])
  return (
    <Table >
          <thead>
            <tr>
              <th>#</th>
              {props.mailSpec === 'inbox' ? <th>Sender</th> : <th>Receiver</th>}
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
  )
}

export default MailTable
