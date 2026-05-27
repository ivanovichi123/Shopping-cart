import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <>
      <p>Oh no, an error</p>
      <Link to="/home">To return click here</Link>
    </>
  );
};

export { ErrorPage };
