import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Search, ArrowUpDown, Calendar } from "lucide-react";

interface Transfer {
  id: string;
  originAccount: string;
  destinationAccount: string;
  amount: number;
  fee: number;
  transferDate: string;
  scheduledDate: string;
  status: "pending" | "completed" | "cancelled";
}

interface TransferHistoryProps {
  transfers?: Transfer[];
}

const TransferHistory = ({
  transfers: propTransfers,
}: TransferHistoryProps) => {
  // Default transfers if none are provided
  const defaultTransfers: Transfer[] = [
    {
      id: "1",
      originAccount: "1234567890",
      destinationAccount: "0987654321",
      amount: 1000.0,
      fee: 5.0,
      transferDate: "2023-06-15",
      scheduledDate: "2023-06-10",
      status: "completed",
    },
    {
      id: "2",
      originAccount: "2345678901",
      destinationAccount: "1098765432",
      amount: 500.5,
      fee: 2.5,
      transferDate: "2023-06-20",
      scheduledDate: "2023-06-12",
      status: "pending",
    },
    {
      id: "3",
      originAccount: "3456789012",
      destinationAccount: "2109876543",
      amount: 750.25,
      fee: 3.75,
      transferDate: "2023-06-25",
      scheduledDate: "2023-06-14",
      status: "cancelled",
    },
    {
      id: "4",
      originAccount: "4567890123",
      destinationAccount: "3210987654",
      amount: 1250.75,
      fee: 6.25,
      transferDate: "2023-06-30",
      scheduledDate: "2023-06-16",
      status: "pending",
    },
    {
      id: "5",
      originAccount: "5678901234",
      destinationAccount: "4321098765",
      amount: 2000.0,
      fee: 10.0,
      transferDate: "2023-07-05",
      scheduledDate: "2023-06-18",
      status: "completed",
    },
  ];

  const [transfers] = useState<Transfer[]>(propTransfers || defaultTransfers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transfer;
    direction: "asc" | "desc";
  } | null>(null);

  // Filter transfers based on search term and status
  const filteredTransfers = transfers.filter((transfer) => {
    const matchesSearch =
      transfer.originAccount.includes(searchTerm) ||
      transfer.destinationAccount.includes(searchTerm) ||
      transfer.amount.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || transfer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort transfers based on sort config
  const sortedTransfers = [...filteredTransfers].sort((a, b) => {
    if (!sortConfig) return 0;

    const key = sortConfig.key;
    if (a[key] < b[key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Handle sorting
  const requestSort = (key: keyof Transfer) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Transfer History</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by account or amount"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableCaption>A list of your scheduled transfers</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("originAccount")}
                >
                  Origin Account
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("destinationAccount")}
                >
                  Destination Account
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => requestSort("amount")}
                >
                  Amount
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead className="text-right">Fee</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("transferDate")}
                >
                  Transfer Date
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("scheduledDate")}
                >
                  Scheduled On
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("status")}
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransfers.length > 0 ? (
                sortedTransfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-medium">
                      {transfer.originAccount}
                    </TableCell>
                    <TableCell>{transfer.destinationAccount}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(transfer.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(transfer.fee)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                        {transfer.transferDate}
                      </div>
                    </TableCell>
                    <TableCell>{transfer.scheduledDate}</TableCell>
                    <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    No transfers found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" className="mr-2">
            Export
          </Button>
          <Button>Schedule New Transfer</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransferHistory;
