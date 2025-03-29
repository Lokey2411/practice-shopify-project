import './App.css'
import AppRouter from './routes'
import {ConfigProvider as AntDesignProvider} from "antd";

function App() {

  return (
    <AntDesignProvider>
      <AppRouter/>
      </AntDesignProvider> 
  )
}

export default App
