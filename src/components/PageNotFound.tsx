import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div> Данная страница не найдена</div>
      <button onClick={() => navigate("/")}>На главную!</button>
    </section>
  );
};

export default PageNotFound;
