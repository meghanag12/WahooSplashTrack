import { useEffect, useState } from 'react';
import { getCsrfToken } from '../utils/csrf';
import axios from 'axios' 

const initialValues = {
    swimmer_name: "", 
    year: "", 
    active: ""
};
export function RegisterPage() {
    const [values, setValues] = useState(initialValues); 
    // const [swimmer_name, set_swimmer_name] = useState([''])
    // const[start_id, set_start_id] = useState([''])
    // const[date, set_date] = useState([''])
    

    "new endpoint for EC2 instance connection"
    const endpoint_swimmer = 'http://3.81.17.35:8000/api/swimmer/'

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values, 
            [name]: value, 
        });
    };

    const postDataSwimmer = async() => {
        const swimmer_name = values.swimmer_name
        const year = values.year
        const active = values.active

        const body = {swimmer_name, year, active}
        try{
            const response = await axios.post(endpoint_swimmer, body)
            console.log(response)
            return response.data
        } catch (error) {
            console.error('Error posting data:', error);
        }
        
    };

    const handleSendData = async(e) => {
        e.preventDefault(); 
        const newData = await postDataSwimmer()
        //... add logic 
        setValues(initialValues);
    }

    function MyForm() {
        return (
            <div className = "form_container">
            <form onSubmit = {handleSendData}>
                <div className = "form-group">
                    <label>Enter Swimmer's Name:
                        <input value = {values.swimmer_name} onChange = {handleInputChange} name = "swimmer_name" label = "swimmer_name"/>
                    </label>
                </div>

                <div className = "form-group">
                    <label>Enter Swimmer's Year:
                        <input value = {values.year} onChange = {handleInputChange} name = "year" label = "year"/>
                    </label>
                </div>

                <div className = "form-group">
                    <label>Is the Swimmer Active?
                        <input type = "radio" name = "active" value = "yes" checked = {values.active === "yes"} onChange = {handleInputChange}/> Yes
                        <input type = "radio" name = "active" value = "no" checked = {values.active === "no"} onChange = {handleInputChange} /> No 
                    </label>
                </div>

                <button type = "submit">Submit</button>
            </form>
            </div>
        );
    }

    return <MyForm />;
}

