import { Login, signup } from "./action";

export default function Home() {
  return (
    <div className="w-full flex items-center flex-auto justify-center">
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        {/* login button */}
        <button formAction={Login}>Log in</button>
        {/* signup button */}
        <button formAction={signup}>Sign up</button>
      </form>
    </div>
  );
}
