import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Applications.module.scss";

const statusOptions = ["новая", "одобрена", "отклонена", "в рассмотрении"];

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      const data = {
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/getApplications",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Ошибка при получении заявок:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const data = {
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
        id: id,
        status: newStatus,
      };
      const response = await axios.post(
        "http://localhost:8080/applicationUpdate",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Обновляем список заявок
        setApplications((prev) =>
          prev.map((app) =>
            app.application_id === id
              ? { ...app, application_status: newStatus }
              : app
          )
        );

        // Обновляем состояние selectedApplication
        setSelectedApplication((prev) => {
          if (prev && prev.application_id === id) {
            const updatedApp = { ...prev, application_status: newStatus };
            console.log("Обновленный selectedApplication:", updatedApp);
            return updatedApp;
          }
          return prev;
        });
      } else {
        console.error("Ошибка при обновлении статуса:", response.data);
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };

  const filteredApplications = filterStatus
    ? applications.filter((app) => app.application_status === filterStatus)
    : applications;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={classes.applications}>
      <h1>Список заявок</h1>
      <div className={classes.filterSection}>
        <label>Фильтр по статусу:</label>
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
        >
          <option value="">Все</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredApplications.map((app, index) => (
          <li key={index} onClick={() => setSelectedApplication(app)}>
            <div>
              <strong>Животное:</strong> {app.animal_name} ({app.animal_type})
            </div>
            <div>
              <strong>Статус:</strong> {app.application_status}
            </div>
            <div>
              <strong>Дата:</strong>{" "}
              {new Date(app.application_date).toLocaleString()}
            </div>
            <div className={classes.userInfo}>
              <strong>Пользователь:</strong> {app.user_name} {app.user_surname}
              <div>Телефон: {app.user_phone}</div>
            </div>
          </li>
        ))}
      </ul>

      {selectedApplication && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <h2>Подробная информация о заявке</h2>
            <div>
              <strong>Номер заявки:</strong>{" "}
              {selectedApplication.application_id}
            </div>
            <div>
              <strong>Животное:</strong> {selectedApplication.animal_name}
            </div>
            <div>
              <strong>Возраст:</strong> {selectedApplication.animal_age} лет
            </div>
            <div>
              <strong>Пол:</strong> {selectedApplication.animal_sex}
            </div>
            <div>
              <strong>Описание:</strong>{" "}
              {selectedApplication.animal_description}
            </div>
            <img
              src={selectedApplication.animal_photo}
              alt={selectedApplication.animal_name}
            />
            <div className={classes.status}>
              <strong>Статус:</strong>
              <select
                className={classes.statusSelect}
                value={
                  selectedApplication
                    ? selectedApplication.application_status
                    : ""
                }
                onChange={(e) =>
                  handleStatusChange(
                    selectedApplication.application_id,
                    e.target.value
                  )
                }
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.userInfo}>
              <strong>Пользователь:</strong> {selectedApplication.user_name}{" "}
              {selectedApplication.user_surname}
              <div>
                <strong>Телефон:</strong> {selectedApplication.user_phone}
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <button onClick={handlePrint}>Печать</button>
              <button onClick={() => setSelectedApplication(null)}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
