export const checkValidateData = (name, email, password)=>{

const isNameValid = /^[0-9A-Za-z]{4,16}$/.test(name);
const isEmailValid = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email);
const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

if(!isNameValid) return "Name is not Valid"
if(!isEmailValid) return "Email ID id not Valid";
if(!isPasswordValid) return "Password is not Valid";

return null;
};