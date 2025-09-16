import React, { useState, useEffect } from 'react';
import { Palette, Monitor, Smartphone, Save, RotateCcw } from 'lucide-react';
import { Card, Button, Badge } from '../widgets';

interface ColorTheme {
  id: string;
  name: string;
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  preview: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

/**
 * Settings page with theme color customization
 */
const Settings: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('blue-purple');
  const [customColors, setCustomColors] = useState({
    primary: '#3b82f6',
    secondary: '#a855f7',
    accent: '#10b981'
  });

  const predefinedThemes: ColorTheme[] = [
    {
      id: 'blue-purple',
      name: 'Blue & Purple',
      description: 'Professional and modern',
      primary: '#3b82f6',
      secondary: '#a855f7',
      accent: '#10b981',
      preview: { primary: 'bg-blue-500', secondary: 'bg-purple-500', accent: 'bg-emerald-500' }
    },
    {
      id: 'emerald-blue',
      name: 'Emerald & Blue',
      description: 'Fresh and vibrant',
      primary: '#10b981',
      secondary: '#3b82f6',
      accent: '#a855f7',
      preview: { primary: 'bg-emerald-500', secondary: 'bg-blue-500', accent: 'bg-purple-500' }
    },
    {
      id: 'purple-emerald',
      name: 'Purple & Emerald',
      description: 'Creative and bold',
      primary: '#a855f7',
      secondary: '#10b981',
      accent: '#3b82f6',
      preview: { primary: 'bg-purple-500', secondary: 'bg-emerald-500', accent: 'bg-blue-500' }
    },
    {
      id: 'orange-teal',
      name: 'Orange & Teal',
      description: 'Warm and energetic',
      primary: '#f97316',
      secondary: '#14b8a6',
      accent: '#3b82f6',
      preview: { primary: 'bg-orange-500', secondary: 'bg-teal-500', accent: 'bg-blue-500' }
    },
    {
      id: 'rose-indigo',
      name: 'Rose & Indigo',
      description: 'Elegant and sophisticated',
      primary: '#f43f5e',
      secondary: '#6366f1',
      accent: '#10b981',
      preview: { primary: 'bg-rose-500', secondary: 'bg-indigo-500', accent: 'bg-emerald-500' }
    },
    {
      id: 'amber-cyan',
      name: 'Amber & Cyan',
      description: 'Bright and cheerful',
      primary: '#f59e0b',
      secondary: '#06b6d4',
      accent: '#a855f7',
      preview: { primary: 'bg-amber-500', secondary: 'bg-cyan-500', accent: 'bg-purple-500' }
    }
  ];

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme');
    const savedCustomColors = localStorage.getItem('customColors');
    
    if (savedTheme) {
      setSelectedTheme(savedTheme);
    }
    
