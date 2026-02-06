import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/"); // redirect if not logged in
      return;
    }

    const fetchSections = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/auth/sections/${user.teacherId}`
        );
        if (res.data.status_code === 200) {
          setSections(res.data.data);
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load sections. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Welcome, {user.fullName}</h2>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </button>
      <h3>Your Sections:</h3>
      {loading ? (
        <p>Loading sections...</p>
      ) : sections.length > 0 ? (
        <ul>
          {sections.map((sec) => (
            <li key={sec.sectionId}>
              {sec.sectionName} - {sec.courseName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No sections assigned.</p>
      )}
    </div>
  );
}

export default Dashboard;
