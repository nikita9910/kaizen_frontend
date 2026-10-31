import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function StudyMaterial() {
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchMaterials = async () => {
      try {
        setLoading(true);
        setError("");

        // Get logged-in student
        const user = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        if (!user?.id) {
          navigate("/student-login");
          return;
        }

        // Fetch student details
        const studentResponse = await API.get(
          `students/${user.id}/`
        );

        const student = studentResponse.data;

        // Handle course as either an ID or an object
        const courseId =
          typeof student.course === "object"
            ? student.course?.id
            : student.course;

        if (!courseId) {
          if (!cancelled) {
            setMaterials([]);
            setError(
              "No course has been assigned to you yet."
            );
          }
          return;
        }

        // Fetch study materials
        const response = await API.get("study-material/");

        // Support regular arrays and paginated responses
        const allMaterials = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        // Filter materials assigned to the student's course
        const filteredMaterials = allMaterials.filter(
          (material) => {
            const materialCourseId =
              typeof material.course === "object"
                ? material.course?.id
                : material.course;

            return (
              Number(materialCourseId) === Number(courseId)
            );
          }
        );

        if (!cancelled) {
          setMaterials(filteredMaterials);
        }
      } catch (err) {
        console.error(
          "Study material API error:",
          err.response?.data || err
        );

        if (!cancelled) {
          setError(
            err.response?.status === 404
              ? "The student or study material API endpoint was not found."
              : "Unable to load study materials. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMaterials();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // Download the file returned by Django
  const handleDownload = async (fileUrl, title) => {
    if (!fileUrl) {
      alert("File is not available.");
      return;
    }

    try {
      const backendOrigin = "http://127.0.0.1:8000";

      // FileField may return either a relative or absolute URL
      const url = new URL(fileUrl, backendOrigin);

      const response = await fetch(url.href);

      if (!response.ok) {
        throw new Error(
          `File request failed with status ${response.status}`
        );
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      const pathname = decodeURIComponent(url.pathname);
      const filename =
        pathname.split("/").filter(Boolean).pop() ||
        `${title || "study-material"}.pdf`;

      link.href = blobUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 1000);
    } catch (err) {
      console.error("Download error:", err);

      alert(
        "Unable to download the file. Check the file URL and Django media configuration."
      );
    }
  };

  if (loading) {
    return (
      <div className="student-page">
        <h1>📖 Study Material</h1>
        <p className="page-subtitle">
          Loading study materials...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="student-page">
        <h1>📖 Study Material</h1>
        <p className="page-subtitle">{error}</p>

        <button
          className="primary-btn"
          onClick={() => navigate("/student-dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="student-page">
      <h1>📖 Study Material</h1>

      <p className="page-subtitle">
        Download and access your study materials.
      </p>

      <div className="material-list">
        {materials.length === 0 ? (
          <div className="material-item">
            <div>
              <span>📄</span>
              <b>No study materials available.</b>
            </div>
          </div>
        ) : (
          materials.map((item) => (
            <div className="material-item" key={item.id}>
              <div>
                <span>📄</span>
                <b>{item.title}</b>

                {item.upload_date && (
                  <p>Uploaded: {item.upload_date}</p>
                )}
              </div>

              <button
                className="primary-btn"
                onClick={() =>
                  handleDownload(item.file, item.title)
                }
                disabled={!item.file}
              >
                Download
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudyMaterial;
