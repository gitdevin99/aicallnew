import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { Sidebar } from "@/components/Sidebar";
import { StatsCard } from "@/components/StatsCard";
import { RecentActivity } from "@/components/RecentActivity";
import { LeadCard } from "@/components/LeadCard";
import { CallsChart } from "@/components/CallsChart";
import { Phone, Clock, XCircle, Timer } from 'lucide-react';
import { SortableSection } from '../components/SortableSection';
import { motion } from 'framer-motion';

const Index = () => {
  const [sections, setSections] = useState([
    { id: 'stats', type: 'stats' },
    { id: 'leads', type: 'leads' },
    { id: 'chart', type: 'chart' },
    { id: 'activity', type: 'activity' }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const renderSection = (section) => {
    switch (section.type) {
      case 'stats':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Calls Handled Today"
              value="25"
              change={13.5}
              icon={<Phone className="w-5 h-5" />}
            />
            <StatsCard
              title="Answer Rate"
              value="87%"
              change={3.7}
              icon={<Clock className="w-5 h-5" />}
            />
            <StatsCard
              title="Missed Calls Today"
              value="2"
              change={-33.3}
              icon={<XCircle className="w-5 h-5" />}
            />
            <StatsCard
              title="Average Call Duration"
              value="3m 36s"
              change={20}
              icon={<Timer className="w-5 h-5" />}
            />
          </div>
        );
      case 'leads':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LeadCard
              name="John Smith"
              phone="+1 (555) 123-4567"
              lastContact="2024-02-08"
              score={85}
              status="active"
            />
            <LeadCard
              name="Sarah Johnson"
              phone="+1 (555) 987-6543"
              lastContact="2024-02-08"
              score={92}
              status="new"
            />
          </div>
        );
      case 'chart':
        return <CallsChart />;
      case 'activity':
        return <RecentActivity />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Today</h1>
            </div>
            
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="space-y-6">
                <SortableContext items={sections} strategy={rectSortingStrategy}>
                  {sections.map((section) => (
                    <SortableSection key={section.id} id={section.id}>
                      {renderSection(section)}
                    </SortableSection>
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
