import { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import {useHistory} from "react-router-dom"

const url = "http://localhost:8080/api/auth/signin";
function LoginForm() {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState();
  const [password, setPassword] = useState();
  const handleClick = async (event) => {
    // const history = useHistory();
    event.preventDefault();
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usernameOrEmail, password
        })
      })
  
      const data = await res.json();
  
      if(res.status === 200) {
        localStorage.setItem('token', data.accessToken);
        window.alert("Login successfully");
        navigate("/");
        // history.push("/");
      } else {
        window.alert("Login failed! " + data.message);
      }
    } catch(error) {
      throw new Error('There has been a problem with your fetch operation:', error);
    }

  }

  return (
    <div className="wrapper">
      <form action="">
        <h1>LOGIN</h1>
        <div className="input-box">
          <input type="text" placeholder="Username or Email" value={usernameOrEmail} onChange={e => setUsernameOrEmail(e.target.value)} required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <FaLock className="icon" />
        </div>

        <div className="remember-me">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button 
        type="submit" 
        id = "login"
        onClick={handleClick}>Login</button>
        <div className="register-link">
          <p>
            Do not have an account? <a href="/register">Register</a>
          </p>
        </div>
      </form>
      <script>

      </script>
    </div>
  );
}

export default LoginForm;