import Carousels from "./Carousels/Carousels.jsx";
import TopPage from "./TopPage/TopPage.jsx";

export default function Main({ status }) {
  return (
    <>
      <TopPage status={status}></TopPage>
      <Carousels></Carousels>
    </>
  );
}
