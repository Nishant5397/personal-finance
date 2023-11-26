import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css';
import Input from '../Input';
import Button from '../Button';
import {GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth,db, provider } from '../../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { toast } from 'react-toastify';

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[confirmPassword,setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [loginForm, setLoginForm] = useState(false)
  const navigate = useNavigate();

 function signupWithEmail(){
  setLoading(true);
    if(name!=="" && email !=="" && password!=="" && confirmPassword !== "")
  { 
        if(password === confirmPassword)
        {
          createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
              // Signed up 
                  const user = userCredential.user;
                  console.log("User", user);
                  toast.success("User Created!!")
                  setLoading(false);
                  setName('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  createDoc(user);
                  navigate('/dashboard');
                  // ...
            })
            .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  toast.error(errorMessage);
                  setLoading(false);
                  // ..
            });
        }
        else{
          toast.error("Password & Confirm Password don't match");
          setLoading(false);
        }
  }
  else{
    toast.error("All fields are required")
    setLoading(false);
  }
}

function logInWithEmail(){
  setLoading(true);
  if(email !=="" && password!=="")
  {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("User succesfully Logged In!!");
        navigate('/dashboard');
        setLoading(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
  }
  else{
    toast.error("All Fields are mandetory");
    setLoading(false);
  }
  
}

async function createDoc(user){
  setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try{
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email:user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Account Created!");
        setLoading(false);
      }
      catch(e){
        toast.error(e.message);
        setLoading(false);
      }
    } else{
      // toast.error("Doc already exists");
      setLoading(false);
    }
  }

function googleAuth(){
  setLoading(true);
  try {
    signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setLoading(false);
    toast.success("User Authenticated!!");
    navigate('/dashboard');
    createDoc(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false);
    toast.error(error.message);
    // ...
  });
  } catch (error) {
    toast.error(error.message);
    setLoading(false);
  }
  
}

  return (
    <>
    {loginForm ?
    (
      <div className='signup-wrapper'>
        <h2 className='title'>Log In on 
          <span style={{color:"var(--theme)"}}> Financely</span>
        </h2>
        <form>
          <Input 
            type="email"
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={"johndoe@gmail.com"}
          />
          <Input 
            type="password"
            label={"Password"}
            state={password}
            setState={setPassword}
            placeholder={"Example@123"}
          />
          <Button 
            disabled={loading}
            text={loading?"Loading...":"LogIn using Email and Passworrd"}
            onClick={logInWithEmail}
          />
          <p className = "p-login" >Or</p>
          <Button 
            disabled={loading}
            onClick={googleAuth}
            text={loading?"Loading...":"LogIn using Google Account"}
            blue={true}
          />
        </form>
        <p className = "p-login">Or Don't Have An Account 
        <span 
        style={{color:"var(--theme)", 
                cursor:"pointer"}} 
        onClick={()=> setLoginForm(!loginForm)}> Click Here
        </span> </p>
      </div>):
    (
      <div className='signup-wrapper'>
        <h2 className='title'>Sign Up on 
          <span style={{color:"var(--theme)"}}> Financely</span>
        </h2>
        <form>
          <Input 
            label={"Full Name"}
            state={name}
            setState={setName}
            placeholder={"John Doe"}
          />
          <Input 
            type="email"
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={"johndoe@gmail.com"}
          />
          <Input 
            type="password"
            label={"Password"}
            state={password}
            setState={setPassword}
            placeholder={"Example@123"}
          />
          <Input 
            type="password"
            label={"Confirm Password"}
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder={"Example@123"}
          />
          <Button 
            disabled={loading}
            text={loading?"Loading...":"Signup using Email and Passworrd"}
            onClick={signupWithEmail}
          />
          <p className = "p-login" >Or</p>
          <Button 
            disabled={loading}
            onClick={googleAuth}
            text={loading?"Loading...":"Signup using Google Account"}
            blue={true}
          />

        </form>
        <p className = "p-login" >Or Already Have An Account
        <span 
        style={{color:"var(--theme)", 
                cursor:"pointer"}} 
        onClick={()=> setLoginForm(!loginForm)}> Click Here
        </span> </p>
      </div>)
      }
  
    </>
  )
}

export default SignUp