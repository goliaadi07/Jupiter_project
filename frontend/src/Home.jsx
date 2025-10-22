// import { useEffect, useState } from "react";
// import api from "./api/axios";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
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

// export default function Home() {
//   const [jobs, setJobs] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(6);
//   const [search, setSearch] = useState("");
//   const [filterType, setFilterType] = useState("All");
//   const navigate = useNavigate();

//   useEffect(() => {
//     api
//       .get("/home")
//       .catch(() => {
//         localStorage.removeItem("token");
//         navigate("/");
//       });
//   }, [navigate]);

//   const fetchJobs = async (query = "") => {
//     try {
//       let url = "http://localhost:3232/aijobs";
//       if (query) url += `?${query}`;
//       const res = await axios.get(url);
//       setJobs(res.data);
//     } catch (err) {
//       console.error("Error fetching AIJobs:", err);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const handleSearch = () => {
//     if (!search.trim()) {
//       fetchJobs();
//       return;
//     }

//     let query = "";
//     if (filterType === "Industry") query = `Industry=${search}`;
//     else if (filterType === "Location") query = `location=${search}`;
//     else query = `job_Title=${search}`;

//     fetchJobs(query);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/", { replace: true });
//   };

//   const industryData = Object.entries(
//     jobs.reduce((acc, job) => {
//       acc[job.Industry] = (acc[job.Industry] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   const aiAdoptionData = Object.entries(
//     jobs.reduce((acc, job) => {
//       acc[job.ai_Adoption_Level] = (acc[job.ai_Adoption_Level] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   const automationData = Object.entries(
//     jobs.reduce((acc, job) => {
//       acc[job.automation_Risk] = (acc[job.automation_Risk] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   const COLORS = ["#4CAF50", "#FFC107", "#FF7043", "#42A5F5", "#AB47BC"];

//   const handleLoadMore = () => {
//     setVisibleCount((prev) => prev + 6);
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#fff",
//         color: "#222",
//         minHeight: "100vh",
//         overflowY: "auto",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Header */}
//       <header
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 100,
//           backgroundColor: "#e8f5e9",
//           padding: "1rem 2rem",
//           borderBottom: "2px solid #c8e6c9",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <Link to="/home" >
//           <img src="/vite.svg" alt="logo" style={{ height: "30px" }} />
//           </Link>
//           <h1 style={{ fontSize: "22px", fontWeight: "700" }}>JupIter</h1>
//         </div>

//         <div style={{ display: "flex", gap: "10px" }}>
//           <button
//             onClick={() => navigate("/profile")}
//             style={{
//               backgroundColor: "#4CAF50",
//               borderRadius: "25px",
//               padding: "8px 16px",
//               fontWeight: "500",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             👤 Profile
//           </button>

//           <button
//             onClick={logout}
//             style={{
//               backgroundColor: "#e53935",
//               borderRadius: "25px",
//               padding: "8px 16px",
//               fontWeight: "500",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Title Section */}
//       <section
//         style={{
//           textAlign: "center",
//           margin: "2rem 0",
//         }}
//       >
//         <h2
//           style={{
//             fontSize: "2rem",
//             fontWeight: "bold",
//             color: "#2e7d32",
//           }}
//         >
//           ⚡ AI Adoption Dashboard ⚡
//         </h2>
//         <p style={{ color: "#555", fontSize: "1rem" }}>
//           Explore AI-powered opportunities and insights across industries.
//         </p>
//       </section>

