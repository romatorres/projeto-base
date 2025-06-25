"use client";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="p-8">
        <div className="flex gap-6">
          {/* Conteúdo principal */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
