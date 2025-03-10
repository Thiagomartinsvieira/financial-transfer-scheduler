import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import TransferForm from "./TransferForm";
import TransferHistory from "./TransferHistory";
import { Card, CardContent } from "./ui/card";

interface TransferTabsProps {
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
}

const TransferTabs = ({
  defaultTab = "schedule",
  onTabChange = () => {},
}: TransferTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <Card className="w-full max-w-[1200px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardContent className="p-0">
        <Tabs
          defaultValue={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="border-b px-6 py-4 bg-gray-50">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-100">
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Schedule Transfer
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Transfer History
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="schedule" className="mt-0">
              <TransferForm />
            </TabsContent>
            <TabsContent value="history" className="mt-0">
              <TransferHistory />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransferTabs;
