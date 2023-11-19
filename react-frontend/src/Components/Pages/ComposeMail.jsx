import React, { useRef, useState } from 'react'
//import ReactQuill from 'react-quill';
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Login.module.css'
import JoditEditor from 'jodit-react'
import Alert from 'react-bootstrap/Alert';


//import '../../../node_modules/react-quill/dist/quill.snow.css'

function ComposeMail() {

    // const toUser = useRef < HTMLInputElement > (null)
    // const subject = useRef < HTMLInputElement > (null)
    //const quillRef = useRef < ReactQuill > (null)
    const toUser = useRef(null)
    const subject = useRef(null)
    const editor = useRef(null)

    const [contentState, setContentState] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    // const handleOnChange = (e) => {
    //     //console.log(e)
    //     if (quillRef.current) {
    //         const editor = quillRef.current.getEditor();
    //         const content = editor?.root.innerHTML;

    //         const parser = new DOMParser();
    //         const doc = parser.parseFromString(content || '', 'text/html');
    //         const textContent = doc.body.textContent || '';

    //         setContentState(textContent);
    //     }

    // }

    const sendMailHandler = async (e) => {

        e.preventDefault()
        try {
            const inputToUser = toUser.current?.value
            const inputSubject = subject.current?.value
            const inputContent = editor.current?.value
            console.log(inputContent, inputToUser, inputSubject)
            const token = localStorage.getItem('token')

            const response = await fetch('http://localhost:8000/send-mail', {
                method: 'POST',
                body: JSON.stringify({
                    receiver: inputToUser,
                    subject: inputSubject,
                    content: inputContent
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

                setShowAlert(true)
                setTimeout(()=>{
                    setShowAlert(false)
                },3000)

                toUser.current.value = ""
                subject.current.value = ""
                setContentState("")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {showAlert && <Alert key='success' variant='success'>
                Mail Sent Sccessfully ....
            </Alert>}
            
            <h1>Generate MAIL</h1>
            <Form onSubmit={sendMailHandler}>
                <Form.Group className="mb-3" controlId="Email" >
                    <Form.Label>To</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={toUser} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Subject" >
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="string" placeholder="Enter Subject" ref={subject} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Content" >
                    <Form.Label>Content</Form.Label>

                </Form.Group>
                {/* <ReactQuill modules={{
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
                    }} theme="snow" value={contentState} ref={quillRef} onChange={handleOnChange} /> */}
                <JoditEditor
                    ref={editor}
                    value={contentState}
                    // config={config}
                    // tabIndex={1} // tabIndex of textarea
                    // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={newContent => setContentState(newContent)}
                />
                <Button variant="primary" type="submit">Submit</Button>
            </Form>



        </div>
    )
}

export default ComposeMail
