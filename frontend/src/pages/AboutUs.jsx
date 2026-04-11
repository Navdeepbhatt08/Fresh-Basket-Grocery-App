export default function AboutUs() {
    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-lg">
                <div className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-3">About Us</div>
                <h1 className="text-3xl font-extrabold text-slate-950">FreshBasket is your trusted grocery marketplace.</h1>
                <p className="mt-4 text-slate-700 leading-7">
                    FreshBasket brings together local shops, farmer markets, and online grocers so you can order fresh produce,
                    daily essentials, and household goods in one place. We curate trusted stores, deliver quickly, and keep
                    pricing transparent.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
                    <p className="mt-3 text-slate-600">Make fresh groceries easy to discover, order, and receive with smile-worthy delivery.</p>
                </div>
                <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900">What We Do</h2>
                    <p className="mt-3 text-slate-600">Connect buyers with local stores, enable fast checkout, and support small businesses.</p>
                </div>
                <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900">Why Choose Us</h2>
                    <p className="mt-3 text-slate-600">We prioritize quality, convenience, and friendly service from store to doorstep.</p>
                </div>
            </div>
        </div>
    )
}
