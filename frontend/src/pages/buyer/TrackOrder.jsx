import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet"
import L from "leaflet"
import { useEffect, useState } from "react"

const steps = [
  "Order Placed",
  "Order Confirmed",
  "Preparing Items",
  "Out for Delivery",
  "Delivered"
]

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})

function MoveMap({ position }) {
  const map = useMap()
  useEffect(() => {
    map.panTo(position)
  }, [position])
  return null
}

export default function TrackOrder() {
  const [currentStep, setCurrentStep] = useState(2)
  const [position, setPosition] = useState([30.0898, 78.2107])

  const destination = [position[0] + 0.02, position[1] + 0.02]

  const path = []
  for (let i = 0; i <= 100; i++) {
    path.push([
      position[0] + (destination[0] - position[0]) * (i / 100),
      position[1] + (destination[1] - position[1]) * (i / 100)
    ])
  }

  useEffect(() => {
    let i = 0

    const interval = setInterval(() => {
      i++
      if (i >= path.length) {
        clearInterval(interval)
        setCurrentStep(4)
        return
      }

      setPosition(path[i])

      const progress = i / path.length
      if (progress > 0.75) setCurrentStep(3)
      else if (progress > 0.4) setCurrentStep(2)
    },600)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 space-y-6">

 
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">
          Live Order Tracking 
        </h2>
      
      </div>

      <div className="flex flex-col md:flex-row gap-6">

       
        <div className="flex-1 h-80 md:h-[420px] rounded-3xl overflow-hidden shadow-xl border">
          <MapContainer
            center={position}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position} />

            <MoveMap position={position} />
          </MapContainer>
        </div>

  
        <div className="w-full md:w-1/3 space-y-4">

       
          <div className="p-4 bg-slate-50 rounded-xl border">
            <div className="text-sm text-slate-500">
              Delivery Partner
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                R
              </div>

              <div>
                <div className="font-semibold text-slate-800">
                  Rahul Kumar
                </div>
                <div className="text-xs text-slate-500">
                  Arriving soon...
                </div>
              </div>

              <button className="ml-auto text-sm bg-blue-500 text-white px-3 py-1 rounded-lg">
                Call
              </button>
            </div>
          </div>

          {/* Tracking Steps */}
          <div className="p-4 bg-white rounded-xl border space-y-4">
            {steps.map((step, index) => (
              <TrackingStep
                key={index}
                title={step}
                completed={index <= currentStep}
                active={index === currentStep}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

function TrackingStep({ title, completed, active }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
        ${completed ? "bg-blue-500 text-white" : "bg-gray-300"}`}
      >
        ✓
      </div>

      <div>
        <div className={active ? "text-blue-600 font-semibold" : "text-slate-700"}>
          {title}
        </div>

        {active && (
          <div className="text-xs text-gray-500">
            In progress...
          </div>
        )}
      </div>
    </div>
  )
}