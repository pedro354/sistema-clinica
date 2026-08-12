import { X } from "lucide-react";
import { navigation } from "../data/navigation";
import { Button } from "../../../../Components/ui/Button/Button";


interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="">
      <div className="">
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={onClose}
            className=""
          >
            {item.name}
          </a>
        ))}

        <Button>
          Começar agora
        </Button>
      </div>
    </div>
  );
}