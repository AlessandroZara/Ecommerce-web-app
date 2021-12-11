import { Link } from "react-router-dom";

export default function NotFound () {
  return (
    <>
      <h1>404: not found</h1>
      <Link to="/"><button>Homepage</button></Link>
    </>
  )
}