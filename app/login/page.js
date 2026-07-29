import Navbar from "@/components/navbar";
import LoginPages from "@/components/form-login";
import { API_URL } from '@/service/api'

export default function Login() {
  return (
    <div>
      <Navbar/>
      <LoginPages/>
    </div>
  );
}