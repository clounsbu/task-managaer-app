import LoginButton from "../components/LoginButton";

export default function Login() {
  return (
    <div className="text-center">
      <h3 className="text-center mt-5">Sign In to Continue</h3>
      <p>Please click the button below to log in and view your tasks.</p>
      <LoginButton />
    </div>
  );
}
