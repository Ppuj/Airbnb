import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AddHome() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      axios.get(`https://airbnb-2-89uq.onrender.com/api/home/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          setForm(res.data);
        }).catch(err => {
          setError("Failed to load home data");
        });
    }
  }, [id]);

  const submitHome = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.location || !form.price || !form.image || !form.description) {
      setError("Please fill all fields.");
      return;
    }
    try {
      setLoading(true);
      if (isEdit) {
        await axios.put(`https://airbnb-2-89uq.onrender.com/api/home/${id}`, form, {
          headers: { Authorization: localStorage.getItem("token") }
        });
      } else {
        await axios.post("https://airbnb-2-89uq.onrender.com/api/home", form, {
          headers: { Authorization: localStorage.getItem("token") }
        });
      }
      setLoading(false);
      alert(isEdit ? "Home updated" : "Home added");
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || `Failed to ${isEdit ? "update" : "add"} home`);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h4 className="card-title mb-3 text-center text-danger fw-bold">{isEdit ? "Update Home" : "Add Home"}</h4>

              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={submitHome} className="d-grid gap-3">
                <div className="form-floating">
                  <input
                    id="title"
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                  <label htmlFor="title">Title</label>
                </div>

                <div className="form-floating">
                  <input
                    id="location"
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                  <label htmlFor="location">Location</label>
                </div>

                <div className="form-floating">
                  <input
                    id="price"
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                  <label htmlFor="price">Price</label>
                </div>

                <div className="form-floating">
                  <input
                    id="image"
                    type="url"
                    className="form-control"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                  />
                  <label htmlFor="image">Image URL</label>
                </div>

                <div className="form-floating">
                  <textarea
                    id="description"
                    className="form-control"
                    placeholder="Description"
                    style={{ height: "100px" }}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                  <label htmlFor="description">Description</label>
                </div>

                <button type="submit" className="btn btn-danger btn-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                      {isEdit ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    isEdit ? "Update Home" : "Add Home"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
