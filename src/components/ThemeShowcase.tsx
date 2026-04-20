import React, { useState } from 'react';

const THEMES = [
  { id: 'swiss', name: 'Swiss Minimal (Default)', desc: 'Clean, professional, high contrast.' },
  { id: 'neobrutalist', name: 'Neobrutalist', desc: 'Bold, unapologetic, start-up energy.' },
  { id: 'editorial', name: 'Editorial Elegance', desc: 'Refined, serif-driven, sophisticated.' },
  { id: 'cyber', name: 'Cyber Terminal', desc: 'Developer-tools, monospaced, dark.' },
];

export default function ThemeShowcase() {
  const [activeTheme, setActiveTheme] = useState('neobrutalist');

  const getThemeClasses = () => {
    switch (activeTheme) {
      case 'neobrutalist':
        return 'bg-[#FFE8B6] text-black font-grotesk min-h-screen';
      case 'editorial':
        return 'bg-[#F9F7F1] text-[#2C332A] font-serif min-h-screen tracking-wide';
      case 'cyber':
        return 'bg-[#09090B] text-[#10B981] font-mono min-h-screen';
      case 'swiss':
      default:
        return 'bg-white text-zinc-900 font-sans min-h-screen';
    }
  };

  const getCardClasses = () => {
    switch (activeTheme) {
      case 'neobrutalist':
        return 'bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-none';
      case 'editorial':
        return 'bg-white border border-[#2C332A]/20 shadow-sm rounded-sm';
      case 'cyber':
        return 'bg-[#09090B] border border-[#10B981]/30 shadow-[0_4px_20px_rgba(16,185,129,0.1)] rounded-none';
      case 'swiss':
      default:
        return 'bg-zinc-50 border border-zinc-200 rounded-xl shadow-sm';
    }
  };

  const getButtonPrimary = () => {
    switch (activeTheme) {
      case 'neobrutalist':
        return 'bg-[#FF90E8] text-black border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] font-black uppercase transition-all rounded-none';
      case 'editorial':
        return 'bg-[#2C332A] text-[#F9F7F1] hover:bg-[#1A1F19] transition-colors rounded-full px-8 uppercase tracking-widest text-xs';
      case 'cyber':
        return 'bg-transparent text-[#10B981] border border-[#10B981] hover:bg-[#10B981] hover:text-black transition-colors rounded-none uppercase font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]';
      case 'swiss':
      default:
        return 'bg-zinc-900 text-white hover:bg-zinc-800 transition-colors rounded-lg font-medium';
    }
  };

  const getBadgeClasses = () => {
    switch (activeTheme) {
      case 'neobrutalist':
        return 'bg-[#C4A1FF] border-2 border-black font-bold uppercase tracking-wider text-black rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]';
      case 'editorial':
        return 'bg-[#E3E1D9] text-[#2C332A] font-sans uppercase tracking-[0.2em] text-[10px] rounded-sm';
      case 'cyber':
        return 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/50 rounded-none uppercase';
      case 'swiss':
      default:
        return 'bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-full font-medium text-xs';
    }
  };

  const getHeadingStyle = () => {
    switch (activeTheme) {
      case 'neobrutalist':
        return 'font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none';
      case 'editorial':
        return 'font-serif text-5xl md:text-7xl italic leading-tight';
      case 'cyber':
        return 'font-bold text-4xl md:text-6xl tracking-tight leading-tight uppercase';
      case 'swiss':
      default:
        return 'font-bold text-5xl md:text-7xl tracking-tighter leading-tight';
    }
  };

  return (
    <div className={`${getThemeClasses()} pb-32 transition-colors duration-300`}>
      {/* Theme Selector Navigation */}
      <nav className={`w-full border-b ${activeTheme === 'cyber' ? 'border-[#10B981]/20 bg-[#09090B]/80' : activeTheme === 'neobrutalist' ? 'border-b-4 border-black bg-[#FFE8B6]' : activeTheme === 'editorial' ? 'border-b border-[#2C332A]/10 bg-[#F9F7F1]/80' : 'border-b border-zinc-200 bg-white/80'} backdrop-blur-md sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className={`font-bold ${activeTheme === 'editorial' ? 'font-sans tracking-widest text-xs uppercase' : 'text-lg'}`}>
              Design Patterns Explorer
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  className={`px-4 py-2 text-sm transition-all ${
                    activeTheme === theme.id 
                    ? (activeTheme === 'cyber' ? 'bg-[#10B981] text-black' : activeTheme === 'neobrutalist' ? 'bg-black text-white rounded-none border-2 border-black' : activeTheme === 'editorial' ? 'bg-[#2C332A] text-white rounded-full' : 'bg-black text-white rounded-md')
                    : (activeTheme === 'cyber' ? 'text-[#10B981] hover:bg-[#10B981]/10' : activeTheme === 'neobrutalist' ? 'bg-white border-2 border-black rounded-none shadow-[2px_2px_0_0_#000]' : activeTheme === 'editorial' ? 'bg-transparent text-[#2C332A] rounded-full hover:bg-black/5' : 'bg-zinc-100 hover:bg-zinc-200 rounded-md')
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className={`px-3 py-1 inline-block mb-6 ${getBadgeClasses()}`}>
           System Preview : {activeTheme}
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className={getHeadingStyle()}>
              {activeTheme === 'editorial' ? (
                <>Build things <span className="italic opacity-80">beautifully.</span></>
              ) : activeTheme === 'neobrutalist' ? (
                'BUILD THINGS LOUDLY.'
              ) : activeTheme === 'cyber' ? (
                '> INIT_SYSTEM()'
              ) : (
                'Build things efficiently.'
              )}
            </h1>
            <p className={`mt-6 text-lg ${activeTheme === 'cyber' ? 'text-[#10B981]/70' : activeTheme === 'editorial' ? 'text-[#2C332A]/70 font-sans' : 'text-zinc-600'} max-w-xl`}>
              {THEMES.find(t => t.id === activeTheme)?.desc} Visual choices dictate how users feel about your application. 
              Switching themes completely alters the psychological perception of the same data structure.
            </p>
            
            <div className="mt-8 flex gap-4">
              <button className={`px-6 py-3 ${getButtonPrimary()}`}>
                Primary Action
              </button>
              <button className={`px-6 py-3 ${
                activeTheme === 'neobrutalist' ? 'bg-white text-black border-4 border-black font-black uppercase rounded-none' 
                : activeTheme === 'editorial' ? 'border border-[#2C332A] text-[#2C332A] rounded-full uppercase tracking-widest text-xs'
                : activeTheme === 'cyber' ? 'text-[#10B981]/70 hover:text-[#10B981] uppercase font-bold underline'
                : 'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 rounded-lg font-medium'
              }`}>
                Secondary
              </button>
            </div>
          </div>
          
          <div className="relative">
            {/* Abstract Graphic showing theme style */}
            <div className={`w-full aspect-square ${getCardClasses()} p-8 flex flex-col justify-between`}>
               <div className="flex justify-between items-start">
                  <div className={`w-16 h-16 ${activeTheme === 'neobrutalist' ? 'bg-[#FF90E8] rounded-full border-4 border-black shadow-[4px_4px_0_0_#000]' : activeTheme === 'editorial' ? 'bg-[#2C332A] rounded-t-full rounded-b-sm' : activeTheme === 'cyber' ? 'bg-transparent border border-[#10B981] animate-pulse' : 'bg-zinc-200 rounded-full'}`} />
                  <div className={`px-2 py-1 ${getBadgeClasses()} text-[10px]`}>Status: Active</div>
               </div>
               
               <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-4 w-full ${activeTheme === 'neobrutalist' ? 'bg-black rounded-none' : activeTheme === 'editorial' ? 'bg-[#2C332A]/10 rounded-sm' : activeTheme === 'cyber' ? 'bg-[#10B981]/20 border border-[#10B981]/30' : 'bg-zinc-200 rounded-lg'} ${i === 3 ? 'w-2/3' : ''}`} />
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
         {[
           { title: 'Typography', body: 'Font choices set the tone. Sans-serif implies modernity, Serif implies editorial trust.' },
           { title: 'Borders & Shadows', body: 'Deep, hard shadows scream Web3/Startup. Soft blurs feel like enterprise SaaS.' },
           { title: 'Color Palette', body: 'High contrast causes urgency. Muted, low-contrast palettes feel luxurious and calm.' }
         ].map((feature, idx) => (
           <div key={idx} className={`${getCardClasses()} p-6`}>
             <h3 className={`${activeTheme === 'editorial' ? 'font-serif text-xl italic' : activeTheme === 'neobrutalist' ? 'font-black uppercase text-xl' : activeTheme === 'cyber' ? 'font-bold uppercase tracking-widest' : 'font-bold text-lg'}`}>
               {activeTheme === 'cyber' ? `// ${feature.title}` : feature.title}
             </h3>
             <p className={`mt-3 text-sm ${activeTheme === 'cyber' ? 'text-[#10B981]/70' : activeTheme === 'editorial' ? 'text-[#2C332A]/70 font-sans leading-relaxed' : 'text-zinc-600'}`}>
               {feature.body}
             </p>
           </div>
         ))}
      </div>
    </div>
  );
}
