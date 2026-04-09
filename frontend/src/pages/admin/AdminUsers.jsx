import { useMemo, useState, useEffect } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"

export default function AdminUsers() {

  const [users, setUsers] = useState([])
  const [q, setQ] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/api/Users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()

    if (!term) return users

    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term)
    )
  }, [q, users])

  return (
    <div className="space-y-4">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="text-sm text-slate-600">Admin</div>

          <h1 className="mt-1 text-2xl font-extrabold text-slate-950 tracking-tight">
            Users
          </h1>

          <p className="mt-2 text-slate-700">
            Search and manage user accounts.
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">

          <div className="w-full sm:w-80">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search users…"
            />
          </div>

          <Button variant="subtle">Invite</Button>

        </div>

      </div>

      <Card className="p-6">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3">Name</th>
                <th className="py-3">Email</th>
                <th className="py-3">Role</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm">

              {filtered.map((u) => (

                <tr key={u.id} className="border-t border-slate-200/70">

                  <td className="py-4 text-slate-950 font-extrabold">
                    {u.name}
                  </td>

                  <td className="py-4 text-slate-700">
                    {u.email}
                  </td>

                  <td className="py-4 text-slate-800">
                    {u.role}
                  </td>

                  <td className="py-4 text-right">

                    <div className="inline-flex gap-2">

                      <Button size="sm" variant="subtle">
                        View
                      </Button>

                      <Button size="sm" variant="ghost">
                        Disable
                      </Button>

                    </div>

                  </td>

                </tr>

              ))}

              {filtered.length === 0 && (

                <tr>
                  <td className="py-6 text-slate-600" colSpan={4}>
                    No users matched.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </Card>

    </div>
  )
}