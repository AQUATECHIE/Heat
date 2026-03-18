import { useState, useEffect } from "react";
import api from "../api/axios";

const AdminHero = () => {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  /* FETCH CURRENT HERO */

  const fetchHero = async () => {
    try {
      const { data } = await api.get("/hero");
      setPreview(data?.images || []);
    } catch (error) {
      console.log("Failed to load hero");
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  /* HANDLE FILE SELECT */

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    // preview images before upload
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreview(previewUrls);
  };
  const handleDelete = async (public_id) => {
    try {
      await api.delete("/hero/admin", {
        data: { public_id },
      });

      // 🔥 update UI instantly
      setPreview((prev) => prev.filter((img) => img.public_id !== public_id));
    } catch (error) {
      console.log("Delete failed");
    }
  };

  /* HANDLE UPLOAD */

  const handleUpload = async () => {
    if (images.length === 0) return;

    const formData = new FormData();

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true);

      await api.put("/hero/admin", formData);

      alert("Hero images updated!");

      setImages([]);
      fetchHero();
    } catch (error) {
      console.log("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hero Section</h2>

      {/* FILE INPUT */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ margin: "15px 0" }}
      />

      {/* PREVIEW */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {preview.map((img, index) => (
          <div
            key={index}
            style={{
              position: "relative",
            }}
          >
            <img
              src={img.url || img}
              alt="preview"
              style={{
                width: "200px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            {/* DELETE BUTTON */}
            {img.public_id && (
              <button
                onClick={() => handleDelete(img.public_id)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "rgba(0,0,0,0.7)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* UPLOAD BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Uploading..." : "Upload Hero Images"}
      </button>
    </div>
  );
};

export default AdminHero;
