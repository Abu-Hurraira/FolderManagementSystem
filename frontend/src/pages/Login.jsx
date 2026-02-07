import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login", {
        email,
        password,
      });

      if (res.data.status_code === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        navigate("/dashboard");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Teacher Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <div className="alert alert-danger mt-3 py-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
