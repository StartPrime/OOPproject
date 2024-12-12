import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddAnimalForm from "./AddAnimalForm/AddAnimalForm.jsx";
import AnimalCards from "./AnimalsCards/AnimalCards.jsx";

export default function Admin() {
  const navigate = useNavigate();

  async function CheckAdmin() {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const data = {
        token: token,
        role: role,
      };
      const api = axios.create({
        baseURL: "http://localhost:8080",
      });
      const response = await api.post("/adminValid", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.massage == "err") {
        navigate("/404");
      }
    } catch {
      navigate("/404");
    }
  }

  useEffect(() => {
    CheckAdmin();
  }, []);

  return (
    <>
      <AddAnimalForm />
      <AnimalCards />
    </>
  );
}
