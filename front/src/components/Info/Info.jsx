import Header from "../Header/Header.jsx";
import styles from "./Info.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Info() {
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
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Информация</h1>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>Почему стоит стать волонтером?</h2>
            <p className={styles.text}>
              Становясь волонтером, вы не только помогаете животным, но и
              получаете уникальный опыт общения с ними. Ваши усилия помогут нам
              обеспечить заботу и любовь тем, кто в этом нуждается.
              Присоединяйтесь к нашей команде и сделайте мир лучше для бездомных
              животных!
            </p>
            <p className={styles.text}>
              За подробной информацией обращайтесь по контактам ниже.
            </p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>
              Почему важно делать пожертвования?
            </h2>
            <p className={styles.text}>
              Каждое пожертвование помогает нам обеспечить кормление,
              медицинское обслуживание и укрытие для животных. Ваши средства
              идут на помощь тем, кто не может позаботиться о себе. Даже
              небольшая сумма может сделать огромную разницу в жизни бездомных
              животных!
            </p>
            <p className={styles.text}>
              За подробной информацией обращайтесь по контактам ниже.
            </p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>
              Как вы можете помочь с распространением информации?
            </h2>
            <p className={styles.text}>
              Распространяя информацию о нашем приюте, вы помогаете нам находить
              новые дома для животных. Поделитесь нашим сайтом в социальных
              сетях, расскажите своим друзьям и знакомым о нашей работе. Чем
              больше людей узнает о нас, тем больше жизней мы сможем изменить!
            </p>
            <p className={styles.text}>
              За подробной информацией обращайтесь по контактам ниже.
            </p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.subtitle}>Контакты</h2>
            <p className={styles.text}>
              Если у вас есть вопросы или вы хотите узнать больше, свяжитесь с
              нами по следующим контактам:
            </p>
            <ul className={styles.contactList}>
              <li>Email: info@animal-shelter.org</li>
              <li>Телефон: +7 (123) 456-78-90</li>
              <li>Адрес: г. Ростов-на-Дону, площадь Гагарина 1</li>
            </ul>
          </section>
          <div className={styles.button}>
            <Link to="/">
              <button>На главную</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
