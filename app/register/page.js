import Navbar from "@/components/navbar";
import RegisterPages from "@/components/form";
import { API_URL } from '@/service/api'

export default function Register() {
  return (
    <div>
      <Navbar/>
      <RegisterPages/>
    </div>
  );
}