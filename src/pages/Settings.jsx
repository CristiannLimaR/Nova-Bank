import React, { useState } from 'react';
import { User, Lock, Bell, Shield, CreditCard, Wallet, HelpCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'limits', label: 'Limits & Fees', icon: Wallet },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Settings</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="rounded-lg bg-gray-900 p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <tab.icon className="mr-3 h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="rounded-lg bg-gray-900 p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="mb-6 text-xl font-semibold text-white">Profile Information</h2>
                <div className="mb-6 flex items-center">
                  <div className="mr-4 h-16 w-16 rounded-full bg-gray-800 overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100"
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-400"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        defaultValue="John"
                        className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-400"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        defaultValue="Doe"
                        className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue="john.doe@example.com"
                      className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      defaultValue="+1 (555) 123-4567"
                      className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-400"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        defaultValue="US"
                        className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white focus:outline-hidden focus:ring-2 focus:ring-primary"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="timezone"
                        className="block text-sm font-medium text-gray-400"
                      >
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        defaultValue="EST"
                        className="mt-1 block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white focus:outline-hidden focus:ring-2 focus:ring-primary"
                      >
                        <option value="EST">Eastern Time (EST)</option>
                        <option value="CST">Central Time (CST)</option>
                        <option value="MST">Mountain Time (MST)</option>
                        <option value="PST">Pacific Time (PST)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="mb-6 text-xl font-semibold text-white">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium text-white">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="block text-sm font-medium text-gray-400"
                        >
                          Current Password
                        </label>
                        <div className="relative mt-1">
                          <input
                            type="password"
                            id="currentPassword"
                            className="block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                          />
                          <button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white">
                            <Lock className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-medium text-gray-400"
                        >
                          New Password
                        </label>
                        <div className="relative mt-1">
                          <input
                            type="password"
                            id="newPassword"
                            className="block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                          />
                          <button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white">
                            <Lock className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-gray-400"
                        >
                          Confirm New Password
                        </label>
                        <div className="relative mt-1">
                          <input
                            type="password"
                            id="confirmPassword"
                            className="block w-full rounded-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary"
                          />
                          <button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white">
                            <Lock className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-6">
                    <h3 className="mb-4 text-lg font-medium text-white">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">
                          Add an extra layer of security to your account
                        </p>
                        <p className="text-xs text-gray-400">
                          We'll send you a code to verify your identity when you sign in.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" className="peer sr-only" />
                          <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-hidden"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-6">
                    <h3 className="mb-4 text-lg font-medium text-white">Login Sessions</h3>
                    <div className="rounded-md bg-gray-800 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Current Session</p>
                          <p className="text-xs text-gray-400">Chrome on Windows • Active now</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          End Session
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="mb-6 text-xl font-semibold text-white">Notification Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium text-white">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Transaction Alerts</p>
                          <p className="text-xs text-gray-400">Get notified about all transactions</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" defaultChecked className="peer sr-only" />
                          <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-hidden"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Security Alerts</p>
                          <p className="text-xs text-gray-400">Get notified about security updates</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" defaultChecked className="peer sr-only" />
                          <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-hidden"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Marketing Emails</p>
                          <p className="text-xs text-gray-400">Receive updates about new features</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" className="peer sr-only" />
                          <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-hidden"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-6">
                    <h3 className="mb-4 text-lg font-medium text-white">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Transaction Updates</p>
                          <p className="text-xs text-gray-400">Get notified about transaction status</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" defaultChecked className="peer sr-only" />
                          <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-hidden"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Security Alerts</p>
                          <p className="text-xs text-gray-400">Get notified about security updates</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" defaultChecked className="peer sr-only" />
                          <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-hidden"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <h2 className="mb-6 text-xl font-semibold text-white">Payment Methods</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium text-white">Saved Cards</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg bg-gray-800 p-4">
                        <div className="flex items-center">
                          <div className="mr-4 h-12 w-12 rounded-md bg-gray-700 flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
                            <p className="text-xs text-gray-400">Expires 12/24</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" leftIcon={<Plus size={16} />}>
                        Add New Card
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-6">
                    <h3 className="mb-4 text-lg font-medium text-white">Default Payment Method</h3>
                    <div className="rounded-md bg-gray-800 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-4 h-12 w-12 rounded-md bg-gray-700 flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
                            <p className="text-xs text-gray-400">Expires 12/24</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                          Default
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'limits' && (
              <div>
                <h2 className="mb-6 text-xl font-semibold text-white">Limits & Fees</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium text-white">Transaction Limits</h3>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-gray-800 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white">Daily Transfer Limit</p>
                            <p className="text-xs text-gray-400">Maximum amount you can transfer per day</p>
                          </div>
                          <p className="text-sm font-medium text-white">$10,000</p>
                        </div>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white">Monthly Transfer Limit</p>
                            <p className="text-xs text-gray-400">Maximum amount you can transfer per month</p>
                          </div>
                          <p className="text-sm font-medium text-white">$50,000</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-6">
                    <h3 className="mb-4 text-lg font-medium text-white">Fees</h3>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-gray-800 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white">International Transfer Fee</p>
                            <p className="text-xs text-gray-400">Fee for international transfers</p>
                          </div>
                          <p className="text-sm font-medium text-white">1.5%</p>
                        </div>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white">ATM Withdrawal Fee</p>
                            <p className="text-xs text-gray-400">Fee for ATM withdrawals</p>
                          </div>
                          <p className="text-sm font-medium text-white">$2.50</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div>
                <h2 className="mb-6 text-xl font-semibold text-white">Help & Support</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium text-white">Contact Support</h3>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-gray-800 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white">Email Support</p>
                            <p className="text-xs text-gray-400">Get help via email</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Contact
                          </Button>
                        </div>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white">Live Chat</p>
                            <p className="text-xs text-gray-400">Chat with our support team</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Start Chat
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-6">
                    <h3 className="mb-4 text-lg font-medium text-white">FAQs</h3>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-gray-800 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white">How do I reset my password?</p>
                            <p className="text-xs text-gray-400">Learn how to reset your password</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white">How do I add a new card?</p>
                            <p className="text-xs text-gray-400">Learn how to add a new payment method</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 