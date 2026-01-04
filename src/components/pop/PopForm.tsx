import { useState, useEffect } from "react";
import { type IPop } from "../../store/usePopStore";

interface PopFormValues {
  name: string;
  description: string;
  profilePic: string;
  quantity: number;
}

interface PopFormProps {
  mode: "create" | "edit";
  initialData?: IPop;
  onSubmit: (data: PopFormValues) => Promise<void> | void;
  onCancel: () => void;
}

const PopForm = ({ mode, initialData, onSubmit, onCancel }: PopFormProps) => {
  const [formData, setFormData] = useState<PopFormValues>({
    name: "",
    description: "",
    profilePic: "",
    quantity: 0,
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        profilePic: initialData.profilePic,
        quantity: initialData.quantity,
      });
      setImagePreview(initialData.profilePic);
    }
  }, [initialData]);

  const handleChange =
    (field: keyof PopFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "quantity"
          ? parseInt(e.target.value || "0", 10)
          : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setFormData((prev) => ({ ...prev, profilePic: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.profilePic) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitLabel = mode === "create" ? "Create" : "Save";

  return (
    <form onSubmit={handleSubmit} className='p-6 space-y-4'>
      {/* Name */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Name
        </label>
        <input
          type='text'
          required
          value={formData.name}
          onChange={handleChange("name")}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A50034] focus:border-transparent text-gray-900'
        />
      </div>

      {/* Description */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Description
        </label>
        <textarea
          required
          rows={3}
          value={formData.description}
          onChange={handleChange("description")}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A50034] focus:border-transparent text-gray-900'
        />
      </div>

      {/* Image upload */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Image
        </label>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#A50034] file:text-white hover:file:bg-[#8a0029]'
        />
        {imagePreview && (
          <div className='mt-3'>
            <p className='text-xs text-gray-500 mb-1'>Preview:</p>
            <img
              src={imagePreview}
              alt='Preview'
              className='w-full h-40 object-cover rounded-lg border border-gray-200'
            />
          </div>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Quantity
        </label>
        <input
          type='number'
          min='0'
          required
          value={formData.quantity}
          onChange={handleChange("quantity")}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A50034] focus:border-transparent text-gray-900'
        />
      </div>

      {/* Buttons */}
      <div className='flex gap-3 pt-4'>
        <button
          type='button'
          onClick={onCancel}
          className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='flex-1 px-4 py-2 bg-[#A50034] text-white rounded-lg hover:bg-[#8a0029] transition-colors font-medium disabled:opacity-60'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PopForm;
