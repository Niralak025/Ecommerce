import React, { createContext, useState } from 'react';

export const WebUrlContext = createContext<{
  currentUrl: string;
  setCurrentUrl: (url: string) => void;
}>({
  currentUrl: 'https://presidentirro.projectspreview.net/',
  setCurrentUrl: () => {},
});

export const WebUrlProvider = ({ children }: any) => {
  const [currentUrl, setCurrentUrl] = useState(
    'https://presidentirro.projectspreview.net/',
  );

  return (
    <WebUrlContext.Provider value={{ currentUrl, setCurrentUrl }}>
      {children}
    </WebUrlContext.Provider>
  );
};
