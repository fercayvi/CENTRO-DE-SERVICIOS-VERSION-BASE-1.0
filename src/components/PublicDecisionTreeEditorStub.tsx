import React from 'react';

interface PublicDecisionTreeEditorStubProps {
  tree: unknown[];
  serviceTitle: string;
  onSave: (tree: unknown[]) => void;
  onClose: () => void;
}

/**
 * Replacement used only by vite.public.config.ts.
 * The public portal is read-only and must not ship the admin canvas editor.
 */
export const DecisionTreeCanvasEditor: React.FC<PublicDecisionTreeEditorStubProps> = () => (
  <div
    role="status"
    className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-6"
  >
    <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
      <h2 className="text-lg font-bold text-slate-900">Editor no disponible</h2>
      <p className="mt-2 text-sm text-slate-600">
        La edición de diagramas solo está disponible en el panel administrativo.
      </p>
    </div>
  </div>
);
