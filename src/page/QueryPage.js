import {useState} from 'react';
import '../style/query_page.css';
import Navbar from "../component/Navbar";
import {useNavigate} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function QueryPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
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
      if (!formData.justification_to_generate.trim()) {
        toast.error("Please enter a valid topic for justification.",{
            position: "bottom-center",
            toastId: 'invalid-justification-toast'});
        return;
    }

      const jsonData = JSON.stringify(formData);
    fetch('http://localhost:5000/gpt/query', {
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
              setLoading(true)
              const data = response.json()
              navigate('/gpt-judgments-front/justification', { state: { justification: data.justification } });
          } else {
              toast.error("Token is invalid.",{
                position: "bottom-center",
                toastId: 'invalid-token-toast'});
          }
      })
  };



    return (
        <div className="default">
                        <Navbar/>
            {
                loading?
                   <ClipLoader className="circle" color={'#D0021B'} loading={loading} size={250}/>
                    :
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
                    <button type="button" className="query_button" onClick={submitRequest}>
                        Generate justification
                    </button>
                </form>
            </div>
        </div>
            }
            <ToastContainer />
    </div>
    );
}

export default QueryPage;
