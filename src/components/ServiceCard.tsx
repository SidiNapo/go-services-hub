import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  description: string;
  image: string;
  path: string;
  index: number;
}

const ServiceCard = ({ title, description, image, path, index }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link to={path} className="group block relative rounded-3xl overflow-hidden aspect-[4/5]">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-go-dark/90 via-go-dark/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">{title}</h3>
            <p className="text-sm text-primary-foreground/70 max-w-xs">{description}</p>
          </div>
          <div className="p-3 rounded-2xl gradient-go text-primary-foreground opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ServiceCard;
