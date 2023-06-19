const LoginRegiserFormStyles = () => {
  // styles specific for Register and Login
  const labelStyle = {
    mb: '0.5rem',
  };

  const inputStyle = {
    w: '85%',
    h: '3em',
    p: '0.7rem 0.7rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    _focus: {
      borderColor: '#4f005f',
      bg: '#ebdfee',
      boxShadow: 'none',
    },
  };

  const cardStyle = {
    w: '90%',
    maxW: '60rem',
    m: '2rem auto',
    p: '2rem',
  };

  return [labelStyle, inputStyle, cardStyle];
};

export default LoginRegiserFormStyles;
