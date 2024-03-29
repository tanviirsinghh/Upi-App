import React from 'react'
import Heading from '../components/Heading'
import Subheading from '../components/Subheading'
import Input from '../components/Input'
import Button from '../components/Button'
import ButtonWarning from '../components/ButtonWarning'


function Signin() {
  return(

    <>        
        <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
    <Heading label={"Sign in"}/>
    <Subheading label={"Enter your credentials to access your account"}/>
     <Input label={"Email"}placeholder={"abc@gmail.com"} ></Input>
     <Input label={"Password"} placeholder={"123456"}></Input>
     <div className="pt-4">
     <Button label={"Signin"}></Button>
     </div>
        <ButtonWarning text={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}>
          </ButtonWarning>
      </div>
    </div>
    </div>
 </>

  );
}

export default Signin