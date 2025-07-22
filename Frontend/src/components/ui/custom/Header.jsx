import { Link, useNavigate } from 'react-router-dom';
import { Button } from './button.jsx';

export default function Header() {

  const navigate = useNavigate();

  const handleLogout= async()=>{
    try {
      await axios.get("http://localhost:5000/api/users/logout",{
        withCredentials:true,
      });

      navigate("/auth");
      
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-6 py-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img src="/logoipsum-custom-logo.svg" alt="Logo" className="h-10 w-auto" />
      </div>

      <div>
        <Link to="/auth">
          <Button
            variant="dopamine"
            size="sm"
            className="rounded-full px-5 shadow-md hover:scale-105 transition-transform duration-200"
          >
            Logout
          </Button>
        </Link>
      </div>
    </header>
  );
}
