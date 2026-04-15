'use client';

import { useState, useEffect, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { createHighlighter } from 'shiki';
import { Download, Code2, Loader2, Zap, Layout, Monitor, Heart } from 'lucide-react';

export default function CodeToImage() {
  const [code, setCode] = useState('<?php\n\necho "Hello World!";\n\n?>');
  const [lang, setLang] = useState('php');
  const [theme, setTheme] = useState('github-dark');
  const [highlightedCode, setHighlightedCode] = useState('');
  const [highlighter, setHighlighter] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      try {
        const hl = await createHighlighter({
          themes: ['github-dark', 'github-light', 'nord', 'monokai'],
          langs: ['php', 'javascript', 'typescript', 'sql', 'css', 'html'],
        });
        setHighlighter(hl);
        setIsLoading(false);
      } catch (error) { console.error(error); }
    }
    init();
  }, []);

  useEffect(() => {
    if (highlighter && code) {
      const html = highlighter.codeToHtml(code, { 
        lang, 
        theme,
        structure: 'inline' 
      });
      setHighlightedCode(html);
    }
  }, [code, lang, theme, highlighter]);

  const handleExport = async () => {
    if (!previewRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(previewRef.current, { 
        pixelRatio: 3,
      });
      const link = document.createElement('a');
      link.download = `codesnap-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { alert("Gagal export!"); }
  };

  return (
    <div className="min-h-screen bg-[#faead3] text-black font-mono p-4 md:p-10 selection:bg-[#ffeb3b] flex flex-col">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#ffeb3b] border-4 border-black p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
            <Code2 className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
              Code<span className="text-[#e91e63]">SNAP</span>
            </h1>
            <p className="text-[10px] font-bold bg-black text-white px-2 py-1 mt-2 inline-block skew-x-[-10deg]">
              Koding secukupnya, estetik semampunya.
            </p>
          </div>
        </div>
        
        <button 
          onClick={handleExport}
          className="bg-[#4caf50] border-4 border-black px-10 py-4 font-black text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all active:shadow-none text-white"
        >
          <div className="flex items-center gap-2">
            <Download className="w-6 h-6" /> EXPORT PNG
          </div>
        </button>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 flex-grow">
        <div className="lg:col-span-4 space-y-8 self-start">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black mb-6 border-b-4 border-black pb-2 italic underline text-sm">CONFIG_PANEL</h2>
            <div className="space-y-6 font-bold text-sm">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-black italic">Language</label>
                <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full bg-white border-4 border-black p-4 outline-none focus:bg-[#ffeb3b] appearance-none cursor-pointer font-bold">
                  <option value="php">PHP_SOURCE</option>
                  <option value="javascript">JAVASCRIPT</option>
                  <option value="sql">MYSQL_QUERY</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-black italic">Color_Theme</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full bg-white border-4 border-black p-4 outline-none focus:bg-[#e91e63] focus:text-white appearance-none cursor-pointer font-bold">
                  <option value="github-dark">GITHUB_DARK</option>
                  <option value="monokai">MONOKAI_PRO</option>
                  <option value="nord">NORD_BLUE</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-4 py-2 bg-black border-b border-white/10">
              <span className="text-[10px] font-black tracking-[0.3em] text-[#ffeb3b]">/ RAW_CODE_INPUT</span>
              <Zap className="w-3 h-3 text-[#ffeb3b] animate-pulse" />
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ketik kodemu di sini..."
              spellCheck="false"
              className="w-full min-h-[300px] p-6 font-mono text-sm bg-white text-black outline-none resize-none placeholder:text-gray-300"
            />
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 md:p-12 border-4 border-black border-dashed bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] min-h-[600px]">
          {isLoading ? (
             <div className="flex flex-col items-center gap-3 animate-pulse">
                <Loader2 className="w-10 h-10 animate-spin text-green-600" />
                <span className="font-black italic uppercase underline text-sm">Initializing_Engine...</span>
             </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div ref={previewRef} className="p-0"> 
                {/* MACOS WINDOW */}
                <div className={`rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden min-w-[320px] md:min-w-[650px] ${theme.includes('dark') ? 'bg-[#0d1117]' : 'bg-white'}`}>
                  {/* HEADER BAR */}
                  <div className={`flex items-center px-5 py-4 border-b gap-3 ${theme.includes('dark') ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                    <div className="flex gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex-1 text-center pr-12 font-bold text-slate-400 text-[10px] tracking-[0.3em] uppercase italic opacity-60 flex items-center justify-center gap-2">
                      <Monitor className="w-3 h-3" /> {lang}.snap
                    </div>
                  </div>
                  {/* CODE BODY */}
                  <div className="relative">
                    <div 
                      className="p-10 pb-16 text-[14px] font-mono leading-relaxed overflow-x-auto max-w-[90vw] md:max-w-[700px]"
                      dangerouslySetInnerHTML={{ __html: highlightedCode }} 
                      style={{ background: 'transparent' }} 
                    />
                    {/* SIGNATURE DI DALAM HASIL SNAP */}
                    <div className="absolute bottom-4 right-6 flex items-center gap-2 opacity-30">
                      <div className="w-3 h-[1px] bg-slate-500"></div>
                      <span className="text-[8px] font-black tracking-[0.2em] text-slate-500 uppercase italic">
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 group cursor-crosshair">
                <div className="bg-black text-white px-10 py-3 font-black italic text-xl shadow-[6px_6px_0px_0px_rgba(233,30,99,1)] group-hover:shadow-[10px_10px_0px_0px_rgba(233,30,99,1)] transition-all uppercase tracking-widest text-sm">
                  Snap kodenya, pamerin hasilnya.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER DI PALING BAWAH HALAMAN */}
      <footer className="max-w-6xl mx-auto w-full mt-24 pb-16 pt-8 border-t-4 border-black flex items-center justify-center text-center">
        <div className="text-[12px] font-black uppercase tracking-[0.5em] italic">
          Designed and Developed by Hikmal Apriliano
        </div>
      </footer>
    </div>
  );
}
