import classes from "./TopPage.module.scss";
import { Link } from "react-router-dom";

export default function TopPage() {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.container}>
          <div className={classes.mainPage1}>
            <div className={classes.mainLeft}>
              <h1>Протянуть руку </h1>
              <h1>помощи просто!</h1>
              <p>
                Наши малыши не имеют цены, потому, что они бесценны. Возьмите
                питомца бесплатно!
              </p>
            </div>
            <div className={classes.divImg}>
              <img src="./src/assets/Page1Photo.png" alt="#" />
            </div>
          </div>
          <div className={classes.button}>
            <Link to="/animals">
              <button className={classes.bt}>Найти друга</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
