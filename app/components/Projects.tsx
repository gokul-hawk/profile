"use client";

import React, { useState } from "react";
import projectsData from "@/app/static/projects.json";
import {
  ExternalLink,
  CheckCircle,
  FolderGit2,
  X,
  ArrowUpRight,
} from "lucide-react";

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

  const [selectedProject, setSelectedProject] = useState<Project>(
    typedProjects[0]
  );

  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  const handleSelect = (project: Project) => {
    setSelectedProject(project);

    if (window.innerWidth < 1024) {
      setMobileModalOpen(true);
    }
  };

  return (
    <section className="relative h-full w-full overflow-hidden bg-[#f7f8f5] text-slate-900">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.02]" />

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-16 lg:py-12">

        {/* Header */}
        <div className="mb-5 flex shrink-0 items-end justify-between gap-4 sm:mb-6 md:mb-7">

          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="h-px w-7 bg-emerald-500 sm:w-10" />

              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-600 sm:text-[10px]">
                Selected Work
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              Projects
            </h2>
          </div>

          <span className="hidden font-mono text-[10px] text-slate-400 sm:block">
            {typedProjects.length.toString().padStart(2, "0")} PROJECTS
          </span>
        </div>

        {/* Main Project Area */}
        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(260px,0.85fr)_minmax(0,1.8fr)] lg:gap-5">

          {/* =====================================================
              PROJECT LIST
          ===================================================== */}

          <div className="min-h-0 overflow-y-auto pr-1">

            <div className="space-y-2">
              {typedProjects.map((project, index) => {
                const isSelected =
                  selectedProject.id === project.id;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => handleSelect(project)}
                    className={`
                      group
                      w-full
                      rounded-xl
                      border
                      p-3
                      text-left
                      transition-all
                      duration-300
                      sm:p-4
                      ${
                        isSelected
                          ? "border-emerald-400 bg-white shadow-md shadow-emerald-900/5"
                          : "border-slate-200 bg-white/60 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">

                      {/* Number */}
                      <span
                        className={`
                          hidden
                          font-mono
                          text-[10px]
                          sm:block
                          ${
                            isSelected
                              ? "text-emerald-600"
                              : "text-slate-300"
                          }
                        `}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Icon */}
                      <div
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          transition-all
                          duration-300
                          ${
                            isSelected
                              ? "bg-emerald-600 text-white"
                              : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100"
                          }
                        `}
                      >
                        <FolderGit2 size={17} />
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">

                        <h3
                          className={`
                            truncate
                            text-sm
                            font-bold
                            ${
                              isSelected
                                ? "text-slate-950"
                                : "text-slate-800"
                            }
                          `}
                        >
                          {project.title}
                        </h3>

                        <p className="mt-0.5 truncate text-[10px] text-slate-400 sm:text-xs">
                          {project.description}
                        </p>

                      </div>

                      {/* Arrow */}
                      <ArrowUpRight
                        size={15}
                        className={`
                          shrink-0
                          transition-all
                          duration-300
                          ${
                            isSelected
                              ? "translate-x-0 -translate-y-0 text-emerald-600"
                              : "text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500"
                          }
                        `}
                      />
                    </div>

                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-emerald-100">
                        <div className="h-full w-1/3 rounded-full bg-emerald-500" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              DESKTOP DETAILS
          ===================================================== */}

          <div className="hidden min-h-0 lg:flex">

            <ProjectDetailsContent
              project={selectedProject}
            />

          </div>
        </div>

        {/* Bottom hint */}
        <div className="mt-4 flex shrink-0 items-center justify-between border-t border-slate-200 pt-3">

          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400 sm:text-[10px]">
            Click a project to inspect
          </span>

          <span className="font-mono text-[9px] text-slate-400 sm:text-[10px]">
            2026
          </span>

        </div>
      </div>

      {/* =====================================================
          MOBILE MODAL
      ===================================================== */}

      {mobileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">

          <div
            className="
              relative
              flex
              max-h-[88vh]
              w-full
              flex-col
              overflow-hidden
              rounded-t-3xl
              bg-[#f7f8f5]
              shadow-2xl
              sm:mx-auto
              sm:max-w-2xl
              sm:rounded-3xl
            "
          >

            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-600">
                  Project Details
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-950">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setMobileModalOpen(false)}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-100
                  text-slate-600
                  transition-all
                  hover:bg-slate-200
                  hover:text-slate-950
                "
                aria-label="Close project details"
              >
                <X size={17} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="min-h-0 overflow-y-auto p-5">
              <ProjectDetailsContent
                project={selectedProject}
                mobile
              />
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   PROJECT DETAILS
============================================================ */

function ProjectDetailsContent({
  project,
  mobile = false,
}: {
  project: Project;
  mobile?: boolean;
}) {
  return (
    <div
      className={`
        flex
        h-full
        min-h-0
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white/80
        shadow-sm
        backdrop-blur-sm
        ${
          mobile
            ? "border-0 bg-transparent shadow-none"
            : "p-5 sm:p-6 md:p-7"
        }
      `}
    >

      {/* Desktop header */}
      {!mobile && (
        <div className="mb-5 flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 pb-5">

          <div>
            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-emerald-700">
              Project Details
            </span>

            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              {project.title}
            </h3>
          </div>

          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                bg-slate-950
                px-4
                py-2.5
                text-xs
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-emerald-700
              "
            >
              View Source
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      )}

      {/* Scrollable details */}
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">

        {/* Mobile project link */}
        {mobile && project.projectLink && (
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mb-5
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-slate-950
              px-4
              py-3
              text-xs
              font-medium
              text-white
              transition-colors
              hover:bg-emerald-700
            "
          >
            View Source
            <ExternalLink size={13} />
          </a>
        )}

        {/* Overview */}
        <div className="mb-6">

          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
              Overview
            </h4>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            {project.description}
          </p>

        </div>

        {/* Features */}
        <div className="mb-6">

          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
              Key Features
            </h4>
          </div>

          <div className="space-y-2.5">

            {project.keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5"
              >
                <CheckCircle
                  size={15}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <span className="text-xs leading-5 text-slate-600 sm:text-sm">
                  {feature}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* Tech Stack */}
        <div>

          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
              Tech Stack
            </h4>
          </div>

          <div className="flex flex-wrap gap-2">

            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="
                  rounded-lg
                  border
                  border-slate-200
                  bg-slate-50
                  px-2.5
                  py-1.5
                  text-[10px]
                  font-medium
                  text-slate-600
                  transition-colors
                  hover:border-emerald-200
                  hover:bg-emerald-50
                  hover:text-emerald-700
                "
              >
                {tech}
              </span>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}