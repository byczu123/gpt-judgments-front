import {useEffect, useState} from 'react';
import '../style/query_page.css';
import Navbar from "../component/Navbar";
import {useNavigate} from "react-router-dom";

function QueryPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
    justification_to_generate: '',
    legal_base: '',
    referenced_regulation: '',
    judge_name: '',
    case_number: '',
    court_type: '',
    court_name: '',
    chamber_name: '',
    keywords: '',
    judgment_date_from: '',
    judgment_date_to: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitRequest = () => {
      const jsonData = JSON.stringify(formData);

    // Send JSON data to the server
    fetch('http://localhost:5000/gpt/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: jsonData,
    })
      .then((response) => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error("HTTP ERROR: " + response.status)
          }
      })
        .then((data) => {
            console.log(data)
            navigate('/justification', { state: { justification: data.justification } });
        })
  };



    return (
        <div className="default">
                        <Navbar/>

        <div className="wrapper">
            <div className="input-data">
                <form>
                    <input
                        type="text"
                        name="justification_to_generate"
                        placeholder="Enter the topic of justification to generate"
                        value={formData.justification_to_generate}
                        onChange={handleChange}
                      />
                    <br/>
                    <br/>
                    <h3>Filters for reinforcing justification:</h3>

                    <input
                        type="text"
                        name="legal_base"
                        placeholder="Legal Base"
                        value={formData.legal_base}
                        onChange={handleChange}
                      />
                    <input
                        type="text"
                        name="referenced_regulation"
                        placeholder="Regulation"
                        value={formData.referenced_regulation}
                        onChange={handleChange}
                      />
                    <input
                        type="text"
                        name="judge_name"
                        placeholder="Judge name"
                        value={formData.judge_name}
                        onChange={handleChange}
                      />
                    <input
                        type="text"
                        name="case_number"
                        placeholder="Case number"
                        value={formData.case_number}
                        onChange={handleChange}
                      />
                    <input
                        type="text"
                        name="court_type"
                        placeholder="Court type"
                        value={formData.court_type}
                        onChange={handleChange}
                      />
                    <input
                        type="text"
                        name="court_name"
                        placeholder="Court name"
                        value={formData.court_name}
                        onChange={handleChange}
                      />
                    <input
                        type="text"
                        name="chamber_name"
                        placeholder="Chamber name"
                        value={formData.chamber_name}
                        onChange={handleChange}
                      />
                    <input
                        type="text"
                        name="keywords"
                        placeholder="Keywords"
                        value={formData.keywords}
                        onChange={handleChange}
                      />
                    <input
                        type="date"
                        name="judgment_date_from"
                        placeholder="Judgment date from"
                        value={formData.judgment_date_from}
                        onChange={handleChange}
                      />
                    <input
                        type="date"
                        name="judgment_date_to"
                        placeholder="Judgment date to"
                        value={formData.judgment_date_to}
                        onChange={handleChange}
                      />
                    <button type="button" onClick={submitRequest}>
                        Generate justification
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default QueryPage;
