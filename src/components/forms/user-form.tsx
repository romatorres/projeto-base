import { useState } from "react";
import { toast } from "sonner";

type UserFormData = {
  name: string;
  email: string;
  password: string;
  role?: string;
};

type UserFormProps = {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => Promise<void>;
  submitLabel: string;
  submitLoadingLabel: string;
  showRoleField?: boolean;
  passwordRequired?: boolean;
  passwordLabel?: string;
  showCancelButton?: boolean;
  onCancel?: () => void;
};

export function UserForm({
  initialData = {},
  onSubmit,
  submitLabel,
  submitLoadingLabel,
  showRoleField = false,
  passwordRequired = true,
  passwordLabel = "Senha",
  showCancelButton = false,
  onCancel,
}: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: initialData.name || "",
    email: initialData.email || "",
    password: initialData.password || "",
    role: initialData.role || "USER",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Ocorreu um erro ao processar o formulário");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {passwordLabel}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={passwordRequired}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {showRoleField && (
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Função
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USER">Usuário</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>
      )}

      <div className="flex justify-end">
        {showCancelButton && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? submitLoadingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}