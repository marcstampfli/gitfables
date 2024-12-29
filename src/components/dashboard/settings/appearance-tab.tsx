/**
 * @module components/dashboard/settings/appearance-tab
 * @description Appearance settings tab with theme and accessibility options
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { useTheme } from 'next-themes'
import { 
  Moon, 
  Sun, 
  Monitor, 
  Palette, 
  EyeOff,
  Laptop,
  Smartphone,
  Tablet,
  Globe
} from 'lucide-react'
import type { SettingsTabProps } from './types'

type FontSize = 'sm' | 'base' | 'lg' | 'xl'
type ColorScheme = 'zinc' | 'slate' | 'stone' | 'gray' | 'neutral' | 'blue' | 'green' | 'violet' | 'pink' | 'rose'
type DeviceType = 'desktop' | 'tablet' | 'mobile' | 'system'
type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ja' | 'ko' | 'zh'

const FONT_SIZES: Array<{ value: FontSize; label: string }> = [
  { value: 'sm', label: 'Small' },
  { value: 'base', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' }
]

const COLOR_SCHEMES: Array<{ value: ColorScheme; label: string; class: string }> = [
  { value: 'zinc', label: 'Zinc', class: 'bg-zinc-500' },
  { value: 'slate', label: 'Slate', class: 'bg-slate-500' },
  { value: 'stone', label: 'Stone', class: 'bg-stone-500' },
  { value: 'gray', label: 'Gray', class: 'bg-gray-500' },
  { value: 'neutral', label: 'Neutral', class: 'bg-neutral-500' },
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'green', label: 'Green', class: 'bg-green-500' },
  { value: 'violet', label: 'Violet', class: 'bg-violet-500' },
  { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
  { value: 'rose', label: 'Rose', class: 'bg-rose-500' }
]

const LANGUAGES: Array<{ value: Language; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'it', label: 'Italiano' },
  { value: 'pt', label: 'Português' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'zh', label: '中文' }
]

export function AppearanceTab({ settings }: SettingsTabProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [fontSize, setFontSize] = React.useState<FontSize>(settings.accessibility.font_size as FontSize)
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('zinc')
  const [contrast, setContrast] = React.useState(100)
  const [reduceMotion, setReduceMotion] = React.useState(settings.accessibility.reduce_animations)
  const [devicePreference, setDevicePreference] = React.useState<DeviceType>('system')
  const [language, setLanguage] = React.useState<Language>('en')

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize how GitFables looks and feels
        </p>
      </div>

      <div className="grid gap-6">
        {/* Theme Selection */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred color theme
                </p>
              </div>
            </div>
            <RadioGroup
              defaultValue={theme}
              onValueChange={setTheme}
              className="grid grid-cols-3 gap-4"
            >
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <Sun className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Light</span>
              </Label>
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <Moon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Dark</span>
              </Label>
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <RadioGroupItem value="system" id="system" className="sr-only" />
                <Monitor className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">System</span>
              </Label>
            </RadioGroup>
          </div>
        </Card>

        {/* Color & Typography */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Colors & Typography</h4>
            </div>
            <Separator />
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Accent Color</Label>
                  <div className="grid grid-cols-5 gap-2 mt-1.5">
                    {COLOR_SCHEMES.map((color) => (
                      <div
                        key={color.value}
                        className={`
                          h-8 rounded-md cursor-pointer ring-offset-background
                          ${color.class}
                          ${colorScheme === color.value ? 'ring-2 ring-primary ring-offset-2' : ''}
                        `}
                        onClick={() => setColorScheme(color.value)}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Font Size</Label>
                  <Select value={fontSize} onValueChange={(value: FontSize) => setFontSize(value)}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_SIZES.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Contrast</Label>
                  <div className="mt-1.5">
                    <Slider
                      value={[contrast]}
                      onValueChange={(values: number[]) => setContrast(values[0])}
                      max={200}
                      min={75}
                      step={5}
                      className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Low</span>
                      <span>{contrast}%</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Accessibility & Motion */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <EyeOff className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Accessibility & Motion</h4>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Reduce Motion</Label>
                  <p className="text-sm text-muted-foreground">
                    Disable animations and transitions
                  </p>
                </div>
                <Switch
                  checked={reduceMotion}
                  onCheckedChange={setReduceMotion}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast between elements
                  </p>
                </div>
                <Switch
                  checked={contrast > 150}
                  onCheckedChange={(checked) => setContrast(checked ? 175 : 100)}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Device Optimization */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Laptop className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Device Optimization</h4>
            </div>
            <Separator />
            <RadioGroup
              value={devicePreference}
              onValueChange={(value: DeviceType) => setDevicePreference(value)}
              className="grid grid-cols-3 gap-4"
            >
              <Label
                htmlFor="desktop"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <RadioGroupItem value="desktop" id="desktop" className="sr-only" />
                <Laptop className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Desktop</span>
              </Label>
              <Label
                htmlFor="tablet"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <RadioGroupItem value="tablet" id="tablet" className="sr-only" />
                <Tablet className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Tablet</span>
              </Label>
              <Label
                htmlFor="mobile"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <RadioGroupItem value="mobile" id="mobile" className="sr-only" />
                <Smartphone className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Mobile</span>
              </Label>
            </RadioGroup>
            <p className="text-sm text-muted-foreground">
              Optimize the interface for your primary device type. This affects layout density and touch targets.
            </p>
          </div>
        </Card>

        {/* Language */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Language</h4>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Interface Language</Label>
                <Select 
                  value={language}
                  onValueChange={(value: Language) => setLanguage(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred interface language
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 