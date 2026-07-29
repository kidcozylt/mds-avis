import Navbar from "@/components/navbar";
import MesAvis from "@/components/mes-avis";
import { API_URL } from '@/service/api'

export default function MesAvisPage() {
  return (
    <div>
      <Navbar/>
      <MesAvis/>
    </div>
  );
}