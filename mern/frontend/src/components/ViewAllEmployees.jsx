import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import EmployeeCard from "./EmployeeCard";

export default function ViewAllEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch("http://localhost:5050/record/");
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        All Employees
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {employees.map((employee) => (
            <EmployeeCard key={employee._id} employee={employee} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
