import { useState } from "react";
import "./styles.css";

export default function TodoList() {
  const [tasks, setTasks] = useState({
    todo: [],
    working: [],
    done: [],
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  const [taskName, setTaskName] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [taskUsers, setTaskUsers] = useState("");
  const [taskColor, setTaskColor] = useState("red");

  const openPopup = (columnId) => {
    setCurrentColumn(columnId);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setTaskName("");
    setTaskDue("");
    setTaskUsers("");
    setTaskColor("red");
  };

  const addTask = () => {
    if (!taskName.trim()) {
      alert("Please enter a task name.");
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      due: taskDue,
      users: taskUsers,
      color: taskColor,
    };

    setTasks((prev) => ({
      ...prev,
      [currentColumn]: [...prev[currentColumn], newTask],
    }));

    closePopup();
  };

  const deleteTask = (columnId, taskId) => {
    if (confirm("Delete this task?")) {
      setTasks((prev) => ({
        ...prev,
        [columnId]: prev[columnId].filter((task) => task.id !== taskId),
      }));
    }
  };

  const handleDragStart = (task, columnId) => {
    setDraggedTask({ task, columnId });
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (draggedTask && draggedTask.columnId !== targetColumn) {
      setTasks((prev) => ({
        ...prev,
        [draggedTask.columnId]: prev[draggedTask.columnId].filter(
          (t) => t.id !== draggedTask.task.id
        ),
        [targetColumn]: [...prev[targetColumn], draggedTask.task],
      }));
    }
    setDraggedTask(null);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const renderColumn = (columnId, title) => (
    <div
      className="column"
      onDragOver={allowDrop}
      onDrop={(e) => handleDrop(e, columnId)}
    >
      <h2>{title}</h2>
      {tasks[columnId].map((task) =>
        renderTaskCard(
          task,
          handleDragStart,
          columnId,
          handleDragEnd,
          deleteTask
        )
      )}
      <div className="add-card" onClick={() => openPopup(columnId)}>
        + Add another card
      </div>
    </div>
  );

  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">Make It All</div>
        <div className="nav-right">
          <span>Dashboard</span>
          <span>Login</span>
          <span>Settings</span>
          <span>Help</span>
        </div>
      </nav>

      <main>
        {renderColumn("todo", "To-Do")}
        {renderColumn("working", "Working")}
        {renderColumn("done", "Done")}
      </main>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Add Task</h3>
            <label>Task Name</label>
            <input
              type="text"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />

            <label>Due By</label>
            <input
              type="datetime-local"
              value={taskDue}
              onChange={(e) => setTaskDue(e.target.value)}
            />

            <label>Add Users</label>
            <input
              type="text"
              placeholder="Enter user names"
              value={taskUsers}
              onChange={(e) => setTaskUsers(e.target.value)}
            />

            <label>Priority Color</label>
            <select
              value={taskColor}
              onChange={(e) => setTaskColor(e.target.value)}
            >
              <option value="red">High (Red)</option>
              <option value="orange">Medium (Orange)</option>
              <option value="green">Low (Green)</option>
            </select>

            <button onClick={addTask}>Add Task</button>
            <button
              onClick={closePopup}
              style={{ background: "#aaa", marginLeft: "8px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
const renderTaskCard = (
  task,
  handleDragStart,
  columnId,
  handleDragEnd,
  deleteTask
) => {
  return (
    <div
      key={task.id}
      className="card"
      style={{ borderLeft: `6px solid ${task.color}` }}
      draggable
      onDragStart={() => handleDragStart(task, columnId)}
      onDragEnd={handleDragEnd}
    >
      <div className="content">
        <strong>{task.name}</strong>
        <br />
        <small>Due: {task.due || "N/A"}</small>
        <br />
        <small>Users: {task.users || "None"}</small>
      </div>
      <button
        className="delete-btn"
        title="Delete task"
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(columnId, task.id);
        }}
      >
        ✕
      </button>
    </div>
  );
};
