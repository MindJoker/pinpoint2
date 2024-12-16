import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Divider from '@mui/material/Divider';


const CreateOrderForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    address: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, organization } = formValues;

    // Check if at least one of First Name, Last Name, or Organization is provided
    if (!firstName && !lastName && !organization) {
      newErrors.general =
        'Please provide either First Name and Last Name or an Organization Name.';
    }

    // Additional field validations (e.g., Email and Phone)
    if (formValues.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formValues.phone && !/^\+?[1-9]\d{1,14}$/.test(formValues.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log('Form Submitted:', formValues);
    }
  };

  return (
    <div className="container mx-auto border border-blue-700 rounded-lg p-4">
      <span style={{ color: 'var(--text-color)' }}>Create Customer:</span>
      <br />
      <form
        className="border border-blue-700 rounded-lg p-4 flex flex-col space-y-6"
        onSubmit={handleSubmit}
      >
        
        {/* Error for general validation */}
        {errors.general && (
          <div className="text-red-500 text-sm">{errors.general}</div>
        )}
        <TextField
          id="firstName"
          label={<span style={{ color: 'var(--text-color)' }}>First Name</span>}
          variant="outlined"
          value={formValues.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <Divider sx={{ backgroundColor: 'var(--primary-color)' }}/>
        <TextField
          id="lastName"
          label={<span style={{ color: 'var(--text-color)' }}>Last Name</span>}
          variant="outlined"
          value={formValues.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <Divider sx={{ backgroundColor: 'var(--primary-color)' }}/>
        <TextField
          id="organization"
          label={<span style={{ color: 'var(--text-color)' }}>Organization</span>}
          variant="outlined"
          value={formValues.organization}
          onChange={handleChange}
          error={!!errors.organization}
          helperText={errors.organization}
        />
        <Divider sx={{ backgroundColor: 'var(--primary-color)' }}/>
        <TextField
          id="address"
          label={<span style={{ color: 'var(--text-color)' }}>Address</span>}
          variant="outlined"
          value={formValues.address}
          onChange={handleChange}
        />
        <Divider sx={{ backgroundColor: 'var(--primary-color)' }}/>
        <TextField
          id="email"
          label={<span style={{ color: 'var(--text-color)' }}>Email</span>}
          variant="outlined"
          value={formValues.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <Divider sx={{ backgroundColor: 'var(--primary-color)' }}/>
        <TextField
          id="phone"
          label={<span style={{ color: 'var(--text-color)' }}>Phone</span>}
          variant="outlined"
          value={formValues.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <Button
          variant="contained"
          type="submit"
          style={{
            backgroundColor: 'var(--primary-color)',
            color: 'var(--text-color)',
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateOrderForm;

