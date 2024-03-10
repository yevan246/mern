import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function DefaultLayout() {
  return (
    <>
        <Header/>
        <Outlet />

        <footer>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, delectus?
        </footer>
    </>
  )
}
