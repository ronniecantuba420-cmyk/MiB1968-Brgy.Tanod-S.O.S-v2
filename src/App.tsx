/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AlertCircle, ArrowLeft, ShieldAlert } from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const mockIncidents = [
  { id: "1", type: "Robbery", location: "Zone 3", status: "Pending" },
  { id: "2", type: "Fire", location: "Zone 5", status: "High" },
];

/* ---------------- TYPES ---------------- */
type Navigation = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
};

/* ---------------- LOGIN ---------------- */
function LoginScreen({ navigation }: { navigation: Navigation }) {
  const [role, setRole] = useState("citizen");

  return (
    <div className="flex h-full flex-col justify-center bg-black p-6">
      <div className="mb-8 flex items-center gap-3">
        <ShieldAlert className="h-10 w-10 text-red-500" />
        <h1 className="text-4xl font-bold text-white">TanodNet AI</h1>
      </div>

      <p className="mb-4 text-lg text-gray-400">Select Role</p>

      <div className="mb-8 flex flex-row gap-6">
        <button onClick={() => setRole("citizen")}>
          <span className={`text-xl font-medium ${role === "citizen" ? "text-red-500" : "text-gray-500 hover:text-gray-300"}`}>
            Citizen
          </span>
        </button>

        <button onClick={() => setRole("tanod")}>
          <span className={`text-xl font-medium ${role === "tanod" ? "text-blue-500" : "text-gray-500 hover:text-gray-300"}`}>
            Tanod
          </span>
        </button>

        <button onClick={() => setRole("admin")}>
          <span className={`text-xl font-medium ${role === "admin" ? "text-green-500" : "text-gray-500 hover:text-gray-300"}`}>
            Admin
          </span>
        </button>
      </div>

      <button
        className="rounded-xl bg-red-600 p-4 shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
        onClick={() => {
          if (role === "citizen") navigation.navigate("CitizenHome");
          if (role === "tanod") navigation.navigate("TanodDashboard");
          if (role === "admin") navigation.navigate("AdminDashboard");
        }}
      >
        <span className="text-center text-xl font-semibold text-white">Enter</span>
      </button>
    </div>
  );
}

/* ---------------- CITIZEN ---------------- */
function CitizenHome({ navigation }: { navigation: Navigation }) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-black p-6">
      <h2 className="mb-10 text-2xl font-semibold text-white">Emergency Assistance</h2>

      <button
        className="flex h-48 w-48 items-center justify-center rounded-full bg-red-600 shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all hover:scale-105 active:scale-95"
        onClick={() => navigation.navigate("SOS")}
      >
        <span className="text-5xl font-bold tracking-wider text-white">SOS</span>
      </button>
      <p className="mt-8 text-center text-gray-400">Tap in case of emergency.</p>
    </div>
  );
}

function SOSScreen({ navigation }: { navigation: Navigation }) {
  return (
    <div className="flex h-full flex-col justify-center bg-black p-6">
      <div className="mb-10 flex flex-col items-center">
         <AlertCircle className="mb-4 h-20 w-20 text-red-500 animate-pulse" />
         <h2 className="text-3xl font-bold text-white">Confirm Emergency</h2>
         <p className="mt-2 text-center text-gray-400">Are you sure you want to send an emergency alert?</p>
      </div>

      <button
        className="rounded-xl bg-red-600 p-5 shadow-lg transition-all hover:scale-[1.02] active:scale-95"
        onClick={() => {
          alert("SOS Sent (mock)");
          navigation.goBack();
        }}
      >
        <span className="text-center text-xl font-bold text-white">Send SOS Now</span>
      </button>

      <button
        className="mt-4 rounded-xl border border-gray-700 bg-transparent p-5 transition-colors hover:bg-gray-800"
        onClick={() => navigation.goBack()}
      >
        <span className="text-center text-xl font-medium text-white">Cancel</span>
      </button>
    </div>
  );
}

