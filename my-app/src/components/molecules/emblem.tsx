import { TEmblem } from "@/types/emblem.type";
import { motion } from "framer-motion";

export default function Emblem(emblem: TEmblem) {
  return (
    <motion.div
      key={emblem.id}
      className="flex items-center bg-slate-700 w-full rounded-lg group hover:bg-green-800 hover:cursor-pointer shadow-lg duration-200 ease-out px-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * emblem.id }}
    >
      <div className="bg-slate-900 p-6 rounded-full my-2 group-hover:bg-green-700 duration-200 ease-out">
        <img src={emblem.image} alt={emblem.name} className="w-16 h-16" />
      </div>
      <h2 className="text-xl font-bold flex-1 text-center">{emblem.name}</h2>
    </motion.div>
  );
}
