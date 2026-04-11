export default function ContactUs() {
    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-lg">
                <div className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-3">Contact Us</div>
                <h1 className="text-3xl font-extrabold text-slate-950">We’re happy to help.</h1>
                <p className="mt-4 text-slate-700 leading-7">
                    Have questions about your order, delivery, or store listings? Our support team is available to assist you
                    with fast and friendly service.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900">Customer Support</h2>
                    <p className="mt-3 text-slate-600">support@freshbasket.app</p>
                    <p className="mt-1 text-slate-600">Mon–Fri, 9am–6pm</p>
                </div>
                <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900">Call Us</h2>
                    <p className="mt-3 text-slate-600">+91 98765 43210</p>
                    <p className="mt-1 text-slate-600">Live phone support available daily.</p>
                </div>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">Address</h2>
                <p className="mt-3 text-slate-600">123 FreshLane, Market District, Rishikesh, India</p>
            </div>
        </div>
    )
}
