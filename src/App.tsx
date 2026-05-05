import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour ajouter un agent

    if (!name || !service || !role) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    console.log ({ name, service, role });
    // Réinitialiser les champs du formulaire
    setName("");
    setService("");
    setRole("");
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestion des agents</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Nom de l'agent"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Service de l'agent"
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Fonction de l'agent"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2 rounded"
          />
          
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter l'agent
        </button>
      </form>
    </main>
  );
}

export default App;



