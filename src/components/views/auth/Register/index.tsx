import Link from "next/link";
import style from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // jika success maka akan di redirect ke login
    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is already registered");
    }
  };

  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Register</h1>
      {error && <p className={style.register__error}>{error}</p>}
      <div className={style.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.register__form__item}>
            <label htmlFor="fullname">Full Name</label>
            <input
              name="fullname"
              type="text"
              id="fullname"
              className={style.register__form__item__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              className={style.register__form__item__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              type="text"
              id="phone"
              className={style.register__form__item__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              className={style.register__form__item__input}
            />
          </div>

          <button type="submit" className={style.register__form__button}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={style.register__link}>
        Have an account? Sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
