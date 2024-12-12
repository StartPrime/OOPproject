import { Link } from "react-router-dom";
import classes from "./404.module.scss"; // Импортируем CSS для стилизации

const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <div className={classes.emoji}>😞</div>
      <h1>404</h1>
      <p>Упс! Страница не найдена.</p>
      <p>Возможно, она была удалена или вы ввели неправильный адрес.</p>
      <p>
        <Link to="/">Вернуться на главную страницу</Link>
      </p>
    </div>
  );
};

export default NotFound;
