import Main from "./Main/Main.jsx";
import Header from "../Header/Header.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./Footer/Footer.jsx";

export default function MainPage() {
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
      <Header status={status}></Header>
      <Main status={status}></Main>
      <Footer></Footer>
    </>
  );
}
