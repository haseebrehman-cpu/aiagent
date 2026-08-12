'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Bot, Sliders, X, CheckCircle2, Truck, Globe, MapPin, Shield } from 'lucide-react';
import { SubAgent, CarrierProvider, TrackingRegion } from '@/lib/types';

const subAgentConfigSchema = z.object({
  routingPriority: z.enum(['high', 'medium', 'low']),
  confidenceThreshold: z.number().min(0.5).max(0.99),
  carrierProvider: z.enum([
    'ship24',
    'yodel',
    'fedex',
    'dhl',
    'ups',
    'royal_mail',
    'dpd',
    'aftership',
    'cts',
    'custom_carrier'
  ]),
  region: z.enum(['global', 'us', 'uk', 'eu', 'apac', 'latam']),
  fallbackInstruction: z.string().min(5, 'Instruction must be at least 5 characters'),
});

export type SubAgentConfigValues = z.infer<typeof subAgentConfigSchema>;

interface SubAgentManagerProps {
  masterTitle: string;
  sub: SubAgent;
  onClose: () => void;
  onSave: (values: SubAgentConfigValues) => void;
}

export function SubAgentConfigModal({ masterTitle, sub, onClose, onSave }: SubAgentManagerProps) {
  const isOrderTracking = masterTitle.toLowerCase().includes('order') || masterTitle.toLowerCase().includes('tracking');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SubAgentConfigValues>({
    resolver: zodResolver(subAgentConfigSchema),
    defaultValues: {
      routingPriority: 'high',
      confidenceThreshold: 0.88,
      carrierProvider: sub.carrierProvider || 'ship24',
      region: sub.region || 'global',
      fallbackInstruction: 'Escalate query to next available sub-agent if confidence falls below threshold.',
    },
  });

  const currentConfidence = watch('confidenceThreshold');

  const onSubmit: SubmitHandler<SubAgentConfigValues> = (data) => {
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{masterTitle}</span>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>{sub.name}</span>
            </h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role & Description */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
          <div className="flex justify-between items-center font-semibold text-slate-300">
            <span>Specialized Sub-Agent Role</span>
            <span className="px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 font-mono text-[10px] border border-indigo-500/30">
              {sub.role}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">{sub.description}</p>
        </div>

        {/* Order Tracking Logistics Platform Options */}
        {isOrderTracking && (
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-100">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-400" /> Logistics Carrier & Platform Integration
              </span>
              <span className="text-[10px] text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                Multi-Region Support
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Logistics Carrier Provider</label>
                <select
                  {...register('carrierProvider')}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="ship24">Ship24 Universal API (1,200+ Couriers)</option>
                  <option value="yodel">Yodel UK Direct Courier</option>
                  <option value="cts">CTS Transport & Freight API</option>
                  <option value="dhl">DHL Express Global</option>
                  <option value="fedex">FedEx North America</option>
                  <option value="ups">UPS Logistics</option>
                  <option value="royal_mail">Royal Mail UK Postal</option>
                  <option value="dpd">DPD Europe Parcel</option>
                  <option value="aftership">AfterShip Multi-Carrier</option>
                  <option value="custom_carrier">Custom Webhook Carrier API</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Target Geographic Region</label>
                <select
                  {...register('region')}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="global">Global (Worldwide Auto-Detect)</option>
                  <option value="uk">United Kingdom (UK)</option>
                  <option value="us">United States & Canada (US/NA)</option>
                  <option value="eu">European Union (EU)</option>
                  <option value="apac">Asia-Pacific (APAC)</option>
                  <option value="latam">Latin America (LATAM)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* General Form Controls */}
        <div className="space-y-4 text-xs">
          {/* Priority */}
          <div>
            <label className="font-semibold text-slate-300 block mb-1.5">Execution Routing Priority</label>
            <select
              {...register('routingPriority')}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="high">High Priority (Level 1 Primary Sub-Agent)</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low / Fallback Execution</option>
            </select>
          </div>

          {/* Confidence Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-semibold text-slate-300">Confidence Threshold Score</label>
              <span className="font-mono text-indigo-400 font-bold">{currentConfidence}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="0.99"
              step="0.01"
              value={currentConfidence}
              onChange={e => setValue('confidenceThreshold', parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Fallback Instruction */}
          <div>
            <label className="font-semibold text-slate-300 block mb-1.5">Sub-Agent Fallback Instruction</label>
            <textarea
              rows={2}
              {...register('fallbackInstruction')}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 resize-none text-[11px]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Save Sub-Agent Parameters</span>
          </button>
        </div>
      </form>
    </div>
  );
}
