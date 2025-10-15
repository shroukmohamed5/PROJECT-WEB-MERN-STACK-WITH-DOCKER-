import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Record = ({ record, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="border-b hover:bg-gray-100 cursor-pointer"
      >
        <td className="px-4 py-3 font-medium text-gray-800">{record.name}</td>
        <td className="px-4 py-3 text-gray-600">{record.position}</td>
        <td className="px-4 py-3 text-gray-600">{record.level}</td>
        <td className="px-4 py-3">
          <div className="flex gap-2">
            <Link
              to={`/edit/${record._id}`}
              className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-all shadow-sm"
            >
              Delete
            </button>
          </div>
        </td>
      </motion.tr>

      {/* Modal داخلي للتأكيد */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-lg w-96 text-center"
            >
              <h3 className="text-lg font-semibold mb-4">
                Delete {record.name}?
              </h3>
              <p className="text-gray-700 mb-4">
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch("http://localhost:5050/record/");
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setRecords(data);
      } catch (err) {
        console.error("Failed to fetch records:", err);
      }
    }
    getRecords();
  }, []);

  const deleteRecord = async (id) => {
    try {
      await fetch(`http://localhost:5050/record/${id}`, { method: "DELETE" });
      setRecords((prev) => prev.filter((el) => el._id !== id));
    } catch (err) {
      console.error("Failed to delete record:", err);
      alert("Something went wrong while deleting!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Employee Records</h3>
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3">Level</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {records.length > 0 ? (
                records.map((record) => (
                  <Record
                    key={record._id}
                    record={record}
                    onDelete={() => deleteRecord(record._id)}
                  />
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan="4" className="text-center py-6 text-gray-500 italic">
                    No records found
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
