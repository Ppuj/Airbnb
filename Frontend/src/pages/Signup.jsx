import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.role) {
      setError("Please fill all fields.");
      return;
    }
    try {
      setLoading(true);
      const res=await axios.post("http://localhost:5000/api/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
       window.location.reload(); 
      setLoading(false);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-7 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h4 className="card-title mb-3 text-center text-danger fw-bold">Create account</h4>

              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={submit} className="d-grid gap-3">
                <div className="form-floating">
                  <input
                    id="name"
                    className="form-control"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating">
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating">
                  <select
                    className="form-select"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="">Select</option>
                    <option value="guest">Guest</option>
                    <option value="host">Host</option>
                  </select>
                  
                </div>

                <div className="form-floating">
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <button type="submit" className="btn btn-danger btn-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                      Signing up...
                    </>
                  ) : (
                    "Signup"
                  )}
                </button>

                <div className="text-center">
                  <small>
                    Already have an account? <Link to="/login">Login</Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
