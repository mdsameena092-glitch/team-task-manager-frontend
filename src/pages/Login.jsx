import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      loginUser(res.data, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})} />
        <input style={styles.input} placeholder="Password"
          type="password"
          onChange={e => setForm({...form, password: e.target.value})} />
        <button style={styles.button} onClick={handleSubmit}>Login</button>
        <p style={{textAlign:'center'}}>No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { display:'flex', justifyContent:'center',
    alignItems:'center', height:'100vh', background:'#f0f2f5' },
  card: { background:'white', padding:'40px', borderRadius:'10px',
    width:'350px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' },
  title: { textAlign:'center', marginBottom:'20px', color:'#1a1a2e' },
  input: { width:'100%', padding:'10px', marginBottom:'15px',
    borderRadius:'5px', border:'1px solid #ddd', boxSizing:'border-box' },
  button: { width:'100%', padding:'10px', background:'#4f46e5',
    color:'white', border:'none', borderRadius:'5px', cursor:'pointer' },
  error: { color:'red', textAlign:'center' }
};

export default Login;