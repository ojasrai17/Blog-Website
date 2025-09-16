import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [blogData, setBlogData] = useState([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch all blogs from backend
  useEffect(() => {
    const allBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/all`);
        setBlogData(res.data.blogs);
      } catch (error) {
        console.log("Error fetching all blogs:", error);
      }
    };
    allBlogs();
  }, []);

  // Login function
  const loginUser = (user, token) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  // Logout function
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const contextValue = { blogData, user, loginUser, logoutUser };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
