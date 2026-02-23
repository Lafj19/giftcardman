import React, { useState } from 'react';
import { CardDesign } from '../../types';
import { Upload, Image as ImageIcon, Palette } from 'lucide-react';

interface DesignStepProps {
  design: CardDesign;
  onChange: (design: Partial<CardDesign>) => void;
  onNext: () => void;
}

const TEMPLATES = [
  // Restaurant & Food
  { id: 't1', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Fine Dining' },
  { id: 't2', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Coffee Shop' },
  { id: 't3', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Pizzeria' },
  { id: 't4', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Sushi Bar' },
  { id: 't5', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1050&auto=format&fit=crop', textColor: '#1f2937', label: 'Bakery' },
  { id: 't7', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Burger Joint' },
  { id: 't8', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Vegan Cafe' },
  { id: 't9', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Wine Bar' },
  { id: 't10', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Pizza Slice' },
  { id: 't11', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'BBQ Grill' },
  { id: 't12', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Ice Cream' },
  { id: 't13', category: 'Restaurant & Food', type: 'image', background: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Matcha Cafe' },

  // Generic & Colors
  { id: 'c1', category: 'Generic & Colors', type: 'color', background: '#111827', textColor: '#ffffff', label: 'Midnight Black' },
  { id: 'c2', category: 'Generic & Colors', type: 'color', background: '#ffffff', textColor: '#111827', label: 'Pure White' },
  { id: 'c3', category: 'Generic & Colors', type: 'color', background: '#1e3a8a', textColor: '#ffffff', label: 'Deep Navy' },
  { id: 'c4', category: 'Generic & Colors', type: 'color', background: '#064e3b', textColor: '#ffffff', label: 'Forest Green' },
  { id: 'c5', category: 'Generic & Colors', type: 'color', background: '#7f1d1d', textColor: '#ffffff', label: 'Burgundy' },
  { id: 'c6', category: 'Generic & Colors', type: 'gradient', background: 'linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)', textColor: '#111827', label: 'Elegant Gold' },
  { id: 'c7', category: 'Generic & Colors', type: 'gradient', background: 'linear-gradient(135deg, #8e9eab, #eef2f3)', textColor: '#111827', label: 'Silver' },
  { id: 'c8', category: 'Generic & Colors', type: 'gradient', background: 'linear-gradient(135deg, #e6cec6, #ffede6)', textColor: '#111827', label: 'Rose Gold' },
  { id: 'c9', category: 'Generic & Colors', type: 'gradient', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', textColor: '#ffffff', label: 'Purple Dream' },
  { id: 'c10', category: 'Generic & Colors', type: 'gradient', background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', textColor: '#1f2937', label: 'Sunset' },
  { id: 'c11', category: 'Generic & Colors', type: 'gradient', background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)', textColor: '#ffffff', label: 'Ocean Blue' },
  { id: 'c12', category: 'Generic & Colors', type: 'gradient', background: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)', textColor: '#1f2937', label: 'Mint Green' },

  // Stylish & Patterns
  { id: 's1', category: 'Stylish & Patterns', type: 'image', background: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Abstract Art' },
  { id: 's2', category: 'Stylish & Patterns', type: 'image', background: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Geometric' },
  { id: 's3', category: 'Stylish & Patterns', type: 'image', background: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1050&auto=format&fit=crop', textColor: '#111827', label: 'Marble Texture' },
  { id: 's4', category: 'Stylish & Patterns', type: 'image', background: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Dark Wood' },
  { id: 's5', category: 'Stylish & Patterns', type: 'image', background: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Dark Floral' },
  { id: 's6', category: 'Stylish & Patterns', type: 'image', background: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1050&auto=format&fit=crop&hue=290', textColor: '#ffffff', label: 'Neon Vibes' },
  { id: 's7', category: 'Stylish & Patterns', type: 'image', background: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Gradient Mesh' },
  { id: 's8', category: 'Stylish & Patterns', type: 'image', background: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Liquid Color' },
  { id: 's9', category: 'Stylish & Patterns', type: 'image', background: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1050&auto=format&fit=crop', textColor: '#111827', label: 'Minimalist Lines' },
  { id: 's10', category: 'Stylish & Patterns', type: 'image', background: 'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=1050&auto=format&fit=crop', textColor: '#ffffff', label: 'Space' },
];

export function DesignStep({ design, onChange, onNext }: DesignStepProps) {
  const [activeTab, setActiveTab] = useState<'templates' | 'upload'>('templates');
  const [activeCategory, setActiveCategory] = useState<string>('Restaurant & Food');

  const categories = Array.from(new Set(TEMPLATES.map(t => t.category)));

  const handleTemplateSelect = (template: any) => {
    onChange({
      type: template.type,
      background: template.background,
      textColor: template.textColor,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          type: 'image',
          background: event.target?.result as string,
          textColor: '#ffffff', // Default for images, might need adjustment
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">Choose a Design</h2>
        <p className="text-gray-500">Start with a template or upload your own custom artwork.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'templates' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Palette className="w-4 h-4" />
            Templates
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'upload' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload Custom
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'templates' ? (
            <div className="space-y-8">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Templates Grid */}
              <div className="h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {TEMPLATES.filter(t => t.category === activeCategory).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateSelect(t)}
                      className={`relative aspect-[1.586/1] rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        design.background === t.background ? 'ring-2 ring-indigo-600 ring-offset-2' : 'border border-gray-200'
                      }`}
                      style={{
                        background: t.type === 'image' ? `url(${t.background}) center/cover` : t.background,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                        <span className="bg-white/90 text-gray-900 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                          Select
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                        {t.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Upload your design</h3>
              <p className="text-sm text-gray-500 mb-6 text-center max-w-xs">
                PNG, JPG or SVG up to 10MB. Recommended size: 1050 x 600px.
              </p>
              <label className="relative cursor-pointer bg-white border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
                <span>Select File</span>
                <input type="file" className="sr-only" accept="image/*" onChange={handleFileUpload} />
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-sm"
        >
          Continue to Customize
        </button>
      </div>
    </div>
  );
}
