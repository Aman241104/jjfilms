"use client";

import React from "react";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Mail, Phone, MapPin, Camera, Video, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

const ContactPage = () => {
  return (
    <PageWrapper>
      <section className="pt-40 pb-20 px-6 min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left side: Content */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-9xl font-serif font-bold tracking-tighter mb-12"
              >
                LET'S <br /> CONNECT.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/50 max-w-md leading-relaxed mb-16"
              >
                Whether you're building an architectural masterpiece or planning a once-in-a-lifetime celebration, we're here to document it with precision and soul.
              </motion.p>

              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-6 group"
                >
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">Email Us</p>
                    <p className="text-lg">hello@jjfilms.studio</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center space-x-6 group"
                >
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">Call Us</p>
                    <p className="text-lg">+1 (555) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center space-x-6 group"
                >
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">Studio</p>
                    <p className="text-lg">Los Angeles, California</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right side: Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="glass p-8 md:p-12 rounded-[40px] border border-white/5"
            >
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2">Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-jjfilms-accent-wedding transition-colors outline-none text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2">Service</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-jjfilms-accent-wedding transition-colors outline-none text-white appearance-none">
                      <option className="bg-black">Real Estate</option>
                      <option className="bg-black">Wedding Film</option>
                      <option className="bg-black">Other Visuals</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-jjfilms-accent-wedding transition-colors outline-none text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-jjfilms-accent-wedding transition-colors outline-none text-white resize-none"
                  ></textarea>
                </div>

                <Magnetic>
                  <button 
                    type="submit"
                    className="w-full py-6 bg-white text-black rounded-full font-bold tracking-[0.2em] uppercase text-xs hover:bg-jjfilms-accent-wedding hover:text-white transition-all flex items-center justify-center space-x-3"
                  >
                    <span>Send Message</span>
                    <Send size={16} />
                  </button>
                </Magnetic>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Links Bar */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center space-x-4">
               <Camera />
               <span className="text-sm tracking-widest uppercase">Instagram</span>
             </div>
             <div className="flex items-center space-x-4">
               <Video />
               <span className="text-sm tracking-widest uppercase">Vimeo</span>
             </div>
             <div className="flex items-center space-x-4">
               <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.83 0 0 1 .8.11V9.42a7.27 7.27 0 0 0-1.01-.07 6.33 6.33 0 0 0-6.33 6.33 6.33 6.33 0 0 0 10.13 5.14 6.33 6.33 0 0 0 4.14-5.92V6.69Z"/></svg>
               <span className="text-sm tracking-widest uppercase">TikTok</span>
             </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ContactPage;
