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

      {/* Map Section */}
      <div className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
        <iframe
          title="Delivery Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110204.74637223467!2d78.21077732483864!3d30.089800201193325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39091726a79857d3%3A0xc39103e6396e95b0!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1714184643000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[0.3] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
        ></iframe>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Live Tracking Active</span>
        </div>
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