import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Homes() {
  const [homes, setHomes] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const isLoggedIn = !!localStorage.getItem("token");
  const booked = JSON.parse(localStorage.getItem("booked") || "[]");

  const sampleHomes = [
    {
      _id: 'sample1',
      title: 'Cozy Apartment',
      location: 'New York',
      price: 1500,
      description: 'A beautiful cozy apartment in the heart of the city.',
      image: 'https://i0.wp.com/www.printmag.com/wp-content/uploads/2024/05/06-The-Up-House-Icons-Airbnb-Credit-Ryan-Lowry.jpg?resize=1000%2C667&quality=89&ssl=1',
      host: { name: 'John Doe' }
    },
    {
      _id: 'sample2',
      title: 'House 123',
      location: 'California',
      price: 2500,
      description: 'Relaxing beach house with ocean views.',
      image: 'https://i0.wp.com/www.printmag.com/wp-content/uploads/2024/05/12-The-Up-House-Icons-Airbnb-Credit-Ryan-Lowry.jpg?resize=1000%2C667&quality=89&ssl=1',
      host: { name: 'Jane Smith' }
    },
    {
      _id: 'sample3',
      title: 'Mountain Cabin',
      location: 'Colorado',
      price: 1200,
      description: 'Charming cabin in the mountains.',
      image: 'https://i0.wp.com/www.printmag.com/wp-content/uploads/2024/05/25-Live-Like-Janhvi-Icons-Airbnb-Credit-Bikramjit-Bose.jpg?resize=1000%2C667&quality=89&ssl=1',
      host: { name: 'Bob Johnson' }
    }
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/api/home").then(res => setHomes(res.data));
  }, []);

  const editHome = (id) => {
    navigate(`/add-home/${id}`);
  };

  const deleteHome = async (id) => {
    if (window.confirm("Are you sure you want to delete this home?")) {
      try {
        await axios.delete(`http://localhost:5000/api/home/${id}`, {
          headers: { Authorization: localStorage.getItem("token") }
        });
        setHomes(homes.filter(home => home._id !== id));
        alert("Home deleted");
      } catch (err) {
        alert("Failed to delete home");
      }
    }
  };

  const bookHome = (id) => {
    const booked = JSON.parse(localStorage.getItem("booked") || "[]");
    if (!booked.includes(id)) {
      booked.push(id);
      localStorage.setItem("booked", JSON.stringify(booked));
      alert(`Booked home ${id}`);
      window.location.reload();
    } else {
      alert("Already booked");
    }
  };

  return (
    <div className="container mt-5">

      <div className="row">
       {(!isLoggedIn||homes.length === 0 )&& (
        <div className="text-center mb-4">
          <p className="fs-5">Login/Signup to add New House</p>
        </div>
      )}
        {(homes.length === 0 ? sampleHomes : homes).map(h => (
          <div key={h._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={h.image} className="card-img-top" alt={h.title} style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0 fs-4">{h.title}</h5>
                  <p className="card-text fw-bold mb-0 fs-4">₹{h.price}</p>
                </div>
                <p className="card-text text-dark fw-medium mb-1">{h.location} ( Hosted by {h.host.name} )</p>
                <p className="card-text flex-grow-1">{h.description}</p>
                <div className="mt-auto">
                  {isLoggedIn && booked.includes(h._id) ? (
                    // SHOW THIS TO BOTH HOST & GUEST
                    <button className="btn btn-secondary" disabled> Booked</button>
                  ) : role === "host" ? (
                    <>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => editHome(h._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteHome(h._id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : isLoggedIn && role === "guest" ? (
                    <button
                      className="btn btn-success"
                      onClick={() => bookHome(h._id)}
                    >
                      Book Now
                    </button>
                  ) : null}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
}
