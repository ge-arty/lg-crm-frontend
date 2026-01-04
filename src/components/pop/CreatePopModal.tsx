import { X } from "lucide-react";
import { usePopStore } from "../../store/usePopStore";
import PopForm from "./PopForm";

interface CreatePopModalProps {
  onClose: () => void;
}

const CreatePopModal = ({ onClose }: CreatePopModalProps) => {
  const { createPop } = usePopStore();

  const handleSubmit = async (data: {
    name: string;
    description: string;
    profilePic: string;
    quantity: number;
  }) => {
    await createPop(data);
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl shadow-xl max-w-md w-full'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-bold text-gray-900'>Add New POP</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        <PopForm mode='create' onSubmit={handleSubmit} onCancel={onClose} />
      </div>
    </div>
  );
};

export default CreatePopModal;
