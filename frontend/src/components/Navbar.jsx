import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { removeUser } from "../Redux/Auth/loginSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.reducer.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/login');
  };

  // Custom function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex items-center sticky top-0 justify-between bg-gray-800 p-4 z-50">
      <NavLink to='/' className={`text-3xl text-white flex items-center space-x-2 ${isActive('/') ? 'text-red-400' : ''}`}>
        <img src="../../logo.png" className="h-10" alt="EventEase Logo" />
        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white poppins-semibold tracking-wide">EventEase</span>
      </NavLink>
      <div className="flex items-center gap-6 text-white tracking-wide">
        <NavLink to="/" className={`cursor-pointer hover:text-gray-300 text-lg poppins-medium ${isActive('/') ? ' text-red-400' : ''}`}>Home</NavLink>
        {!user ? (
          <>
            <NavLink to="/login" className={`cursor-pointer hover:text-gray-300 text-lg poppins-medium ${isActive('/login') ? 'text-red-400' : ''}`}>Login</NavLink>
          </>
        ) : (
          <>
            {user?.mCode && (
              <NavLink to="/event" className={`cursor-pointer hover:text-gray-300 text-lg poppins-medium ${isActive('/event') ? 'text-red-400' : ''}`}>Events</NavLink>
            )}
            {user?.role && (
              <>
              <NavLink to="/register" className={`cursor-pointer hover:text-gray-300 poppins-medium text-lg ${isActive('/register') ? 'text-red-400' : ''}`}>Register</NavLink>
              <NavLink to="/admin" className={`cursor-pointer hover:text-gray-300 poppins-medium text-lg ${isActive('/admin') ? 'text-red-400' : ''}`}>Dashboard</NavLink>
              </>
            )}
            {user && !(user.role) && !(user.mCode) && (
            <NavLink to="/studentDashboard" className={`cursor-pointer hover:text-gray-300 poppins-medium text-lg ${isActive('/studentDashboard') ? 'text-red-400' : ''}`}>DashBoard</NavLink>
            )}
            {
              user && user.mCode && !(user.role) && (
                <>
                <NavLink to="/teacherDashboard" className={`cursor-pointer hover:text-gray-300 poppins-medium text-lg ${isActive('/teacherDashboard') ? 'text-red-400' : ''}`}>DashBoard</NavLink>
                <NavLink to="/studentlist" className={`cursor-pointer hover:text-gray-300 poppins-medium text-lg ${isActive('/studentlist') ? 'text-red-400' : ''}`}>Students</NavLink>
                </>
              )
            }
            <NavLink to="/archive" className={`cursor-pointer hover:text-gray-300 text-lg poppins-medium ${isActive('/archive') ? 'text-red-400' : ''}`}>Archive</NavLink>
            <button className="cursor-pointer text-white ms-4 poppins-medium px-4 py-2 bg-red-700 hover:bg-red-900 rounded-lg text-md" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
