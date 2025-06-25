"use client";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Conteúdo principal */}
        <div className="flex-1 bg-white rounded-lg shadow p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
