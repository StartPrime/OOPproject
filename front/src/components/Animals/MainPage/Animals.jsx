import classes from "./Animals.module.scss";
import Header from "../../Header/Header.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Animals() {
  const [status, setStatus] = useState(false);

  async function checkUser() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const data = {
      token: token,
      role: role,
    };
    const response = await axios.post("http://localhost:8080/token", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.response == "ок") {
      setStatus(true);
    }
  }

  useEffect(() => {
    checkUser();
  });

  return (
    <>
      <Header status={status} />
      <AnimalCards />
    </>
  );
}

function AnimalCards() {
  const [animals, setAnimals] = useState([]);
  const navigate = useNavigate();

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

  function Navigate(id) {
    navigate(`/animals/${id}`);
  }

  return (
    <div className={classes.cardContainer}>
      {animals.map((animal) => (
        <div
          key={animal.id}
          className={classes.card}
          onClick={() => {
            Navigate(animal.id);
          }}
        >
          <img src={animal.photo} alt={animal.name} className={classes.photo} />
          <h3 className={classes.name}>{animal.name}</h3>
        </div>
      ))}
    </div>
  );
}
