import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserForm.css'

const UserForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupationOptions, setOccupationOptions] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Fetch occupations and states data
    axios.get('https://frontend-take-home.fetchrewards.com/form')
      .then(response => {
        setOccupationOptions(response.data.occupations);
        setStateOptions(response.data.states);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if all fields are completed
    if (fullName && email && password && selectedOccupation && selectedState) {
      // Submit the form
      axios.post('https://frontend-take-home.fetchrewards.com/form', {
        name: fullName,
        email: email,
        password: password,
        occupation: selectedOccupation,
        state: selectedState
      })
        .then(response => {
          setSubmitted(true);
          console.log('Form submitted successfully:', response.data);
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div>
      <h1>User Creation Form</h1>
      {submitted && <p>Form submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Occupation:
          <select value={selectedOccupation} onChange={(e) => setSelectedOccupation(e.target.value)}>
            <option value="">Select Occupation</option>
            {occupationOptions.map((occupation, index) => (
              <option key={index} value={occupation}>{occupation}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          State:
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">Select State</option>
            {stateOptions.map((state, index) => (
              <option key={index} value={state.abbreviation}>{state.name}</option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
