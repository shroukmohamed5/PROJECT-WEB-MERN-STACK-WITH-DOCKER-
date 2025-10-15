import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Record() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const [isNew, setIsNew] = useState(true);
  const [showModal, setShowModal] = useState(false); // state للـ modal
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`http://localhost:5050/record/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(person),
        });
      } else {
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      // عرض الـ modal بعد النجاح
      setShowModal(true);

    } catch (error) {
      console.error("Error adding/updating record:", error);
      alert("Something went wrong!"); // fallback simple alert
    }
  }

  function handleModalClose() {
    setShowModal(false);
    setForm({ name: "", position: "", level: "" });
    navigate("/");
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-4"
      >
        <h3 className="text-lg font-semibold p-4 text-gray-700">
          {isNew ? "Create Employee Record" : "Update Employee Record"}
        </h3>

        <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4 bg-white shadow-sm">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-200 pb-12 md:grid-cols-2">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Employee Info</h2>
              <p className="mt-1 text-sm text-slate-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-slate-900">Name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    placeholder="First Last"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    className="block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="position" className="block text-sm font-medium text-slate-900">Position</label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="position"
                    placeholder="Developer Advocate"
                    value={form.position}
                    onChange={(e) => updateForm({ position: e.target.value })}
                    className="block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <fieldset className="mt-4">
                <legend className="sr-only">Position Options</legend>
                <div className="flex items-center space-x-6">
                  {["Intern", "Junior", "Senior"].map((level) => (
                    <label key={level} className="flex items-center space-x-2 text-sm text-slate-900">
                      <input
                        type="radio"
                        name="level"
                        value={level}
                        checked={form.level === level}
                        onChange={(e) => updateForm({ level: e.target.value })}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        required
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          <button
  type="submit"
  className="mt-4 px-4 py-2 rounded-md bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium shadow-sm transition-all"
>
  {isNew ? "Create Employee" : "Update Employee"}
</button>


        </form>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
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
                Employee {isNew ? "Created" : "Updated"}!
              </h3>
              <p>Employee record has been successfully {isNew ? "created" : "updated"}.</p>
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleModalClose}
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
