import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import {
  Store,
  User,
  Star,
  Eye,
  CheckCircle,
  XCircle,
  Ban
} from "lucide-react";

const demoSellers = [
  { id: "s_1", name: "GreenMart", owner: "Aman", status: "Active", rating: 4.6 },
  { id: "s_2", name: "Dairy & More", owner: "Mehak", status: "Active", rating: 4.4 },
  { id: "s_3", name: "QuickGrocer", owner: "Rohit", status: "Pending", rating: 0 }
];

export default function AdminSellers() {

  const getStatusStyle = (status) => {
    if (status === "Active")
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
          Sellers
        </h1>

        <p className="mt-2 text-slate-600">
          Manage seller accounts and approvals
        </p>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {demoSellers.map((s) => (
          <Card
            key={s.id}
            className="p-6 transition hover:shadow-xl hover:-translate-y-1"
          >

            {/* Seller Info */}
            <div className="flex items-start justify-between">

              <div className="space-y-2">

                <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Store size={18} />
                  {s.name}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User size={15} />
                  {s.owner}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Star size={15} />
                  {s.rating ? `${s.rating} Rating` : "No rating yet"}
                </div>

              </div>

              {/* Status Badge */}
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusStyle(
                  s.status
                )}`}
              >
                {s.status}
              </span>

            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 my-4"></div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">

              <Button variant="subtle">
                <Eye size={16} className="mr-2" />
                View
              </Button>

              {s.status === "Pending" ? (
                <>
                  <Button>
                    <CheckCircle size={16} className="mr-2" />
                    Approve
                  </Button>

                  <Button variant="danger">
                    <XCircle size={16} className="mr-2" />
                    Reject
                  </Button>
                </>
              ) : (
                <Button variant="ghost">
                  <Ban size={16} className="mr-2" />
                  Suspend
                </Button>
              )}

            </div>

          </Card>
        ))}

      </div>
    </div>
  );
}