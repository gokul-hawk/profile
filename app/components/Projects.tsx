"use client";

import React, { useState } from "react";
import projectsData from "@/app/static/projects.json";
import { ExternalLink, CheckCircle, FolderGit2, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  projectLink?: string;
}

export default function Projects() {
  const typedProjects: Project[] = projectsData as Project[];
  const [selectedProject, setSelectedProject] = useState<Project>(typedProjects[0]);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  const handleSelect = (project: Project) => {
    setSelectedProject(project);
    if (window.innerWidth < 1024) {
      setMobileModalOpen(true);
    }
  };

  return (
    <section id="projects" className="w-full min-h-screen py-20 px-4 md:px-12 bg-pista text-slate-800 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-emerald-600 font-semibold uppercase tracking-wider text-xs md:text-sm">Portfolio Showcase</span>
          <h2 className="text-2xl md:text-5xl font-extrabold text-slate-900 mt-1">Featured Projects</h2>
          <div className="w-16 md:w-24 h-1 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 mt-2 text-xs md:text-sm">Click a card to inspect details, or use the right-edge button to open the link directly.</p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Scrollable Project List with Right-Edge Link Buttons */}
          <div className="lg:col-span-5 space-y-3 max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-1">
            {typedProjects.map((project) => {
              const isSelected = selectedProject.id === project.id;
              return (
                <div
                  key={project.id}
                  onClick={() => handleSelect(project)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border flex items-center justify-between gap-3 text-left ${
                    isSelected
                      ? "bg-emerald-50 border-emerald-500 shadow-sm"
                      : "bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                  }`}
                >
                  {/* Left part of card: Icon and Title */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`p-2 rounded-lg shrink-0 ${isSelected ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-800"}`}>
                      <FolderGit2 size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-900 text-sm md:text-base truncate">{project.title}</h3>
                      <p className="text-xs text-slate-500 truncate">{project.description}</p>
                    </div>
                  </div>

                  {/* Right Edge Link Button (Only renders if projectLink exists) */}
                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()} // Prevents card selection trigger when clicking the button
                      className="shrink-0 p-2.5 rounded-lg bg-emerald-100 hover:bg-emerald-800 hover:text-white text-emerald-800 transition-colors shadow-2xs"
                      title="Open Project Link"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Detail View */}
          <div className="hidden lg:flex lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm sticky top-28 min-h-[580px] flex-col justify-between">
            <ProjectDetailsContent project={selectedProject} />
          </div>

        </div>

      </div>

      {/* Mobile Popup Modal */}
      {mobileModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-h-[85vh] sm:max-w-2xl rounded-t-3xl sm:rounded-3xl p-6 overflow-y-auto shadow-2xl relative animate-in fade-in slide-in-from-bottom duration-300">
            
            <button
              onClick={() => setMobileModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <ProjectDetailsContent project={selectedProject} />
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectDetailsContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-col h-full justify-between space-y-6">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-4">
          <div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
              Project Details
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
              {project.title}
            </h3>
          </div>

          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 text-white font-medium hover:bg-emerald-900 transition-all text-xs md:text-sm shrink-0 shadow-sm"
            >
              <span>View Source</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1">Overview</h4>
          <p className="text-slate-600 leading-relaxed text-xs md:text-sm">
            {project.description}
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Key Features</h4>
          <ul className="space-y-1.5">
            {project.keyFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 font-medium text-[11px] shadow-2xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}