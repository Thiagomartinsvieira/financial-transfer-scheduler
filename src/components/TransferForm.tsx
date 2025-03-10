import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { Alert, AlertDescription } from "./ui/alert";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

// Define the form schema with Zod
const formSchema = z.object({
  originAccount: z.string().regex(/^\d{10}$/, {
    message: "Origin account must be exactly 10 digits",
  }),
  destinationAccount: z.string().regex(/^\d{10}$/, {
    message: "Destination account must be exactly 10 digits",
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  transferDate: z.date({
    required_error: "Transfer date is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface TransferFormProps {
  onSubmit?: (data: FormValues & { fee: number }) => void;
  showConfirmation?: boolean;
}

const TransferForm = ({
  onSubmit = () => {},
  showConfirmation = false,
}: TransferFormProps) => {
  const [fee, setFee] = useState<number | null>(null);
  const [showFeeAlert, setShowFeeAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originAccount: "",
      destinationAccount: "",
      amount: "",
      transferDate: undefined,
    },
  });

  // Watch for changes to amount and transferDate to calculate fee
  const amount = form.watch("amount");
  const transferDate = form.watch("transferDate");

  useEffect(() => {
    if (amount && transferDate) {
      // Calculate fee based on transfer date and amount
      // This is a placeholder implementation
      const calculatedFee = calculateFee(Number(amount), transferDate);

      if (calculatedFee === null) {
        setShowFeeAlert(true);
        setFee(null);
      } else {
        setShowFeeAlert(false);
        setFee(calculatedFee);
      }
    }
  }, [amount, transferDate]);

  // Placeholder function to calculate fee
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

  const handleSubmit = (data: FormValues) => {
    if (fee === null) {
      setShowFeeAlert(true);
      return;
    }

    // Submit the form data along with the calculated fee
    onSubmit({ ...data, fee });
    setShowSuccess(true);

    // Reset form after submission
    setTimeout(() => {
      form.reset();
      setFee(null);
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-800">
          Schedule New Transfer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin Account */}
              <FormField
                control={form.control}
                name="originAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin Account</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 10-digit account number"
                        {...field}
                        className="border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Destination Account */}
              <FormField
                control={form.control}
                name="destinationAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Account</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 10-digit account number"
                        {...field}
                        className="border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transfer Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter amount"
                        {...field}
                        className="border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Transfer Date */}
              <FormField
                control={form.control}
                name="transferDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Transfer Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal border-gray-300",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Fee Display */}
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="font-medium">Transfer Fee:</span>
                <span className="text-lg font-bold">
                  {fee !== null ? `$${fee.toFixed(2)}` : "Calculating..."}
                </span>
              </div>
            </div>

            {/* Fee Alert */}
            {showFeeAlert && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No applicable fee exists for this transfer date and amount
                  combination. Please select a different date.
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={showFeeAlert}
            >
              Schedule Transfer
            </Button>
          </form>
        </Form>

        {/* Success Dialog */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-green-600 text-xl">
                Transfer Scheduled Successfully!
              </DialogTitle>
            </DialogHeader>
            <div className="p-4 text-center">
              <p className="mb-4">
                Your transfer has been scheduled. You can view it in your
                transfer history.
              </p>
              <Button
                onClick={() => setShowSuccess(false)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TransferForm;
