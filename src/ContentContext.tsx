import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { SiteContent, defaultContent, loadContent, saveContent, resetContent, exportContent, importContent } from './content';

interface ContentContextType {
  content: SiteContent;
  isAdmin: boolean;
  updateContent: (path: string, value: any) => void;
  updateArrayItem: (path: string, index: number, field: string, value: any) => void;
  addArrayItem: (path: string, item: any) => void;
  removeArrayItem: (path: string, index: number) => void;
  save: () => void;
  reset: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
  hasUnsavedChanges: boolean;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadContent);
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#admin');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Listen for hash changes
  useEffect(() => {
    const handleHash = () => setIsAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const updateContent = useCallback((path: string, value: any) => {
    setContent(prev => {
      const keys = path.split('.');
      const newContent = JSON.parse(JSON.stringify(prev));
      let obj: any = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newContent;
    });
    setHasUnsavedChanges(true);
  }, []);

  const updateArrayItem = useCallback((path: string, index: number, field: string, value: any) => {
    setContent(prev => {
      const keys = path.split('.');
      const newContent = JSON.parse(JSON.stringify(prev));
      let obj: any = newContent;
      for (const key of keys) {
        obj = obj[key];
      }
      if (Array.isArray(obj) && obj[index]) {
        obj[index][field] = value;
      }
      return newContent;
    });
    setHasUnsavedChanges(true);
  }, []);

  const addArrayItem = useCallback((path: string, item: any) => {
    setContent(prev => {
      const keys = path.split('.');
      const newContent = JSON.parse(JSON.stringify(prev));
      let obj: any = newContent;
      for (const key of keys) {
        obj = obj[key];
      }
      if (Array.isArray(obj)) {
        obj.push(item);
      }
      return newContent;
    });
    setHasUnsavedChanges(true);
  }, []);

  const removeArrayItem = useCallback((path: string, index: number) => {
    setContent(prev => {
      const keys = path.split('.');
      const newContent = JSON.parse(JSON.stringify(prev));
      let obj: any = newContent;
      for (const key of keys) {
        obj = obj[key];
      }
      if (Array.isArray(obj)) {
        obj.splice(index, 1);
      }
      return newContent;
    });
    setHasUnsavedChanges(true);
  }, []);

  const save = useCallback(() => {
    saveContent(content);
    setHasUnsavedChanges(false);
  }, [content]);

  const reset = useCallback(() => {
    const fresh = resetContent();
    setContent(fresh);
    setHasUnsavedChanges(false);
  }, []);

  const exportData = useCallback(() => {
    return exportContent(content);
  }, [content]);

  const importData = useCallback((json: string) => {
    const result = importContent(json);
    if (result) {
      setContent(result);
      setHasUnsavedChanges(true);
      return true;
    }
    return false;
  }, []);

  return (
    <ContentContext.Provider value={{
      content,
      isAdmin,
      updateContent,
      updateArrayItem,
      addArrayItem,
      removeArrayItem,
      save,
      reset,
      exportData,
      importData,
      hasUnsavedChanges,
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
