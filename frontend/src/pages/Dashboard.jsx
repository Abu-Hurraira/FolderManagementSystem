import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/auth/sections/${user.teacherId}`)
      .then((res) => {
        if (res.data.status_code === 200) {
          setSections(res.data.data);
        }
      })
      .catch(() => alert("Error loading sections"));
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Welcome, {user.fullName}</h2>

        <h3 style={{ marginTop: "20px" }}>Your Sections</h3>

        <ul style={styles.list}>
          {sections.map((sec) => (
            <li key={sec.sectionId} style={styles.listItem}>
              {sec.sectionName} - {sec.courseName}
            </li>
          ))}
        </ul>

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  card: {
    width: "400px",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "15px",
    marginBottom: "20px",
  },
  listItem: {
    padding: "8px",
    borderBottom: "1px solid #eee",
  },
  button: {
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Dashboard;
