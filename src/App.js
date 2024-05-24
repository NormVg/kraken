
import './App.css';
import MyEditor from './components/MyEditor';
import HomePage from './components/HomePage';
import HeaderBar from './components/HeaderBar';
import { useEditorContext } from './context/EditorContext';




function App() {
  const { isEditorOpen } = useEditorContext();

  return (
    <div className="App" >
      <HeaderBar />
      {isEditorOpen && <MyEditor />}
      {!isEditorOpen && <HomePage />}
    </div>
  );
}

export default App;