//       {/* Charts */}
//       <section
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
//           gap: "20px",
//           padding: "0 2rem 3rem",
//         }}
//       >
//         {/* Industry Chart */}
//         <div
//           style={{
//             background: "#fafafa",
//             border: "1px solid #ddd",
//             borderRadius: "12px",
//             padding: "1rem",
//           }}
//         >
//           <h3 style={{ textAlign: "center", color: "#388e3c" }}>
//             Jobs by Industry
//           </h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={industryData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={90}
//                 label
//               >
//                 {industryData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* AI Adoption Level */}
//         <div
//           style={{
//             background: "#fafafa",
//             border: "1px solid #ddd",
//             borderRadius: "12px",
//             padding: "1rem",
//           }}
//         >
//           <h3 style={{ textAlign: "center", color: "#388e3c" }}>
//             AI Adoption Level
//           </h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={aiAdoptionData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" stroke="#444" />
//               <YAxis stroke="#444" />
//               <Tooltip />
//               <Bar dataKey="value" fill="#4CAF50" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Automation Risk */}
//         <div
//           style={{
//             background: "#fafafa",
//             border: "1px solid #ddd",
//             borderRadius: "12px",
//             padding: "1rem",
//           }}
//         >
//           <h3 style={{ textAlign: "center", color: "#388e3c" }}>
//             Automation Risk
//           </h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={automationData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" stroke="#444" />
//               <YAxis stroke="#444" />
//               <Tooltip />
//               <Bar dataKey="value" fill="#FF7043" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </section>

