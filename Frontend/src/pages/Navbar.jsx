import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
    return <> <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
        <div className="container-fluid d-flex justify-content-between lign-items-center">
          <Link className="navbar-brand fw-bold fs-3 ms-3 text-danger" to="/">Airbnb</Link>
          <div className="d-flex align-items-center gap-4">
            {isLoggedIn && role === "host" && <Link to="/add-home" className="nav-link fw-semibold text-dark">Add Home</Link>}
            {isLoggedIn && <Link to="/bookings" className="nav-link fw-semibold text-dark">Bookings</Link>}
          </div>
          <div className="d-flex align-items-center  gap-3">
            {isLoggedIn ? (
              <>
                
                <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                <span className="badge rounded-circle bg-danger d-flex align-items-center justify-content-center" title={role} style={{ width: "36px", height: "36px" }}>{role?.charAt(0).toUpperCase()}</span>
              </>
            ) : (
              <Link to="/login" className="btn btn-danger">Login</Link>
            )}
          </div>
        </div>
      </nav></>
}
export default Navbar