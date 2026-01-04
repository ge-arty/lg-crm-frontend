import { useState } from "react";
import { usePopStore, type IPop } from "../../store/usePopStore";
import { X, Plus, Minus } from "lucide-react";

interface QuantityModalProps {
  pop: IPop;
  action: "increment" | "decrement";
  onClose: () => void;
}

const QuantityModal = ({ pop, action, onClose }: QuantityModalProps) => {
  const { incrementQuantity, decrementQuantity } = usePopStore();
  const [amount, setAmount] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (action === "increment") {
      await incrementQuantity(pop._id, amount);
    } else {
      await decrementQuantity(pop._id, amount);
    }
    onClose();
  };

  const isIncrement = action === "increment";

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl shadow-xl max-w-sm w-full'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
            {isIncrement ? (
              <>
                <Plus size={20} className='text-emerald-600' />
                Add Quantity
              </>
            ) : (
              <>
                <Minus size={20} className='text-rose-600' />
                Remove Quantity
              </>
            )}
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          <div className='p-4 bg-gray-50 rounded-lg'>
            <p className='text-sm text-gray-600 mb-1'>POP Material</p>
            <p className='font-bold text-gray-900'>{pop.name}</p>
            <p className='text-sm text-gray-600 mt-2'>
              Current quantity:{" "}
              <span className='font-semibold'>{pop.quantity}</span>
            </p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Amount
            </label>
            <input
              type='number'
              min='1'
              max={!isIncrement ? pop.quantity : undefined}
              required
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value || "0", 10))}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A50034] focus:border-transparent text-gray-900'
            />
          </div>

          <div className='flex gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
            >
              Cancel
            </button>
            <button
              type='submit'
              className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors font-medium ${
                isIncrement
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-rose-600 hover:bg-rose-700"
              }`}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuantityModal;
