import { useParams } from "react-router-dom";
import classes from "./Animal.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Animal() {
  return (
    <div className={classes.animalContainer}>
      <Form />
    </div>
  );
}

function Form() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animalData, setAnimalData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    sex: "",
    description: "",
    photo: "",
    date: "",
    status: "",
  });

  async function edit(id) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const data = {
      token: token,
      role: role,
    };
    try {
      const response = await axios.post(
        `http://localhost:8080/animal/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const formattedDate = new Date(response.data.date)
        .toISOString()
        .split("T")[0];

      setAnimalData({
        ...response.data,
        date: formattedDate,
      });
    } catch {
      console.log("Error");
    }
  }

  useEffect(() => {
    edit(id);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className={classes.animalDetails}>
        <h1>{animalData.name}</h1>
        <img
          src={animalData.photo}
          alt={animalData.name}
          className={classes.animalImage}
        />
        <div className={classes.animalInfo}>
          <p>
            <strong>Тип:</strong> {animalData.type}
          </p>
          <p>
            <strong>Порода:</strong> {animalData.breed}
          </p>
          <p>
            <strong>Возраст:</strong> {animalData.age}
          </p>
          <p>
            <strong>Пол:</strong> {animalData.sex}
          </p>
          <p>
            <strong>Дата поступления:</strong> {animalData.date}
          </p>
          <p>
            <strong>Статус:</strong> {animalData.status}
          </p>
          <p>
            <strong>Описание:</strong> {animalData.description}
          </p>
        </div>
        <div className={classes.buttons}>
          <Link to="/animals" className={classes.backLink}>
            Назад к списку животных
          </Link>
          <button
            onClick={() => {
              navigate(`/animals/application/${animalData.id}`);
            }}
          >
            Оформить заявку
          </button>
          <button onClick={handlePrint} className={classes.printButton}>
            Печать
          </button>
        </div>
      </div>
    </>
  );
}
