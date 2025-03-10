import React from "react";
import Header from "./Header";
import TransferTabs from "./TransferTabs";
import { Card } from "./ui/card";

interface HomeProps {
  defaultTab?: string;
}

const Home = ({ defaultTab = "schedule" }: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto py-8 px-4">
        <Card className="w-full bg-white shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            Welcome to Financial Transfer System
          </h2>
          <p className="text-gray-600">
            Easily schedule transfers between accounts and manage your financial
            transactions. Use the tabs below to schedule a new transfer or view
            your transfer history.
          </p>
        </Card>

        <div className="my-6">
          <TransferTabs defaultTab={defaultTab} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white shadow-md p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Quick Tips
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                  1
                </span>
                <span>
                  Enter 10-digit account numbers for both origin and destination
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                  2
                </span>
                <span>
                  Transfer fees are calculated based on the selected date
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                  3
                </span>
                <span>Weekend transfers over $1,000 are not supported</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-white shadow-md p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="border-b pb-2">
                <p className="text-sm text-gray-500">Today</p>
                <p className="font-medium">Transfer to account 0987654321</p>
                <p className="text-sm text-gray-600">$750.00</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm text-gray-500">Yesterday</p>
                <p className="font-medium">Transfer to account 1234567890</p>
                <p className="text-sm text-gray-600">$1,200.00</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">June 15, 2023</p>
                <p className="font-medium">Transfer to account 5678901234</p>
                <p className="text-sm text-gray-600">$500.00</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white shadow-md p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              If you have any questions or need assistance with your transfers,
              our support team is here to help.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-800"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className="text-gray-700">Call us: (800) 123-4567</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-800"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700">
                  Email: support@financialtransfer.com
                </span>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                &copy; 2023 Financial Transfer System. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-blue-200 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-blue-200 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-blue-200 hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
