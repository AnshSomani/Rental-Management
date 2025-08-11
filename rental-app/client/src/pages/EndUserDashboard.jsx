import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Bell, ChevronDown, Home, ShoppingCart, Package, FileText, BarChart2, Settings, User } from 'lucide-react';

// Reusable component for statistics cards
const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm transition-transform hover:scale-105 hover:shadow-lg">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);

// Reusable component for data tables
const DataTable = ({ title, columns, data }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((col) => (
              <th key={col.key} className="p-4 text-sm font-semibold text-gray-600 uppercase">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200 last:border-0 hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="p-4 text-gray-700">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-8 text-gray-500">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// Main Application Component
export default function EndUserDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // This hook will fetch data from your backend
  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data from an API
      try {
        // Mock API response after a short delay
        setTimeout(() => {
          const mockData = {
            quotations: '1,250',
            rentals: '890',
            revenue: '4,50,000',
            topProductCategories: [
              { category: 'Electronics', ordered: 150, revenue: '₹85,000' },
              { category: 'Furniture', ordered: 95, revenue: '₹1,20,000' },
              { category: 'Tools', ordered: 210, revenue: '₹45,000' },
            ],
            topProducts: [
              { product: 'Pro Camera Lens', ordered: 75, revenue: '₹33,750' },
              { product: 'Mountain Bike', ordered: 50, revenue: '₹37,500' },
              { product: 'Camping Tent', ordered: 120, revenue: '₹42,000' },
            ],
            topCustomers: [
              { customer: 'Rohan Sharma', ordered: 12, revenue: '₹15,000' },
              { customer: 'Priya Patel', ordered: 8, revenue: '₹12,500' },
              { customer: 'Amit Singh', ordered: 15, revenue: '₹18,000' },
            ],
          };
          setDashboardData(mockData);
          setIsLoading(false);
        }, 1500); // 1.5-second delay to simulate loading
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-800">Loading dashboard...</div>;
  }

  if (isError) {
    return <div className="min-h-screen flex items-center justify-center text-gray-800">Failed to load dashboard data.</div>;
  }

  // Data for the cards, driven by the API response
  const statsData = [
    { title: 'Quotations', value: dashboardData?.quotations || '0' },
    { title: 'Rentals', value: dashboardData?.rentals || '0' },
    { title: 'Revenue', value: `₹${dashboardData?.revenue || '0'}` },
  ];

  // Data for the tables, driven by the API response
  const topProductCategories = dashboardData?.topProductCategories || [];
  const topProducts = dashboardData?.topProducts || [];
  const topCustomers = dashboardData?.topCustomers || [];

  const navItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Rental', icon: ShoppingCart },
    { name: 'Order', icon: FileText },
    { name: 'Products', icon: Package },
    { name: 'Reporting', icon: BarChart2 },
    { name: 'Setting', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                             <p className="text-white font-bold text-xl">A</p>
                         </div>
                         <h1 className="text-xl font-bold text-gray-800">App</h1>
                    </div>
                    <nav className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href="#"
                                onClick={() => setActiveTab(item.name)}
                                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === item.name
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <item.icon className="w-5 h-5 mr-2" />
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative hidden lg:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <Bell className="text-gray-600" />
                    </button>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="text-gray-600"/>
                        </div>
                        <span className="font-semibold text-gray-700 hidden md:block">Adam</span>
                        <ChevronDown className="w-5 h-5 text-gray-500 hidden md:block" />
                    </div>
                </div>
            </div>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">Dashboard</h2>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition">
            Last 30 days
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsData.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DataTable
            title="Top Product Categories"
            columns={[
              { header: 'Category', key: 'category' },
              { header: 'Ordered', key: 'ordered' },
              { header: 'Revenue', key: 'revenue' },
            ]}
            data={topProductCategories}
          />
          <DataTable
            title="Top Products"
            columns={[
              { header: 'Product', key: 'product' },
              { header: 'Ordered', key: 'ordered' },
              { header: 'Revenue', key: 'revenue' },
            ]}
            data={topProducts}
          />
          <div className="lg:col-span-2">
            <DataTable
                title="Top Customers"
                columns={[
                { header: 'Customer', key: 'customer' },
                { header: 'Ordered', key: 'ordered' },
                { header: 'Revenue', key: 'revenue' },
                ]}
                data={topCustomers}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
