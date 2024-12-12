import { useState } from "react";
import axios from "axios";
import classes from "./Authorization.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";

const Authorization = () => {
  const navigate = useNavigate();
  const [contactMethod, setContactMethod] = useState("email");
  const [contactInfo, setContactInfo] = useState("");
  const [password, setPassword] = useState("");

  const handleContactMethodChange = (event) => {
    setContactMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      phone: contactMethod === "phone" ? contactInfo : "",
      email: contactMethod === "email" ? contactInfo : "",
      passwordHash: password,
    };

    try {
      const api = axios.create({
        baseURL: "http://localhost:8080",
      });

      const response = await api.post("/auth/authorization", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Предполагается, что сервер возвращает токен в поле "token"
      localStorage.setItem("token", response.data.token); // Сохраняем токен в localStorage
      localStorage.setItem("role", response.data.role);

      if (response.data.role == "администратор") {
        navigate("/admin");
      }

      // Здесь можно добавить редирект или другое действие после успешной регистрации
    } catch (error) {
      console.error("Ошибка:", error);
      // Здесь можно обработать ошибку, например, показать сообщение пользователю
    }
  };

  return (
    <>
      <Header />
      <div className={classes.container}>
        <h1 className={classes.title}>Вход</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.formGroup}>
            <label className={`${classes.label} ${classes.labelRadio}`}>
              Способ входа
            </label>
            <div className={classes.radioGroup}>
              <label>
                <input
                  type="radio"
                  value="email"
                  checked={contactMethod === "email"}
                  onChange={handleContactMethodChange}
                />
                Электронная почта
              </label>
              <label>
                <input
                  type="radio"
                  value="phone"
                  checked={contactMethod === "phone"}
                  onChange={handleContactMethodChange}
                />
                Телефон
              </label>
            </div>
          </div>
          <div className={classes.formGroup}>
            <label className={classes.label} htmlFor={contactMethod}>
              Введите{" "}
              {contactMethod === "email"
                ? "электронную почту"
                : "номер телефона"}
            </label>
            <input
              className={classes.input}
              type={contactMethod === "email" ? "email" : "tel"}
              id={contactMethod}
              name={contactMethod}
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label className={classes.label} htmlFor="password">
              Пароль
            </label>
            <input
              className={classes.input}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={classes.submitButton}>
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default Authorization;
