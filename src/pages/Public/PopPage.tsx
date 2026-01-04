import { useEffect, useState } from "react";
import { usePopStore, type IPop } from "../../store/usePopStore";
import {
  Package,
  Plus,
  Loader2,
  Edit2,
  Trash2,
  TrendingUp,
  TrendingDown,
  FileSpreadsheet,
} from "lucide-react";
import CreatePopModal from "../../components/pop/CreatePopModal";
import EditPopModal from "../../components/pop/EditPopModal";
import QuantityModal from "../../components/pop/QuantityModal";

const PopsPage = () => {
  const { pops, isLoading, fetchPops, deletePop, exportExcel } = usePopStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPop, setEditingPop] = useState<IPop | null>(null);
  const [quantityModal, setQuantityModal] = useState<{
    pop: IPop;
    action: "increment" | "decrement";
  } | null>(null);

  useEffect(() => {
    fetchPops();
  }, [fetchPops]);

  const handleDelete = async (pop: IPop) => {
    if (window.confirm(`Delete "${pop.name}"? This action cannot be undone.`)) {
      await deletePop(pop._id);
    }
  };

  const totalQuantity = pops.reduce((sum, pop) => sum + pop.quantity, 0);
  const lowStockCount = pops.filter((pop) => pop.quantity < 10).length;

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
                <div className='p-2 bg-[#A50034]/10 rounded-lg'>
                  <Package className='text-[#A50034]' size={28} />
                </div>
                POP Materials
              </h1>
              <p className='text-sm text-gray-600 mt-2'>
                Manage your point-of-purchase materials inventory
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              {/* Stats */}
              <div className='flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm'>
                <div className='p-2 bg-white rounded-lg'>
                  <Package size={20} className='text-gray-700' />
                </div>
                <div>
                  <p className='text-xs text-gray-500 font-medium'>
                    Total Items
                  </p>
                  <p className='text-2xl font-bold text-gray-900'>
                    {pops.length}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm'>
                <div className='p-2 bg-white rounded-lg'>
                  <TrendingUp size={20} className='text-blue-600' />
                </div>
                <div>
                  <p className='text-xs text-blue-700 font-medium'>
                    Total Stock
                  </p>
                  <p className='text-2xl font-bold text-blue-700'>
                    {totalQuantity}
                  </p>
                </div>
              </div>

              {lowStockCount > 0 && (
                <div className='flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 shadow-sm'>
                  <div className='p-2 bg-white rounded-lg'>
                    <TrendingDown size={20} className='text-amber-600' />
                  </div>
                  <div>
                    <p className='text-xs text-amber-700 font-medium'>
                      Low Stock
                    </p>
                    <p className='text-2xl font-bold text-amber-700'>
                      {lowStockCount}
                    </p>
                  </div>
                </div>
              )}

              {/* Export Button */}
              <button
                onClick={exportExcel}
                disabled={pops.length === 0}
                className='flex items-center gap-2 px-4 py-2.5 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-all shadow-sm text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <FileSpreadsheet size={18} />
                Export Excel
              </button>

              {/* Add New POP Button */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className='flex items-center gap-2 px-5 py-3 bg-[#A50034] text-white rounded-xl hover:bg-[#8a0029] transition-colors shadow-sm font-medium'
              >
                <Plus size={20} />
                Add New POP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {isLoading ? (
          <div className='flex items-center justify-center py-20'>
            <Loader2 className='animate-spin text-[#A50034]' size={40} />
          </div>
        ) : pops.length === 0 ? (
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 py-20'>
            <div className='text-center'>
              <div className='w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Package className='text-gray-400' size={40} />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>
                No POP materials yet
              </h3>
              <p className='text-gray-500 mb-6'>
                Start by adding your first POP material
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className='inline-flex items-center gap-2 px-5 py-3 bg-[#A50034] text-white rounded-xl hover:bg-[#8a0029] transition-colors'
              >
                <Plus size={20} />
                Add POP Material
              </button>
            </div>
          </div>
        ) : (
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
            {/* Desktop Table */}
            <div className='hidden md:block overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50 border-b border-gray-200'>
                  <tr>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                      Image
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                      Name
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                      Description
                    </th>
                    <th className='px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                      Quantity
                    </th>
                    <th className='px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                  {pops.map((pop) => (
                    <tr
                      key={pop._id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      {/* Image */}
                      <td className='px-6 py-4'>
                        <div className='w-16 h-16 rounded-lg overflow-hidden bg-gray-100'>
                          <img
                            src={pop.profilePic}
                            alt={pop.name}
                            className='w-full h-full object-cover'
                          />
                        </div>
                      </td>

                      {/* Name */}
                      <td className='px-6 py-4'>
                        <div className='font-semibold text-gray-900'>
                          {pop.name}
                        </div>
                      </td>

                      {/* Description */}
                      <td className='px-6 py-4'>
                        <div className='text-sm text-gray-600 max-w-xs line-clamp-2'>
                          {pop.description}
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className='px-6 py-4'>
                        <div className='flex items-center justify-center gap-2'>
                          <span
                            className={`text-2xl font-bold ${
                              pop.quantity === 0
                                ? "text-red-600"
                                : pop.quantity < 10
                                ? "text-amber-600"
                                : "text-gray-900"
                            }`}
                          >
                            {pop.quantity}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className='px-6 py-4'>
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            onClick={() =>
                              setQuantityModal({ pop, action: "increment" })
                            }
                            className='p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors'
                            title='Add quantity'
                          >
                            <Plus size={18} />
                          </button>
                          <button
                            onClick={() =>
                              setQuantityModal({ pop, action: "decrement" })
                            }
                            disabled={pop.quantity === 0}
                            className='p-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                            title='Remove quantity'
                          >
                            <TrendingDown size={18} />
                          </button>
                          <button
                            onClick={() => setEditingPop(pop)}
                            className='p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors'
                            title='Edit'
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(pop)}
                            className='p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors'
                            title='Delete'
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className='md:hidden divide-y divide-gray-100'>
              {pops.map((pop) => (
                <div key={pop._id} className='p-4'>
                  <div className='flex gap-4'>
                    <div className='w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0'>
                      <img
                        src={pop.profilePic}
                        alt={pop.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-bold text-gray-900 mb-1'>
                        {pop.name}
                      </h3>
                      <p className='text-sm text-gray-600 line-clamp-2 mb-2'>
                        {pop.description}
                      </p>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-gray-500'>Quantity:</span>
                        <span
                          className={`text-lg font-bold ${
                            pop.quantity === 0
                              ? "text-red-600"
                              : pop.quantity < 10
                              ? "text-amber-600"
                              : "text-gray-900"
                          }`}
                        >
                          {pop.quantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='grid grid-cols-4 gap-2 mt-4'>
                    <button
                      onClick={() =>
                        setQuantityModal({ pop, action: "increment" })
                      }
                      className='p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors flex items-center justify-center'
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={() =>
                        setQuantityModal({ pop, action: "decrement" })
                      }
                      disabled={pop.quantity === 0}
                      className='p-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                    >
                      <TrendingDown size={18} />
                    </button>
                    <button
                      onClick={() => setEditingPop(pop)}
                      className='p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center'
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(pop)}
                      className='p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center'
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <CreatePopModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {editingPop && (
        <EditPopModal pop={editingPop} onClose={() => setEditingPop(null)} />
      )}

      {quantityModal && (
        <QuantityModal
          pop={quantityModal.pop}
          action={quantityModal.action}
          onClose={() => setQuantityModal(null)}
        />
      )}
    </div>
  );
};

export default PopsPage;
