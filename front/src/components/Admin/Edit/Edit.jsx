import { useParams } from "react-router-dom";
import classes from "./Edit.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Edit() {
  return (
    <>
      <>
        <Form></Form>
      </>
    </>
  );
}

function Form() {
  const { id } = useParams();

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
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimalData({ ...animalData, [name]: value });
  };

  async function handleSubmit() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const data = {
      token: token,
      role: role,
      animalData,
    };
    try {
      const response = await axios.patch(
        `http://localhost:8080/admin/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch {
      console.log("Error");
    }
  }

  async function edit(id) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const data = {
      token: token,
      role: role,
    };
    try {
      const response = await axios.post(
        `http://localhost:8080/admin/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Форматируем дату в 'yyyy-MM-dd'
      const formattedDate = new Date(response.data.date)
        .toISOString()
        .split("T")[0];

      // Устанавливаем данные животного с отформатированной датой
      setAnimalData({
        ...response.data,
        date: formattedDate, // Используем отформатированную дату здесь
      });
    } catch {
      console.log("Error");
    }
  }

  useEffect(() => {
    edit(id);
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <h2>Редактировать животное</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Имя:</label>
              <input
                type="text"
                name="name"
                value={animalData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Вид:</label>
              <input
                type="text"
                name="type"
                value={animalData.type}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Порода:</label>
              <input
                type="text"
                name="breed"
                value={animalData.breed}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Возраст (в месяцах):</label>
              <input
                type="number"
                name="age"
                min="1"
                max="1200"
                value={animalData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Пол:</label>
              <select
                name="sex"
                value={animalData.sex}
                onChange={handleChange}
                required
              >
                <option value="">Выберите пол</option>
                <option value="самец">Самец</option>
                <option value="самка">Самка</option>
              </select>
            </div>
            <div>
              <label>Описание:</label>
              <textarea
                name="description"
                value={animalData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.photo}>
              <label>Фотография (ссылка):</label>
              <input
                type="url"
                name="photo"
                value={animalData.photo}
                onChange={handleChange}
                required
              />
              <img src={animalData.photo} alt="" />
            </div>
            <div>
              <label>Дата поступления:</label>
              <input
                type="date"
                name="date"
                value={animalData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Статус:</label>
              <select
                name="status"
                value={animalData.status}
                onChange={handleChange}
                required
              >
                <option value="">Выберите статус</option>
                <option value="в приюте">В приюте</option>
                <option value="в семье">В семье</option>
              </select>
            </div>

            <div className={classes.buttons}>
              <button type="submit">Отправить</button>
              <button>
                <Link to="/admin">На главную</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
