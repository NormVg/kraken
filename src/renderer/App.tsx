import React from 'react';

import './App.css';
// import HomePage from './components/HomePage';
// import HeaderBar from './components/HeaderBar';

import {
  EditorSidebarToggleProvider,
  EditorWorkSpaceDisplayProvider,
  EditorProjectPathProvider,
} from './context/EditorContext';

import { AppEHProvider } from './context/AppContext';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import { EditorScreenProvider } from './context/EditorScreenContext';
import { SideBarContextProvider } from './context/SideBarContext';
import {  FocusBarContextProvider } from './context/FocusBarContext';
import { TitleBarContextProvider } from './context/TitleBarContext';

export default function App() {
  return (
    <div className="App">
      <TitleBarContextProvider>
      <FocusBarContextProvider>
      <SideBarContextProvider>
      <EditorScreenProvider>
        <EditorProjectPathProvider>
          <EditorSidebarToggleProvider>
            <EditorWorkSpaceDisplayProvider>
              <AppEHProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                  </Routes>
                </Router>
              </AppEHProvider>
            </EditorWorkSpaceDisplayProvider>
          </EditorSidebarToggleProvider>
        </EditorProjectPathProvider>
      </EditorScreenProvider>
      </SideBarContextProvider>
      </FocusBarContextProvider>
      </TitleBarContextProvider>
    </div>
  );
}
