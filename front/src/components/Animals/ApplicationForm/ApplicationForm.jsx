import { useParams } from "react-router-dom";
import classes from "./Application.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ApplicationForm() {
  return (
    <div className={classes.animalContainer}>
      <Form />
    </div>
  );
}

function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [data, setData] = useState({
    animal: {
      name: "",
      type: "",
      breed: "",
      age: "",
      sex: "",
      description: "",
      photo: "",
      date: "",
      status: "",
    },
    user: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
  });

  async function info(id) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const data = {
      token: token,
      role: role,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/animal/application/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const formattedDate = new Date(response.data.animal.date)
        .toISOString()
        .split("T")[0];
      response.data.animal.date = formattedDate;
      setData(response.data);
    } catch {
      console.log("Error");
    }
  }
  useEffect(() => {
    info(id);
  }, []);

  async function sendApplication(dat) {
    const data = {
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
      animalId: Number(id),
      info: dat,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/createApplication",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/animals");
    } catch {
      console.log("Error");
    }
  }

  return (
    <>
      <div className={classes.animalDetails}>
        <h1 className={classes.upper}>Проверьте правильность данных</h1>
        <div className={classes.animalInfo}>
          <p>
            <strong>ИФ: </strong> {data.user.name} {data.user.surname}
          </p>
          <p>
            <strong>Телефон: </strong>
            {data.user.phone ? data.user.phone : "Не указан"}
          </p>
          <p>
            <strong>Почта: </strong>
            {data.user.email ? data.user.email : "Не указана"}
          </p>
        </div>
        <h1>{data.animal.name}</h1>
        <img
          src={data.animal.photo}
          alt={data.animal.name}
          className={classes.animalImage}
        />
        <div className={classes.animalInfo}>
          <p>
            <strong>Тип:</strong> {data.animal.type.type}
          </p>
          <p>
            <strong>Порода:</strong> {data.animal.breed.breed}
          </p>
          <p>
            <strong>Возраст:</strong> {data.animal.age}
          </p>
          <p>
            <strong>Пол:</strong> {data.animal.sex}
          </p>
          <p>
            <strong>Дата поступления:</strong> {data.animal.date}
          </p>
          <p>
            <strong>Статус:</strong> {data.animal.status}
          </p>
          <p>
            <strong>Описание:</strong> {data.animal.description}
          </p>
        </div>
        <p>
          Кратко опишите информацию об условиях вашего проживания, почему
          выбрали именно этого питомца. Мы с вами свяжемся в течение трех
          рабочих дней.
        </p>
        <input
          type="text"
          className={classes.input}
          placeholder="Текст"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className={classes.buttons}>
          <Link to="/animals" className={classes.backLink}>
            Назад к списку животных
          </Link>
          <button
            onClick={() => {
              sendApplication(text);
            }}
          >
            Отправить
          </button>
        </div>
      </div>
    </>
  );
}
