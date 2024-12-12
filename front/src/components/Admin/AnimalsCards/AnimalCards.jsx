/* eslint-disable no-unused-vars */
import axios from "axios";
import classes from "./AnimalCards.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AnimalCards() {
  const [animals, setAnimals] = useState([]);

  async function del(id) {
    const first = confirm("УДАЛИТЬ ЖИВОТНОЕ?");
    if (first) {
      const second = confirm("ВЫ ТОЧНО УВЕРЕНЫ?");
      if (second) {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const data = {
          token: token,
          role: role,
          id: id,
        };
        const response = await axios.post(
          "http://localhost:8080/admin/del",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }
  }

  async function GetAnimals() {
    try {
      const api = axios.create({
        baseURL: "http://localhost:8080",
      });
      const response = await api.get("/animals");
      setAnimals(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    GetAnimals();
  }, []);

  return (
    <div className={classes.cardContainer}>
      {animals.map((animal) => (
        <div key={animal.id} className={classes.card}>
          <img src={animal.photo} alt={animal.name} className={classes.photo} />
          <h3 className={classes.name}>{animal.name}</h3>
          <div className={classes.buttons}>
            <button className={classes.editButton}>
              <Link to={`/admin/${animal.id}`}>Редактировать</Link>
            </button>
            <button
              className={classes.deleteButton}
              onClick={() => del(animal.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
