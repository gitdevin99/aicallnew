import { useState } from "react";
import { BasicInfoStep } from "@/components/agent/BasicInfoStep";
import { BehaviourStep } from "@/components/agent/BehaviourStep";
import { KnowledgeStep } from "@/components/agent/KnowledgeStep";
import { DataCollectionStep } from "@/components/agent/DataCollectionStep";
import { ToolsStep } from "@/components/agent/ToolsStep";
import { ActionsStep } from "@/components/agent/ActionsStep";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Basic Info", description: "Set up your agent's identity" },
  { id: 2, title: "Behaviour", description: "Define how your agent interacts" },
  { id: 3, title: "Knowledge", description: "Configure agent's knowledge base" },
  { id: 4, title: "Data Collection", description: "Set up data collection points" },
  { id: 5, title: "Tools", description: "Configure agent's tools and integrations" },
  { id: 6, title: "Actions", description: "Define agent's capabilities" },
];

export default function CreateAgent() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2 relative inline-block">
            Create New Agent
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl -z-10"></div>
          </h1>
          <p className="text-muted-foreground">Design your perfect AI assistant</p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 lg:shrink-0 overflow-x-auto lg:overflow-visible">
            <div className="flex lg:block overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
              <div className="flex lg:block gap-2 lg:gap-0 min-w-max lg:min-w-0">
            <div className="bg-card/80 backdrop-blur-xl rounded-lg p-4 transition-all duration-300
              dark:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.1),_0_0.25rem_0.5rem_rgba(0,0,0,0.1)]
              shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.4),_0_0.25rem_0.5rem_rgba(0,0,0,0.05)]
              hover:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.4),_0_0.5rem_1rem_rgba(0,0,0,0.1)]
              dark:hover:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.1),_0_0.5rem_1rem_rgba(0,0,0,0.2)]
              border border-gray-200/50 dark:border-gray-800/50">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  className={cn(
                    "relative p-3 lg:p-4 mb-0 lg:mb-2 rounded-lg transition-all duration-300 shrink-0 lg:shrink",
                    currentStep === step.id
                      ? "bg-primary/5 dark:bg-primary/10 border border-primary/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),_0_4px_10px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),_0_4px_10px_rgba(0,0,0,0.25)]"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),_0_4px_10px_rgba(0,0,0,0.05)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),_0_4px_10px_rgba(0,0,0,0.25)]"
                  )}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {currentStep === step.id && (
                    <motion.div
                      layoutId="activeStep"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-transparent"
                    />
                  )}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                          currentStep === step.id
                            ? "bg-primary text-primary-foreground shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.25)] scale-110"
                            : step.id < currentStep
                            ? "bg-green-500 text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
                            : "bg-muted text-muted-foreground hover:scale-105 hover:shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
                        )}
                      >
                        {step.id}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {step.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1">
            <div className="bg-card/80 backdrop-blur-xl rounded-lg p-4 sm:p-6 lg:p-8 transition-all duration-300
              dark:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.1),_0_0.25rem_0.5rem_rgba(0,0,0,0.1)]
              shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.4),_0_0.25rem_0.5rem_rgba(0,0,0,0.05)]
              hover:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.4),_0_0.5rem_1rem_rgba(0,0,0,0.1)]
              dark:hover:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.1),_0_0.5rem_1rem_rgba(0,0,0,0.2)]
              border border-gray-200/50 dark:border-gray-800/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step content will be rendered here */}
                  <div className="min-h-[300px] sm:min-h-[400px]">
                    <h2 className="text-2xl font-bold text-foreground mb-6 relative inline-block">
                      {steps[currentStep - 1].title}
                      <div className="absolute inset-0 bg-blue-500/20 blur-xl -z-10"></div>
                    </h2>
                    {currentStep === 1 && <BasicInfoStep />}
                    {currentStep === 2 && <BehaviourStep />}
                    {currentStep === 3 && <KnowledgeStep />}
                    {currentStep === 4 && <DataCollectionStep />}
                    {currentStep === 5 && <ToolsStep />}
                    {currentStep === 6 && <ActionsStep />}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentStep === 1}
                      className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={currentStep === steps.length}
                      className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300"
                    >
                      {currentStep === steps.length ? "Create Agent" : "Next"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
