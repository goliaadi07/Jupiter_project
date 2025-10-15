// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/axios";

// function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const [popup, setPopup] = useState(null);
//   const navigate = useNavigate();

//   // ⚡ Popup handler
//   const showPopup = (text, type = "error") => {
//     setPopup({ text, type });
//     setTimeout(() => setPopup(null), 2000); // disappears after 2s
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     if (!form.name.trim() || !form.username.trim() || !form.password.trim()) {
//       showPopup("⚠️ Please fill all fields");
//       return false;
//     }

//     // ✅ Email validation with popup
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(form.username)) {
//       showPopup("📧 Enter a valid email (e.g. user@example.com)");
//       return false;
//     }

//     // ✅ Password validation
//     if (
//       form.password.trim() &&
//       !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//         form.password
//       )
//     ) {
//       showPopup(
//         "🔒 Password must include uppercase, lowercase, number & symbol (8+ chars)"
//       );
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!validateForm()) return;

//     try {
//       await api.post("/auth/signup", form);
//       setMessage("✅ Account created successfully! Redirecting to login...");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       showPopup("⚠️ Email already exists or invalid data");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login-box">
//         <div className="logo-container">
//           <img src="/vite.svg" alt="App Logo" className="app-logo" />
//           <h1 className="logo-text">JupIter</h1>
//           <span className="inline-block mt-2 text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-blue-500 shadow-lg">
//             ⚡ AI Adoption Analyzer ⚡
//           </span>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* Name Input */}
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//           />

//           {/* Username (Email) Input */}
//           <input
//             type="text"
//             name="username"
//             placeholder="Email"
//             value={form.username}
//             onChange={handleChange}
//           />

//           {/* Password Input */}
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           <button type="submit">Sign up</button>

//           {message && <div className="message">{message}</div>}
//         </form>

//         <div className="divider">
//           <div className="line"></div>
//           <p>OR</p>
//           <div className="line"></div>
//         </div>
//       </div>

//       <div className="signup-box">
//         <p>
//           Already have an account?{" "}
//           <Link to="/" style={{ color: "#48854f", fontWeight: "600" }}>
//             Log in
//           </Link>
//         </p>
//       </div>

//       {/* 👋 Floating Greeting Bar */}
//       {form.name.trim() && (
//         <div className="floating-greet animate-fadeIn">
//           👋 Hi, <span>{form.name.split(" ")[0]}</span>!
//         </div>
//       )}

//       {/* ⚠️ Floating Popup */}
//       {popup && (
//         <div className={`popup ${popup.type} animate-fadeIn`}>{popup.text}</div>
//       )}
//     </div>
//   );
// }

