import { useState } from "react";
import { usePopStore, type IPop } from "../../store/usePopStore";
import { Plus, Minus, Edit2, Trash2 } from "lucide-react";
import EditPopModal from "./EditPopModal";
import QuantityModal from "./QuantityModal";

interface PopCardProps {
  pop: IPop;
}

const PopCard = ({ pop }: PopCardProps) => {
  const { deletePop } = usePopStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [quantityAction, setQuantityAction] = useState<
    "increment" | "decrement"
  >("increment");

  const handleDelete = async () => {
    if (window.confirm(`Delete "${pop.name}"?`)) {
      await deletePop(pop._id);
    }
  };

  const openQuantityModal = (action: "increment" | "decrement") => {
    setQuantityAction(action);
    setIsQuantityModalOpen(true);
  };

  return (
    <>
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden'>
        {/* Image */}
        <div className='h-48 bg-gray-100 overflow-hidden'>
          <img
            src={pop.profilePic}
            alt={pop.name}
            className='w-full h-full object-cover'
          />
        </div>

        {/* Content */}
        <div className='p-5'>
          <h3 className='text-lg font-bold text-gray-900 mb-2'>{pop.name}</h3>
          <p className='text-sm text-gray-600 mb-4 line-clamp-2'>
            {pop.description}
          </p>

          {/* Quantity */}
          <div className='flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg'>
            <span className='text-sm font-medium text-gray-600'>Quantity:</span>
            <span
              className={`text-2xl font-bold ${
                pop.quantity === 0 ? "text-red-600" : "text-gray-900"
              }`}
            >
              {pop.quantity}
            </span>
          </div>

          {/* Actions */}
          <div className='grid grid-cols-2 gap-2 mb-3'>
            <button
              onClick={() => openQuantityModal("increment")}
              className='flex items-center justify-center gap-2 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm font-medium'
            >
              <Plus size={16} />
              Add
            </button>
            <button
              onClick={() => openQuantityModal("decrement")}
              disabled={pop.quantity === 0}
              className='flex items-center justify-center gap-2 px-3 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Minus size={16} />
              Remove
            </button>
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className='flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium'
            >
              <Edit2 size={16} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className='flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium'
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditPopModal pop={pop} onClose={() => setIsEditModalOpen(false)} />
      )}

      {isQuantityModalOpen && (
        <QuantityModal
          pop={pop}
          action={quantityAction}
          onClose={() => setIsQuantityModalOpen(false)}
        />
      )}
    </>
  );
};

export default PopCard;
