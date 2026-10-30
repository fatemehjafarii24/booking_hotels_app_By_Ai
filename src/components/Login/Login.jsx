import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";



function Login() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("1234");

  const {Login, isAuthenticated } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) Login(email, password);
  };



  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className="mx-auto grid min-h-[calc(100dvh-88px)] max-w-[1600px] place-items-center px-4 py-10 sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-xl md:grid-cols-2">
        <div className="relative flex min-h-72 flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-violet-700 to-violet-950 p-6 text-white sm:min-h-80 sm:p-10">
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[40px] border-white/10" />
          <div aria-hidden="true" className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full border-[48px] border-white/10" />
          <div className="hidden items-center gap-2 text-sm font-bold tracking-wide sm:flex">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15"><span className="text-lg">✦</span></span>
            staywise
          </div>
          <div className="relative py-8 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">Make room for wonder</p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Your next story starts with a stay.</h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">Keep your favorite places close and plan the little details of your next escape.</p>
          </div>
          <p className="relative text-xs text-white/55">Find a place. Feel at home.</p>
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-12">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700">Welcome back</span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Sign in to Staywise</h2>
          <p className="mt-2 text-sm text-stone-500">Pick up right where your next adventure begins.</p>
          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-ink" htmlFor="email">Email address</label>
          <input
            className="w-full rounded-xl border border-stone-200 bg-sand px-4 py-3 text-sm text-ink outline-none transition focus:border-violet-700 focus:ring-2 focus:ring-violet-700/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
          />
        </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-ink" htmlFor="password">Password</label>
          <input
            className="w-full rounded-xl border border-stone-200 bg-sand px-4 py-3 text-sm text-ink outline-none transition focus:border-violet-700 focus:ring-2 focus:ring-violet-700/10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
          />
        </div>
            <button className="mt-2 w-full rounded-xl bg-violet-700 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2">Sign in</button>
          </form>
        </div>
      </div>
    </main>
  );
}
export default Login;
