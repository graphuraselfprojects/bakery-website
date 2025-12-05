import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateProductModal({ productId, onClose }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    tags: "",
    isFeatured: false,
  });

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  // Load Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/product/single/${productId}`
        );

        const p = res.data.product;

        setForm({
          name: p.name || "",
          description: p.description || "",
          price: p.price || "",
          category: p.category || "",
          stock: p.stock || "",
          tags: Array.isArray(p.tags) ? p.tags.join(", ") : "",
          isFeatured: p.isFeatured || false,
        });
      } catch (error) {
        alert("Failed to load product!");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/product/update/${productId}`,
        {
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Product updated successfully!");
      onClose();
    } catch (error) {
      alert("Failed to update product!");
    }
  };

  // Delete Product
  const handleDelete = async () => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/product/delete/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Product deleted successfully!");
      onClose();
    } catch (error) {
      alert("Failed to delete product!");
    }
  };

  if (loading)
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-4 rounded-xl shadow">Loading product…</div>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="w-[95%] max-w-3xl bg-white rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-500"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-3 border rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full p-3 border rounded"
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-3 border rounded"
          />

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="tag1, tag2"
            className="w-full p-3 border rounded"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
            />
            <label>Featured Product</label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded"
          >
            Update Product
          </button>
        </form>

        <button
          onClick={handleDelete}
          className="mt-4 w-full py-3 bg-red-600 text-white rounded"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
}
