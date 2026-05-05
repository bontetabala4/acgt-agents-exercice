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
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Charger depuis localStorage
  useEffect(() => {
    const savedAgents = localStorage.getItem("agents");

    if (savedAgents) {
      const parsed = JSON.parse(savedAgents);
      setAgents(parsed);
      setFilteredAgents(parsed);
    }

    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Sauvegarder automatiquement
  useEffect(() => {
    localStorage.setItem("agents", JSON.stringify(agents));
    setFilteredAgents(agents);
  }, [agents]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !service.trim() || !role.trim()) {
      setError("Tous les champs sont obligatoires");
      setSuccess("");
      return;
    }

    const newAgent: Agent = {
      id: Date.now(),
      name,
      service,
      role,
    };

    setAgents([newAgent, ...agents]);

    setSuccess("Agent ajouté avec succès");
    setError("");

    setName("");
    setService("");
    setRole("");
  };

  const handleDelete = (id: number) => {
    setAgents(agents.filter((agent) => agent.id !== id));
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setFilteredAgents(agents);
      return;
    }

    const result = agents.filter((agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.service.toLowerCase().includes(search.toLowerCase()) ||
      agent.role.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredAgents(result);
  };

  const handleResetSearch = () => {
    setSearch("");
    setFilteredAgents(agents);
  };

 if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">

        <div className="absolute w-40 h-40 border-4 border-sky-400 border-t-transparent rounded-full animate-spin duration-2000"></div>
        <div className="absolute w-28 h-28 border-4 border-yellow-400 border-b-transparent rounded-full animate-spin duration-2000 [animation-direction:reverse]"></div>

        <img
          src="/images/acgt-symbol.png"
          alt="ACGT"
          className="w-full h-full object-contain"
        />
      </div>

      <p className="absolute bottom-20 text-sm text-blue-900 font-semibold">
        Chargement de la plateforme...
      </p>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <section className="max-w-5xl mx-auto bg-white min-h-[90vh] shadow-lg border-t-[14px] border-sky-500">
        <header className="px-8 pt-8">
          <div className="flex items-center justify-between">
            <img src="/images/acgt-logo.png" className="w-36" />

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
          </div>
        </header>

        {/* BODY */}
        <section className="px-8 py-10 grid md:grid-cols-2 gap-8">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50 border rounded-xl p-6 space-y-4 transition hover:shadow-lg"
          >
            <h2 className="text-lg font-bold text-blue-950">
              Ajouter un agent
            </h2>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              placeholder="Service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              placeholder="Fonction"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />

            <button className="w-full bg-blue-900 text-white py-3 rounded-lg">
              Ajouter
            </button>
          </form>

          {/* LIST */}
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">Liste des agents</h2>
              <span>Total : {agents.length}</span>
            </div>

            {/* SEARCH */}
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="bg-blue-900 text-white px-4 rounded"
              >
                Rechercher
              </button>

              <button
                type="button"
                onClick={handleResetSearch}
                className="bg-gray-200 px-4 rounded"
              >
                Reset
              </button>
            </div>

            {/* LIST ITEMS */}
            {filteredAgents.length === 0 ? (
              <p>Aucun agent trouvé</p>
            ) : (
              filteredAgents.map((agent) => (
                <div key={agent.id} className="border p-3 mb-2 rounded">
                  <p className="font-bold">{agent.name}</p>
                  <p className="text-sm">
                    {agent.service} - {agent.role}
                  </p>

                  <button
                    onClick={() => handleDelete(agent.id)}
                    className="text-red-600 text-sm mt-2"
                  >
                    Supprimer
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-8 pb-6 mt-8">
  <div className="flex h-1.5 w-full">
    <div className="flex-1 bg-sky-500"></div>
    <div className="flex-1 bg-yellow-400"></div>
    <div className="flex-1 bg-red-600"></div>
  </div>

  <div className="pt-3 flex justify-between text-xs text-slate-500">
    <span>© ACGT — Agence Congolaise des Grands Travaux: Mai 2026</span>
    <span>Exercice de stage</span>
  </div>
</footer>
      </section>
    </main>
  );
}

export default App;


