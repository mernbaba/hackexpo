import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Film, User, Calendar, Info } from 'lucide-react';
import { MEMORIES } from '../constants';
import { PopOutCard } from './PopOutCard';

interface ArchiveCardProps {
    item: typeof MEMORIES[0];
}

const ArchiveCard: React.FC<ArchiveCardProps & { onClick: () => void }> = ({ item, onClick }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (item.type === 'video' && videoRef.current) {
            if (isHovered) {
                videoRef.current.currentTime = 0;
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => { });
                }
            } else {
                videoRef.current.pause();
            }
        }
    }, [isHovered, item.type]);

    return (
        <div
            className="w-[320px] h-[220px] p-2 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <PopOutCard className="h-full" depth={30}>
                <div className={`
          w-full h-full relative group border bg-nothing-dark rounded-xl overflow-hidden transition-all duration-500
          ${isHovered ? 'border-retro-cyan shadow-[0_0_30px_rgba(165,243,252,0.2)]' : 'border-nothing-border'}
        `}>
                    {/* Media */}
                    <div className="absolute inset-0 z-0">
                        {item.type === 'video' ? (
                            <video
                                ref={videoRef}
                                src={item.src}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                muted
                                playsInline
                                loop
                            />
                        ) : (
                            <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        )}
                        <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-nothing-black via-transparent to-transparent opacity-80"></div>
                    </div>

                    {/* Info */}
                    <div className="absolute inset-0 z-10 p-4 flex flex-col justify-end">
                        <div className="flex items-center gap-2 mb-1">
                            {item.type === 'video' && <Film size={12} className="text-retro-cyan" />}
                            <span className="text-[10px] font-mono text-retro-cyan tracking-widest uppercase">
                                {item.type === 'image' ? 'IMG_ARCHIVE' : 'VID_ARCHIVE'}
                            </span>
                        </div>
                        <h3 className="text-sm font-bold text-white font-mono truncate">{item.title}</h3>
                        <p className="text-[10px] text-retro-text/60 font-mono mt-0.5 line-clamp-1">{item.desc}</p>
                    </div>

                    {/* Glitch Overlay */}
                    <div className={`absolute inset-0 bg-retro-cyan/5 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div className={`absolute top-0 left-0 w-full h-[1px] bg-retro-cyan/50 animate-scan-fast ${isHovered ? 'block' : 'hidden'}`}></div>
                </div>
            </PopOutCard>
        </div>
    );
};

const ArchiveRow = ({
    items,
    direction = 'left',
    speedMultiplier = 1,
    onItemClick
}: {
    items: typeof MEMORIES,
    direction?: 'left' | 'right',
    speedMultiplier?: number,
    onItemClick: (item: typeof MEMORIES[0]) => void
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollPosRef = useRef(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isManual, setIsManual] = useState(false);
    const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

    const duplicatedItems = useMemo(() => [...items, ...items], [items]);

    useEffect(() => {
        let animationId: number;
        let lastTime = performance.now();

        const animate = (currentTime: number) => {
            if (scrollRef.current && !isPaused && !isManual) {
                const deltaTime = currentTime - lastTime;
                const container = scrollRef.current;
                const halfWidth = container.scrollWidth / 2;

                // Base speed: half width in 40s
                const speed = (halfWidth / 40000) * deltaTime * speedMultiplier;

                if (direction === 'left') {
                    scrollPosRef.current += speed;
                    if (scrollPosRef.current >= halfWidth) scrollPosRef.current = 0;
                } else {
                    scrollPosRef.current -= speed;
                    if (scrollPosRef.current <= 0) scrollPosRef.current = halfWidth;
                }

                container.scrollLeft = scrollPosRef.current;
            } else if (scrollRef.current) {
                scrollPosRef.current = scrollRef.current.scrollLeft;
            }

            lastTime = currentTime;
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused, isManual, direction, speedMultiplier]);

    const handleManualAction = useCallback((action: () => void) => {
        setIsManual(true);
        setIsPaused(true);
        action();
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
            setIsManual(false);
            setIsPaused(false);
            resumeTimerRef.current = null;
        }, 1200);
    }, []);

    const scrollBy = (amount: number) => {
        handleManualAction(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
            }
        });
    };

    return (
        <div className="relative group/row py-4">
            {/* Visual Indicator for Manual Mode */}
            <div className={`absolute top-0 right-10 z-30 transition-opacity duration-300 ${isManual ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-retro-cyan/10 border border-retro-cyan/30 px-2 py-0.5 rounded text-[8px] font-mono text-retro-cyan animate-pulse">
                    MANUAL_OVERRIDE_ACTIVE
                </div>
            </div>

            <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-4 opacity-0 group-hover/row:opacity-100 transition-opacity">
                <button
                    onClick={() => scrollBy(-320)}
                    className="p-2 rounded-full bg-nothing-black/80 border border-retro-cyan/30 text-retro-cyan hover:bg-retro-cyan hover:text-nothing-black shadow-[0_0_15px_rgba(165,243,252,0.3)] transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
            </div>

            <div
                ref={scrollRef}
                onMouseEnter={() => {
                    setIsPaused(true);
                    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
                }}
                onMouseLeave={() => {
                    if (isManual) {
                        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
                        resumeTimerRef.current = setTimeout(() => {
                            setIsManual(false);
                            setIsPaused(false);
                            resumeTimerRef.current = null;
                        }, 1200);
                    } else {
                        setIsPaused(false);
                    }
                }}
                className={`flex overflow-x-auto scrollbar-hide px-4 ${isManual ? 'scroll-smooth snap-x snap-mandatory' : ''}`}
            >
                {duplicatedItems.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex-none snap-center">
                        <ArchiveCard item={item} onClick={() => onItemClick(item)} />
                    </div>
                ))}
            </div>

            <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-4 opacity-0 group-hover/row:opacity-100 transition-opacity">
                <button
                    onClick={() => scrollBy(320)}
                    className="p-2 rounded-full bg-nothing-black/80 border border-retro-cyan/30 text-retro-cyan hover:bg-retro-cyan hover:text-nothing-black shadow-[0_0_15px_rgba(165,243,252,0.3)] transition-all"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

const DualArchiveRows: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedItem, setSelectedItem] = useState<typeof MEMORIES[0] | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedItem(null);
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const topItems = useMemo(() => isMobile ? MEMORIES : MEMORIES.filter((_, i) => i % 2 === 0), [isMobile]);
    const bottomItems = useMemo(() => MEMORIES.filter((_, i) => i % 2 !== 0), []);

    return (
        <div className={`w-full py-10 ${isMobile ? 'space-y-6' : 'space-y-[60px]'}`}>
            <div className="relative">
                <ArchiveRow items={topItems} direction="left" onItemClick={(item) => setSelectedItem(item)} />
            </div>

            {!isMobile && (
                <div className="relative">
                    <ArchiveRow items={bottomItems} direction="right" onItemClick={(item) => setSelectedItem(item)} />
                </div>
            )}

            {/* Media Modal */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in"
                    onClick={() => setSelectedItem(null)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-nothing-black/90 backdrop-blur-xl"></div>

                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none"></div>

                    {/* Content Container */}
                    <div
                        className="relative w-full max-w-5xl aspect-video md:aspect-[16/9] bg-nothing-dark border border-retro-cyan/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(165,243,252,0.15)] group/modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Media Wrapper */}
                        <div className="w-full h-full relative">
                            {selectedItem.type === 'video' ? (
                                <video
                                    src={selectedItem.src}
                                    className="w-full h-full object-contain"
                                    controls
                                    autoPlay
                                />
                            ) : (
                                <img
                                    src={selectedItem.src}
                                    alt={selectedItem.title}
                                    className="w-full h-full object-contain"
                                />
                            )}

                            {/* Overlay Effects */}
                            <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>

                            {/* Header Info */}
                            <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-nothing-black/80 to-transparent flex justify-between items-start opacity-0 group-hover/modal:opacity-100 transition-opacity duration-300">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        {selectedItem.type === 'video' ? <Film size={14} className="text-retro-cyan" /> : null}
                                        <span className="text-[10px] font-mono text-retro-cyan tracking-[0.3em] uppercase">
                                            {selectedItem.type === 'image' ? 'IMAGE_ASSET' : 'VIDEO_FEED'}
                                        </span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-white font-mono">{selectedItem.title}</h2>
                                    <p className="text-xs text-retro-text/60 font-mono italic">{selectedItem.desc}</p>
                                </div>

                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="p-2 rounded-lg bg-retro-cyan/10 border border-retro-cyan/20 text-retro-cyan hover:bg-retro-cyan hover:text-nothing-black transition-all group/close"
                                >
                                    <div className="w-6 h-6 flex items-center justify-center font-mono font-bold text-lg leading-none group-hover/close:rotate-90 transition-transform">×</div>
                                </button>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-retro-cyan opacity-40"></div>
                            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-retro-cyan opacity-40"></div>
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-retro-cyan opacity-40"></div>
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-retro-cyan opacity-40"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Styles for hiding scrollbar */}
            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default DualArchiveRows;
