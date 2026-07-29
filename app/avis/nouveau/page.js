import Navbar from "@/components/navbar";
import NouvelAvisPage from "@/components/nouveau-avis";
import { API_URL } from '@/service/api'
export default function Login() {
  return (
    <div>
      <Navbar/>
      <NouvelAvisPage/>
    </div>
  );
}