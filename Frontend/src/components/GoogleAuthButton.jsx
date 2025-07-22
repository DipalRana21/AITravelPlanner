import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/custom/button';
 

export default function GoogleAuthButton({ onClick }) {
  return (
    <Button
    type="button"
      onClick={onClick}
      className="w-full mt-5 flex gap-4 items-center border font-semibold text-base"
      variant="outline"
    >
      <FcGoogle className="h-6 w-6" />
      Sign In with Google
    </Button>
  );
}
