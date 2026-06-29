import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getDashboardStats().then(res => setStats(res.data));
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={{color:'white', margin:0}}>Task Manager</h2>
        <div>
          <span style={{color:'white', marginRight:'20px'}}>
            Hi, {user?.name}
          </span>
          <button onClick={() => navigate('/projects')}
            style={styles.navBtn}>Projects</button>
          <button onClick={handleLogout}
            style={{...styles.navBtn, background:'#ef4444'}}>Logout</button>
        </div>
      </div>
      <div style={styles.content}>
        <h2>Dashboard</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>{stats.totalProjects || 0}</h3>
            <p>Total Projects</p>
          </div>
          <div style={styles.card}>
            <h3>{stats.totalTasks || 0}</h3>
            <p>Total Tasks</p>
          </div>
          <div style={styles.card}>
            <h3>{stats.todoTasks || 0}</h3>
            <p>Todo</p>
          </div>
          <div style={styles.card}>
            <h3>{stats.inProgressTasks || 0}</h3>
            <p>In Progress</p>
          </div>
          <div style={styles.card}>
            <h3>{stats.doneTasks || 0}</h3>
            <p>Done</p>
          </div>
          <div style={styles.card}>
            <h3>{stats.totalUsers || 0}</h3>
            <p>Total Users</p>
          </div>
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
  grid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' },
  card: { background:'white', padding:'25px', borderRadius:'10px',
    textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }
};

export default Dashboard;