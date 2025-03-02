import React, { useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setError('');
    console.log('Registration successful:', formData);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FCFEEF]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
      </div>
    </div>
  );
};

export default Registration;
