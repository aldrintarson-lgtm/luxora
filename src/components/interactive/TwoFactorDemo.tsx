import React, { useState } from 'react';
import { CheckCircle2, KeyRound, Lock, Radio, Shield, Unlock } from 'lucide-react';

export const TwoFactorDemo: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pin, setPin] = useState<string>('');
  const [nfcTapped, setNfcTapped] = useState<boolean>(false);
  const correctPin = '1337';

  const handleTapNfc = () => {
    setNfcTapped(true);
    setTimeout(() => {
      setStep(2);
    }, 600);
  };

  const handleDigitClick = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin === correctPin) {
        setTimeout(() => {
          setStep(3);
        }, 400);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleAutoUnlock = () => {
    setNfcTapped(true);
    setStep(2);
    setPin('1337');
    setTimeout(() => {
      setStep(3);
    }, 400);
  };

  const handleReset = () => {
    setStep(1);
    setPin('');
    setNfcTapped(false);
  };

  return (
    <div className="w-full bg-slate-950/80 border border-white/10 rounded-2xl p-4 sm:p-5 text-slate-100 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              step === 3 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
            }`}
          >
            {step === 3 ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              2FA Lock System
            </h4>
            <p className="text-[11px] text-slate-400">
              {step === 1 && 'Step 1 of 2: NFC Authentication'}
              {step === 2 && 'Step 2 of 2: Encrypted PIN'}
              {step === 3 && 'Access Granted • Cryptographic Latch Opened'}
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
            step === 3
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400'
              : 'bg-blue-950/80 border-blue-500/50 text-cyan-400'
          }`}
        >
          {step === 3 ? 'UNLOCKED' : 'SECURED'}
        </span>
      </div>

      {/* Main Interactive Stage */}
      <div className="my-2 min-h-[140px] flex flex-col items-center justify-center text-center">
        {/* Step 1: NFC */}
        {step === 1 && (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleTapNfc}
              className={`relative group p-4 rounded-full border transition-all duration-300 ${
                nfcTapped
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 scale-105'
                  : 'bg-blue-500/10 border-blue-500/40 text-blue-400 hover:bg-blue-500/20 hover:scale-105 hover:border-blue-300'
              }`}
              title="Click to simulate NFC tag scan"
            >
              <Radio
                className={`w-8 h-8 ${nfcTapped ? 'animate-bounce text-emerald-400' : 'animate-pulse'}`}
              />
              {!nfcTapped && (
                <span className="absolute -inset-1 rounded-full border border-blue-500/30 animate-ping opacity-75" />
              )}
            </button>
            <div>
              <p className="text-xs font-semibold text-white">Tap Authorized NFC Key</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Click the NFC badge or your smart tag</p>
            </div>
            <button
              onClick={handleAutoUnlock}
              className="text-[10px] text-cyan-400/80 hover:text-cyan-300 underline underline-offset-2"
            >
              Quick Test Demo (Auto-Unlock)
            </button>
          </div>
        )}

        {/* Step 2: PIN Pad */}
        {step === 2 && (
          <div className="w-full flex flex-col items-center gap-2.5">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <KeyRound className="w-3.5 h-3.5 text-blue-400" />
              <span>Enter 4-Digit Security PIN (Preset: 1337)</span>
            </div>

            {/* PIN Dots */}
            <div className="flex items-center gap-3 py-1">
              {[0, 1, 2, 3].map((idx) => {
                const filled = pin.length > idx;
                return (
                  <div
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                      filled
                        ? 'bg-cyan-400 border-cyan-300 shadow-md shadow-cyan-500/50 scale-110'
                        : 'bg-slate-900 border-white/20'
                    }`}
                  />
                );
              })}
            </div>

            {/* Mini Keypad */}
            <div className="grid grid-cols-5 gap-1.5 w-full max-w-xs mt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handleDigitClick(digit)}
                  className="py-1 px-2 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-mono font-medium text-slate-200 hover:bg-blue-600/30 hover:border-blue-400 hover:text-white transition-all active:scale-95"
                >
                  {digit}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={handleBackspace}
                className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded border border-white/10"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  setPin('1337');
                  setTimeout(() => setStep(3), 300);
                }}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 underline"
              >
                Auto-fill 1337
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Unlocked */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-2.5 py-1">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/80 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20 animate-scale-in">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-emerald-300">TSA Vault Solenoid Disengaged</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Dual-factor handshake verified successfully</p>
            </div>
            <button
              onClick={handleReset}
              className="mt-1 px-3 py-1 rounded-full bg-slate-900 border border-white/15 text-[11px] text-slate-300 hover:text-white hover:border-blue-400 transition-colors"
            >
              Lock Bag Again
            </button>
          </div>
        )}
      </div>

      {/* Footer Spec */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-cyan-400" />
          Hardware AES-256 Crypto Module
        </span>
        <span className="text-slate-400">TSA Compliant</span>
      </div>
    </div>
  );
};
