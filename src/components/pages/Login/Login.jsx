import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom"
import Button from "../../shared/UI/Button/Button"
import { useAuth } from "../../../hooks"
import "./Login.css"


export default function Login() {
  const dispatch = useDispatch()
  const { loggedIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ email, password }))
    } catch (err) {
      console.error(err.message)
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/profile")
    }
  }, [loggedIn])

  return (
    <form className="login-form">
      <h2 className="login-form__title">Login</h2>

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button onClick={submitHandler} className="login-form__btn">Log In</Button>
    </form>
  );
}
