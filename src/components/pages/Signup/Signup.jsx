import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom"
import Button from "../../shared/UI/Button/Button"
import { useAuth } from "../../../hooks"
import "./Signup.css"


export default function Signup() {
  const dispatch = useDispatch()
  const { loggedIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(registerUser({ email, password }))
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
    <form className="signup-form">
      <h2 className="signup-form__title">Sign up</h2>

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

      <Button onClick={submitHandler} className="signup-form__btn">Sign up</Button>
    </form>
  );
}
