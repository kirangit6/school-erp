"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddStudentForm() {
  const [form, setForm] = useState({ name: "", grade: "", contact: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        break;

      case "grade":
        if (!value.trim()) return "Grade is required";
        break;

      case "contact":
        if (!value.trim()) return "Contact is required";
        if (!/^\d+$/.test(value)) return "Only digits allowed";
        if (value.length !== 10) return "Must be 10 digits";
        break;

      default:
        return "";
    }
    return "";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact" && !/^\d*$/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errorMsg = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };
  const validateForm = () => {
    let newErrors = {};

    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });

    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    const url = id ? `/api/students/${id}` : `/api/students`;
    const method = id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setLoading(false);
      alert(id ? "Updated Successfully" : "Added Successfully");
      router.push("/");
      router.refresh();
    } else {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/students/${id}`);
        if (!res.ok) {
          console.error("Failed to fetch student");
          return;
        }
        const text = await res.text();

        if (!text) {
          console.error("Empty response from API");
          return;
        }
setLoading(false);
        const data = JSON.parse(text);

        setForm({
          name: data.name || "",
          grade: data.grade || "",
          contact: data.contact || "",
        });
      } catch (error) {
        setLoading(true);
        console.error("Error:", error);
      }
    };
    fetchStudent();
  }, [id]);
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border"
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {id ? "Update Student" : "Add Student"}
      </h1>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-800 mb-1">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 text-gray-600 border rounded-lg ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Grade */}
      <div className="mb-4">
        <label className="block text-gray-800 mb-1">Grade</label>
        <input
          type="text"
          placeholder="Enter grade"
          name="grade"
          value={form.grade}
          onChange={handleChange}
          className={`w-full px-3 py-2 text-gray-600 border rounded-lg ${
            errors.grade ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.grade && (
          <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
        )}
      </div>

      {/* Contact */}
      <div className="mb-4">
        <label className="block text-gray-800 mb-1">Contact</label>
        <input
          name="contact"
          placeholder="Enter contact"
          value={form.contact}
          maxLength={10}
          onChange={handleChange}
          className={`w-full px-3 py-2 text-gray-600 border rounded-lg ${
            errors.contact ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.contact && (
          <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
        )}
      </div>

      {/* Button */}
      <div className=" flex gap-2">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-full bg-red-400 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-400 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition flex justify-center items-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : id ? (
            "Update Student"
          ) : (
            "Add Student"
          )}
        </button>
      </div>
    </form>
  );
}
