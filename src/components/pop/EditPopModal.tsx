import { X } from "lucide-react";
import { usePopStore, type IPop } from "../../store/usePopStore";
import PopForm from "./PopForm";

interface EditPopModalProps {
  pop: IPop;
  onClose: () => void;
}

const EditPopModal = ({ pop, onClose }: EditPopModalProps) => {
  const { updatePop } = usePopStore();

  const handleSubmit = async (data: {
    name: string;
    description: string;
    profilePic: string;
    quantity: number;
  }) => {
    await updatePop(pop._id, data);
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl shadow-xl max-w-md w-full'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-bold text-gray-900'>Edit POP</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        <PopForm
          mode='edit'
          initialData={pop}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default EditPopModal;
