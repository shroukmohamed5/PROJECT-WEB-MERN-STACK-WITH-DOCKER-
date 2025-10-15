import { motion } from "framer-motion";

export default function EmployeeCard({ employee }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="border rounded-xl p-5 shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-2">{employee.name}</h3>
      <p className="text-sm text-gray-500 mb-1">
        Position: <span className="text-gray-700">{employee.position}</span>
      </p>
      <p className="text-sm text-gray-500">
        Level: <span className="text-gray-700">{employee.level}</span>
      </p>
    </motion.div>
  );
}
