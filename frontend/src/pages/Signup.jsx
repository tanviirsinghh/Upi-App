import React, { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import axios from "axios";
import {useNaviagte} from "react-router-dom"

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNaviagte();
  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Signup"} />
            <Subheading
              label={"Enter your information oto create an account"}
            />
            <Input
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              label={"First Name"}
              placeholder={"Name"}
            ></Input>
            <Input
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              label={"Last Name"}
              placeh
              older={"Name"}
            ></Input>
            <Input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              label={"Email"}
              placeholder={"abc@gmail.com"}
            ></Input>
            <Input
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label={"Password"}
              placeholder={"123456"}
            ></Input>
            <div className="pt-4">
              <Button
                onClick={async () => {
              const response =   await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    firstName,
                    lastName,
                    password
                  });
                  // returning a token to the local storage
                  localStorage.setItem("key", response.data.token)
                  navigate('/dashboard')
                 
                }}
                label={"Signup"}
              ></Button>
            </div>
            <ButtonWarning
              text={"Already have an account?"}
              buttonText={"Sign in"}
              to={"/signin"}
            ></ButtonWarning>
          </div>
          T
        </div>
      </div>
    </>
  );
}

export default Signup;
