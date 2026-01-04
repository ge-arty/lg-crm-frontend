// pages/PromotersPage.tsx
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Calendar, Users, UserCheck } from "lucide-react";
import { PromoterAvatar } from "../../components/promoter/PromoterAvatar";

const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PromotersPage = () => {
  const { promoters, fetchPromoters } = useAuthStore();

  useEffect(() => {
    fetchPromoters();
  }, [fetchPromoters]);

  const todayIndex = new Date().getDay();
  const todayName = DAYS[todayIndex];

  const isWorking = (daysOff: string[] = [], day: string) => {
    return !daysOff.includes(day);
  };

  const workingToday = promoters.filter((p) =>
    isWorking(p.daysOff, todayName)
  ).length;

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
                <div className='p-2 bg-[#A50034]/10 rounded-lg'>
                  <Calendar className='text-[#A50034]' size={28} />
                </div>
                Promoters Schedule
              </h1>
              <p className='text-sm text-gray-600 mt-2'>
                Manage your team's weekly schedule and availability
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              <div className='flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm'>
                <div className='p-2 bg-white rounded-lg'>
                  <Users size={20} className='text-gray-700' />
                </div>
                <div>
                  <p className='text-xs text-gray-500 font-medium'>
                    Total Promoters
                  </p>
                  <p className='text-2xl font-bold text-gray-900'>
                    {promoters.length}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm'>
                <div className='relative'>
                  <div className='p-2 bg-white rounded-lg'>
                    <UserCheck size={20} className='text-green-600' />
                  </div>
                  <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white'></div>
                </div>
                <div>
                  <p className='text-xs text-green-700 font-medium'>
                    Working Today
                  </p>
                  <p className='text-2xl font-bold text-green-700'>
                    {workingToday}
                  </p>
                </div>
              </div>

              <div className='hidden sm:flex items-center gap-2 px-4 py-3 bg-[#A50034] rounded-xl shadow-sm'>
                <Calendar size={18} className='text-white' />
                <span className='text-sm font-bold text-white'>
                  {DAY_LABELS[todayIndex]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {promoters.length === 0 ? (
          // Empty State
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 py-20'>
            <div className='text-center'>
              <div className='w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Users className='text-gray-400' size={40} />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>
                No promoters yet
              </h3>
              <p className='text-gray-500'>
                Add promoters to see their schedule here
              </p>
            </div>
          </div>
        ) : (
          <div className='grid gap-4'>
            {promoters.map((promoter) => {
              const workingToday = isWorking(promoter.daysOff, todayName);

              return (
                <div
                  key={promoter._id}
                  className='bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden'
                >
                  <div className='p-5'>
                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
                      {/* Left: Promoter Info */}
                      <div className='flex items-center gap-3 min-w-[250px]'>
                        <PromoterAvatar
                          firstName={promoter.firstName}
                          lastName={promoter.lastName}
                          profilePic={promoter.profilePic}
                        />
                        <div>
                          <h3 className='text-lg font-bold text-gray-900'>
                            {promoter.firstName + " " + promoter.lastName ||
                              "Unnamed Promoter"}
                          </h3>
                          <div className='flex items-center gap-2 mt-1'>
                            <div
                              className={`w-2 h-2 rounded-full ${
                                workingToday ? "bg-emerald-500" : "bg-rose-500"
                              }`}
                            ></div>
                            <span
                              className={`text-xs font-medium ${
                                workingToday
                                  ? "text-emerald-700"
                                  : "text-rose-700"
                              }`}
                            >
                              {workingToday ? "Working Today" : "Day Off Today"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Week Schedule */}
                      <div className='flex items-center justify-center lg:justify-end gap-3 flex-1'>
                        {DAYS.map((day, index) => {
                          const working = isWorking(promoter.daysOff, day);
                          const isToday = index === todayIndex;

                          return (
                            <div
                              key={day}
                              className='flex flex-col items-center gap-2'
                            >
                              <span className='text-xs font-medium text-gray-600'>
                                {DAY_LABELS[index]}
                              </span>
                              <div
                                className={`
                                  relative w-10 h-10 rounded-full flex items-center justify-center
                                  transition-all duration-200 cursor-default
                                  ${
                                    working
                                      ? "bg-emerald-100 hover:bg-emerald-200 border-2 border-emerald-300"
                                      : "bg-rose-100 hover:bg-rose-200 border-2 border-rose-300"
                                  }
                                  ${
                                    isToday
                                      ? "ring-3 ring-[#A50034] ring-offset-2 scale-110"
                                      : ""
                                  }
                                `}
                              >
                                <span
                                  className={`text-xs font-bold ${
                                    working
                                      ? "text-emerald-700"
                                      : "text-rose-700"
                                  }`}
                                >
                                  {working ? "✓" : "✕"}
                                </span>
                                {isToday && (
                                  <div className='absolute -top-1 -right-1 w-3 h-3 bg-[#A50034] rounded-full border-2 border-white'></div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotersPage;
