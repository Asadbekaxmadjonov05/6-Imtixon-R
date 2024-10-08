import React, { useContext, useRef, useState } from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MainContext } from "../../context/Context";
import LoadingGif from "../../assets/images/loading.gif";
import HeadingTitle from "../../component/Title";
import Title from "../../component/Title";

function Login() {
  const loginStatusRef = useRef();
  const passwordStatusRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogin } = useContext(MainContext);

  function loginFormSubmit(e) {
    e.preventDefault();
    const { loginValue, passwordValue } = e.target.elements;

    const storedData = JSON.parse(window.localStorage.getItem("signUpData"));

    const isLoginValid = storedData
      ? loginValue.value === storedData.login
      : loginValue.value === "asadbek";
    const isPasswordValid = storedData
      ? passwordValue.value === storedData.password
      : passwordValue.value === "123";

    if (!isLoginValid) {
      loginStatusRef.current.textContent = "Login kiriting!";
      loginValue.classList.add("!border-red-600", "!border");
      toast.error("Iltimos, login kiriting!");
    } else {
      loginStatusRef.current.textContent = "";
      loginValue.classList.remove("!border-red-600", "!border");
    }

    if (!isPasswordValid) {
      passwordStatusRef.current.textContent = "Parol kiriting!";
      passwordValue.classList.add("!border-red-600", "!border");
      toast.error("Iltimos, parol kiriting!");
    } else {
      passwordStatusRef.current.textContent = "";
      passwordValue.classList.remove("!border-red-600", "!border");
    }

    if (isLoginValid && isPasswordValid) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLogin(true);
        setIsLoading(false);
      }, 1500);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-5">
      <div>
        <HeadingTitle title={"Welcome, Log into you account"} />
        <form
          onSubmit={loginFormSubmit}
          autoComplete="off"
          className="w-[512px] flex flex-col py-[72px] pl-[130px] pr-[134px] mt-[53px] h-[382px] bg-white"
        >
          <Title
            extraStyle={
              "!font-inter text-primary text-base !leading-[25px] !font-medium"
            }
            title={"It is our great pleasure to have you on board! "}
          />

          <Input
           extraStyle={  "mt-[14px] border-gray-300 focus:border-blue-500 focus:shadow-blue-500/50 focus:shadow-lg"  } 
            type="text"
            name="loginValue"
            placeholder="Enter your Login"
          />
          <p ref={loginStatusRef}  className={` text-[13px] text-red-500 animate-flicker-red`}></p>
          <style jsx>{`
  @keyframes flicker-red {
    0% {
      text-shadow: 2px 2px 6px rgba(239, 68, 68, 0.8); 
    }
    50% {
      text-shadow: 2px 2px 15px rgba(239, 68, 68, 0.4);
    }
    100% {
      text-shadow: 2px 2px 6px rgba(239, 68, 68, 0.8);
    }
  }

  .animate-flicker-red {
    animation: flicker-red 1.5s infinite alternate;
  }
         `}</style>

          <Input
            type="password"
            name="passwordValue"
            extraStyle={  "mt-[14px] border-gray-300 focus:border-blue-500 focus:shadow-blue-500/50 focus:shadow-lg"  } 
            placeholder="Enter Password"
          />
          <p ref={passwordStatusRef}  className={` text-[13px] text-red-500 animate-flicker-red`}></p>
          

          <Button
  extraStyle={`
    mt-[14px] 
    bg-blue-500 
    hover:bg-blue-600 
    active:bg-green-700 
    disabled:bg-gray-400 
    disabled:cursor-not-allowed
    text-white 
    px-4 
    py-2 
    rounded-lg
  `}
  title={
    isLoading ? (
      <img
        src={LoadingGif}
        alt="Loading..."
        className="w-5 h-5 mx-auto"
      />
    ) : (
      "Login"
    )
  }
  disabled={isLoading}
/>


<Link
  to="sign-up"
  className="
    font-inter 
    text-center 
    text-primary-5 
    mt-[14px] 
    text-xs 
    leading-[24px] 
    font-bold 
    hover:text-green-500
  "
>
  Sign up
</Link>

        </form>
      </div>
    </div>
  );
}

export default Login;
