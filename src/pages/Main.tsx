import {useNavigate} from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();

  return (
    <div>
      Main
      <button onClick={() => navigate('/split')}>Split</button>
    </div>
  )
}