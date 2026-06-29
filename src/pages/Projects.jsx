import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name:'', description:'' });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProjects().then(res => setProjects(res.data));
  }, []);

  const handleCreate = async () => {
    await createProject(form);
    const res = await getProjects();
    setProjects(res.data);
    setShowForm(false);
    setForm({ name:'', description:'' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={{color:'white', margin:0}}>Projects</h2>
        <div>
          <button onClick={() => navigate('/dashboard')}
            style={styles.navBtn}>Dashboard</button>
          <button onClick={() => setShowForm(!showForm)}
            style={{...styles.navBtn, background:'#10b981', color:'white'}}>
            + New Project
          </button>
        </div>
      </div>
      <div style={styles.content}>
        {showForm && (
          <div style={styles.form}>
            <h3>Create Project</h3>
            <input style={styles.input} placeholder="Project Name"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} />
            <input style={styles.input} placeholder="Description"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})} />
            <button style={styles.button} onClick={handleCreate}>Create</button>
          </div>
        )}
        <div style={styles.grid}>
          {projects.map(p => (
            <div key={p.id} style={styles.card}
              onClick={() => navigate(`/projects/${p.id}`)}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p style={{color:'#4f46e5', fontSize:'12px'}}>
                By: {p.createdBy?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight:'100vh', background:'#f0f2f5' },
  navbar: { background:'#4f46e5', padding:'15px 30px',
    display:'flex', justifyContent:'space-between', alignItems:'center' },
  navBtn: { padding:'8px 16px', marginLeft:'10px', border:'none',
    borderRadius:'5px', cursor:'pointer', background:'white', color:'#4f46e5' },
  content: { padding:'30px' },
  form: { background:'white', padding:'20px', borderRadius:'10px',
    marginBottom:'20px', maxWidth:'400px' },
  input: { width:'100%', padding:'10px', marginBottom:'10px',
    borderRadius:'5px', border:'1px solid #ddd', boxSizing:'border-box' },
  button: { padding:'10px 20px', background:'#4f46e5', color:'white',
    border:'none', borderRadius:'5px', cursor:'pointer' },
  grid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' },
  card: { background:'white', padding:'20px', borderRadius:'10px',
    cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }
};

export default Projects;