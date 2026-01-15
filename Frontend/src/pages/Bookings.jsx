import axios from "axios";
import { useEffect, useState } from "react";

export default function Bookings() {
  const [homes, setHomes] = useState([]);
  const booked = JSON.parse(localStorage.getItem("booked") || "[]");

  useEffect(() => {
    axios.get("https://airbnb-2-89uq.onrender.com/api/home").then(res => {
      const bookedHomes = res.data.filter(h => booked.includes(h._id));
      setHomes(bookedHomes);
    });
  }, [booked]);

  return (
    <div className="container mt-5">
      {homes.length === 0 ? (
        <p className="fs-3">No bookings yet.</p>
      ) : (
        <div className="row">
          {homes.map(h => (
            <div key={h._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={h.image} className="card-img-top" alt={h.title} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{h.title}</h5>
                  <p className="card-text text-muted">{h.location}</p>
                  <p className="card-text fw-bold">₹{h.price}</p>
                  <p className="card-text flex-grow-1">{h.description}</p>
                  <div className="mt-auto">
                    <button className="btn btn-secondary" disabled>Booked</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}