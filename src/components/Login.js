import Header from "./Header"
import { useState, useRef } from 'react';
import { checkValidateData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {  
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick =() =>{
    // Validation form data ( write a validation in validate.js in utils folder)

    const message = checkValidateData(
      isSignInForm ? null : name.current?.value,
      email.current?.value,
      password.current?.value
    );

    setErrorMessage(message);
    if(message) return;

    if(!isSignInForm){
      createUserWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value
      )
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user; 
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://gitlab.com/uploads/-/system/user/avatar/12405127/avatar.png?width=800"
          }).then(() => {
            const {uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
            navigate("/browse")
            
          }).catch((error) => {
              setErrorMessage(error.message);
           
          });

          console.log(user);
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            setErrorMessage("This email is already registered. Please Sign In.");
          } else {
            setErrorMessage(errorCode + " - " + errorMessage);
          }

          // ..
        });
    }
    else
    {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/browse")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/user-not-found") {
            setErrorMessage("No user found with this email.");
          } else if (errorCode === "auth/wrong-password") {
            setErrorMessage("Incorrect password.");
          } else {
            setErrorMessage(errorCode + " - " + errorMessage);
          }
        });
    }

  }; 

  const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7968847f-3da9-44b3-8bbb-13a46579881f/web/IN-en-20250609-TRIFECTA-perspective_32b70b51-20d4-46db-8a1a-3d5428be5f0e_large.jpg" 
          alt="background" 
        />
      </div>

      <form 
        onSubmit={(e)=> e.preventDefault()} 
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
      >
      <h1 
        className="font-bold text-3xl py-4">
        {isSignInForm ? "Sign In" : "Sign Up"}
      </h1>

      {!isSignInForm && (
        <input 
          ref={name}
          type="text" 
          placeholder="Full Name" 
          className="p-4 my-4 w-full rounded-lg text-black" 
        />
      )}
      <input 
        ref={email} 
        type="text" 
        placeholder="Email or mobile number" 
        className="p-4 my-4 w-full rounded-lg text-black" 
      />
      <input 
        ref={password}  
        type="password" 
        placeholder="Password" 
        className="p-4 my-4 w-full rounded-lg text-black" 
      />
        
      <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
      
      <button className="p-4 my-6 bg-red-700 w-full rounded-lg" 
      onClick={handleButtonClick}>
      {isSignInForm ? "Sign In" : "Sign Up"}
      </button>
      
      <p className="py-4 cursor-pointer"  onClick={toggleSignInForm}>
      {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered Sign In Now"}
      </p>
      </form>
    </div>
  )
}

export default Login
