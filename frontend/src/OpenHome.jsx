import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "./api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function OpenHome() {
  const [jobs, setJobs] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  // ===== Fetch Jobs and News =====
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("http://localhost:3232/aijobs");
        console.log("✅ Jobs fetched:", res.data);
        setJobs(res.data);
      } catch (err) {
        console.error("❌ Error fetching AIJobs:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchNews = async () => {
      try {
        const res = await fetch(
          // "https://newsdata.io/api/1/news?apikey=pub_6c70b2c815524c71bfe88eac15352d5c"
          "https://newsdata.io/api/1/latest?apikey=pub_6c70b2c815524c71bfe88eac15352d5c&q=technology"
        );
        const data = await res.json();
        console.log("📰 News fetched:", data.results);
        setNews(data.results || []);
      } catch (err) {
        console.error("❌ Error fetching AI News:", err);
      }
    };

    fetchJobs();
    fetchNews();
  }, []);

  // ===== Chart Data =====
  const industryData = Object.entries(
    jobs.reduce((acc, job) => {
      const key = job.Industry || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const aiAdoptionData = Object.entries(
    jobs.reduce((acc, job) => {
      const key = job.ai_Adoption_Level || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const automationData = Object.entries(
    jobs.reduce((acc, job) => {
      const key = job.automation_Risk || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ["#4CAF50", "#FFC107", "#FF7043", "#42A5F5", "#AB47BC"];

  // ===== Loading / Empty States =====
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem", fontSize: "1.2rem", color: "#2e7d32" }}>
        ⏳ Loading AI job data...
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem", fontSize: "1.2rem", color: "#d32f2f" }}>
        ⚠️ No job data found. Make sure Docker API is running on port 3232.
      </div>
    );
  }

  // ===== Main UI =====
  return (
    <div
      style={{
        backgroundColor: "#f9fff9",
        color: "#222",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ===== Header ===== */}
      <header
        style={{
          backgroundColor: "#e8f5e9",
          padding: "1rem 2rem",
          borderBottom: "2px solid #c8e6c9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/home">
            <img src="/vite.svg" alt="logo" style={{ height: "30px" }} />
          </Link>
          <h1 style={{ fontSize: "22px", fontWeight: "700" }}>JupIter ⚡ AI Adoption Analyzer</h1>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: "#43a047",
              borderRadius: "25px",
              padding: "8px 16px",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            style={{
              backgroundColor: "#1e88e5",
              borderRadius: "25px",
              padding: "8px 16px",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Add Job Details
          </button>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section style={{ textAlign: "center", margin: "2rem 1rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#2e7d32" }}>
          🌎 Discover Global AI Jobs Insights & Tech News
        </h2>
        {/* <p style={{ color: "#555", maxWidth: "700px", margin: "10px auto" }}>
          Explore how AI, automation, and technology are reshaping industries worldwide.
        </p> */}
        <p
          style={{
          color: "#555",
          maxWidth: "700px",
          margin: "10px auto",
          fontWeight: "bold",
           }}
          >
          ⚡Explore how AI, automation, and technology are reshaping industries worldwide⚡
          </p>

      </section>

      {/* ===== Split Section: News + Jobs ===== */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          padding: "0 2rem 2rem",
        }}
      >
        {/* ===== Left: News ===== */}
        <div
          style={{
            flex: "1",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #ddd",
            padding: "1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <h2 style={{ color: "#2e7d32", textAlign: "center", marginBottom: "1rem" }}>
            📰 AI Tech News
          </h2>
          {news.length > 0 ? (
            news.slice(0, 8).map((article, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "1rem",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "0.5rem",
                }}
              >
                <h4 style={{ fontSize: "16px", color: "#1b5e20" }}>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#2e7d32" }}
                  >
                    {article.title}
                  </a>
                </h4>
                <p style={{ color: "#555", fontSize: "14px" }}>
                  {article.description
                    ? article.description.slice(0, 100) + "..."
                    : "No description available."}
                </p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#888" }}>No news available.</p>
          )}
        </div>

        {/* ===== Right: Job Cards ===== */}
        <div style={{ flex: "2" }}>
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {jobs.slice(0, visibleCount).map((job) => (
              <div
                key={job.id}
                style={{
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "1rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ color: "#2e7d32", fontWeight: "bold" }}>{job.job_Title}</h3>
                <p><strong>Industry:</strong> {job.Industry}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>AI Level:</strong> {job.ai_Adoption_Level}</p>
                <p><strong>Automation Risk:</strong> {job.automation_Risk}</p>
                <p><strong>Salary:</strong> {job.salary_USD ? `$${Number(job.salary_USD).toFixed(2)}` : "N/A"}</p>
                <p><strong>Remote Friendly:</strong> {job.Remote_Friendly}</p>
              </div>
            ))}
          </section>

          {visibleCount < jobs.length && (
            <div style={{ textAlign: "center", margin: "2rem 0" }}>
              <button
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (token) navigate("/home");
                  else {
                    alert("🔒 Please log in to view more job listings!");
                    navigate("/login");
                  }
                }}
                style={{
                  backgroundColor: "#43a047",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Load More ↓
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== Charts Section (Full Width) ===== */}
      <section style={{ textAlign: "center", margin: "2rem 0" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#2e7d32" }}>
          📊 AI Adoption Insights
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            padding: "0 2rem 3rem",
          }}
        >
          <div style={{ background: "#fafafa", border: "1px solid #ddd", borderRadius: "12px", padding: "1rem" }}>
            <h3 style={{ color: "#388e3c" }}>Jobs by Industry</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={industryData} dataKey="value" nameKey="name" outerRadius={90} label>
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: "#fafafa", border: "1px solid #ddd", borderRadius: "12px", padding: "1rem" }}>
            <h3 style={{ color: "#388e3c" }}>AI Adoption Levels</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={aiAdoptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#444" />
                <YAxis stroke="#444" />
                <Tooltip />
                <Bar dataKey="value" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: "#fafafa", border: "1px solid #ddd", borderRadius: "12px", padding: "1rem" }}>
            <h3 style={{ color: "#388e3c" }}>Automation Risk</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={automationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#444" />
                <YAxis stroke="#444" />
                <Tooltip />
                <Bar dataKey="value" fill="#FF7043" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer
        style={{
          backgroundColor: "#e8f5e9",
          textAlign: "center",
          padding: "1.5rem",
          borderTop: "2px solid #c8e6c9",
          color: "#2e7d32",
          fontWeight: "500",
          marginTop: "auto",
        }}
      >
        <p>© 2025 JupIter. All rights reserved.</p>
        <p style={{ fontSize: "13px", color: "#4caf50" }}>
          Built with ❤️ by Aditya Ashok Goli
        </p>
      </footer>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "./api/axios"; 
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// export default function OpenHome() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [visibleCount, setVisibleCount] = useState(8); 
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await api.get("http://localhost:3232/aijobs");
//         console.log("✅ Jobs fetched:", res.data);
//         setJobs(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching AIJobs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const industryData = Object.entries(
//     jobs.reduce((acc, job) => {
//       const key = job.Industry || "Unknown";
//       acc[key] = (acc[key] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   const aiAdoptionData = Object.entries(
//     jobs.reduce((acc, job) => {
//       const key = job.ai_Adoption_Level || "Unknown";
//       acc[key] = (acc[key] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   const automationData = Object.entries(
//     jobs.reduce((acc, job) => {
//       const key = job.automation_Risk || "Unknown";
//       acc[key] = (acc[key] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   const COLORS = ["#4CAF50", "#FFC107", "#FF7043", "#42A5F5", "#AB47BC"];

//   if (loading) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: "4rem",
//           fontSize: "1.2rem",
//           color: "#2e7d32",
//         }}
//       >
//         ⏳ Loading AI job data...
//       </div>
//     );
//   }

//   if (jobs.length === 0) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: "4rem",
//           fontSize: "1.2rem",
//           color: "#d32f2f",
//         }}
//       >
//         ⚠️ No job data found. Make sure Docker API is running on port 3232.
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         backgroundColor: "#f9fff9",
//         color: "#222",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* ===== Header ===== */}
//       <header
//         style={{
//           backgroundColor: "#e8f5e9",
//           padding: "1rem 2rem",
//           borderBottom: "2px solid #c8e6c9",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           position: "sticky",
//           top: 0,
//           zIndex: 100,
//         }}
//       >
//         {/* <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <Link to="/">
//             <img src="/vite.svg" alt="logo" style={{ height: "30px" }} />
//           </Link>
//           <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#2e7d32" }}>
//             JupIter (⚡ AI Adoption Dashboard ⚡)
//           </h1>
//         </div> */}
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <Link to="/home">
//             <img src="/vite.svg" alt="logo" style={{ height: "30px" }} />
//           </Link>
//           <h1 style={{ fontSize: "22px", fontWeight: "700" }}>JupIter</h1>
//         </div>

//         <div style={{ display: "flex", gap: "10px" }}>
//           <button
//             onClick={() => navigate("/login")}
//             style={{
//               backgroundColor: "#43a047",
//               borderRadius: "25px",
//               padding: "8px 16px",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//               fontWeight: "500",
//             }}
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate("/signup")}
//             style={{
//               backgroundColor: "#1e88e5",
//               borderRadius: "25px",
//               padding: "8px 16px",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//               fontWeight: "500",
//             }}
//           >
//             Add Job Details
//           </button>
//         </div>
//       </header>

//       {/* ===== Hero Section ===== */}
//       <section style={{ textAlign: "center", margin: "2rem 1rem" }}>
//         <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#2e7d32" }}>
//           🌎 Discover Global AI Jobs details and Insights
//         </h2>
//         <p style={{ color: "#555", maxWidth: "700px", margin: "10px auto" }}>
//           Explore how AI, automation, and technology are reshaping industries
//           worldwide. Login to unlock more insights.
//         </p>
//       </section>

//       {/* ===== Job Cards ===== */}
//       <section
//         style={{
//           padding: "0 2rem 3rem",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {jobs.slice(0, visibleCount).map((job) => (
//           <div
//             key={job.id}
//             style={{
//               background: "#fff",
//               border: "1px solid #ddd",
//               borderRadius: "12px",
//               padding: "1rem",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             <h3 style={{ color: "#2e7d32", fontWeight: "bold" }}>
//               {job.job_Title}
//             </h3>
//             <p>
//               <strong>Industry:</strong> {job.Industry}
//             </p>
//             <p>
//               <strong>Location:</strong> {job.location}
//             </p>
//             <p>
//               <strong>AI Level:</strong> {job.ai_Adoption_Level}
//             </p>
//             <p>
//               <strong>Automation Risk:</strong> {job.automation_Risk}
//             </p>
//             <p>
//               <strong>Salary:</strong>{" "}
//               {job.salary_USD
//                 ? `$${Number(job.salary_USD).toFixed(2)}`
//                 : "N/A"}
//             </p>
//             <p>
//               <strong>Remote Friendly:</strong> {job.Remote_Friendly}
//             </p>
//           </div>
//         ))}
//       </section>

//       {/* ===== Load More =====
//       {visibleCount < jobs.length && (
//         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
//           <button
//             onClick={() => {
//               alert("🔒 Please log in to view more job listings!");
//               navigate("/login");
//             }}
//             style={{
//               backgroundColor: "#43a047",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               padding: "12px 24px",
//               fontSize: "16px",
//               cursor: "pointer",
//               fontWeight: "500",
//             }}
//           >
//             Load More ↓
//           </button>
//         </div>
//       )} */}

//       {/* ===== Load More ===== */}
// {visibleCount < jobs.length && (
//   <div style={{ textAlign: "center", marginBottom: "3rem" }}>
//     <button
//       onClick={() => {
//         const token = localStorage.getItem("token"); 
//         if (token) {
//           navigate("/home");
//         } else {
//           alert("🔒 Please log in to view more job listings!");
//           navigate("/login");
//         }
//       }}
//       style={{
//         backgroundColor: "#43a047",
//         color: "white",
//         border: "none",
//         borderRadius: "8px",
//         padding: "12px 24px",
//         fontSize: "16px",
//         cursor: "pointer",
//         fontWeight: "500",
//       }}
//     >
//       Load More ↓
//     </button>
//   </div>
// )}


//       {/* ===== Charts Section ===== */}
//       <section style={{ textAlign: "center", margin: "2rem 0" }}>
//         <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#2e7d32" }}>
//           📊 AI Adoption Insights
//         </h2>
//         <p style={{ color: "#666", marginBottom: "1.5rem" }}>
//           Explore global AI and automation trends from shared job data.
//         </p>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
//             gap: "20px",
//             padding: "0 2rem 3rem",
//           }}
//         >
//           {/* Industry Pie Chart */}
//           <div
//             style={{
//               background: "#fafafa",
//               border: "1px solid #ddd",
//               borderRadius: "12px",
//               padding: "1rem",
//             }}
//           >
//             <h3 style={{ color: "#388e3c" }}>Jobs by Industry</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={industryData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={90}
//                   label
//                 >
//                   {industryData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* AI Adoption Bar Chart */}
//           <div
//             style={{
//               background: "#fafafa",
//               border: "1px solid #ddd",
//               borderRadius: "12px",
//               padding: "1rem",
//             }}
//           >
//             <h3 style={{ color: "#388e3c" }}>AI Adoption Levels</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={aiAdoptionData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" stroke="#444" />
//                 <YAxis stroke="#444" />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#4CAF50" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Automation Risk Chart */}
//           <div
//             style={{
//               background: "#fafafa",
//               border: "1px solid #ddd",
//               borderRadius: "12px",
//               padding: "1rem",
//             }}
//           >
//             <h3 style={{ color: "#388e3c" }}>Automation Risk</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={automationData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" stroke="#444" />
//                 <YAxis stroke="#444" />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#FF7043" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </section>

//       {/* ===== Footer ===== */}
//       <footer
//         style={{
//           backgroundColor: "#e8f5e9",
//           textAlign: "center",
//           padding: "1.5rem",
//           borderTop: "2px solid #c8e6c9",
//           color: "#2e7d32",
//           fontWeight: "500",
//           marginTop: "auto",
//         }}
//       >
//         <p>© 2025 JupIter. All rights reserved.</p>
//         <p style={{ fontSize: "13px", color: "#4caf50" }}>
//           Built with ❤️ by Aditya Ashok Goli
//         </p>
//       </footer>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// export default function OpenHome() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // ✅ Fetch data from your Docker backend
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get("http://localhost:3232/aijobs");
//         console.log("✅ Jobs fetched:", res.data);
//         setJobs(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching AIJobs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   // ✅ Prepare data for charts
//   const industryData = Object.entries(
//     jobs.reduce((acc, job) => {
//       const key = job.Industry || "Unknown";
//       acc[key] = (acc[key] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   const aiAdoptionData = Object.entries(
//     jobs.reduce((acc, job) => {
//       const key = job.ai_Adoption_Level || "Unknown";
//       acc[key] = (acc[key] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   const automationData = Object.entries(
//     jobs.reduce((acc, job) => {
//       const key = job.automation_Risk || "Unknown";
//       acc[key] = (acc[key] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   const COLORS = ["#4CAF50", "#FFC107", "#FF7043", "#42A5F5", "#AB47BC"];

//   // ✅ Loading and Empty states
//   if (loading) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: "4rem",
//           fontSize: "1.2rem",
//           color: "#2e7d32",
//         }}
//       >
//         ⏳ Loading AI job data...
//       </div>
//     );
//   }

//   if (jobs.length === 0) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: "4rem",
//           fontSize: "1.2rem",
//           color: "#d32f2f",
//         }}
//       >
//         ⚠️ No job data found. Make sure Docker API is running on port 3232.
//       </div>
//     );
//   }

//   // ✅ UI Rendering
//   return (
//     <div
//       style={{
//         backgroundColor: "#f9fff9",
//         color: "#222",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* ===== Header ===== */}
//       <header
//         style={{
//           backgroundColor: "#e8f5e9",
//           padding: "1rem 2rem",
//           borderBottom: "2px solid #c8e6c9",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           position: "sticky",
//           top: 0,
//           zIndex: 100,
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <Link to="/">
//             <img src="/vite.svg" alt="logo" style={{ height: "30px" }} />
//           </Link>
//           <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#2e7d32" }}>
//             JupIter (⚡ AI Adoption Dashboard ⚡)
//           </h1>
//         </div>

//         <div style={{ display: "flex", gap: "10px" }}>
//           <button
//             onClick={() => navigate("/login")}
//             style={{
//               backgroundColor: "#43a047",
//               borderRadius: "25px",
//               padding: "8px 16px",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//               fontWeight: "500",
//             }}
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate("/signup")}
//             style={{
//               backgroundColor: "#1e88e5",
//               borderRadius: "25px",
//               padding: "8px 16px",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//               fontWeight: "500",
//             }}
//           >
//             Add Job Details
//           </button>
//         </div>
//       </header>

//       {/* ===== Hero Section ===== */}
//       <section style={{ textAlign: "center", margin: "2rem 1rem" }}>
//         <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#2e7d32" }}>
//           🌎 Discover Global AI Jobs
//         </h2>
//         <p style={{ color: "#555", maxWidth: "700px", margin: "10px auto" }}>
//           Explore how AI, automation, and technology are reshaping industries
//           worldwide. Login to add or analyze more insights.
//         </p>
//       </section>

//       {/* ===== Job Cards ===== */}
//       <section
//         style={{
//           padding: "0 2rem 3rem",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {jobs.slice(0, 6).map((job) => (
//           <div
//             key={job.id}
//             style={{
//               background: "#fff",
//               border: "1px solid #ddd",
//               borderRadius: "12px",
//               padding: "1rem",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             <h3 style={{ color: "#2e7d32", fontWeight: "bold" }}>
//               {job.job_Title}
//             </h3>
//             <p>
//               <strong>Industry:</strong> {job.Industry}
//             </p>
//             <p>
//               <strong>Location:</strong> {job.location}
//             </p>
//             <p>
//               <strong>AI Level:</strong> {job.ai_Adoption_Level}
//             </p>
//             <p>
//               <strong>Automation Risk:</strong> {job.automation_Risk}
//             </p>
//             <p>
//               <strong>Salary:</strong>{" "}
//               {job.salary_USD
//                 ? `$${Number(job.salary_USD).toFixed(2)}`
//                 : "N/A"}
//             </p>
//             <p>
//               <strong>Remote Friendly:</strong> {job.Remote_Friendly}
//             </p>
//           </div>
//         ))}
//       </section>

//       {/* ===== Charts Section ===== */}
//       <section style={{ textAlign: "center", margin: "2rem 0" }}>
//         <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#2e7d32" }}>
//           📊 AI Adoption Insights
//         </h2>
//         <p style={{ color: "#666", marginBottom: "1.5rem" }}>
//           Explore global AI and automation trends from shared job data.
//         </p>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
//             gap: "20px",
//             padding: "0 2rem 3rem",
//           }}
//         >
//           {/* Industry Pie Chart */}
//           <div
//             style={{
//               background: "#fafafa",
//               border: "1px solid #ddd",
//               borderRadius: "12px",
//               padding: "1rem",
//             }}
//           >
//             <h3 style={{ color: "#388e3c" }}>Jobs by Industry</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={industryData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={90}
//                   label
//                 >
//                   {industryData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* AI Adoption Bar Chart */}
//           <div
//             style={{
//               background: "#fafafa",
//               border: "1px solid #ddd",
//               borderRadius: "12px",
//               padding: "1rem",
//             }}
//           >
//             <h3 style={{ color: "#388e3c" }}>AI Adoption Levels</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={aiAdoptionData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" stroke="#444" />
//                 <YAxis stroke="#444" />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#4CAF50" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Automation Risk Chart */}
//           <div
//             style={{
//               background: "#fafafa",
//               border: "1px solid #ddd",
//               borderRadius: "12px",
//               padding: "1rem",
//             }}
//           >
//             <h3 style={{ color: "#388e3c" }}>Automation Risk</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={automationData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" stroke="#444" />
//                 <YAxis stroke="#444" />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#FF7043" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </section>

//       {/* ===== Footer ===== */}
//       <footer
//         style={{
//           backgroundColor: "#e8f5e9",
//           textAlign: "center",
//           padding: "1.5rem",
//           borderTop: "2px solid #c8e6c9",
//           color: "#2e7d32",
//           fontWeight: "500",
//           marginTop: "auto",
//         }}
//       >
//         <p>© 2025 JupIter. All rights reserved.</p>
//         <p style={{ fontSize: "13px", color: "#4caf50" }}>
//           Built with ❤️ by Aditya Ashok Goli
//         </p>
//       </footer>
//     </div>
//   );
// }
