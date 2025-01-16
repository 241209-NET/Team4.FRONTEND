import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import {Button} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// preview-start
const providers = [{ id: 'credentials', name: 'Email and Password' }];
// preview-end

const SignIn = async (_, formData) => {

  try{
    let email = await formData.get("email");
    let password = await formData.get("password");
      if(!LoginAPI(email, password)){
        alert('Either Password or Email is Empty!');
        return;
      }
      const response = await axios.get(`http://localhost:5231/User/username/${email}`);

      if(!response.data){
        alert('User not found'); 
        return;
      }

      if(response.data.password != password){
        alert('Incorrect Password'); 
        return;
      }

      if(response.data){
        //need to nav to another page
      } else {
          alert("SomeError")
      }
    } catch(TypeError){}
}

const NewAccount = async ( _, formData) => {

  try{
    let email =  await formData.get("email");
    let password = await formData.get("password");
      if(!RegisterAPI(email,password)){
        alert('Either Password or Email is Empty!');
        return;
      }

      const response = await axios.post('http://localhost:5231/User', {
          username: email,
          password: password
      });

      if(response.data){
          alert(`Account with username ${email} successfully created`);
      } else {
          alert("SOME ERROR");
      }
  }   catch(TypeError){}
};

export default function CredentialsSignInPage() {
  const theme = useTheme();

  return (
      <AppProvider theme={theme}>
      <div id="LoginPage">
          <SignInPage
              signIn={SignIn}
              providers={providers}
              slots={{
                title: TitleLogin,
                subtitle: Subtitle,
                submitButton: Login,
                rememberMe: Subtitle
              }}
          />
        <div id='greeting'>
          <h3>Welcome to Our E-Commerce Site!</h3>
          <img src="/dollar.png" alt="Ecommerce Logo" style={{height:100}}></img>
          <p>Please Sign In to Continue.</p>
          <p> Don't have an account? Create one now!</p>
        </div>
          <SignInPage
              signIn={NewAccount}
              providers = {providers}
              slots={{
                title: TitleRegister,
                subtitle: Subtitle,
                submitButton : CreateAccount,
                rememberMe: Subtitle
              }}
          />
      </div>
      </AppProvider>
      );

}

function LoginAPI(username, password) {
  return username != null && password != null;
}

function RegisterAPI(username, password) {
  return username != null && password != null;
}

function CreateAccount(){
  return (
    <Button type="submit" onClick={NewAccount}>Create Account</Button>
  );
}

function Login(){
  return (
    <Button type="submit" onClick={SignIn}>Sign In</Button>
  );
}


function TitleRegister(){
  return (
    <h2 className="Title">Sign Up?</h2>
  )
}

function TitleLogin(){
  return (
    <h2 className= "title">Sign In?</h2>
  )
}
function Subtitle(){
  return (
    <></>
  );
}


