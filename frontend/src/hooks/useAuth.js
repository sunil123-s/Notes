import { useState,useEffect } from "react"

 const useAuth = () => {
  const [user, setuser] = useState(null)
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const userInfo = localStorage.getItem("userAuth")
    if(userInfo){
        setuser(JSON.parse(userInfo))
    }
    setloading(false)
  }, [])
  
  const logout = () => {
    setuser(null)
    localStorage.removeItem("userAuth")
  }
  return {user,setuser,loading,logout}
}

export default useAuth