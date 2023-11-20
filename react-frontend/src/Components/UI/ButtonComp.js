import React from 'react'
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MailActions } from '../../Store/MailSlice';

function ButtonComp(props) {

  //console.log("button props",props)
  const dispatch = useDispatch()
  const history = useHistory()

  const loadDataHandler = async () => {
    if (props.title === 'Inbox') {
      try {

        const response = await fetch(`http://localhost:8000/view-mail/${props.id}`)


        if (response.status === 200) {
          const data = await response.json()
          console.log(data.data)

          props.onButtonClick(data.data, props.id)
          dispatch(MailActions.view({sender:data.data.sender,subject:data.data.subject,content:data.data.content}))
          history.push('/view-mail')

        }
      }
      catch (err) {
        console.log(err)
      }

    }
    else if (props.title === 'Delete') {

      const response = await fetch(`http://localhost:8000/deleteInboxMails/${props.id}`, {
        method: 'delete'
      })
      console.log(response)
      if (response.status === 200) {
        const data = await response.json()
        console.log(data)

        props.onButtonClick(data, props.id)
      }
    }
  }
  return (
    <td>
      <div>
        <Button variant="primary" type="submit" onClick={loadDataHandler} id={props.id}>{props.title}</Button>
      </div>
    </td>
  )
}

export default ButtonComp
