import React from 'react'
import { useRouter, useSearchParams } from "next/navigation";

const Signup = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");

        const res = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });
        const { success } = await res.json();

        if (success) {
            const nextUrl = searchParams.get("next");
            router.push(nextUrl ?? "/");
            router.refresh();
        } else {
            // Make your shiny error handling with a great user experience
            alert("Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" />
            </label>
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <button type="submit">Signup</button>
        </form>
    )
}

export default Signup