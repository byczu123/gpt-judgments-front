import {useState} from 'react';
import '../style/query_page.css';
import Navbar from "../component/Navbar";
import {useNavigate} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Row} from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css';
import BootstrapDate from "../component/BootstrapDate";

function QueryPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState('');
    const [formData, setFormData] = useState({
    justification_to_generate: '',
    legal_base: '',
    judge_name: '',
    case_number: '',
    court_type: '',
    keywords: '',
    judgment_date_from: '',
    judgment_date_to: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitRequest = () => {
      if (!formData.justification_to_generate.trim()) {
         toast.error("Temat uzasadnienia nie może być pusty.",{
             position: "bottom-center",
             pauseOnHover: false,
             autoClose: 1500,
             toastId: 'invalid-justification-toast'});
         return
    }
      const jsonData = JSON.stringify(formData);
      setLoading(true)
    fetch('/gpt/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: jsonData,
    }
    )
      .then((response) => {
          if (response.ok) {
              setLoading(false)
              return response.json();
          }
          if (response.status===404) {
              toast.error("Uzasadnienie o podanych parametrach nie istnieje.", {
                  position: "bottom-center",
                  pauseOnHover: false,
                  autoClose: 1500,
                  toastId: 'internal-error-toast'
              })
          }
          if (response.status===500){
              toast.error("Wystąpił bład.",{
                  position: "bottom-center",
                  pauseOnHover: false,
                  autoClose: 1500,
                  toastId: 'internal-error-toast'});
          }
      })
        .then((data) => {
            navigate('/gpt-judgments-front/justification', { state: { justification: data.justification, topic: formData.justification_to_generate} });
        })
        .catch(() => {
            setLoading(false);
            toast.error("Wystąpił błąd.",{
                position: "bottom-center",
                pauseOnHover: false,
                autoClose: 1500,
                toastId: 'internal-error-toast'})});
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };


    return (
        <div className="default">
            <Navbar/>
            {loading?
                <ClipLoader size={200} className="circle"/>
                :
            <Form className="query-form">
                <Row className={"mb-3"}>
                    <Form.Group className="mb-3" name="justification" controlId="exampleForm.ControlInput1">
                        <Form.Label>Temat uzasadnienia które powinno zostać wygenerowane:</Form.Label>
                        <Form.Control type="text" placeholder="Przykładowe uzasadnienie" name="justification_to_generate"  onChange={handleChange} value={formData.justification_to_generate} required/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Label className="mb-3">Filtry do wzmacniającego uzasadnienia:</Form.Label>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Podstawa prawna</Form.Label>
                        <Form.Control type="text" placeholder="Przykładowa podstawa prawna" name="legal_base" onChange={handleChange} value={formData.legal_base}/>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                        <Form.Label>Imię i nazwisko sędziego</Form.Label>
                        <Form.Control type="text" placeholder="np. Jan Kowalski" name="judge_name"  onChange={handleChange} value={formData.judge_name}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom05">
                        <Form.Label>Slowo kluczowe</Form.Label>
                        <Form.Control type="text" placeholder="Np. kradzież" name="keyword"  onChange={handleChange} value={formData.keywords}/>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom06">
                        <Form.Label>Numer sprawy</Form.Label>
                        <Form.Control type="text" placeholder="Przykładowy numer sprawy" name="case_number"  onChange={handleChange} value={formData.case_number}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom07">
                        <Form.Label>Rodzaj sądu</Form.Label>
                        <Form.Select aria-label="Default select example" value={selectedValue} onChange={handleSelectChange}>
                            <option>Wybierz rodzaj sądu</option>
                            <option value="APPEAL">Apelacyjny</option>
                            <option value="REGIONAL">Regionalny</option>
                            <option value="DISTRICT">Rejonowy</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom08">
                        <BootstrapDate label="Data od:" name="judgment_date_from"  onChange={handleChange} value={formData.judgment_date_from}/>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom09">
                        <BootstrapDate label="Data do:" name="judgment_date_to"  onChange={handleChange} value={formData.judgment_date_to}/>
                    </Form.Group>
                </Row>
               <Button type="submit" onClick={submitRequest}>Generuj uzasadnienie</Button>
            </Form>}
        <ToastContainer
        autoClose={1500}
        pauseOnFocusLoss
        pauseOnHover
        />

    </div>
    );
}

export default QueryPage;
