import config from "../config";
import "./form.css";
import { BaseSyntheticEvent } from "react";

const Login: React.FC = () => {
  // const [message, setMessage] = useState("");

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    console.log(e.target);
  };
  return (
    <article>
      <form onSubmit={onSubmit} id="login-form">
        <article>
          <section>
            <label className="labelName">Email</label>
            <input type="email" name="email" required />
          </section>
          <section>
            <label className="labelName">Password</label>
            <input type="password" name="password" required />
          </section>
          {/* <section id="message">{message}</section> */}
          <section>
            <button className="form-button" form="login-form" type="submit">
              Log in
            </button>
          </section>
          <section>
            <button className="form-button" type="button">
              <a href={`${config.API_ROOT}/login/google`}>
                <img src="./google-logo.png" alt="google" />
                Log in with Google
              </a>
            </button>
          </section>
          <section>
            <button className="form-button" type="button">
              <a href={`${config.API_ROOT}/login/facebook`}>
                <img src="./facebook-logo.png" alt="facebook" />
                Log in with Facebook
              </a>
            </button>
          </section>
        </article>
      </form>
    </article>
  );
};

export default Login;
