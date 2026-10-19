import { API_URL } from "../config/api";

interface RegisterData{
    email: string
    password: string
}

interface RegisterResponse{
    message: string;
    user?: {
        id: number;
        email: string;
        created_at: string;
    };
    error?: string;
}

export async function registerUser(data: RegisterData): Promise<RegisterResponse>{
    const response = await fetch(
        `${API_URL}/login.php`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                    },
            body: JSON.stringify(data),
        }
    )

    const result: RegisterResponse = await response.json()

    if(!response.ok){}
    throw new Error(
        result.error ?? "No se pudo crear la cuenta"
    );

    return result
}