    if (savedCustomColors) {
      setCustomColors(JSON.parse(savedCustomColors));
    }
  }, []);

  const applyTheme = (theme: ColorTheme | null = null) => {
    const root = document.documentElement;
    
    if (theme) {
      // Apply predefined theme
      root.style.setProperty('--color-primary-50', hexToHsl(theme.primary, 95));
      root.style.setProperty('--color-primary-100', hexToHsl(theme.primary, 90));
      root.style.setProperty('--color-primary-200', hexToHsl(theme.primary, 80));
      root.style.setProperty('--color-primary-300', hexToHsl(theme.primary, 70));
      root.style.setProperty('--color-primary-400', hexToHsl(theme.primary, 60));
      root.style.setProperty('--color-primary-500', theme.primary);
      root.style.setProperty('--color-primary-600', hexToHsl(theme.primary, 40));
      root.style.setProperty('--color-primary-700', hexToHsl(theme.primary, 30));
      root.style.setProperty('--color-primary-800', hexToHsl(theme.primary, 20));
      root.style.setProperty('--color-primary-900', hexToHsl(theme.primary, 10));

      root.style.setProperty('--color-secondary-50', hexToHsl(theme.secondary, 95));
      root.style.setProperty('--color-secondary-100', hexToHsl(theme.secondary, 90));
      root.style.setProperty('--color-secondary-200', hexToHsl(theme.secondary, 80));
      root.style.setProperty('--color-secondary-300', hexToHsl(theme.secondary, 70));
      root.style.setProperty('--color-secondary-400', hexToHsl(theme.secondary, 60));
      root.style.setProperty('--color-secondary-500', theme.secondary);
      root.style.setProperty('--color-secondary-600', hexToHsl(theme.secondary, 40));
      root.style.setProperty('--color-secondary-700', hexToHsl(theme.secondary, 30));
      root.style.setProperty('--color-secondary-800', hexToHsl(theme.secondary, 20));
      root.style.setProperty('--color-secondary-900', hexToHsl(theme.secondary, 10));

      root.style.setProperty('--color-accent-50', hexToHsl(theme.accent, 95));
      root.style.setProperty('--color-accent-100', hexToHsl(theme.accent, 90));
      root.style.setProperty('--color-accent-200', hexToHsl(theme.accent, 80));
      root.style.setProperty('--color-accent-300', hexToHsl(theme.accent, 70));
      root.style.setProperty('--color-accent-400', hexToHsl(theme.accent, 60));
      root.style.setProperty('--color-accent-500', theme.accent);
      root.style.setProperty('--color-accent-600', hexToHsl(theme.accent, 40));
      root.style.setProperty('--color-accent-700', hexToHsl(theme.accent, 30));
      root.style.setProperty('--color-accent-800', hexToHsl(theme.accent, 20));
      root.style.setProperty('--color-accent-900', hexToHsl(theme.accent, 10));
    } else {
      // Apply custom colors
      applyCustomColors();
    }
  };

  const applyCustomColors = () => {
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary-500', customColors.primary);
    root.style.setProperty('--color-secondary-500', customColors.secondary);
    root.style.setProperty('--color-accent-500', customColors.accent);
    
    // Generate lighter and darker shades
    Object.entries(customColors).forEach(([key, color]) => {
      for (let i = 1; i <= 9; i++) {
        const lightness = i <= 4 ? 95 - (i * 10) : i === 5 ? 50 : 60 - ((i - 5) * 10);
        root.style.setProperty(`--color-${key}-${i * 100}`, hexToHsl(color, lightness));
      }
    });
  };

  const hexToHsl = (hex: string, lightness?: number): string => {
    // Simple hex to HSL conversion for demo purposes
    // In production, you'd want a more robust color manipulation library
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = lightness !== undefined ? lightness / 100 : (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = predefinedThemes.find(t => t.id === themeId);
    if (theme) {
      applyTheme(theme);
      localStorage.setItem('selectedTheme', themeId);
    }
  };

  const handleCustomColorChange = (colorType: keyof typeof customColors, value: string) => {
    const newColors = { ...customColors, [colorType]: value };
    setCustomColors(newColors);
  };

  const applyCustomTheme = () => {
    setSelectedTheme('custom');
    applyCustomColors();
    localStorage.setItem('selectedTheme', 'custom');
    localStorage.setItem('customColors', JSON.stringify(customColors));
  };

  const resetToDefault = () => {
    const defaultTheme = predefinedThemes[0];
    setSelectedTheme(defaultTheme.id);
    setCustomColors({
      primary: defaultTheme.primary,
      secondary: defaultTheme.secondary,
      accent: defaultTheme.accent
    });
    applyTheme(defaultTheme);
    localStorage.removeItem('selectedTheme');
    localStorage.removeItem('customColors');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Customize your CRM experience</p>
        </div>
        <Button variant="outline" onClick={resetToDefault}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Default
        </Button>
      </div>

      {/* Theme Selection */}
      <Card title="Color Theme" subtitle="Choose a color scheme for your CRM interface">
        <div className="space-y-6">
          {/* Predefined Themes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Predefined Themes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predefinedThemes.map((theme) => (
                <div
                  key={theme.id}
                  className={`
                    relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md
                    ${selectedTheme === theme.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  {selectedTheme === theme.id && (
                    <Badge variant="primary" className="absolute top-2 right-2">
                      Active
                    </Badge>
                  )}
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-6 h-6 rounded-full ${theme.preview.primary}`} />
                    <div className={`w-6 h-6 rounded-full ${theme.preview.secondary}`} />
                    <div className={`w-6 h-6 rounded-full ${theme.preview.accent}`} />
                  </div>
                  
                  <h4 className="font-semibold text-gray-900">{theme.name}</h4>
                  <p className="text-sm text-gray-600">{theme.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={customColors.primary}
                    onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColors.primary}
                    onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={customColors.secondary}
                    onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColors.secondary}
                    onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="#a855f7"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accent Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={customColors.accent}
                    onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColors.accent}
                    onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="#10b981"
                  />
                </div>
              </div>
            </div>

            <Button onClick={applyCustomTheme}>
              <Save className="w-4 h-4 mr-2" />
              Apply Custom Theme
            </Button>
          </div>

          {/* Preview Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                </div>
                
                <div className="flex space-x-3">
                  <Badge variant="primary">Primary Badge</Badge>
                  <Badge variant="secondary">Secondary Badge</Badge>
                  <Badge variant="success">Success Badge</Badge>
                </div>

                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <h4 className="font-semibold text-primary-900">Sample Card</h4>
                  <p className="text-primary-700">This is how your theme colors will look in cards and other components.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Other Settings */}
      <Card title="Display Settings" subtitle="Customize your display preferences">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Compact Mode</h4>
                <p className="text-sm text-gray-600">Reduce spacing for more content</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Toggle</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Mobile Optimized</h4>
                <p className="text-sm text-gray-600">Optimize interface for mobile devices</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;