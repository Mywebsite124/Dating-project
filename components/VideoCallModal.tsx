
import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { useAdmin } from '../context/AdminContext';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, onClose, planName }) => {
  const { settings } = useAdmin();
  const [isCalling, setIsCalling] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const userVideoRef = useRef<HTMLVideoElement>(null);

  // Use the first image as the "Live" profile picture
  const profilePic = settings.images[0] || "https://picsum.photos/seed/talk/400/400";

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsCalling(false);
        setIsAnswered(true);
        addMessage('ai', "Hey! I've been waiting for you to call. I'm so glad we finally have a moment together. ❤️");
      }, 2000);

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            if (userVideoRef.current) userVideoRef.current.srcObject = stream;
          })
          .catch(err => console.error("Camera access error:", err));
      }

      const interval = setInterval(() => {
        if (isAnswered) setCallDuration(prev => prev + 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
        if (userVideoRef.current?.srcObject) {
          (userVideoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
        }
      };
    }
  }, [isOpen, isAnswered]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addMessage = (role: 'user' | 'ai', text: string) => {
    setMessages(prev => [...prev, { role, text }]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isAiTyping) return;

    const userMsg = inputText.trim();
    setInputText('');
    addMessage('user', userMsg);
    
    setIsAiTyping(true);
    const aiResponse = await geminiService.generateResponse(userMsg, "Talk to me");
    setIsAiTyping(false);
    addMessage('ai', aiResponse || "Tell me more, I'm all ears.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-stone-950 flex flex-col md:flex-row overflow-hidden animate-in fade-in duration-300">
      <div className="relative flex-grow h-[65vh] md:h-full bg-stone-900 overflow-hidden group">
        {isCalling ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 animate-pulse">
             <div className="w-40 h-40 rounded-full bg-rose-600/20 border-4 border-rose-500 flex items-center justify-center p-1 overflow-hidden">
               <img src={profilePic} className="w-full h-full object-cover rounded-full" alt="Profile" />
             </div>
             <div className="text-center">
               <h2 className="text-3xl font-bold text-white mb-2">Connecting to my line...</h2>
               <p className="text-stone-400 font-medium tracking-widest uppercase text-xs">Secure Private Session</p>
             </div>
             <button onClick={onClose} className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
               <i className="fa-solid fa-phone-slash text-white text-xl"></i>
             </button>
          </div>
        ) : (
          <>
            <img 
              src={profilePic} 
              className="w-full h-full object-cover" 
              alt="Live Feed"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            
            <div className="absolute top-8 left-8 flex items-center space-x-4">
              <div className="bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 flex items-center space-x-3">
                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></div>
                <span className="text-white font-bold text-sm tracking-widest uppercase">{formatTime(callDuration)}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 text-white/80 text-xs font-bold uppercase tracking-widest">
                {planName} Session
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-8">
              <button className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl text-white border border-white/10 hover:bg-white/20 transition-all flex items-center justify-center">
                <i className="fa-solid fa-microphone-slash"></i>
              </button>
              <button onClick={onClose} className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-900/40 hover:scale-110 active:scale-95 transition-all">
                <i className="fa-solid fa-phone-slash text-2xl"></i>
              </button>
              <button className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl text-white border border-white/10 hover:bg-white/20 transition-all flex items-center justify-center">
                <i className="fa-solid fa-camera-rotate"></i>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="w-full md:w-[450px] bg-stone-900 flex flex-col border-l border-stone-800 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
        <div className="p-6">
          <div className="w-full aspect-video bg-stone-800 rounded-3xl overflow-hidden border border-stone-700 relative shadow-inner">
            <video ref={userVideoRef} autoPlay playsInline muted className="w-full h-full object-cover mirror" />
            <div className="absolute top-3 left-3 bg-black/60 px-3 py-1 rounded-full text-[10px] font-black text-white/70 uppercase tracking-widest">Your Camera</div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto px-6 space-y-6 py-4 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-[1.5rem] px-5 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                ? 'bg-rose-600 text-white rounded-br-none' 
                : 'bg-stone-800 text-stone-100 rounded-bl-none border border-stone-700'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isAiTyping && (
            <div className="flex justify-start">
              <div className="bg-stone-800/50 rounded-2xl px-5 py-3 flex items-center space-x-2 text-stone-500">
                <span className="text-[10px] font-bold uppercase tracking-tighter">Typing...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-stone-950/50">
          <form onSubmit={handleSendMessage} className="relative">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Message me..."
              className="w-full bg-stone-900 text-white border border-stone-800 rounded-2xl pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-sm"
            />
            <button 
              type="submit"
              disabled={!inputText.trim() || isAiTyping}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center disabled:opacity-30 hover:bg-rose-700"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .mirror { transform: scaleX(-1); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default VideoCallModal;
