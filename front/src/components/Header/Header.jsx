import { Link, NavLink } from "react-router-dom";
import classes from "./Header.module.scss";

export default function Header({ status }) {
  return (
    <header className={classes.headerMain}>
      <div className={`${classes.container} ${classes.header}`}>
        <Link to="/">
          <img src="../src/assets/logo.svg" alt="#" />
        </Link>
        <nav>
          <ol>
            <li>
              <Link to="/info">Помощь</Link>
            </li>
            <li>
              <Link to="/animals">Наши питомцы</Link>
            </li>
            <li>
              <a
                href="#"
                onClick={() =>
                  document
                    .getElementById("scrollToContacts")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Контакты
              </a>
            </li>
          </ol>
          {status ? null : <Auth />}
        </nav>
      </div>
    </header>
  );
}

function Auth() {
  return (
    <div className={classes.auth}>
      <Link to="/auth/registration">Зарегистрироваться</Link>
      <Link to="/auth/authorization">
        <button>Войти</button>
      </Link>
    </div>
  );
}