// export default Signup;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api/axios";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  // ⚡ Popup handler
  const showPopup = (text, type = "error") => {
    setPopup({ text, type });
    setTimeout(() => setPopup(null), 2000); // disappears after 2s
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    // 🚨 Popup for empty fields
    if (!form.name.trim() || !form.username.trim() || !form.password.trim()) {
      showPopup("⚠️ Please fill all fields");
      return false;
    }

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.username)) {
      newErrors.username = "Enter a valid email (e.g. user@example.com)";
    }

    // ✅ Password validation
    if (
      form.password.trim() &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        form.password
      )
    ) {
      newErrors.password =
        "Password must have 8+ chars, include uppercase, lowercase, number, and special char";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    try {
      await api.post("/auth/signup", form);
      setMessage("✅ Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      showPopup("⚠️ Email already exists or invalid data");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="logo-container">
          <img src="/vite.svg" alt="App Logo" className="app-logo" />
          <h1 className="logo-text">JupIter</h1>
          <span className="inline-block mt-2 text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-blue-500 shadow-lg">
            ⚡ AI Adoption Analyzer ⚡
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          {/* Username (Email) Input */}
          <input
            type="text"
            name="username"
            placeholder="Email"
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button type="submit">Sign up</button>

          {message && <div className="message">{message}</div>}
        </form>

        <div className="divider">
          <div className="line"></div>
          <p>OR</p>
          <div className="line"></div>
        </div>
      </div>

      <div className="signup-box">
        <p>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#48854f", fontWeight: "600" }}>
            Log in
          </Link>
        </p>
      </div>

      {/* 👋 Floating Greeting Bar */}
      {form.name.trim() && (
        <div className="floating-greet animate-fadeIn">
          👋 Hi, <span>{form.name.split(" ")[0]}</span>!
        </div>
      )}

      {/* ⚠️ Floating Popup */}
      {popup && (
        <div className={`popup ${popup.type} animate-fadeIn`}>{popup.text}</div>
      )}
    </div>
  );
}

export default Signup;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/axios";

// function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});
//   const [popup, setPopup] = useState(null);
//   const navigate = useNavigate();

//   //  Popup handler
//   const showPopup = (text, type = "error") => {
//     setPopup({ text, type });
//     setTimeout(() => setPopup(null), 2000); 
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!form.name.trim() || !form.username.trim() || !form.password.trim()) {
//       showPopup("⚠️ Please fill all fields");
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(form.username)) {
//       newErrors.username = "Enter a valid email (e.g. user@example.com)";
//     }

//     if (
//       form.password.trim() &&
//       !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//         form.password
//       )
//     ) {
//       newErrors.password =
//         "Password must have 8+ chars, include uppercase, lowercase, number, and special char";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       await api.post("/auth/signup", form);
//       setMessage("✅ Account created successfully! Redirecting to login...");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       showPopup("⚠️ Email already exists or invalid data");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login-box">
//         <div className="logo-container">
//           <img src="/vite.svg" alt="App Logo" className="app-logo" />
//           <h1 className="logo-text">JupIter</h1>
//           <span className="inline-block mt-2 text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-blue-500 shadow-lg">
//             ⚡ AI Adoption Analyzer ⚡
//           </span>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* Name Input */}
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//           />
//           {errors.name && <p className="error-text">{errors.name}</p>}

//           {/* Username Input */}
//           <input
//             type="text"
//             name="username"
//             placeholder="Email"
//             value={form.username}
//             onChange={handleChange}
//           />
//           {errors.username && <p className="error-text">{errors.username}</p>}

//           {/* Password Input */}
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />
//           {errors.password && <p className="error-text">{errors.password}</p>}

//           <button type="submit">Sign up</button>

//           {message && <div className="message">{message}</div>}
//         </form>

//         <div className="divider">
//           <div className="line"></div>
//           <p>OR</p>
//           <div className="line"></div>
//         </div>
//       </div>

//       <div className="signup-box">
//         <p>
//           Already have an account?{" "}
//           <Link to="/" style={{ color: "#48854f", fontWeight: "600" }}>
//             Log in
//           </Link>
//         </p>
//       </div>

//       {/* 👋 Floating Greeting Bar */}
//       {form.name.trim() && (
//         <div className="floating-greet">
//           👋 Hi, <span>{form.name.split(" ")[0]}</span>!
//         </div>
//       )}

//       {/* ⚠️ Floating Popup */}
//       {popup && <div className={`popup ${popup.type}`}>{popup.text}</div>}
//     </div>
//   );
// }

// export default Signup;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/axios";

// function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!form.name.trim()) {
//       newErrors.name = "Full name is required";
//     }

//     // ✅ Email (username) validation
//     if (!form.username.trim()) {
//       newErrors.username = "Email is required";
//     } else {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(form.username)) {
//         newErrors.username = "Enter a valid email address (e.g. user@example.com)";
//       }
//     }

//     if (!form.password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (
//       !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//         form.password
//       )
//     ) {
//       newErrors.password =
//         "Password must have 8+ chars, include uppercase, lowercase, number, and special char";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; 
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       await api.post("/auth/signup", form);
//       setMessage("Account created successfully! Redirecting to login...");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       setMessage("Email already exists or invalid data");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login-box">
//         <div className="logo-container">
//           <img src="/vite.svg" alt="App Logo" className="app-logo" />
//           <h1 className="logo-text">JupIter</h1>
//           <span className="inline-block mt-2 text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-blue-500 shadow-lg">
//            ⚡ AI Adoption Analyzer ⚡
//           </span>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* Name Input */}
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//           />
//           {errors.name && <p className="error-text">{errors.name}</p>}

//           {/* Username (Email) Input */}
//           <input
//             type="text"
//             name="username"
//             placeholder="Email"
//             value={form.username}
//             onChange={handleChange}
//           />
//           {errors.username && <p className="error-text">{errors.username}</p>}

//           {/* Password Input */}
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />
//           {errors.password && <p className="error-text">{errors.password}</p>}

//           <button type="submit">Sign up</button>

//           {message && <div className="message">{message}</div>}
//         </form>

//         <div className="divider">
//           <div className="line"></div>
//           <p>OR</p>
//           <div className="line"></div>
//         </div>
//       </div>

//       <div className="signup-box">
//         <p>
//           Already have an account?{" "}
//           <Link to="/" style={{ color: "#48854f", fontWeight: "600" }}>
//             Log in
//           </Link>
//         </p>
//       </div>

//       {/* 👋 Floating Greeting Bar */}
//        {form.name.trim() && (
//          <div className="floating-greet">
//            👋 Hi, <span>{form.name.split(" ")[0]}</span>!
//          </div>
//        )}
//     </div>
//   );
// }

// export default Signup;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/axios";

// function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!form.name.trim()) {
//       newErrors.name = "Full name is required";
//     }

//     if (!form.username.trim()) {
//       newErrors.username = "Email is required";
//     } else if (form.username.length < 4) {
//       newErrors.username = "Email must be at least 4 characters";
//     }
    

//     if (!form.password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (
//       !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//         form.password
//       )
//     ) {
//       newErrors.password =
//         "Password must have 8+ chars, include uppercase, lowercase, number, and special char";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; 
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       await api.post("/auth/signup", form);
//       setMessage("Account created successfully! Redirecting to login...");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       setMessage("Username already exists or invalid data");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login-box">
//         <div className="logo-container">
//           <img src="/vite.svg" alt="App Logo" className="app-logo" />
//           <h1 className="logo-text">JupIter</h1>
//           <span className="inline-block mt-2 text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-blue-500 shadow-lg">
//            ⚡ AI Adoption Analyzer ⚡
//           </span>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* Name Input */}
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//           />
//           {errors.name && <p className="error-text">{errors.name}</p>}

//           {/* Username Input */}
//           <input
//             type="text"
//             name="username"
//             placeholder="Email"
//             value={form.username}
//             onChange={handleChange}
//           />
//           {errors.username && <p className="error-text">{errors.username}</p>}

//           {/* Password Input */}
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />
//           {errors.password && <p className="error-text">{errors.password}</p>}

//           <button type="submit">Sign up</button>

//           {message && <div className="message">{message}</div>}
//         </form>

//         <div className="divider">
//           <div className="line"></div>
//           <p>OR</p>
//           <div className="line"></div>
//         </div>
//       </div>

//       <div className="signup-box">
//         <p>
//           Already have an account?{" "}
//           <Link to="/" style={{ color: "#48854f", fontWeight: "600" }}>
//             Log in
//           </Link>
//         </p>
//       </div>
//       {/* 👋 Floating Greeting Bar */}
//        {form.name.trim() && (
//          <div className="floating-greet">
//            👋 Hi, <span>{form.name.split(" ")[0]}</span>!
//          </div>
//        )}
//     </div>
//   );
// }

// export default Signup;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/axios";
// import "./Signup.css";

// function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const [popup, setPopup] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const showPopup = (text) => {
//     setPopup(text);
//     setTimeout(() => setPopup(""), 2500); 
//   };

// const validateForm = () => {
//   if (!form.name.trim()) {
//     showPopup("⚠️ Full name is required");
//     return false;
//   }

//   // ✅ Username (email) validation
//   if (!form.username.trim()) {
//     showPopup("⚠️ Username (email) is required");
//     return false;
//   }

//   // ✅ Must contain '@' and valid email structure
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(form.username)) {
//     showPopup("⚠️ Enter a valid email address (e.g. user@example.com)");
//     return false;
//   }

//   if (!form.password.trim()) {
//     showPopup("⚠️ Password is required");
//     return false;
//   }

//   // ✅ Strong password rule
//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   if (!passwordRegex.test(form.password)) {
//     showPopup(
//       "⚠️ Password must include uppercase, lowercase, number & special character, and be at least 8 characters long."
//     );
//     return false;
//   }

//   return true;
// };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!validateForm()) return;

//     try {
//       await api.post("/auth/signup", form);
//       showPopup("✅ Account created successfully!");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       showPopup("⚠️ Username already exists");
//     }
//   };

//   return (
//     <div className="container">
//       {popup && (
//         <div
//           className="fixed top-6 left-1/2 transform -translate-x-1/2 
//           bg-[#111] text-white px-6 py-3 rounded-lg shadow-lg border border-gray-700 
//           z-50 text-sm font-medium animate-fadeIn"
//         >
//           {popup}
//         </div>
//       )}

//       <div className="login-box">
//         <div className="logo-container">
//           <img src="/vite.svg" alt="App Logo" className="app-logo" />
//           <h1 className="logo-text">JupIter</h1>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="username"
//             placeholder="Username or email"
//             value={form.username}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           <button type="submit">Sign up</button>

//           {message && <div className="message">{message}</div>}
//         </form>

//         <div className="divider">
//           <div className="line"></div>
//           <p>OR</p>
//           <div className="line"></div>
//         </div>
//       </div>

//       <div className="signup-box">
//         <p>
//           Already have an account?{" "}
//           <Link to="/" style={{ color: "#48854f", fontWeight: "600" }}>
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/axios";
// import "./Signup.css";

// function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const [popup, setPopup] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const showPopup = (text) => {
//     setPopup(text);
//     setTimeout(() => setPopup(""), 2500);
//   };

//   const validateForm = () => {
//     if (!form.name.trim()) {
//       showPopup("⚠️ Full name is required");
//       return false;
//     }

//     if (!form.username.trim()) {
//       showPopup("⚠️ Username (email) is required");
//       return false;
//     }

//     const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
//     if (!emailRegex.test(form.username)) {
//       showPopup("⚠️ Enter a valid email address (e.g. user@example.com)");
//       return false;
//     }

//     if (!form.password.trim()) {
//       showPopup("⚠️ Password is required");
//       return false;
//     }

//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;

//     if (!passwordRegex.test(form.password)) {
//       showPopup(
//         "⚠️ Password must include uppercase, lowercase, number & special character, and be at least 8 characters long."
//       );
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!validateForm()) return;

