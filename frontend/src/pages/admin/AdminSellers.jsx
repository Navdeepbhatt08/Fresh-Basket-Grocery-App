import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  Store,
  User,
  Star,
  Eye,
  CheckCircle,
  XCircle,
  Ban,
  Mail,
  MapPin,
  Clock,
  Package
} from "lucide-react";
import axios from "axios";

export default function AdminSellers() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingShop, setViewingShop] = useState(null);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/shops");
      setShops(res.data);
    } catch (error) {
      console.error("Error fetching shops for admin:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Active" || !status)
      return "bg-green-50 text-green-700 border-green-200";
    if (status === "Pending")
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <div className="text-sm text-slate-500">Admin Panel</div>
        <h1 className="mt-1 text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Store size={26} />
          Shops & Sellers
        </h1>
        <p className="mt-2 text-slate-600">
          Manage all registered shops and their owners.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500 animate-pulse">Fetching database records...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {shops.map((s) => (
            <Card
              key={s._id}
              className="p-6 transition hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
                    <Store size={18} />
                    {s.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User size={15} />
                    Owner: {s.seller?.name || "Unknown"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {s.seller?.email}
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusStyle("Active")}`}>
                  Active
                </span>
              </div>

              <div className="mt-4 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                <p><strong>Distance:</strong> {s.distanceKm} km</p>
                <p><strong>ETA:</strong> {s.etaMin} min</p>
                <p className="mt-1 line-clamp-2 italic">"{s.description}"</p>
              </div>

              <div className="border-t border-slate-100 my-4"></div>

              <div className="flex flex-wrap gap-2">
                <Button variant="subtle" size="sm" onClick={() => setViewingShop(s)}>
                  <Eye size={14} className="mr-2" />
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  <Ban size={14} className="mr-2" />
                  Suspend
                </Button>
              </div>
            </Card>
          ))}
          {shops.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500">
              No shops found in the database.
            </div>
          )}
        </div>
      )}

      {/* View Details Modal */}
      {viewingShop && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
            onClick={() => setViewingShop(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-3xl shadow-2xl z-[60] overflow-hidden">
            
            <div className="relative h-48 bg-slate-100">
              <img 
                src={viewingShop.image || "https://via.placeholder.com/600x400?text=Shop"} 
                className="w-full h-full object-cover"
                alt={viewingShop.name}
              />
              <button 
                onClick={() => setViewingShop(null)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-900 hover:bg-white"
              >
                ×
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{viewingShop.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mt-1">
                    <Star size={14} fill="currentColor" />
                    {viewingShop.rating} Rating
                  </div>
                </div>
                <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-black rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <InfoItem icon={User} label="Owner" value={viewingShop.seller?.name} />
                <InfoItem icon={Mail} label="Email" value={viewingShop.seller?.email} />
                <InfoItem icon={MapPin} label="Distance" value={`${viewingShop.distanceKm} km`} />
                <InfoItem icon={Clock} label="ETA" value={`${viewingShop.etaMin} mins`} />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {viewingShop.description || "No description provided for this store."}
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Store Tags</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {viewingShop.tags?.map(t => (
                      <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex gap-3">
                <Button className="flex-1" onClick={() => setViewingShop(null)}>
                  Close Details
                </Button>
                <Button variant="danger" className="px-4">
                   <Ban size={18} />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-slate-400" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
        <p className="text-sm font-bold text-slate-900 truncate max-w-[120px]">{value || "N/A"}</p>
      </div>
    </div>
  )
}