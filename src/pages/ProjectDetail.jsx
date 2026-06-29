import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, getTasksByProject, createTask, updateTaskStatus } from '../services/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title:'', description:'', status:'TODO',
    dueDate:'', projectId: id, assignedToId:''
  });

  useEffect(() => {
    getProjectById(id).then(res => setProject(res.data));
    getTasksByProject(id).then(res => setTasks(res.data));
  }, [id]);

  const handleCreate = async () => {
    await createTask({...form, projectId: parseInt(id),
      assignedToId: parseInt(form.assignedToId)});
    const res = await getTasksByProject(id);
    setTasks(res.data);
    setShowForm(false);
  };

  const handleStatus = async (taskId, status) => {
    await updateTaskStatus(taskId, status);
    const res = await getTasksByProject(id);
    setTasks(res.data);
  };

  const statusColor = (s) => s === 'DONE' ? '#10b981' :
    s === 'IN_PROGRESS' ? '#f59e0b' : '#6b7280';

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={{color:'white', margin:0}}>{project?.name}</h2>
        <div>
          <button onClick={() => navigate('/projects')}
            style={styles.navBtn}>Back</button>
          <button onClick={() => setShowForm(!showForm)}
            style={{...styles.navBtn, background:'#10b981', color:'white'}}>
            + Add Task
          </button>
        </div>
      </div>
      <div style={styles.content}>
        {showForm && (
          <div style={styles.form}>
            <h3>Create Task</h3>
            <input style={styles.input} placeholder="Title"
              onChange={e => setForm({...form, title: e.target.value})} />
            <input style={styles.input} placeholder="Description"
              onChange={e => setForm({...form, description: e.target.value})} />
            <select style={styles.input}
              onChange={e => setForm({...form, status: e.target.value})}>
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
            <input style={styles.input} type="date"
              onChange={e => setForm({...form, dueDate: e.target.value})} />
            <input style={styles.input} placeholder="Assigned To (User ID)"
              onChange={e => setForm({...form, assignedToId: e.target.value})} />
            <button style={styles.button} onClick={handleCreate}>Create Task</button>
          </div>
        )}
        <div style={styles.grid}>
          {tasks.map(t => (
            <div key={t.id} style={styles.card}>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <p>Due: {t.dueDate}</p>
              <p>Assigned: {t.assignedTo?.name}</p>
              <p style={{color: statusColor(t.status), fontWeight:'bold'}}>
                {t.status}
              </p>
              <select style={styles.select}
                value={t.status}
                onChange={e => handleStatus(t.id, e.target.value)}>
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
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
    boxShadow:'0 2px 8px rgba(0,0,0,0.1)' },
  select: { width:'100%', padding:'8px', borderRadius:'5px',
    border:'1px solid #ddd', marginTop:'10px' }
};

export default ProjectDetail;