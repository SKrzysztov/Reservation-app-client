import React, { useState, useEffect } from 'react';

const ServiceProviderList = () => {
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/customServiceProvider/all');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setServiceProviders(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Service Providers</h1>
      <ul>
        {serviceProviders.map((provider) => (
          <li key={provider.id}>
            <strong>{provider.name}</strong>
            <p>Category: {provider.customServiceCategory.name}</p>
            <p>City: {provider.address.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceProviderList;
