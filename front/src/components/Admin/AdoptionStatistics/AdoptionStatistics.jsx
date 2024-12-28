import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./AdoptionStatistics.module.scss";

export default function AdoptionStatistics() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}.${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${currentDate.getFullYear()}`;
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/AdoptionStatistics",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          setStatistics(response.data.data);
        } else {
          setError("Не удалось получить данные");
        }
      } catch (err) {
        setError("Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className={classes.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={classes.error}>{error}</div>;
  }

  return (
    <div className={classes.statisticsContainer}>
      <h1>
        Статистика усыновления <br /> на {formattedDate}
      </h1>
      <div className={classes.statisticItem}>
        <strong>Всего заявок:</strong> {statistics.total_applications}
      </div>
      <div className={classes.statisticItem}>
        <strong>Одобренные заявки:</strong> {statistics.approved_applications}
      </div>
      <div className={classes.statisticItem}>
        <strong>Отклоненные заявки:</strong> {statistics.rejected_applications}
      </div>
      <div className={classes.statisticItem}>
        <strong>Животные в приюте:</strong>{" "}
        {statistics.animals_in_shelter_count}
      </div>
      <div className={classes.statisticItem}>
        <strong>Животные в семьях:</strong> {statistics.animals_in_family_count}
      </div>
      <div className={classes.statisticItem}>
        <strong>Процент принятия заявок:</strong> {statistics.acceptance_rate}%
      </div>
      <div className={classes.statisticItem}>
        <strong>Процент отклонения заявок:</strong> {statistics.rejection_rate}%
      </div>
      <button className={classes.printButton} onClick={handlePrint}>
        Печать
      </button>
    </div>
  );
}
