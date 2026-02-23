import React, { useState } from 'react';
import { CardDesign } from '../../types';
import { Card3D } from '../ui/Card3D';
import { Type, QrCode, Image as ImageIcon, Move, Eye } from 'lucide-react';

interface CustomizeStepProps {
  design: CardDesign;
  onChange: (design: Partial<CardDesign>) => void;
  onNext: () => void;
  onBack: () => void;
}

const FONTS = [
  { id: 'font-sans', label: 'Modern Sans' },
  { id: 'font-serif', label: 'Classic Serif' },
  { id: 'font-mono', label: 'Technical Mono' },
];

export function CustomizeStep({ design, onChange, onNext, onBack }: CustomizeStepProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ logo: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">Customize Card</h2>
        <p className="text-gray-500">Add your logo, text, and configure the digital elements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Preview Area */}
        <div className="lg:col-span-7 flex flex-col items-center justify-start bg-gray-50 rounded-3xl p-8 border border-gray-200">
          
          <div className="w-full flex justify-end mb-6">
            <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200 inline-flex">
              <button
                onClick={() => setIsEditMode(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${!isEditMode ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Eye className="w-4 h-4" /> Preview 3D
              </button>
              <button
                onClick={() => setIsEditMode(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${isEditMode ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Move className="w-4 h-4" /> Edit Layout
              </button>
            </div>
          </div>

          <div className="w-full max-w-lg mt-8">
            <Card3D 
              design={design} 
              interactive={!isEditMode} 
              editable={isEditMode}
              onUpdateDesign={onChange}
            />
          </div>
          <p className="text-sm text-gray-400 mt-12 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isEditMode ? 'bg-amber-500' : 'bg-indigo-500'} animate-pulse`} />
            {isEditMode ? 'Layout Mode - Drag elements to move them' : 'Interactive 3D Preview - Hover to tilt'}
          </p>
        </div>

        {/* Controls Area */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-400" />
              Brand Logo
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                {design.logo && (
                  <div className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50 p-2">
                    <img src={design.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <label className="cursor-pointer bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
                  <span>{design.logo ? 'Change Logo' : 'Upload Logo'}</span>
                  <input type="file" className="sr-only" accept="image/*" onChange={handleLogoUpload} />
                </label>
                {design.logo && (
                  <button 
                    onClick={() => onChange({ logo: null })}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
              {design.logo && (
                <div className="w-full mt-2 pt-4 border-t border-gray-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo Size</label>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    value={design.logoSize}
                    onChange={(e) => onChange({ logoSize: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
              <Type className="w-5 h-5 text-gray-400" />
              Card Text
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Text</label>
                <input
                  type="text"
                  value={design.text}
                  onChange={(e) => onChange({ text: e.target.value })}
                  placeholder="e.g. $50 Gift Card"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
                  <select
                    value={design.textFont}
                    onChange={(e) => onChange({ textFont: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  >
                    {FONTS.map(f => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={design.textColor}
                      onChange={(e) => onChange({ textColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                    />
                    <span className="text-sm text-gray-500 uppercase font-mono">{design.textColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Text Size</label>
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={design.textSize}
                  onChange={(e) => onChange({ textSize: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-gray-400" />
                QR Code
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={design.showQR}
                  onChange={(e) => onChange({ showQR: e.target.checked })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {design.showQR && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => onChange({ qrPosition: pos })}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                        design.qrPosition === pos 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-medium' 
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {pos.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 font-medium px-6 py-2"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-sm"
        >
          Review & Checkout
        </button>
      </div>
    </div>
  );
}
