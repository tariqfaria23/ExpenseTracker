import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";

import "./styles.css";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  return (
    <div className="login-page">
      <h1 className="heading">Expense Tracker</h1>
      <p className="message">
        Track your expenses effortlessly.
      </p>
      <div className="google-signin">
        <button className="google-login-button" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
      {isAuth && <Navigate to="/expense-tracker" />}
      <p className="lower-text">
        <p>View this project on <a href = "https://github.com/tariqfaria23/ExpenseTracker" target="_blank"> <img className="github-logo" src = "src\assets\github-mark.png"></img>
          </a>
        </p>
      </p>
    </div>
  );
};
