import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, SignInButton } from "@clerk/clerk-react"; // Use useUser to detect success
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useAuth } from "../state/auth"; // Your custom auth state

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { user, isSignedIn, isLoaded } = useUser(); // Hook to see if Clerk worked
  
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);

  // Sync Clerk login with your custom grocery app state
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      handleAuthSuccess();
    }
  }, [isSignedIn, user, isLoaded]);

  const handleAuthSuccess = () => {
    // Sync with your state/auth.js
    login({
      name: user.fullName || user.username,
      email: user.primaryEmailAddress.emailAddress,
      role: role,
      token: "clerk-session-active",
    });

    // Redirect based on selected role
    const routes = { buyer: "/buyer/stores", seller: "/seller", admin: "/admin" };
    navigate(routes[role] || "/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest">FreshBasket</div>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-slate-700">
            Sign in or create an account to start shopping.
          </p>
        </div>

        <Card className="p-6 shadow-xl border-slate-200/50">
          <div className="space-y-6">
            
            {/* ROLE SELECTION - Keep this so the app knows the dashboard type */}
            <Field label="I am a...">
              <div className="grid grid-cols-3 gap-2">
                {["buyer", "seller", "admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={[
                      "rounded-2xl border px-3 py-3 text-sm font-semibold transition",
                      role === r
                        ? "border-emerald-200 bg-emerald-50 text-emerald-900 shadow-sm"
                        : "border-slate-200/70 bg-white text-slate-800 hover:bg-slate-50"
                    ].join(" ")}
                  >
                    {r[0].toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </Field>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Authentication</span></div>
            </div>

            {/* CLERK GOOGLE/SOCIAL BUTTON */}
            <div className="space-y-3">
              <SignInButton mode="modal">
                <button className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="G" />
                  Continue with Google
                </button>
              </SignInButton>

              <SignInButton mode="modal">
                <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 transition shadow-md">
                  Sign in with Email
                </button>
              </SignInButton>
            </div>

            <div className="flex flex-col items-center gap-4 pt-2">
               <div className="text-sm text-slate-500">
                New to FreshBasket? <span className="text-emerald-600 font-bold">Just click Sign In above</span>
              </div>
              
              <Link to="/buyer/stores" className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition">
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
      <div className="mb-3 text-sm font-bold text-slate-800 tracking-tight">{label}</div>
      {children}
    </div>
  );
}