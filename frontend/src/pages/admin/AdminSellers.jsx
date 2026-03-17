import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"

const demoSellers = [
  { id: "s_1", name: "GreenMart", owner: "Aman", status: "Active", rating: 4.6 },
  { id: "s_2", name: "Dairy & More", owner: "Mehak", status: "Active", rating: 4.4 },
  { id: "s_3", name: "QuickGrocer", owner: "Rohit", status: "Pending", rating: 0 }
]

export default function AdminSellers() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-slate-400">Admin</div>
        <h1 className="mt-1 text-2xl font-semibold text-white tracking-tight">
          Sellers
        </h1>
        <p className="mt-2 text-slate-300">
          Approvals and seller management (demo).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {demoSellers.map((s) => (
          <Card key={s.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-white font-semibold">{s.name}</div>
                <div className="mt-1 text-sm text-slate-400">Owner: {s.owner}</div>
                <div className="mt-1 text-sm text-slate-400">
                  Rating: {s.rating ? `⭐ ${s.rating}` : "—"}
                </div>
              </div>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                {s.status}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="subtle">View</Button>
              {s.status === "Pending" ? (
                <>
                  <Button>Approve</Button>
                  <Button variant="danger">Reject</Button>
                </>
              ) : (
                <Button variant="ghost">Suspend</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

