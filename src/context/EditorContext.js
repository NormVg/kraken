import React, { createContext, useState, useContext } from 'react';

// Create the context
export const TheEditorContext = createContext();

// Create a provider component
export const EditorContextProvider = ({ children }) => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    return ( 
        <TheEditorContext.Provider value={{ isEditorOpen, setIsEditorOpen }}>
            {children}
        </TheEditorContext.Provider>
    );
};

// Create a custom hook to use the context
export const useEditorContext = () => {
    const context = useContext(TheEditorContext);
    if (!context) {
        throw new Error('useEditorContext must be used within an EditorContextProvider');
    }
    return context;
};
