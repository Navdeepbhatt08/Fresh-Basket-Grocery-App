import { useEffect, useState } from "react"

const steps = [
  "Order Placed",
  "Order Confirmed",
  "Preparing Items",
  "Out for Delivery",
  "Delivered"
]

export default function TrackOrder() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1
        return prev
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="p-6 space-y-6">

      <div>
        <h2 className="text-xl font-extrabold text-slate-950">
          Live Order Tracking
        </h2>
        <p className="text-sm text-slate-600">
          Your groceries are on the way 
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="h-60 bg-slate-200 rounded-xl flex items-center justify-center">
        <span className="text-slate-500 text-sm">
          Delivery Map (Live Tracking)
        </span>
      </div>


      {/* Delivery Partner */}
      <div className="p-4 border rounded-xl bg-slate-50">
        <div className="text-sm text-slate-500">Delivery Partner</div>

        <div className="flex items-center gap-3 mt-2">

          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            R
          </div>

          <div>
            <div className="font-semibold text-slate-800">
              Rahul Kumar
            </div>
            <div className="text-xs text-slate-500">
              Arriving in 10 minutes
            </div>
          </div>

          <button className="ml-auto text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
            Call
          </button>

        </div>
      </div>

    </div>
  )
}

function TrackingStep({ title, completed, active }) {
  return (
    <div className="flex items-center gap-4">

      {/* Step Circle */}
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
        ${
          completed
            ? "bg-blue-500 text-white"
            : "bg-slate-300 text-transparent"
        }`}
      >
        ✓
      </div>

      {/* Step Text */}
      <div>
        <div
          className={`font-semibold ${
            active ? "text-blue-600" : "text-slate-700"
          }`}
        >
          {title}
        </div>

        {active && (
          <div className="text-xs text-slate-500">
            Processing...
          </div>
        )}
      </div>

    </div>
  )
}