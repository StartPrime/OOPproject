import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

export default function Header() {
  return (
    <header className={classes.headerMain}>
      <div className={`${classes.container} ${classes.header}`}>
        <img src="./src/assets/logo.svg" alt="#" />
        <nav>
          <ol>
            <li>
              <a href="">Помощь</a>
            </li>
            <li>
              <a href="">Наши питомцы</a>
            </li>
            <li>
              <a href="">Контакты</a>
            </li>
          </ol>
          <div className={classes.auth}>
            <Link to="/auth/registration">Зарегистрироваться</Link>
            <button>Войти</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
