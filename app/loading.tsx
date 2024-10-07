import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div
      className="
        flex items-center justify-center
        h-screen
        bg-primary text-foreground
        py-20 px-10 text-center
      "
    >
      <LoadingSpinner size={48} className="text-primary-foreground" />
    </div>
  );
}
