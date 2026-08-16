import { useState } from "react";

function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800">MEDCORE</h1>
      <p className="text-gray-600 mt-2">Your trusted source for medication, delivered.</p>

      {submitted ? (
        <p className="mt-6 text-green-600">Thanks — we'll be in touch!</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="px-3 py-2 rounded-full border border-gray-300 text-sm"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">
            Notify Me
          </button>
        </form>
      )}
    </div>
  );
}

export default Home;