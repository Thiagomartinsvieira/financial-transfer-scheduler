import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar } from "lucide-react";

interface FeeCalculatorProps {
  amount?: number;
  date?: Date;
  onFeeCalculated?: (fee: number | null) => void;
}

const FeeCalculator = ({
  amount = 500,
  date = new Date(),
  onFeeCalculated = () => {},
}: FeeCalculatorProps) => {
  // Calculate fee based on transfer date and amount
  const calculateFee = (amount: number, date: Date): number | null => {
    // Example fee calculation logic
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // No fee available for transfers on weekends with amount > 1000
    if (isWeekend && amount > 1000) {
      return null;
    }

    // Sample fee calculation
    const baseFee = amount * 0.01; // 1% fee
    const weekendSurcharge = isWeekend ? 5 : 0; // $5 surcharge on weekends

    return Math.max(baseFee + weekendSurcharge, 2); // Minimum fee of $2
  };

  // Calculate the fee
  const fee = calculateFee(amount, date);

  // Call the callback with the calculated fee
  React.useEffect(() => {
    onFeeCalculated(fee);
  }, [amount, date, fee, onFeeCalculated]);

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-blue-800 flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Fee Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Transfer Amount:</span>
            <span className="font-medium">${amount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Transfer Date:</span>
            <span className="font-medium">{date.toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-sm font-semibold">Calculated Fee:</span>
            <span className="text-lg font-bold text-blue-700">
              {fee !== null ? `$${fee.toFixed(2)}` : "Not Available"}
            </span>
          </div>

          {fee === null && (
            <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded-md">
              No applicable fee exists for this transfer date and amount
              combination.
            </div>
          )}

          <div className="mt-2 p-2 bg-blue-50 text-blue-700 text-xs rounded-md">
            <p className="font-medium mb-1">Fee Calculation Rules:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Base fee: 1% of transfer amount</li>
              <li>Weekend surcharge: $5.00</li>
              <li>Minimum fee: $2.00</li>
              <li>Weekend transfers over $1,000 are not supported</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeeCalculator;
