"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import StudentActions from "./StudentActions";

export default function StudentList({ students }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(students.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentStudents = students.slice(indexOfFirst, indexOfLast);
useEffect(() => {
  fetch(`/api/students?page=${currentPage}`)
}, [currentPage]);
  // ✅ Counts निकालो
  const totalStudents = students.length;

  const class10 = students.filter((s) => s.grade === "10th").length;
  const class11 = students.filter((s) => s.grade === "11th").length;
  const class12 = students.filter((s) => s.grade === "12th").length;
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white p-5">
          <h2 className="text-2xl font-bold mb-6">School ERP</h2>
          <ul className="space-y-4">
            <li className="hover:text-gray-300 cursor-pointer">Dashboard</li>
            <li className="hover:text-gray-300 cursor-pointer">Students</li>
          </ul>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            <Link href="/add-student">
              <div className="bg-blue-900 text-white px-4 py-2 rounded shadow cursor-pointer hover:bg-blue-800">
                Add
              </div>
            </Link>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Total Students */}
            <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100">
              <h3 className="text-blue-500 font-medium">Total Students</h3>
              <p className="text-3xl font-bold text-blue-700">
                {students.length}
              </p>
            </div>

            {/* 10th Classes */}
            <div className="bg-purple-50 p-5 rounded-xl shadow-sm border border-purple-100">
              <h3 className="text-purple-500 font-medium">10th Classes</h3>
              <p className="text-3xl font-bold text-purple-700">{class10}</p>
            </div>

            {/* 11th Classes */}
            <div className="bg-green-50 p-5 rounded-xl shadow-sm border border-green-100">
              <h3 className="text-green-500 font-medium">11th Classes</h3>
              <p className="text-3xl font-bold text-green-700">{class11}</p>
            </div>

            {/* 12th Classes */}
            <div className="bg-yellow-50 p-5 rounded-xl shadow-sm border border-yellow-100">
              <h3 className="text-yellow-600 font-medium">12th Classes</h3>
              <p className="text-3xl font-bold text-yellow-700">{class12}</p>
            </div>
          </div>
          {/* Students Table */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Recent Students
            </h2>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b ">
                  <th className="p-2 text-gray-800">Name</th>
                  <th className="p-2 text-gray-800">Grade</th>
                  <th className="p-2 text-gray-800">Contact</th>
                  <th className="p-2 text-gray-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((s) => (
                  <tr key={s._id} className="border-b hover:bg-gray-100 ">
                    <td className="p-2 text-gray-600">{s.name}</td>
                    <td className="p-2 text-gray-600">{s.grade}</td>
                    <td className="p-2 text-gray-600">{s.contact}</td>
                    <td className="p-2 flex gap-2">
                      <StudentActions id={s._id.toString()} />
                    </td>
                  </tr>
                ))}
              </tbody>
             
            </table>
            <div className="flex justify-left mt-4 gap-2">
               {/* Prev */}
               <button
                 onClick={() => setCurrentPage((p) => p - 1)}
                 disabled={currentPage === 1}
                 className="px-3 py-1 bg-gray-300 text-gray-900 rounded disabled:opacity-50"
               >
                 Prev
               </button>

               {/* Page Numbers */}
               {Array.from({ length: totalPages }, (_, i) => (
                 <button
                   key={i}
                   onClick={() => setCurrentPage(i + 1)}
                   className={`px-3 py-1 rounded ${
                     currentPage === i + 1
                       ? "bg-blue-500 text-white"
                       : "bg-gray-200 text-black"
                   }`}
                 >
                   {i + 1}
                 </button>
               ))}

               {/* Next */}
               <button
                 onClick={() => setCurrentPage((p) => p + 1)}
                 disabled={currentPage === totalPages}
                 className="px-3 py-1 bg-gray-200 text-gray-900 rounded disabled:opacity-50"
               >
                 Next
               </button>
             </div>
          </div>
        </main>
      </div>

      {/* Pagination */}
      {/* <div className="flex gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
    </>
  );
}
