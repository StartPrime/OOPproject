import classes from "./Footer.module.scss"; // Импортируем CSS-модуль

export default function Footer() {
  return (
    <footer className={classes.footer} id="scrollToContacts">
      <div className={classes.footerContent}>
        <h2>Контакты</h2>
        <ul>
          <li>
            <strong>Телефон:</strong> +7 (123) 456-78-90
          </li>
          <li>
            <strong>Email:</strong> info@example.com
          </li>
          <li>
            <strong>Адрес:</strong> г. Ростов-на-Дону, площадь Гагарина, д. 1
          </li>
        </ul>
      </div>
      <div className={classes.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} AnimalShelter. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
