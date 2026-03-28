import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/AdminCategories.css";

const AdminCategories = () => {

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {

    const res = await api.get("/categories");

    setCategories(res.data);

  };

  useEffect(() => {

    fetchCategories();

  }, []);


  const handleSubmit = async (e) => {

    e.preventDefault();

    await api.post("/categories", { name });

    setName("");

    fetchCategories();

  };


  const deleteCategory = async (id) => {

    await api.delete(`/categories/${id}`);

    fetchCategories();

  };


  return (

    <div className="admin-category">

      <h2>Manage Categories</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Category name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <button>Create Category</button>

      </form>


      <div className="category-list">

        {categories.map(cat => (

          <div key={cat._id} className="category-item">

            <span>{cat.name}</span>

            <button
              onClick={()=>deleteCategory(cat._id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default AdminCategories;