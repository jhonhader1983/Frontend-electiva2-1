import { useState } from "react"
import api from "./api/axios"

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {

      const res = await api.post("/auth/login", {
        email,
        password
      })

      console.log(res.data)

      localStorage.setItem("token", res.data.token)

      alert("Login exitoso")

    } catch (error) {
      console.log(error.response?.data)
      alert("Error en login")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 gap-4">

      <h1 className="text-5xl font-bold text-blue-600">
        MERN funcionando 🚀
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="p-2 rounded"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="p-2 rounded"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>

    </div>
  )
}

export default App