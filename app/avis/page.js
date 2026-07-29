import Navbar from "@/components/navbar";
import Avis from "@/components/avis";
import Toast from "@/components/login-toast";
import { API_URL } from '@/service/api'

export default function AvisPage() {
  return (
    <div>
      <Navbar/>
      <Avis/>
      <Toast/>
    </div>
  );
}