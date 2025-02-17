import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import useStore from "../../store/cart-store";

export default function CartCount() {
  const { cartItemCount, isLoading } = useStore();

  return (
    <div className="relative">
      <span
        className={cn(
          "transition-opacity duration-200",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      >
        ({cartItemCount})
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
