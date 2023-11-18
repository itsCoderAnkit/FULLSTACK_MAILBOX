import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Login.module.css'


import '../../../node_modules/react-quill/dist/quill.snow.css'

function ComposeMail() {

    const toUser = useRef<HTMLInputElement>(null)
    const subject = useRef<HTMLInputElement>(null)
    const quillRef = useRef<ReactQuill>(null)

    const [contentState, setContentState] = useState('')

    const handleOnChange = (e: any) => {
        //console.log(e)
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            const content = editor?.root.innerHTML;

            const parser = new DOMParser();
            const doc = parser.parseFromString(content || '', 'text/html');
            const textContent = doc.body.textContent || '';

            setContentState(textContent);
        }

    }

    const loginSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        try {
            const inputToUser = toUser.current?.value
            const inputSubject = subject.current?.value
            console.log(contentState, inputToUser, inputSubject)
            const token = localStorage.getItem('token')

            const response = await fetch('http://localhost:8000/send-mail', {
                method: 'POST',
                body: JSON.stringify({
                    receiver: inputToUser,
                    subject: inputSubject,
                    content: contentState
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ?? ''
                }


            })

            console.log(response)
            if (response.status === 201) {
                const data = await response.json()
                console.log(data)
            }


        }

        catch (err) {
            console.log(err)
        }

        }
        

    return (
        <div>
            <h1>SEND MAILs</h1>
            <Container className={styles.container}>
                <h1>Login Form</h1>
                <Form onSubmit={loginSubmitHandler}>
                    <Form.Group className="mb-3" controlId="Email" >
                        <Form.Label>To</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={toUser} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Subject" >
                        <Form.Label>To</Form.Label>
                        <Form.Control type="string" placeholder="Enter Subject" ref={subject} />
                    </Form.Group>
                    <ReactQuill modules={{
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                            ['blockquote', 'code-block'],

                            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                            [{ 'direction': 'rtl' }],                         // text direction

                            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                            [{ 'font': [] }],
                            [{ 'align': [] }],

                            ['clean']                                         // remove formatting button
                        ]
                    }} theme="snow" value={contentState} ref={quillRef} onChange={handleOnChange} />
                    <Form.Group className="mb-3" controlId="Password" >
                        <Form.Label>Content</Form.Label>

                    </Form.Group>


                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>

        </div>
    )
}

export default ComposeMail
