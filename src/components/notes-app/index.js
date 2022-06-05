import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import "./index.css";

function NotesApp() {
  const [activeState, setActiveState] = useState("all");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [list, setList] = useState([]);
  const [listTable, setListTable] = useState([]);
  const formRef = useRef();
  const active = list.filter((status) => status.status === "active");
  const completed = list.filter((status) => status.status === "completed");
  const others = list.filter(
    (status) => status.status !== "completed" && status.status !== "active"
  );

  const addEl = (e) => {
    e.preventDefault();
    const el = React.createElement(
      "tr",
      {},
      React.createElement("td", {}, title),
      React.createElement("td", {}, status)
    );
    ReactDOM.render(el, document.getElementById("noteList"));
  };

  const viewAll = () => {
    setActiveState("all");
    setListTable([...active, ...completed, ...others]);
  };

  const viewActive = () => {
    setActiveState("active");
    setListTable([...active]);
  };
  const viewCompleted = () => {
    setActiveState("completed");
    setListTable([...completed]);
  };
  return (
    <div className="layout-column align-items-center justify-content-start">
      <section className="layout-row align-items-center justify-content-center mt-30">
        <form ref={formRef} onSubmit={addEl}>
          <input
            name="title"
            data-testid="input-note-name"
            type="text"
            className="large mx-8"
            placeholder="Note Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            name="status"
            data-testid="input-note-status"
            type="text"
            className="large mx-8"
            placeholder="Note Status"
            onChange={(e) => setStatus(e.target.value)}
          />
          <button
            className=""
            data-testid="submit-button"
            disabled={!title || !status}
          >
            Add Note
          </button>
        </form>
      </section>

      <div className="mt-50">
        <ul className="tabs">
          <li
            className={`${
              activeState === "all" && "active"
            } tab-item slide-up-fade-in`}
            data-testid="allButton"
            onClick={viewAll}
          >
            All
          </li>
          <li
            className={`${
              activeState === "active" && "active"
            } tab-item slide-up-fade-in`}
            data-testid="activeButton"
            onClick={viewActive}
          >
            Active
          </li>
          <li
            className={`${
              activeState === "completed" && "active"
            } tab-item slide-up-fade-in`}
            data-testid="completedButton"
            onClick={viewCompleted}
          >
            Completed
          </li>
        </ul>
      </div>
      <div className="card w-40 pt-30 pb-8">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody data-testid="noteList" id="noteList"></tbody>
        </table>
      </div>
    </div>
  );
}

export default NotesApp;
