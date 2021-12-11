import { Link } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar"

export default function NotFound () {
  return (
    <>
      <NavBar />
      <h1>404: not found</h1>
      <Link to="/"><button>Homepage</button></Link>
    </>
  )
}