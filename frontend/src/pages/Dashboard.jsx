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
      navigate("/");
      return;
    }

    const fetchSections = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/auth/sections/${user.teacherId}`
        );

        if (res.data.status_code === 200) {
          setSections(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();'[-'
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "700px" }}>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Welcome, {user.fullName}</h4>
          <button className="btn btn-success" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <hr />

        <h5 className="mb-3">Your Sections</h5>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : sections.length > 0 ? (
          <ul className="list-group">
            {sections.map((sec, index) => (
              <li key={index} className="list-group-item">
                <strong>{sec.sectionName}</strong> — {sec.courseName}
              </li>
            ))}
          </ul>
        ) : (
          <div className="alert alert-secondary">
            No sections assigned.
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
