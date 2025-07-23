import React, { useState } from 'react';
import Button from '../ui/Button';
import { ChevronDown } from 'lucide-react';

const TransferSection = () => {
  const [sendAmount, setSendAmount] = useState('1,000.00');
  const [sendCurrency, setSendCurrency] = useState('USD');
  const [receiveAmount, setReceiveAmount] = useState('1,156.00');
  const [receiveCurrency, setReceiveCurrency] = useState('CAD');

  return (
    <div className="rounded-lg bg-gray-900 p-5">
      <h2 className="mb-4 text-lg font-semibold text-white">Conversion</h2>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm text-gray-400">Recipient</p>
          <div className="flex items-center justify-between rounded-md bg-gray-800 p-3">
            <div className="flex-1">
              <input
                type="text"
                value="5673 9876 5645 3789"
                readOnly
                className="w-full bg-transparent text-sm text-white focus:outline-hidden"
              />
            </div>
            <div className="ml-2 rounded-sm bg-gray-700 px-2 py-1">
              <span className="text-xs font-medium text-white">VISA</span>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-400">You send</p>
          <div className="flex items-center justify-between rounded-md bg-gray-800 p-3">
            <div className="flex-1">
              <input
                type="text"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-hidden"
              />
            </div>
            <div className="ml-2 flex items-center rounded-md bg-gray-700 px-3 py-1">
              <span className="text-sm font-medium text-white">{sendCurrency}</span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-400">Recipient gets</p>
          <div className="flex items-center justify-between rounded-md bg-gray-800 p-3">
            <div className="flex-1">
              <input
                type="text"
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-hidden"
              />
            </div>
            <div className="ml-2 flex items-center rounded-md bg-gray-700 px-3 py-1">
              <span className="text-sm font-medium text-white">{receiveCurrency}</span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md bg-gray-800 p-3">
          <span className="text-sm text-gray-400">Conversion Rate</span>
          <span className="text-sm font-medium text-white">
            $ {(parseFloat(receiveAmount.replace(',', '')) / parseFloat(sendAmount.replace(',', ''))).toFixed(2)}
          </span>
        </div>

        <Button className="w-full">Send</Button>
      </div>
    </div>
  );
};

export default TransferSection; 