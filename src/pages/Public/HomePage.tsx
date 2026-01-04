import {
  Users,
  BarChart3,
  ShoppingBag,
  TrendingUp,
  Package,
  MapPin,
} from "lucide-react";

const stats = [
  {
    label: "Active Promoters",
    value: "142",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "Today's Sales",
    value: "₩8.4M",
    change: "+18%",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "Store Visits",
    value: "89",
    change: "+5%",
    icon: MapPin,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    label: "Products Tracked",
    value: "1,247",
    change: "+3%",
    icon: Package,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const quickLinks = [
  {
    title: "Merchandising",
    description: "Manage store visits, planograms and facing reports.",
    icon: ShoppingBag,
    path: "/",
    color: "from-rose-500 to-red-600",
  },
  {
    title: "Promoters",
    description: "Track promoter activities and daily performance.",
    icon: Users,
    path: "/promoters",
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Sales Overview",
    description: "Monitor sell-out, KPIs and campaign performance.",
    icon: BarChart3,
    path: "/",
    color: "from-sky-500 to-blue-600",
  },
];

const HomePage = () => {
  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Welcome back! 👋
        </h1>
        <p className='text-gray-600'>
          Here's what's happening with your sales operations today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className='bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow'
            >
              <div className='flex items-center justify-between mb-4'>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={stat.color} size={24} />
                </div>
                <span className='text-sm font-semibold text-green-600'>
                  {stat.change}
                </span>
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-1'>
                {stat.value}
              </h3>
              <p className='text-sm text-gray-600'>{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {quickLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.path}
              className='group relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden'
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${link.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}
              />
              <div className='relative z-10'>
                <div className='mb-4'>
                  <Icon className='text-gray-700' size={32} />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  {link.title}
                </h3>
                <p className='text-sm text-gray-600'>{link.description}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h2 className='text-xl font-bold text-gray-900 mb-4'>
          Recent Activity
        </h2>
        <div className='space-y-4'>
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'
            >
              <div className='w-2 h-2 bg-[#A50034] rounded-full' />
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-900'>
                  Store visit completed at East Point
                </p>
                <p className='text-xs text-gray-500'>2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
