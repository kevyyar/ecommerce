import { motion } from "framer-motion";

interface MobileNavProps {
  onClick: () => void;
}

export default function MobileNav({ onClick }: MobileNavProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col gap-1.5 p-2 cursor-pointer items-end"
      whileHover="hover"
    >
      <motion.div
        className="w-6 h-0.5 bg-black"
        variants={{
          hover: { width: "16px" },
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="w-4 h-0.5 bg-black"
        variants={{
          hover: { width: "24px" },
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="w-6 h-0.5 bg-black"
        variants={{
          hover: { width: "20px" },
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}
