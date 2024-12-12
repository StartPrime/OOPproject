import { useState } from "react";
import axios from "axios";
import styles from "./AddAnimalForm.module.scss";
import { Link } from "react-router-dom";

export default function AddAnimalForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/admin",
        animalData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Животное успешно добавлено:", response.data);
      // Опционально: сбросить форму или перенаправить
    } catch (error) {
      console.error("Ошибка при добавлении животного:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Добавить животное</h2>
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
        <div>
          <label>Фотография (ссылка):</label>
          <input
            type="url"
            name="photo"
            value={animalData.photo}
            onChange={handleChange}
            required
          />
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
        <button type="submit">Добавить животное</button>
        <button>
          <Link to="/admin/applications">Просмотреть заявки</Link>
        </button>
        <button>
          <Link to="/AdoptionStatistics">Статистика усыновлений</Link>
        </button>
      </form>
    </div>
  );
}
