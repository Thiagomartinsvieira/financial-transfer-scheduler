import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle, AlertCircle, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface TransferDetails {
  originAccount: string;
  destinationAccount: string;
  amount: number;
  fee: number;
  transferDate: Date;
}

interface TransferConfirmationProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  transferDetails?: TransferDetails;
  onConfirm?: () => void;
  onCancel?: () => void;
  status?: "pending" | "success" | "error";
}

const TransferConfirmation = ({
  open = true,
  onOpenChange = () => {},
  transferDetails = {
    originAccount: "1234567890",
    destinationAccount: "0987654321",
    amount: 1000,
    fee: 10,
    transferDate: new Date(Date.now() + 86400000), // Tomorrow
  },
  onConfirm = () => {},
  onCancel = () => {},
  status = "pending",
}: TransferConfirmationProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {status === "pending" && "Confirm Transfer"}
            {status === "success" && "Transfer Scheduled Successfully"}
            {status === "error" && "Transfer Error"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          {status === "pending" && (
            <div className="space-y-6">
              <p className="text-center text-gray-600">
                Please review the transfer details before confirming:
              </p>

              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">From Account:</span>
                  <span className="font-medium">
                    {transferDetails.originAccount}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">To Account:</span>
                  <span className="font-medium">
                    {transferDetails.destinationAccount}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">
                    {formatCurrency(transferDetails.amount)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fee:</span>
                  <span className="font-medium">
                    {formatCurrency(transferDetails.fee)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold">
                    {formatCurrency(
                      transferDetails.amount + transferDetails.fee,
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transfer Date:</span>
                  <span className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                    {format(transferDetails.transferDate, "PPP")}
                  </span>
                </div>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <p className="text-gray-600">
                Your transfer of {formatCurrency(transferDetails.amount)} from
                account {transferDetails.originAccount} to{" "}
                {transferDetails.destinationAccount} has been scheduled for{" "}
                {format(transferDetails.transferDate, "PPP")}.
              </p>
              <div className="bg-green-50 p-3 rounded-md text-green-800 text-sm">
                A confirmation has been sent to your registered email address.
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <AlertCircle className="h-16 w-16 text-red-500" />
              </div>
              <p className="text-gray-600">
                We encountered an error while processing your transfer request.
                Please try again or contact customer support.
              </p>
              <div className="bg-red-50 p-3 rounded-md text-red-800 text-sm">
                Error code: TRANSFER_PROCESSING_FAILED
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-center gap-2 sm:gap-4">
          {status === "pending" && (
            <>
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Confirm Transfer"}
              </Button>
            </>
          )}

          {status === "success" && (
            <>
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Close
              </Button>
              <Button
                onClick={onConfirm}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                View Transfer History
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Try Again
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferConfirmation;
