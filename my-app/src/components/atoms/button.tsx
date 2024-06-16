import React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
  return <button type="submit" className="hover:bg-slate-700 bg-slate-100 text-slate-950 hover:text-white p-2 rounded-md hover:border-0 border border-slate-700">{children}</button>;

}
