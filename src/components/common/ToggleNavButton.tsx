import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

type Props = {
  isOpen: boolean;
  toggleMenu: () => void;
};

function ToggleNavButton({ isOpen, toggleMenu }: Props) {
  return (
    <Button variant="ghost" className="sm:hidden" onClick={toggleMenu}>
      {isOpen ? <X /> : <Menu />}
    </Button>
  );
}

export default ToggleNavButton;
