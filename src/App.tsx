/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreditCard, MessageCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const whatsappNumber = "+51 906328464";
  const whatsappLink = "https://wa.me/51906328464";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex items-center justify-center p-4 md:p-8 selection:bg-slate-200 selection:text-slate-900 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-xl w-full bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden"
      >
        {/* Top Status Bar */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldAlert size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Aviso Administrativo</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400">REF: 402-PR</div>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          {/* Header Section */}
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
              Servicio Suspendido
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Acceso <span className="text-red-600">Restringido</span>
            </h1>
            
            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
              Este sitio web no está disponible temporalmente debido a un <span className="text-slate-900 font-medium">pendiente de pago</span> por servicios de desarrollo.
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-slate-50 rounded-xl p-6 space-y-4 border border-slate-100">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-slate-400">
                <CreditCard size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Estado de Cuenta</h3>
                <p className="text-slate-500 text-sm mt-1">
                  Para restaurar la visibilidad del sitio, es necesario completar el pago correspondiente. Una vez verificado, el acceso será restablecido de inmediato.
                </p>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="flex flex-col gap-3">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#22c35e] text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg shadow-green-200 active:scale-[0.98]"
            >
              <MessageCircle size={20} />
              Contactar por WhatsApp
            </a>
            
            <div className="text-center">
              <p className="text-[11px] text-slate-400 uppercase tracking-widest">
                Soporte Directo: {whatsappNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 text-center">
          <p className="text-[9px] text-slate-400 font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} Sistema de Gestión de Activos Digitales
          </p>
        </div>
      </motion.div>

      {/* Mobile-only background hint */}
      <div className="fixed bottom-4 left-0 right-0 text-center md:hidden pointer-events-none">
        <p className="text-[10px] text-slate-300 uppercase tracking-[0.3em]">Status: Offline</p>
      </div>
    </div>
  );
}
