import React from 'react'
import { Form } from 'react-bootstrap';
import {render} from "@testing-library/react";

class BootstrapDate extends React.Component{

    render(){
        const { label } = this.props;
        return(
            <div>
                <div className="row">
                    <div>
                        <Form.Group controlId="dob">
                            <Form.Label>{label}</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                        </Form.Group>
                    </div>
                </div>
            </div>
        )
    }
}


export default BootstrapDate;