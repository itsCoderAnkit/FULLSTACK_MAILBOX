import React from 'react'
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function Welcome() {
    const history = useHistory()

    const composeMailHandler = ()=>{
        history.push('/compose-mail')
    }
  return (
    <div>
      <h1>WELCOME TO MAIL BOX</h1>
      
      <Button variant="primary" type="submit" onClick={composeMailHandler}>
          Compose Mail
        </Button>
    </div>
  )
}

export default Welcome
