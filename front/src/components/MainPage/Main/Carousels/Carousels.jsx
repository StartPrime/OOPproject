import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import classes from "./Carousels.module.scss";
import { Link } from "react-router-dom";

function ControlledCarousel({ photo, title, description }) {
  const [index, setIndex] = useState(0);
  return (
    <Carousel
      activeIndex={index}
      onSelect={setIndex}
      data-bs-theme="dark"
      interval={null}
    >
      <Carousel.Item className={classes.itemOne}>
        <img src={photo} alt="" />
        <Carousel.Caption className={classes.captionOne}>
          <h3>{title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={classes.itemTwo}>
        <div className={classes.pageTwo}></div>
        <Carousel.Caption className={classes.captionTwo}>
          <h3>{description}</h3>
          <Link to="/info">
            <button className={classes.button}>Узнать больше</button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default function Carousels() {
  const carouselData = [
    {
      photo: "src/assets/carousels/dog1.png",
      title: "Стать волонтером",
      description:
        "Больше всего мы ценим не материальную помощь, а помощь делом!",
    },
    {
      photo: "src/assets/carousels/cat1.png",
      title: "Сделать пожертвование",
      description:
        "Вы можете оказывать адресную помощь или пожертвовать на текущие расходы.",
    },
    {
      photo: "src/assets/carousels/dog2.png",
      title: "Пиар",
      description:
        "Размещение в социальных сетях наших постов. Не займет много времени и очень поможет.",
    },
  ];

  return (
    <div className={classes.cards}>
      <div className={classes.upper}>
        <h1>Как вы можете помочь</h1>
      </div>
      <div className={`${classes.carousel} ${classes.container}`}>
        {carouselData.map((data, index) => (
          <div className={classes.card} key={index}>
            <ControlledCarousel {...data} />
          </div>
        ))}
      </div>
    </div>
  );
}
