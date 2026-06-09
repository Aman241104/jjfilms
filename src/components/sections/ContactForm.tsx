"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageWrapper } from "@/components/ui/PageWrapper";

gsap.registerPlugin(ScrollTrigger);

const floatingImgs = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=70", top: "5%",  right: "4%",  rotate: 4,  w: "140px" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=70", top: "38%", right: "12%", rotate: -5, w: "110px" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=70", top: "68%", right: "3%",  rotate: 3,  w: "130px" },
];

type FormState = "idle" | "sending" | "success" | "error";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-label text-ink-400 block mb-2">{label}</label>
    {children}
  </div>
);

const inputClass =
  "w-full border-b border-ink-200 bg-transparent py-3 text-ink-900 text-sm placeholder:text-ink-300 focus:border-ink-700 transition-colors outline-none";

export const ContactForm = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus]     = useState<FormState>("idle");
  const [errMsg, setErrMsg]     = useState("");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0, y: 25, stagger: 0.1, duration: 0.8, ease: "power3.out",
        clearProps: "opacity,transform",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <PageWrapper>
      {/* Hero heading */}
      <section className="bg-cream-50 pt-40 pb-16 px-8 md:px-14">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-label text-ink-300 mb-4">GET IN TOUCH</p>
          <h1
            className="font-display font-bold text-ink-900 leading-[0.95]"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)", letterSpacing: "-0.03em" }}
          >
            DO <em className="font-serif italic not-italic text-ink-400">you</em> NEED
            <br className="hidden md:block" />HELP?
          </h1>
        </div>
      </section>

      {/* Contact body */}
      <section
        ref={sectionRef}
        className="bg-cream-50 pb-28 px-8 md:px-14 relative overflow-hidden"
      >
        {/* Floating images */}
        <div className="absolute right-0 top-0 h-full hidden lg:block pointer-events-none w-72">
          {floatingImgs.map((img, i) => (
            <motion.div
              key={i}
              className="absolute rounded-sm overflow-hidden shadow-lg"
              style={{ top: img.top, right: img.right, width: img.w, aspectRatio: "3/4", rotate: img.rotate }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
            >
              <Image src={img.src} alt="" fill sizes="150px" className="object-cover" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[2fr_3fr] gap-16 items-start">
          {/* Left – photo + info */}
          <div>
            <div className="contact-reveal relative aspect-[3/4] rounded-sm overflow-hidden mb-8">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                alt="Contact"
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
            <div className="contact-reveal space-y-4">
              {[
                { label: "EMAIL",  val: "hello@jjfilms.studio",  href: "mailto:hello@jjfilms.studio" },
                { label: "PHONE",  val: "+1 (555) 123-4567",     href: "tel:+15551234567" },
              ].map(({ label, val, href }) => (
                <div key={label}>
                  <p className="text-label text-ink-300 mb-1">{label}</p>
                  <a href={href} className="text-ink-700 text-sm hover:text-ink-900 hover-underline transition-colors">{val}</a>
                </div>
              ))}
              <div>
                <p className="text-label text-ink-300 mb-1">STUDIO</p>
                <p className="text-ink-500 text-sm">Los Angeles, California</p>
              </div>
            </div>
          </div>

          {/* Right – form */}
          <div className="contact-reveal">
            <p className="text-ink-500 text-sm leading-relaxed mb-10 max-w-md">
              Do you have a crazy idea for a photo shoot? Don&apos;t hesitate to share — we love
              to work on unconventional briefs and bring bold creative ideas to life.
            </p>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 text-center"
              >
                <p
                  className="font-display italic text-ink-900 mb-4"
                  style={{ fontSize: "3.5rem", letterSpacing: "-0.02em" }}
                >
                  Thank you.
                </p>
                <p className="text-ink-400 text-sm">We&apos;ll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Field label="NAME">
                    <input name="name" value={formData.name} onChange={handleChange}
                      className={inputClass} placeholder="Your full name" required />
                  </Field>
                  <Field label="EMAIL">
                    <input name="email" type="email" value={formData.email} onChange={handleChange}
                      className={inputClass} placeholder="hello@example.com" required />
                  </Field>
                </div>
                <Field label="PHONE NUMBER">
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                    className={inputClass} placeholder="+1 000 000 0000" />
                </Field>
                <Field label="SERVICE">
                  <select name="service" value={formData.service} onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}>
                    <option value="" disabled>Select a service</option>
                    <option>Real Estate Photography</option>
                    <option>Product Photography</option>
                    <option>Events &amp; Weddings</option>
                    <option>Other / Not sure yet</option>
                  </select>
                </Field>
                <Field label="YOUR MESSAGE">
                  <textarea name="message" rows={4} value={formData.message} onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your project..." required />
                </Field>

                {status === "error" && (
                  <p className="text-sm text-red-500">{errMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center gap-3 text-label text-ink-900 hover:text-accent-ev transition-colors group interactive disabled:opacity-50"
                >
                  <span>{status === "sending" ? "Sending…" : "Send"}</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    ————→
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
