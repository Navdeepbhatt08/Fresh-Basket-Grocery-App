import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";
import {
  useUser,
  SignInButton,
  useSignIn,
} from "@clerk/clerk-react";

import Card from "../components/ui/Card";
import { useAuth } from "../state/auth";
import Button from "../components/ui/Button";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { user, isSignedIn, isLoaded } = useUser();
  const { signIn, setActive, isLoaded: signInLoaded } = useSignIn();

  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);

  // email/password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔥 Sync Clerk login → your app state
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      handleAuthSuccess();
    }
  }, [isSignedIn, user, isLoaded]);

  const handleAuthSuccess = () => {
    login({
      name: user.fullName || user.username,
      email: user.primaryEmailAddress?.emailAddress,
      role: role,
      token: "clerk-session-active",
    });

    const routes = {
      buyer: "/buyer/stores",
      seller: "/seller",
      admin: "/admin",
    };

    navigate(routes[role] || "/", { replace: true });
  };

    // 🔥 Email/Password Login
  const handleEmailLogin = async () => {
    if (!signInLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
        
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

      }
    } catch (err) {
      console.error(err);
      setError("Invalid email/username or password");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-emerald-50 to-slate-100">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6">
          <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest">
            FreshBasket
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-700">
            Sign in or create an account to start shopping.
          </p>
        </div>

        <Card className="p-6 shadow-xl border-slate-200/50">
          <div className="space-y-6">

            {/* ROLE */}
            <Field label="Sign In As...">
              <div className="grid grid-cols-3 gap-2">
                {["buyer", "seller", "admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={[
                      "rounded-2xl border px-3 py-3 text-sm font-semibold transition",
                      role === r
                        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                        : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {r[0].toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </Field>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
            </div>

            {/* 🔥 Email / Password Login */}
            <div className="space-y-3 pt-5">
              <input
                type="text"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <Button
                onClick={handleEmailLogin}
                disabled={loading}
                className="w-full cursor-pointer rounded-2xl  px-4 py-3 text-white font-bold transition"
              >
                {loading ? "Signing in..." : "Login"}
              </Button>
            </div>


            {/* Social Login */}
            <div className="space-y-3 cursor-pointer">
              <SignInButton mode="modal" >
                <button className="w-full cursor-pointer flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    className="w-5 h-5"
                    alt="G"
                  />
                  Continue with Google
                </button>
              </SignInButton>

              <SignInButton mode="modal">
                <button className="w-full cursor-pointer rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 transition">
                  Sign in with Email
                </button>
              </SignInButton>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center gap-4 pt-2">
              <div className="text-sm text-slate-500">
                New to FreshBasket?{" "}
                <span className="text-emerald-600 font-bold cursor-pointer" onClick={() => navigate("/register")}>
                  Register with us
                </span>
              </div>

              <Link
                to="/buyer/stores"
                className="text-sm font-semibold text-slate-400 hover:text-slate-600"
              >
                Continue as guest
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="mb-3 text-sm font-bold text-slate-800">
        {label}
      </div>
      {children}
    </div>
  );
}