//     try {
//       await api.post("/auth/signup", form);
//       showPopup("✅ Account created successfully!");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       showPopup("⚠️ Username already exists");
//     }
//   };

//   return (
//     <div className="container">
//       {/* ⚡ Popup on top */}
//       {popup && (
//         <div
//           className="fixed top-6 left-1/2 transform -translate-x-1/2 
//           bg-[#111] text-white px-6 py-3 rounded-lg shadow-lg border border-gray-700 
//           z-50 text-sm font-medium animate-fadeIn"
//         >
//           {popup}
//         </div>
//       )}

//       {/* ✨ Signup Box */}
//       <div className="login-box">
//         <div className="logo-container">
//           <img src="/vite.svg" alt="App Logo" className="app-logo" />
//           <h1 className="logo-text">JupIter</h1>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="username"
//             placeholder="Username or email"
//             value={form.username}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           <button type="submit">Sign up</button>

//           {message && <div className="message">{message}</div>}
//         </form>

//         <div className="divider">
//           <div className="line"></div>
//           <p>OR</p>
//           <div className="line"></div>
//         </div>
//       </div>

//       <div className="signup-box">
//         <p>
//           Already have an account?{" "}
//           <Link to="/" style={{ color: "#48854f", fontWeight: "600" }}>
//             Log in
//           </Link>
//         </p>
//       </div>

//       {/* 👋 Floating Greeting Bar */}
//       {form.name.trim() && (
//         <div className="floating-greet">
//           👋 Hi, <span>{form.name.split(" ")[0]}</span>!
//         </div>
//       )}
//     </div>
//   );
// }

// export default Signup;
