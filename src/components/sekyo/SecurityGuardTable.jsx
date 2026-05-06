import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import api from "../../assets/api";

function SecurityGuardTable() {
  const [open, setOpen] = useState(false);

  const [sekyos, setSekyos] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [newSekyo, setNewSekyo] = useState({
    name: "",
    role: "sekyo",
    phone_number: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    role: "",
    phone_number: "",
  });

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const fetchSekyos = async () => {
    try {
      const response = await api.get("/api/sekyo/");
      setSekyos(response.data);
    } catch {
      showMessage("Failed to load security guards", "error");
    }
  };

  useEffect(() => {
    if (open) {
      fetchSekyos();
    }
  }, [open]);

  const handleAdd = async () => {
    try {
      await api.post("/api/sekyo/create/", newSekyo);

      setNewSekyo({
        name: "",
        role: "sekyo",
        phone_number: "",
      });

      fetchSekyos();

      showMessage("Security guard added successfully", "success");
    } catch {
      showMessage("Failed to add security guard", "error");
    }
  };

  const handleEdit = (sekyo) => {
    setEditingId(sekyo.id);

    setEditData({
      name: sekyo.name,
      role: sekyo.role,
      phone_number: sekyo.phone_number,
    });
  };

  const handleSave = async (id) => {
    try {
      await api.put(`/api/sekyo/update/${id}/`, editData);

      setEditingId(null);

      fetchSekyos();

      showMessage("Updated successfully", "success");
    } catch {
      showMessage("Failed to update", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/sekyo/delete/${id}/`);

      fetchSekyos();

      showMessage("Deleted successfully", "success");
    } catch {
      showMessage("Failed to delete", "error");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition-all duration-300"
      >
        Security Guards
      </button>

      <Modal open={open}>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Security Guards
              </h1>

              <button
                onClick={() => setOpen(false)}
                className="text-red-500 font-semibold"
              >
                Close
              </button>
            </div>

            {message && (
              <div
                className={`mb-4 px-4 py-3 rounded-lg text-white font-medium ${
                  messageType === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {message}
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <h2 className="font-semibold mb-4 text-gray-700">
                Add Security Guard
              </h2>

              <div className="flex flex-row items-center gap-4">
                <input
                  value={newSekyo.name}
                  onChange={(e) =>
                    setNewSekyo({
                      ...newSekyo,
                      name: e.target.value,
                    })
                  }
                  placeholder="Name"
                  className="border rounded-lg px-3 py-2"
                />
                <input
                  value={newSekyo.phone_number}
                  onChange={(e) =>
                    setNewSekyo({
                      ...newSekyo,
                      phone_number: e.target.value,
                    })
                  }
                  placeholder="Phone Number"
                  className="border rounded-lg px-3 py-2"
                />
                <button
                  onClick={handleAdd}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium"
                >
                  Add
                </button>{" "}
              </div>
            </div>

            <div className="overflow-auto max-h-[500px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left">Name</th>

                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {sekyos.map((sekyo) => (
                    <tr key={sekyo.id} className="border-b">
                      {editingId === sekyo.id ? (
                        <>
                          <td className="p-4">
                            <input
                              value={editData.name}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  name: e.target.value,
                                })
                              }
                              className="border rounded-lg px-3 py-2 w-full"
                            />
                          </td>

                          <td className="p-4">
                            <input
                              value={editData.phone_number}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  phone_number: e.target.value,
                                })
                              }
                              className="border rounded-lg px-3 py-2 w-full"
                            />
                          </td>

                          <td className="p-4 text-center space-x-4">
                            <button
                              onClick={() => handleSave(sekyo.id)}
                              className="text-green-600 font-semibold"
                            >
                              Save
                            </button>

                            <button
                              onClick={() => setEditingId(null)}
                              className="text-gray-500 font-semibold"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-4">{sekyo.name}</td>

                          <td className="p-4">{sekyo.phone_number}</td>

                          <td className="p-4 text-center space-x-4">
                            <button
                              onClick={() => handleEdit(sekyo)}
                              className="text-blue-600 font-semibold"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(sekyo.id)}
                              className="text-red-600 font-semibold"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SecurityGuardTable;
