import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const userLogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="login">
      <div className="text"> Login </div>
        <form onSubmit={userLogin}>
          <label>Email</label>
          <input
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          ></input>
          <label>Password</label>
          <input
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          ></input>
          <div>
            <h1> Need an account? <a href="/register">Signup</a></h1>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
