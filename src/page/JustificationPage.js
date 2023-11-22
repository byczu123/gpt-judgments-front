import React, { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import Navbar from "../component/Navbar";
import {toast, ToastContainer} from "react-toastify";
import {Card} from "react-bootstrap";
import ReactStars from 'react-rating-star-with-type'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Row} from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css';

function JustificationPage() {
  const [justification, setJustification] = useState('');
  const [justificationTopic, setJustificationTopic] = useState('');
  const [feedback, setFeedback] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetch('http://51.20.128.110:5000/user/validate-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
      .catch(() => {
      });
      setJustification(location.state.justification)
      setJustificationTopic(location.state.topic)
  }, [location.state.justification, location.state.topic]);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

    const handleRateButtonClick = () => {
        if(isNaN(star) || star === 0){
            toast.error("Nieprawidłowa ocena.",{
                position: "bottom-center",
                pauseOnHover: false,
                autoClose: 1500,
                toastId: 'invalid-rating-toast'});
        }
    const data = {
      justification: justification,
      rating: star,
      feedback: feedback,
    };
    fetch('http://51.20.128.110:5000/gpt/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  };
    const [star, setStar] = useState(5);

    const onChange=(nextValue)=>{
        setStar(nextValue)
    }

  return (
    <div className="default">
        <Navbar/>
        <Card className="justification-card" style={{ width: '60vw' }}>
            <Card.Body>
                <Card.Title>Wygenerowane uzasadnienie</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Temat wygenerowanego uzasadnienia: {justificationTopic}</Card.Subtitle>
                <Card.Text>
                    {justification}
                </Card.Text>
            </Card.Body>
        </Card>
        <Form className="rate-form">
            <Row className="mb-">
                <Form.Group as={Col} md="12" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Zostaw opinie poniżej</Form.Label>
                    <Form.Control onChange={handleFeedbackChange} className="textarea" as="textarea" rows={6} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="exampleForm.Stars">
                    <ReactStars
                        className="stars"
                        size="3rem"
                        onChange={onChange}
                        value={4.2}
                        isEdit={true}
                        activeColors={[ "red", "orange", "#FFCE00", "#9177FF","#8568FC",]}
                    />
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Button onClick={handleRateButtonClick} className="rate-button">Prześlij opinie</Button>
                </Form.Group>
            </Row>
        </Form>
        <ToastContainer
            autoClose={1500}
            pauseOnFocusLoss
            pauseOnHover
        />
    </div>
  );
}

export default JustificationPage;
