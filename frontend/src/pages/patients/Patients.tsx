import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import api, { type Patient } from "../../services/api";
import { PatientForm } from "./components/PatientForm";

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);


const loadPatients = async () => {
  try {
    const data = await api.getPatients(1);
    setPatients(data);
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
  }
};

const handleDelete = async (patient: Patient) => {
  const confirmed = window.confirm(
    `Deseja realmente excluir o paciente ${patient.name}?`
  );

  if (!confirmed) return;

  try {
    await api.deletePatient(patient.id);
    await loadPatients();
  } catch (error) {
    console.error("Erro ao excluir paciente:", error);
  }
};
useEffect(() => {
    api.getPatients(1).then((data) => {
      setPatients(data);
    })
    .catch((error) => {
      console.error("Erro ao buscar pacientes:", error);
    });
}, [])

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-[#f1e8d3] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-360]">

        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-[#7b8981]">
              Gestão de pacientes
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#244638]">
              Pacientes
            </h1>

            <p className="mt-2 text-sm text-[#839087]">
              Gerencie os pacientes cadastrados na clínica.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            aria-label="Novo paciente"
            className="flex w-fit items-center gap-2 rounded-xl bg-[#39735b] px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(57,115,91,0.18)] transition-colors hover:bg-[#2e604b]"
          >
            <Plus size={17} />
            Novo paciente
            
          </button>
        </section>

        <section className="mt-8 rounded-2xl border border-[#ebe9e1] bg-white shadow-[0_4px_18px_rgba(50,74,61,0.04)]">

          <div className="border-b border-[#ebe9e1] p-5 sm:p-6">
            <div className="relative max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa49e]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar paciente..."
                className="w-full rounded-xl border border-[#e5e5dd] bg-[#fffdf8] py-2.5 pl-10 pr-4 text-sm text-[#315344] outline-none transition-colors placeholder:text-[#a0aaa4] focus:border-[#39735b]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-162.5">
              <thead>
                <tr className="border-b border-[#ebe9e1] text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
                    Paciente
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
                    Telefone
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
                    E-mail
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.08em] text-[#8a968f]">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-[#f0eee8] last:border-b-0 hover:bg-[#fffdf8]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dceee5] text-xs font-semibold text-[#47705d]">
                          {patient.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}
                        </span>

                        <span className="text-sm font-semibold text-[#315344]">
                          {patient.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-[#60766b]">
                      {patient.phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") }
                    </td>

                    <td className="px-6 py-4 text-sm text-[#60766b]">
                      {patient.email || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          aria-label={`Editar paciente ${patient.name}`}
                          className="rounded-lg p-2 text-[#7b8981] transition-colors hover:bg-[#e0f0e8] hover:text-[#39735b]"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          aria-label={`Excluir paciente ${patient.name}`}
                          className="rounded-lg p-2 text-[#7b8981] transition-colors hover:bg-[#f4e6e6] hover:text-[#a63838]"
                            onClick={() => handleDelete(patient)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPatients.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-sm font-medium text-[#60766b]">
                  Nenhum paciente encontrado.
                </p>

                <p className="mt-1 text-xs text-[#929d96]">
                  Tente buscar por outro nome.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
      {showForm && (
    <PatientForm
      onClose={() => setShowForm(false)}
      onSuccess={loadPatients}
      />
      )}
      {selectedPatient && (
    <PatientForm
      patient={selectedPatient}
      onClose={() => setSelectedPatient(null)}
      onSuccess={loadPatients}
    />
  )}
    </div>
  
);
}