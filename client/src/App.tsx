import './App.css'
import { Login, Hero, FooterC } from './components'

function App() {

  return (
    <>
    <section>
      <div className="image-section">
        <Hero/>
      </div>
      <div className="form">
        <Login/>
      </div>
    </section>
    <FooterC/>
    </>
  )
}

export default App
