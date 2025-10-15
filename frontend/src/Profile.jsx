// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "./api/axios";
// import "./App.css";

// export default function Profile() {
//   const [user, setUser] = useState({
//     name: "",
//     username: "",
//     password: "********",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     api
//       .get("/user/me")
//       .then((res) => {
//         setUser({
//           name: res.data.name || "Not available",
//           username: res.data.username || "Unknown",
//           password: "********",
//         });
//       })
//       .catch(() => {
//         setUser({
//           name: "Aditya Goli",
//           username: "aditya07",
//           password: "********",
//         });
//       });
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/", { replace: true });
//   };

//   return (
//     <div className="container">
//       <div className="login-box">
//         {/* Profile Avatar */}
//         <div className="logo-container">
//           <div className="profile-avatar">
//             {user.name ? user.name.charAt(0).toUpperCase() : "U"}
//           </div>
//         </div>

//         {/* User Details */}
//         <h1 style={{ marginBottom: "10px" }}>{user.name}</h1>
//         <p style={{ color: "#a8a8a8", marginBottom: "30px" }}>
//           @{user.username}
//         </p>

//         <div className="profile-info">
//           <span className="profile-label">Password</span>
//           <span>{user.password}</span>
//         </div>

//         {/* Buttons */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//           <button
//             onClick={() => navigate("/home")}
//             style={{
//               backgroundColor: "#48854f",
//               borderRadius: "30px",
//               padding: "10px",
//               fontWeight: "bold",
//               color: "white",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             ⬅ Back to Home
//           </button>

//           <button className="logout-btn" onClick={logout}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/axios";
import "./App.css";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/user/me")
      .then((res) => {
        setUser({
          name: res.data.name,
          username: res.data.username,
        });
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: user.name,
      };
      if (newPassword.trim()) payload.password = newPassword;

      const res = await api.put("/user/update", payload);
      setMessage(res.data);
      setNewPassword("");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("❌ Failed to update profile");
    }
  };

  return (
    <div className="container">
      <div className="login-box" style={{ padding: "40px 60px" }}>
        {/* Profile Avatar */}
        <div className="logo-container">
          <div
            className="profile-avatar"
            style={{
              background: "#48854f",
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px",
              color: "white",
              marginBottom: "15px",
            }}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>

        {/* User Info */}
        <h2>{user.name}</h2>
        <p style={{ color: "#a8a8a8", marginBottom: "25px" }}>
          @{user.username}
        </p>

        {/* Update Form */}
        <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            placeholder="Enter new name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <input
            type="password"
            placeholder="Enter new password (optional)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#48854f",
              borderRadius: "30px",
              padding: "10px",
              fontWeight: "bold",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            💾 Update Profile
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "10px",
              color: message.includes("✅") ? "#4caf50" : "#f44336",
            }}
          >
            {message}
          </p>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          <button
            onClick={() => navigate("/home")}
            style={{
              backgroundColor: "#6b7280",
              borderRadius: "30px",
              padding: "10px",
              fontWeight: "bold",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            ⬅ Back to Home
          </button>

          <button
            onClick={logout}
            style={{
              backgroundColor: "#e53935",
              borderRadius: "30px",
              padding: "10px",
              fontWeight: "bold",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
           Logout
          </button>
        </div>
      </div>
    </div>
  );
}
