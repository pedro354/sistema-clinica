import { useState } from "react";
import { X } from "lucide-react";
import api, { type Patient } from "../../../services/api";

type PatientFormProps = {
  patient?: Patient
  onClose: () => void;
  onSuccess: () => void;
};
export function PatientForm({ onClose, onSuccess, patient }: PatientFormProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, "").slice(0, 11);
        
        if (numbers.length <= 2) {
            return numbers;
    }

    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
};

  const handlePhoneChange = (value: string) => {
    setPhone(formatPhone(value));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      try {
          setLoading(true);
        if (patient) {
  const data: {
    name?: string;
    email?: string;
    phone?: string;
  } = {};

  if (name.trim() && name.trim() !== patient.name) {
    data.name = name.trim();
  }

  if (email.trim() && email.trim() !== (patient.email ?? "")) {
    data.email = email.trim();
  }

  if (phone && phone !== patient.phone) {
    data.phone = phone;
  }

  if (Object.keys(data).length === 0) {
    onClose();
    return;
  }

  await api.updatePatient(patient.id, data);


        } else {
    
        await api.createPatient(
          name.trim(),
          email.trim(),
          phone,
          1
        );
      }
          
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#19372c]/30 px-5">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#244638]">
              Novo paciente
            </h2>

            <p className="mt-1 text-sm text-[#839087]">
              Cadastre um novo paciente.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#7b8981] hover:bg-[#f3f2eb]"
            aria-label="Fechar formulário"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#315344]"
            >
              Nome
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required={!patient}
              minLength={3}
              className="w-full rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-3 text-sm text-[#315344] outline-none focus:border-[#39735b]"
              placeholder="Nome completo"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-[#315344]"
            >
              Telefone
            </label>

            <input
              id="phone"
              type="tel"
              value={phone}
              
              onChange={(event) => handlePhoneChange(event.target.value)}
              required={!patient}
              className="w-full rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-3 text-sm text-[#315344] outline-none focus:border-[#39735b]"
              placeholder="(21) 99999-9999"
            />
            
          </div>
        <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#315344]"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              required={!patient}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-[#e5e5dd] bg-[#fffdf8] px-4 py-3 text-sm text-[#315344] outline-none focus:border-[#39735b]"
              placeholder="E-mail"
            />
            
        </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-[#60766b] hover:bg-[#f3f2eb]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#39735b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2e604b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Salvando..." : "Salvar paciente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}