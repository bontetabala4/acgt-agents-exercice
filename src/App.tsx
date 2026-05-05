import { useEffect, useState } from "react";
import './App.css'

type Agent = {
  id: number;
  name: string;
  service: string;
  role: string;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [role, setRole] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !service.trim() || !role.trim()) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    const newAgent: Agent = {
      id: Date.now(),
      name,
      service,
      role,
    };

    setAgents([newAgent, ...agents]);
    setName("");
    setService("");
    setRole("");
    setError("");
  };

  const handleDelete = (id: number) => {
    setAgents(agents.filter((agent) => agent.id !== id));
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <img
            src="/images/acgt-symbol.png"
            alt="ACGT"
            className="w-24 h-24 mx-auto animate-pulse"
          />
          <p className="mt-4 text-sm font-semibold text-blue-900">
            Chargement de la plateforme...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <section className="max-w-5xl mx-auto bg-white min-h-[90vh] shadow-lg border-t-[14px] border-sky-500">
        <header className="px-8 pt-8">
          <div className="flex items-center justify-between">
            <img src="/images/acgt-logo.png" alt="Logo ACGT" className="w-36" />

            <div className="text-right text-xs text-slate-500">
              <p>Agence Congolaise des Grands Travaux</p>
              <p>Plateforme interne</p>
            </div>
          </div>

          <div className="mt-6 border-t-4 border-blue-900" />

          <div className="text-center mt-8">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-950 uppercase">
              Gestion des agents
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Formulaire, validation et affichage dynamique
            </p>
          </div>
        </header>

        <section className="px-8 py-10 grid md:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50 border rounded-xl p-6 space-y-4 transition hover:shadow-lg"
          >
            <h2 className="text-lg font-bold text-blue-950">
              Ajouter un agent
            </h2>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-800"
            />

            <input
              type="text"
              placeholder="Service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-800"
            />

            <input
              type="text"
              placeholder="Fonction"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-800"
            />

            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-950 text-white font-semibold py-3 rounded-lg transition"
            >
              Ajouter
            </button>
          </form>

          <div className="bg-white border rounded-xl p-6 transition hover:shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-blue-950">
                Liste des agents
              </h2>
              <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">
                Total : {agents.length}
              </span>
            </div>

            {agents.length === 0 ? (
              <p className="text-sm text-slate-500">
                Aucun agent ajouté pour le moment.
              </p>
            ) : (
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="border rounded-lg p-4 bg-slate-50"
                  >
                    <p className="font-bold text-blue-950">{agent.name}</p>
                    <p className="text-sm text-slate-600">
                      {agent.service} — {agent.role}
                    </p>

                    <button
                      onClick={() => handleDelete(agent.id)}
                      className="text-red-600 text-sm mt-2"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="px-8 pb-6 mt-8">
          <div className="border-t-4 border-red-600 pt-3 flex justify-between text-xs text-slate-500">
            <span>© ACGT — Agence Congolaise des Grands Travaux</span>
            <span>Exercice de stage</span>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default App;


