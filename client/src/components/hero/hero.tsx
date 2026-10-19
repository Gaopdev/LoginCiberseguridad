import "./hero.css"
import { FaceBookLogo, HeroImage } from "../../assets"

export default function HeroComponent() {
    return(
        <>
        <div className="hero-section">
            <div className="hero-left">
                <img src={FaceBookLogo} alt="Facebook Logo"/>
                <h1>Explora <br />lo que <br /><span>más te <br />gusta</span>.</h1>
            </div>
            <div className="hero-right">
                <img src={HeroImage} alt="Hero" />
            </div>
        </div>
        
        </>
    )
}