//       {/* Search & Filter */}
//       <section
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: "10px",
//           marginBottom: "2rem",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Search by Title, Industry, or Location..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             padding: "10px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//             minWidth: "250px",
//           }}
//         />
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           style={{
//             padding: "10px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//           }}
//         >
//           <option value="All">All</option>
//           <option value="job_Title">Job Title</option>
//           <option value="Industry">Industry</option>
//           <option value="location">Location</option>
//         </select>
//         <button
//           onClick={handleSearch}
//           style={{
//             backgroundColor: "#43a047",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             padding: "10px 16px",
//             cursor: "pointer",
//           }}
//         >
//           Search
//         </button>
//       </section>

//       {/* Job Cards */}
//       <section
//         style={{
//           padding: "0 2rem 2rem",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {jobs.slice(0, visibleCount).map((job) => (
//           <div
//             key={job.id || job.job_Title}
//             style={{
//               background: "#f9f9f9",
//               border: "1px solid #ddd",
//               borderRadius: "12px",
//               padding: "1rem",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               transition: "transform 0.2s ease",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
//             onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
//           >
//             <h3 style={{ color: "#2e7d32" }}>{job.job_Title}</h3>
//             <p><strong>ID:</strong> {job.id}</p>
//             <p><strong>Industry:</strong> {job.Industry}</p>
//             <p><strong>Location:</strong> {job.location}</p>
//             <p><strong>AI Level:</strong> {job.ai_Adoption_Level}</p>
//             <p><strong>Automation Risk:</strong> {job.automation_Risk}</p>
//             <p>
//               <strong>Growth Projection:</strong>{" "}
//               <span
//                 style={{
//                   color:
//                     job.job_Growth_Projection === "Growth"
//                       ? "#4CAF50"
//                       : job.job_Growth_Projection === "Stable"
//                       ? "#FFC107"
//                       : "#F44336",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {job.job_Growth_Projection}
//               </span>
//             </p>
//             <p><strong>Salary:</strong> ${job.salary_USD.toFixed(2)}</p>
//             <p><strong>Remote Friendly:</strong> {job.Remote_Friendly}</p>
//           </div>
//         ))}
//       </section>

//       {/* Load More */}
//       {visibleCount < jobs.length && (
//         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
//           <button
//             onClick={handleLoadMore}
//             style={{
//               backgroundColor: "#43a047",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               padding: "12px 24px",
//               fontSize: "16px",
//               cursor: "pointer",
//             }}
//           >
//             Load More ↓
//           </button>
//         </div>
//       )}

//       {/* Footer */}
//       <footer
//         style={{
//           backgroundColor: "#e8f5e9",
//           textAlign: "center",
//           padding: "1.5rem",
//           borderTop: "2px solid #c8e6c9",
//           color: "#2e7d32",
//           fontWeight: "500",
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



import { useEffect, useState } from "react";
import api from "./api/axios";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [newJob, setNewJob] = useState({
    job_Title: "",
    Industry: "",
    Company_Size: "",
    location: "",
    ai_Adoption_Level: "",
    automation_Risk: "",
    required_Skills: "",
    salary_USD: "",
    Remote_Friendly: "",
    job_Growth_Projection: "",
    id: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/home")
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const fetchJobs = async (query = "") => {
    try {
      let url = "http://localhost:3232/aijobs";
      if (query) url += `?${query}`;
      const res = await axios.get(url);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching AIJobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = () => {
    if (!search.trim()) {
      fetchJobs();
      return;
    }

    let query = "";
    if (filterType === "Industry") query = `Industry=${search}`;
    else if (filterType === "Location") query = `location=${search}`;
    else query = `job_Title=${search}`;

    fetchJobs(query);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3232/aijobs/${selectedId}`, newJob);
        alert("✅ Job updated successfully!");
      } else {
        await axios.post("http://localhost:3232/aijobs", newJob);
        alert("✅ Job added successfully!");
      }

      setNewJob({
        job_Title: "",
        Industry: "",
        Company_Size: "",
        location: "",
        ai_Adoption_Level: "",
        automation_Risk: "",
        required_Skills: "",
        salary_USD: "",
        Remote_Friendly: "",
        job_Growth_Projection: "",
        id: "",
      });

      setShowForm(false);
      setEditMode(false);
      fetchJobs();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save job. Check data or backend response.");
    }
  };

  const handleEdit = (job) => {
    setNewJob(job);
    setSelectedId(job.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:3232/aijobs/${id}`);
        alert(" Job deleted successfully!");
        fetchJobs();
      } catch (error) {
        alert("❌ Failed to delete job");
      }
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const industryData = Object.entries(
    jobs.reduce((acc, job) => {
      acc[job.Industry] = (acc[job.Industry] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const aiAdoptionData = Object.entries(
    jobs.reduce((acc, job) => {
      acc[job.ai_Adoption_Level] = (acc[job.ai_Adoption_Level] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const automationData = Object.entries(
    jobs.reduce((acc, job) => {
      acc[job.automation_Risk] = (acc[job.automation_Risk] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ["#4CAF50", "#FFC107", "#FF7043", "#42A5F5", "#AB47BC"];

  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "#222",
        minHeight: "100vh",
        // overflowY: "auto",
        display: "block",
        flexDirection: "column",
      }}
    >
      {/* ✅ Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#e8f5e9",
          padding: "1rem 2rem",
          borderBottom: "2px solid #c8e6c9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/home">
            <img src="/vite.svg" alt="logo" style={{ height: "30px" }} />
          </Link>
          <h1 style={{ fontSize: "22px", fontWeight: "700" }}>JupIter</h1>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              setNewJob({
                job_Title: "",
                Industry: "",
                Company_Size: "",
                location: "",
                ai_Adoption_Level: "",
                automation_Risk: "",
                required_Skills: "",
                salary_USD: "",
                Remote_Friendly: "",
                job_Growth_Projection: "",
                id: "",
              });
            }}
            style={{
              backgroundColor: "#368c39ff",
              borderRadius: "25px",
              padding: "8px 16px",
              fontWeight: "500",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
             Add Job Details
          </button>

          <button
            onClick={() => navigate("/profile")}
            style={{
              backgroundColor: "#368c39ff",
              borderRadius: "25px",
              padding: "8px 16px",
              fontWeight: "500",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            👤 Profile
          </button>

          <button
            onClick={logout}
            style={{
              backgroundColor: "#368c39ff",
              borderRadius: "25px",
              padding: "8px 16px",
              fontWeight: "500",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* ✅ Modal */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              color: "#222",
              padding: "2rem",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
              {editMode ? "✏️ Edit Job" : "➕ Add New Job"}
            </h2>
            <form onSubmit={handleAddOrUpdate}>
              {Object.keys(newJob).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  placeholder={key}
                  value={newJob[key]}
                  onChange={handleChange}
                  style={{
                    display: "block",
                    width: "100%",
                    marginBottom: "10px",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #9faa82ff",
                  }}
                  required
                />
              ))}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    background: "#cedf99ff",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: "#43a047",
                    color: "#fff",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  {editMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Charts Section */}
      <section style={{ textAlign: "center", margin: "2rem 0" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2e7d32" }}>
          ⚡ AI Adoption Dashboard ⚡
        </h2>
        <p style={{ color: "#555", fontSize: "1rem" }}>
          Explore AI-powered opportunities and insights across industries.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          padding: "0 2rem 3rem",
        }}
      >
        {/* Charts */}
        <div
          style={{
            background: "#fafafa",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#388e3c" }}>
            Jobs by Industry
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={industryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {industryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "#fafafa",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#388e3c" }}>
            AI Adoption Level
          </h3>
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

        <div
          style={{
            background: "#fafafa",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#388e3c" }}>
            Automation Risk
          </h3>
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
      </section>

      {/* ✅ Search */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="Search by Title, Industry, or Location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            minWidth: "250px",
          }}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="All">All</option>
          <option value="job_Title">Job Title</option>
          <option value="Industry">Industry</option>
          <option value="location">Location</option>
        </select>
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "#43a047",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </section>

      {/* ✅ Job Cards */}
      <section
        style={{
          padding: "0 2rem 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {jobs.slice(0, visibleCount).map((job) => (
          <div
            key={job.id || job.job_Title}
            style={{
              background: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "1rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#2e7d32" }}>{job.job_Title}</h3>
            <p><strong>ID:</strong> {job.id}</p>
            <p><strong>Industry:</strong> {job.Industry}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>AI Level:</strong> {job.ai_Adoption_Level}</p>
            <p><strong>Automation Risk:</strong> {job.automation_Risk}</p>
            <p>
              <strong>Salary:</strong>{" "}
              {job.salary_USD ? `$${Number(job.salary_USD).toFixed(2)}` : "N/A"}
            </p>

            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              <button
                onClick={() => handleEdit(job)}
                style={{
                  flex: 1,
                  backgroundColor: "#4b57c1ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px",
                  cursor: "pointer",
                }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                style={{
                  flex: 1,
                  backgroundColor: "#2b763cff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ✅ Load More */}
      {visibleCount < jobs.length && (
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <button
            onClick={handleLoadMore}
            style={{
              backgroundColor: "#43a047",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Load More ↓
          </button>
        </div>
      )}

      {/* ✅ Footer */}
      <footer
        style={{
          backgroundColor: "#e8f5e9",
          textAlign: "center",
          padding: "1.5rem",
          borderTop: "2px solid #c8e6c9",
          color: "#2e7d32",
          fontWeight: "500",
        }}
      >
        <p>© 2025 JupIter. All rights reserved.</p>
        <p style={{ fontSize: "13px", color: "#4caf50" }}>
          Built with ❤️ by Aditya Ashok Goli
        </p>
        {/* LinkedIn Button */}
  <a
    href="https://www.linkedin.com/in/aditya-goli-a508971a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#0A66C2",
      color: "white",
      padding: "8px 14px",
      borderRadius: "30px",
      textDecoration: "none",
      fontSize: "14px",
      marginTop: "10px",
      transition: "background-color 0.3s",
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#004182")}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0A66C2")}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.98 0h3.83v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.9c0-1.9-.03-4.34-2.64-4.34-2.64 0-3.04 2.06-3.04 4.19V24h-4V8z" />
    </svg>
    LinkedIn
  </a>
      </footer>
    </div>
  );
}
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/axios";

// function Signup() {
//   const [form, setForm] = useState({ name: "", username: "", password: "" });
//   const [popup, setPopup] = useState(null);
//   const navigate = useNavigate();

//   const showPopup = (text, type = "error") => {
//     setPopup({ text, type });
//     setTimeout(() => setPopup(null), 2000);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     if (!form.name || !form.username || !form.password) {
//       showPopup("⚠️ Please fill all fields");
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(form.username)) {
//       showPopup("📧 Enter a valid email (e.g. user@example.com)");
//       return false;
//     }

//     if (
//       !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(form.password)
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
//     if (!validateForm()) return;

//     try {
//       const res = await api.post("/auth/signup", form);
//       showPopup(res.data, "success");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       const msg =
//         err.response?.data ||
//         "⚠️ Something went wrong. Please try again later.";
//       showPopup(msg);
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
//             placeholder="Email"
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

//       {form.name.trim() && (
//         <div className="floating-greet animate-fadeIn">
//           👋 Hi, <span>{form.name.split(" ")[0]}</span>!
//         </div>
//       )}

//       {popup && (
//         <div className={`popup ${popup.type} animate-fadeIn`}>
//           {popup.text}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Signup;
