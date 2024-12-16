import React, { useEffect, useState } from "react";
import {
  fetchOperators,
  createOperatorWithUser,
  updateOperator,
  deleteOperator,
  assignToOperator,
  revokeFromOperator,
} from "../../API/api";

const OperatorList = () => {
  const [operators, setOperators] = useState([]);
  const [newOperator, setNewOperator] = useState({
    user: { id: "", username: "" },
    op_id: "",
    phone_number: "",
    vehicle_details: "",
    is_active: true,
    details: "",
  });
  const [assignData, setAssignData] = useState({ orders: [], packages: [] });
  const [selectedOperatorId, setSelectedOperatorId] = useState(null);
  const [view, setView] = useState("list"); // 'list', 'edit', 'assign'

  useEffect(() => {
    getOperators();
  }, []);

  // Fetch all operators
  const getOperators = async () => {
    try {
      const response = await fetchOperators();
      setOperators(response.data);
    } catch (error) {
      console.error("Error fetching operators:", error);
    }
  };

  // Handle Create or Update
  const saveOperator = async () => {
    try {
      if (selectedOperatorId) {
        const payload = {
          user: { id: newOperator.user.id },
          phone_number: newOperator.phone_number,
          vehicle_details: newOperator.vehicle_details,
          is_active: newOperator.is_active,
          details: newOperator.details,
        };
        await updateOperator(selectedOperatorId, payload);
      } else {
        const { username, password } = newOperator.user;
        const payload = {
          username,
          password,
          phone_number: newOperator.phone_number,
          vehicle_details: newOperator.vehicle_details,
          is_active: newOperator.is_active,
          details: newOperator.details,
        };
        if (!username || !password) {
          alert("Username and password are required for new operators.");
          return;
        }
        await createOperatorWithUser(payload);
      }
      resetForm();
      getOperators();
    } catch (error) {
      console.error("Error saving operator:", error);
    }
  };

  const resetForm = () => {
    setNewOperator({
      user: { id: "", username: "" },
      op_id: "",
      phone_number: "",
      vehicle_details: "",
      is_active: true,
      details: "",
    });
    setAssignData({ orders: [], packages: [] });
    setSelectedOperatorId(null);
    setView("list");
  };

  // Delete Operator
  const removeOperator = async (id) => {
    try {
      await deleteOperator(id);
      getOperators();
    } catch (error) {
      console.error("Error deleting operator:", error);
    }
  };

  // Assign orders/packages
  const assignItems = async () => {
    try {
      await assignToOperator(selectedOperatorId, assignData);
      resetForm();
      getOperators();
    } catch (error) {
      console.error("Error assigning items:", error);
    }
  };

  // Revoke orders/packages
  const revokeItems = async () => {
    try {
      await revokeFromOperator(selectedOperatorId, assignData);
      resetForm();
      getOperators();
    } catch (error) {
      console.error("Error revoking items:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "Arial" }}>
      <h1>Operator Management</h1>
      {view === "list" && (
        <>
          <button onClick={() => setView("edit")}>Add Operator</button>
          <ul style={{ padding: "0", listStyleType: "none" }}>
            {operators.map((operator) => (
              <li
                key={operator.id}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <div            style={{
              display: "block",
              margin: "10px 0",
              padding: "8px",
              width: "100%",
              color: "var(--text-color)",
            }}>
                  <strong>Internal-ID:</strong> {operator.id} <br />
                  <strong>Username:</strong> {operator.user.username} <br />
                  <strong>Operator ID:</strong> {operator.op_id} <br />
                  <strong>Phone Number:</strong> {operator.phone_number} <br />
                  <strong>Vehicle Details:</strong> {operator.vehicle_details} <br />
                  <strong>Is Active:</strong> {operator.is_active ? "Yes" : "No"} <br />
                  <strong>Details:</strong> {operator.details}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => {
                      setSelectedOperatorId(operator.id);
                      setNewOperator({
                        user: { id: operator.user.id, username: operator.user.username },
                        op_id: operator.op_id,
                        phone_number: operator.phone_number,
                        vehicle_details: operator.vehicle_details,
                        is_active: operator.is_active,
                        details: operator.details,
                      });
                      setView("edit");
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => removeOperator(operator.id)}>Delete</button>
                  <button
                    onClick={() => {
                      setSelectedOperatorId(operator.id);
                      setView("assign");
                    }}
                  >
                    Assign/Revoke
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {view === "edit" && (
        <div style={{ marginTop: "20px" }}>
          <h2>{selectedOperatorId ? "Edit Operator" : "Add Operator"}</h2>
          <div>
            <label>User:</label>
            <input
              type="text"
              value={newOperator.user.username}
              onChange={(e) =>
                setNewOperator({
                  ...newOperator,
                  user: { ...newOperator.user, username: e.target.value },
                })
              }
              style={{
                display: "block",
                margin: "10px 0",
                padding: "8px",
                width: "100%",
                color: "var(--text-color)",
              }}
              disabled={!!selectedOperatorId} // Disable username during editing
            />
          </div>
          {!selectedOperatorId && (
            <div>
              <label>Password:</label>
              <input
                type="password"
                onChange={(e) =>
                  setNewOperator({
                    ...newOperator,
                    user: { ...newOperator.user, password: e.target.value },
                  })
                }
                style={{
                    display: "block",
                    margin: "10px 0",
                    padding: "8px",
                    width: "100%",
                    color: "var(--text-color)",
                  }}
              />
            </div>
          )}
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              value={newOperator.phone_number}
              onChange={(e) => setNewOperator({ ...newOperator, phone_number: e.target.value })}
              style={{
                display: "block",
                margin: "10px 0",
                padding: "8px",
                width: "100%",
                color: "var(--text-color)",
              }}
            />
          </div>
          <div>
            <label>Vehicle Details:</label>
            <input
              type="text"
              value={newOperator.vehicle_details}
              onChange={(e) => setNewOperator({ ...newOperator, vehicle_details: e.target.value })}
              style={{
                display: "block",
                margin: "10px 0",
                padding: "8px",
                width: "100%",
                color: "var(--text-color)",
              }}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={newOperator.is_active}
                onChange={(e) => setNewOperator({ ...newOperator, is_active: e.target.checked })}
              />
              Is Active
            </label>
          </div>
          <div>
            <label>Details:</label>
            <textarea
              value={newOperator.details}
              onChange={(e) => setNewOperator({ ...newOperator, details: e.target.value })}
              style={{
                display: "block",
                margin: "10px 0",
                padding: "8px",
                width: "100%",
                color: "var(--text-color)",
              }}
            />
          </div>
          <button onClick={saveOperator} style={{ marginRight: "10px" }}>
            {selectedOperatorId ? "Update" : "Create"}
          </button>
          <button onClick={resetForm}>Cancel</button>
        </div>
      )}

      {view === "assign" && (
        <div style={{ marginTop: "20px" }}>
          <h2>Assign/Revoke Items</h2>
          <input
            type="text"
            placeholder="Order IDs (comma-separated)"
            onChange={(e) => setAssignData({ ...assignData, orders: e.target.value.split(",") })}
            style={{
                display: "block",
                margin: "10px 0",
                padding: "8px",
                width: "100%",
                color: "var(--text-color)",
              }}
          />
          <input
            type="text"
            placeholder="Package IDs (comma-separated)"
            onChange={(e) => setAssignData({ ...assignData, packages: e.target.value.split(",") })}
            style={{
                display: "block",
                margin: "10px 0",
                padding: "8px",
                width: "100%",
                color: "var(--text-color)",
              }}
          />
          <button onClick={assignItems} style={{ marginRight: "10px" }}>Assign</button>
          <button onClick={revokeItems} style={{ marginRight: "10px" }}>Revoke</button>
          <button onClick={resetForm}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default OperatorList;

