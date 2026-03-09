import React from 'react';
import { Award, Linkedin, User } from 'lucide-react';
import { REVIEW_BOARD } from '../constants';
import { PopOutCard } from './PopOutCard';
import { ScrollReveal } from './ScrollReveal';

const ReviewBoard: React.FC = () => {
    const renderReviewCard = (member: typeof REVIEW_BOARD[0]) => {
        const CardContent = (
            <div className="w-full h-full relative bg-nothing-card/90 border border-nothing-border transition-all duration-500 flex flex-col overflow-hidden group">
                {/* Decorative Background */}
                <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-retro-cyan/5 blur-3xl rounded-full"></div>

                {/* Image Section */}
                <div className="h-[60%] relative overflow-hidden bg-nothing-dark/50 border-b border-nothing-border/50">
                    {member.image ? (
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-retro-cyan/20">
                            <User className="w-20 h-20" />
                        </div>
                    )}

                    {/* Tech Scanlines */}
                    <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>
                </div>

                {/* Info Section */}
                <div className="flex-1 p-8 flex flex-col justify-center text-center relative z-10">
                    <h3 className="text-2xl font-bold font-mono mb-3 text-white group-hover:text-retro-cyan transition-colors">
                        {member.name}
                    </h3>
                    <div className="space-y-1">
                        <p className="text-retro-cyan text-sm font-mono uppercase tracking-widest">{member.role}</p>
                        <p className="text-retro-text/40 text-xs font-mono">{member.company}</p>
                    </div>

                    {/* Corner Tech Decor */}
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-retro-cyan/20 group-hover:border-retro-cyan/60 transition-colors duration-500"></div>
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-retro-cyan/20 group-hover:border-retro-cyan/60 transition-colors duration-500"></div>

                    {/* Visual LinkedIn Cue (Non-functional as card is clickable) */}
                    {member.linkedin && (
                        <div className="absolute top-4 right-4 text-retro-cyan/40 group-hover:text-retro-cyan transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </div>
                    )}
                </div>
            </div>
        );

        return (
            <PopOutCard depth={60} className="h-[450px]">
                {member.linkedin ? (
                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full cursor-pointer"
                    >
                        {CardContent}
                    </a>
                ) : (
                    CardContent
                )}
            </PopOutCard>
        );
    };

    return (
        <section id="review-board" className="py-32 bg-nothing-black relative overflow-hidden border-b border-nothing-border/30">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <div className="flex flex-col items-center mb-20 text-center">
                        <div className="flex items-center gap-3 mb-6">
                            <Award className="w-6 h-6 text-retro-cyan animate-pulse" />
                            <span className="text-retro-cyan font-mono text-sm tracking-[0.4em] uppercase">Paper Excellence</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold text-white font-sans tracking-tight mb-6">
                            REVIEW <span className="text-retro-cyan shadow-retro-cyan">BOARD</span>
                        </h2>
                        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-retro-cyan to-transparent rounded-full shadow-[0_0_15px_#A5F3FC]"></div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {REVIEW_BOARD.map((member) => (
                        <ScrollReveal key={member.id} delay={member.id * 100}>
                            {renderReviewCard(member)}
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewBoard;
