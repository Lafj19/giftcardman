import React, { useState } from 'react';
import { CardDesign, WizardStep } from './types';
import { DesignStep } from './components/steps/DesignStep';
import { CustomizeStep } from './components/steps/CustomizeStep';
import { CheckoutStep } from './components/steps/CheckoutStep';
import { Gift, Check } from 'lucide-react';

const INITIAL_DESIGN: CardDesign = {
  type: 'image',
  background: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1050&auto=format&fit=crop',
  logo: null,
  logoPosition: { x: 24, y: 24 },
  logoSize: 48,
  text: 'Gift Card',
  textColor: '#ffffff',
  textPosition: { x: 24, y: 140 },
  textSize: 24,
  textFont: 'font-sans',
  showQR: true,
  qrPosition: 'bottom-right',
};

export default function App() {
  const [step, setStep] = useState<WizardStep>('design');
  const [design, setDesign] = useState<CardDesign>(INITIAL_DESIGN);

  const handleDesignChange = (updates: Partial<CardDesign>) => {
    setDesign((prev) => ({ ...prev, ...updates }));
  };

  const steps: { id: WizardStep; label: string }[] = [
    { id: 'design', label: 'Choose Design' },
    { id: 'customize', label: 'Customize' },
    { id: 'checkout', label: 'Order Physical' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight">GiftCard Pro</span>
          </div>
          
          {/* Stepper */}
          <div className="hidden md:flex items-center space-x-4">
            {steps.map((s, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={s.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    isCompleted ? 'bg-indigo-600 text-white' :
                    isCurrent ? 'bg-gray-900 text-white' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isCurrent ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {s.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-gray-200 mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === 'design' && (
          <DesignStep 
            design={design} 
            onChange={handleDesignChange} 
            onNext={() => setStep('customize')} 
          />
        )}
        {step === 'customize' && (
          <CustomizeStep 
            design={design} 
            onChange={handleDesignChange} 
            onNext={() => setStep('checkout')}
            onBack={() => setStep('design')}
          />
        )}
        {step === 'checkout' && (
          <CheckoutStep 
            design={design} 
            onBack={() => setStep('customize')}
          />
        )}
      </main>
    </div>
  );
}
