import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================= 1. CUSTOM VIDEO PLAYER =================
function CustomVideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative w-full max-w-md sm:max-w-lg mx-auto overflow-hidden rounded-2xl shadow-2xl bg-black z-20 aspect-square">
      <video
        ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
        poster={poster}
        controls={isPlaying}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer z-20"
          >
            <p
              aria-hidden="true"
              className="absolute z-10 font-script text-[4.5rem] leading-none text-[#f3e3ce]/25 -rotate-6 select-none sm:text-[6rem]"
            >
              i love you
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-20 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#58323E]/90 text-[#f3e3ce] shadow-2xl border-2 border-[#f3e3ce]/40 backdrop-blur-md transition-all group-hover:bg-[#43232E]"
              aria-label="Play Video"
            >
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 ml-1 fill-current text-[#f3e3ce] drop-shadow-md"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================= 2. MAIN APP COMPONENT =================
export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`w-full bg-[#3B0811] text-white ${showMain ? 'overflow-y-auto' : 'h-screen overflow-hidden'}`}>
      
      {/* ================= SECTION 1: THE ENVELOPE ================= */}
      <AnimatePresence>
        {!showMain && (
          <motion.section
            key="envelope-screen"
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-[#3B0811]"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-30 mb-1 font-hand text-3xl text-[#f3e3ce] drop-shadow-md sm:text-4xl"
            >
              open me!
            </motion.p>

            <div 
              className="relative flex h-52 w-72 items-center justify-center cursor-pointer overflow-hidden sm:h-56 sm:w-80"
              onClick={() => setIsEnvelopeOpened(true)}
            >
              <motion.img 
                src="/images/envelope-closed.png"
                alt="Closed Envelope"
                className="relative z-20 h-full w-full object-cover drop-shadow-2xl"
                animate={isEnvelopeOpened ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                onAnimationComplete={() => {
                  if (isEnvelopeOpened) {
                    setShowMain(true);
                  }
                }}
                whileHover={!isEnvelopeOpened ? { scale: 1.05 } : {}}
                whileTap={!isEnvelopeOpened ? { scale: 0.95 } : {}}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ================= SECTION 2: GREETING HERO ================= */}
      <section id="hero-section" className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden py-10">
        <div 
          className="absolute -left-2 top-0 h-full w-20 pointer-events-none z-30 opacity-95 sm:-left-4 sm:w-36"
          style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
        ></div>
        <div 
          className="absolute -right-2 top-0 h-full w-20 pointer-events-none z-30 opacity-95 sm:-right-4 sm:w-36"
          style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
        ></div>

        <p className="z-10 mt-8 font-serif text-sm uppercase tracking-[0.15em] text-[#f3e3ce] drop-shadow-sm max-w-xs sm:max-w-md">
          To the most beautiful girl!
        </p>
        
        <h1 className="z-10 my-2 font-script text-[6.5rem] leading-none text-[#f3e3ce] drop-shadow-md sm:text-[9rem]">
          Kanda
        </h1>
        
        <p className="z-10 font-serif text-sm uppercase tracking-[0.2em] text-[#f3e3ce] drop-shadow-sm">
          im sorry, love
        </p>

        <p className="z-10 mt-5 mb-2 font-sans text-[13px] text-white/90 tracking-wide sm:text-sm"></p>

        <div className="relative z-10 mt-10 h-64 w-[310px] sm:h-80 sm:w-[420px] flex items-end justify-center">
          <div className="absolute bottom-0 h-44 w-full bg-[#dcc6ad] rounded-md shadow-inner sm:h-56"></div>
          
          <div className="absolute bottom-28 left-4 z-10 h-44 w-32 -rotate-12 bg-white p-2 shadow-polaroid sm:bottom-36 sm:left-6 sm:h-56 sm:w-40">
            <img src="/images/photo2.jpg" className="h-full w-full object-cover" alt="Pic 1" />
          </div>
          <div className="absolute bottom-24 right-4 z-10 h-44 w-32 rotate-12 bg-white p-2 shadow-polaroid sm:bottom-32 sm:right-6 sm:h-56 sm:w-40">
            <img src="/images/photo1.jpg" className="h-full w-full object-cover" alt="Pic 2" />
          </div>

          <div 
            className="relative z-20 h-32 w-full bg-[#f3e3ce] shadow-[-2px_-4px_12px_rgba(0,0,0,0.08)] rounded-b-md sm:h-40"
            style={{ clipPath: 'polygon(0 0, 50% 15%, 100% 0, 100% 100%, 0 100%)' }}
          ></div>
        </div>

        <div className="z-10 mt-16 mb-8 rounded-full bg-[#58323E] px-14 py-3.5 font-serif text-sm uppercase tracking-[0.3em] text-[#f3e3ce] shadow-xl hover:scale-105 transition-transform cursor-pointer border border-[#f3e3ce]/20">
          I love u
        </div>
      </section>

      {/* ================= SECTION 3: VIDEO & LETTER ================= */}
      <section className="relative flex min-h-screen flex-col items-center justify-start sm:justify-center py-20 px-4 overflow-hidden">
        <div 
          className="absolute -left-2 top-0 h-full w-20 pointer-events-none z-30 opacity-95 sm:-left-4 sm:w-36"
          style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
        ></div>
        <div 
          className="absolute -right-2 top-0 h-full w-20 pointer-events-none z-30 opacity-95 sm:-right-4 sm:w-36"
          style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
        ></div>

        <div className="z-10 w-full px-2 max-w-4xl">
          <CustomVideoPlayer 
            src="/images/video.mp4" 
            poster="/images/poster.jpg"
          />
        </div>

        <div 
          className="z-10 mt-16 sm:mt-24 relative mx-auto aspect-[11/20] w-full max-w-[550px] drop-shadow-2xl flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage: "url('/images/lace paper.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="w-full pt-[24%] pb-[28%] px-[18%] translate-y-6 sm:translate-y-0 sm:pt-[22%] sm:pb-[26%] sm:px-[22%]">
            <p className="font-letter text-[16px] sm:text-2xl lg:text-3xl font-bold text-[#4a362f] mb-3 sm:mb-5">
              To my favorite person,
            </p>
            <p className="font-letter text-[11.5px] sm:text-[15px] lg:text-[17px] leading-[1.9] sm:leading-[2.2] font-bold text-[#4a362f]">
             ​حقك عليا يا كنده عارف إن كلامي أو تصرفي وجعك، ومش هحاول أبرر غلطي بكلام كتير ومالوش لازمه. أنا بس عايزك تعرفي إنك غالية عندي جداً وإن زعلك بيفرق معايا بجد. سامحيني المرة دي، وخلينا نرجع أحسن من الأول ولسا بحبك و عايزك معايا نفسي نرجع
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}