"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {}

function LoginPages({}: Props) {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const sendLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("user", user);
    localStorage.setItem("password", password);
    if (user === "abaduna") {
      if (password === "1234") {
        router.push("/admin");
      }
    }
  };
  return (
    <form onSubmit={sendLogin}>
      <div>
        <input
          placeholder="usuario"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          placeholder="contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="price"
          required
        />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default LoginPages;