/* ---------------- TANOD ---------------- */
function TanodDashboard({ navigation }: { navigation: Navigation }) {
  return (
    <div className="flex h-full flex-col bg-black p-6 pt-12">
      <h2 className="mb-6 text-3xl font-bold text-white">Active Incidents</h2>

      <div className="flex flex-col gap-4">
        {mockIncidents.map((item) => (
          <button
            key={item.id}
            onClick={() => navigation.navigate("IncidentDetails", { item })}
            className="flex flex-col items-start rounded-xl bg-zinc-900 p-5 text-left transition-colors hover:bg-zinc-800 active:bg-zinc-700"
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-xl font-semibold text-white">{item.type}</span>
              <span className="rounded bg-red-500/20 px-2 py-1 text-sm font-medium text-red-400 border border-red-500/30">
                {item.status}
              </span>
            </div>
            <span className="mt-2 text-base text-gray-400">{item.location}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function IncidentDetails({ route, navigation }: { route: any, navigation: Navigation }) {
  const { item } = route.params;

  return (
    <div className="flex h-full flex-col bg-black p-6 pt-12">
      <div className="mb-6 flex flex-col">
          <h2 className="text-4xl font-bold text-white">{item.type}</h2>
          <span className="mt-1 inline-block text-lg font-medium text-red-500">{item.status} Priority</span>
      </div>

      <div className="mb-8 rounded-lg bg-zinc-900 p-4">
         <span className="text-sm font-medium text-gray-400 mx-1">LOCATION</span>
         <p className="mt-1 text-2xl text-white">{item.location}</p>
      </div>

      <button className="mt-auto rounded-xl bg-blue-600 p-4 transition-colors hover:bg-blue-700 active:bg-blue-800" onClick={() => alert('Navigating... (mock)')}>
        <span className="text-center text-xl font-semibold text-white">
          Navigate there (mock)
        </span>
      </button>
    </div>
  );
}

/* ---------------- ADMIN ---------------- */
function AdminDashboard({ navigation }: { navigation: Navigation }) {
  return (
    <div className="flex h-full flex-col bg-black p-6 pt-12">
      <h2 className="mb-8 text-3xl font-bold text-white">Admin Panel</h2>

      <div className="grid gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <span className="text-sm tracking-wider text-gray-400">TOTAL INCIDENTS TODAY</span>
            <p className="mt-1 text-3xl font-semibold text-white">12</p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <span className="text-sm tracking-wider text-gray-400">ACTIVE RESPONDERS</span>
            <p className="mt-1 text-3xl font-semibold text-blue-400">5</p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <span className="text-sm tracking-wider text-gray-400">SYSTEM STATUS</span>
            <div className="mt-1 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-2xl font-semibold text-green-400">Operational</p>
            </div>
          </div>
      </div>
    </div>
  );
}

/* ---------------- APP ROOT ---------------- */
export default function App() {
  const [stack, setStack] = useState<Array<{ name: string; params: any }>>([
    { name: "Login", params: {} },
  ]);

  const navigate = (name: string, params: any = {}) => {
    setStack((prev) => [...prev, { name, params }]);
  };

  const goBack = () => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const currentScreen = stack[stack.length - 1];
  
  // Show back button on all screens except the root screens (Login, CitizenHome, TanodDashboard, AdminDashboard)
  const isRootScreen = ["Login", "CitizenHome", "TanodDashboard", "AdminDashboard"].includes(currentScreen.name);

  return (
    <div className="flex h-screen w-full flex-col bg-zinc-950 sm:items-center sm:justify-center sm:p-4 font-sans selection:bg-red-500/30">
      <div className="relative flex h-full w-full max-w-[420px] flex-col overflow-hidden bg-black shadow-2xl sm:h-[850px] sm:rounded-[2.5rem] sm:border-8 sm:border-zinc-900 ring-1 ring-white/10">
        
        {/* Top Navbar / Header area */}
        <div className="absolute top-0 z-10 flex h-16 w-full items-center justify-between px-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
          {!isRootScreen ? (
            <button
              onClick={goBack}
              className="group flex flex-row items-center gap-1 p-2 text-white/50 transition-colors pointer-events-auto hover:text-white"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          ) : (
            currentScreen.name !== "Login" && (
                <button
                    onClick={() => setStack([{ name: "Login", params: {} }])}
                    className="p-2 text-sm font-medium text-white/50 hover:text-white pointer-events-auto"
                >
                    Log out
                </button>
            )
          )}
        </div>

        {/* Screen Content Wrapper */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {currentScreen.name === "Login" && <LoginScreen navigation={{ navigate, goBack }} />}
          {currentScreen.name === "CitizenHome" && <CitizenHome navigation={{ navigate, goBack }} />}
          {currentScreen.name === "SOS" && <SOSScreen navigation={{ navigate, goBack }} />}
          {currentScreen.name === "TanodDashboard" && <TanodDashboard navigation={{ navigate, goBack }} />}
          {currentScreen.name === "IncidentDetails" && (
            <IncidentDetails route={{ params: currentScreen.params }} navigation={{ navigate, goBack }} />
          )}
          {currentScreen.name === "AdminDashboard" && <AdminDashboard navigation={{ navigate, goBack }} />}
        </div>
        
      </div>
    </div>
  );
}
