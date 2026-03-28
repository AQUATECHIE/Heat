import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/Adminpromo.css";

const AdminPromos = () => {

  const [promos, setPromos] = useState([]);

  const [form, setForm] = useState({
    title: "",
    link: "/products"
  });

  const [image, setImage] = useState(null);

  const fetchPromos = async () => {

    try {

      const { data } = await api.get("/promos");

      setPromos(data);

    } catch (error) {

      console.error("Failed to load promos");

    }

  };

  useEffect(() => {

    fetchPromos();

  }, []);

  /* CREATE PROMO */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("link", form.link);
      formData.append("image", image);

      await api.post("/promos", formData, {

        headers: {
          Authorization: `Bearer ${token}`
        }

      });

      setForm({ title: "", link: "/products" });
      setImage(null);

      fetchPromos();

    } catch (error) {

      console.error("Promo upload failed");

    }

  };

  /* DELETE PROMO */

  const deletePromo = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/promos/${id}`, {

        headers: {
          Authorization: `Bearer ${token}`
        }

      });

      fetchPromos();

    } catch (error) {

      console.error("Delete failed");

    }

  };

  return (
    <div className="admin-promos">

      <h2>Homepage Promos</h2>

      {/* CREATE PROMO */}

      <form className="promo-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Promo title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Link (e.g /products)"
          value={form.link}
          onChange={(e) =>
            setForm({ ...form, link: e.target.value })
          }
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit">
          Upload Promo
        </button>

      </form>

      {/* PROMO LIST */}

      <div className="promo-grid">

        {promos.map((promo) => (

          <div key={promo._id} className="promo-card">

            <img src={promo.image?.url} alt={promo.title} />

            <h4>{promo.title}</h4>

            <p>{promo.link}</p>

            <button
              className="delete-btn"
              onClick={() => deletePromo(promo._id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );

};

export default AdminPromos;