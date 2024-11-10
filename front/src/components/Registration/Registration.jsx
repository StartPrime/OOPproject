import React, { useState } from "react";
import styles from "./Registration.module.scss";

const Registration = () => {
  const [contactMethod, setContactMethod] = useState("email");

  const handleContactMethodChange = (event) => {
    setContactMethod(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Имя пользователя
          </label>
          <input
            className={styles.input}
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="surname">
            Фамилия
          </label>
          <input
            className={styles.input}
            type="text"
            id="surname"
            name="surname"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Способ связи</label>
          <div className={styles.radioGroup}>
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
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor={contactMethod}>
            Введите{" "}
            {contactMethod === "email" ? "электронную почту" : "номер телефона"}
          </label>
          <input
            className={styles.input}
            type={contactMethod === "email" ? "email" : "tel"}
            id={contactMethod}
            name={contactMethod}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Пароль
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;
