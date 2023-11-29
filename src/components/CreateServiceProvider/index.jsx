import React, { useState } from 'react';

const CreateServiceProvider = () => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/customServiceProvider/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name,
          address: {
            street,
            buildingNumber,
            city,
            zipCode,
            country,
          },
          categoryId: Number(categoryId),
        }),
      });

      if (response.ok) {
        console.log('Service Provider created successfully');
        // Dodaj dowolne inne działania po utworzeniu dostawcy usług
      } else {
        console.error('Failed to create Service Provider');
        // Dodaj obsługę błędów z serwera, jeśli to konieczne
      }
    } catch (error) {
      console.error('Error during service provider creation:', error);
    }
  };

  return (
    <div>
      <h1>Create Service Provider</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Street:</label>
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />

        <label>Building Number:</label>
        <input type="text" value={buildingNumber} onChange={(e) => setBuildingNumber(e.target.value)} required />

        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />

        <label>Zip Code:</label>
        <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />

        <label>Country:</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />

        <label>Category ID:</label>
        <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />

        <button type="submit">Create Service Provider</button>
      </form>
    </div>
  );
};

export default CreateServiceProvider;
