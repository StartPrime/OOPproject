import MainPage from "./components/MainPage/MainPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Animals from "./components/Animals/MainPage/Animals.jsx";
import Registration from "./components/Registration/Registration.jsx";
import Authorization from "./components/Authorization/Authorization.jsx";
import Admin from "./components/Admin/Admin.jsx";
import NotFound from "./components/404/404.jsx";
import Edit from "./components/Admin/Edit/Edit.jsx";
import Info from "./components/Info/Info.jsx";
import Animal from "./components/Animals/Animal/Animal.jsx";
import ApplicationForm from "./components/Animals/ApplicationForm/ApplicationForm.jsx";
import Applications from "./components/Admin/Applications/Applications.jsx";
import AdoptionStatistics from "./components/Admin/AdoptionStatistics/AdoptionStatistics.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/auth/authorization" element={<Authorization />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/:id" element={<Edit />} />
        <Route path="/info" element={<Info />} />
        <Route path="/animals/:id" element={<Animal />} />
        <Route path="/animals/application/:id" element={<ApplicationForm />} />
        <Route path="/admin/applications" element={<Applications />} />
        <Route path="/AdoptionStatistics" element={<AdoptionStatistics />} />
      </Routes>
    </>
  );
}
