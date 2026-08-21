"use client";

import React from "react";
import { Mail, Code, Briefcase, Download, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const contactLinks = [
    {
      name: "Gmail",
      label: "gokulaudhayannv@gmail.com",
      href: "mailto:gokulaudhayannv@gmail.com",
      icon: <Mail className="w-5 h-5 text-emerald-700" />,
      actionText: "Send Email",
    },
    {
      name: "GitHub",
      label: "gokul-hawk",
      href: "https://github.com/gokul-hawk",
      icon: <Code className="w-5 h-5 text-emerald-700" />, // Replaced with Code icon
      actionText: "Visit Profile",
    },
    {
      name: "LinkedIn",
      label: "gokula-udhayan",
      href: "https://linkedin.com/in/gokula-udhayan",
      icon: <Briefcase className="w-5 h-5 text-emerald-700" />, // Replaced with Briefcase icon
      actionText: "Connect",
    },
  ];

  return (
    <section id="contact" className="w-full min-h-screen py-20 px-4 md:px-12 bg-slate-50 text-slate-800 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full text-center">
        
        {/* Section Header */}
        <span className="text-emerald-600 font-semibold uppercase tracking-wider text-xs md:text-sm">Get In Touch</span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-1">Let&apos;s Connect</h2>
        <div className="w-20 h-1 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
        <p className="text-slate-600 mt-3 text-sm md:text-base max-w-lg mx-auto">
          Find me on social platforms or download my latest resume below.
        </p>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {contactLinks.map((item) => (
            <div 
              key={item.name}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-between group"
            >
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 mb-6 break-all px-2">{item.label}</p>
              </div>

              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-800 hover:text-white text-emerald-800 font-medium text-xs transition-all shadow-2xs"
              >
                <span>{item.actionText}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* Resume Download Callout Box */}
        <div className="mt-10 bg-white border border-emerald-200 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-bold text-slate-900">Want to see my full history?</h3>
            <p className="text-sm text-slate-500 mt-1">Download my updated professional resume in PDF format.</p>
          </div>

          <a
            href="/resume.pdf"
            download="Gokul_Udhayan_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 text-white font-medium hover:bg-emerald-900 transition-all shadow-sm hover:scale-105 text-sm shrink-0 cursor-pointer"
          >
            <Download size={16} />
            <span>Download Resume</span>
          </a>
        </div>

      </div>
    </section>
  );
}