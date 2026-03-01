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
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
  >
    <Link to={path} className="group block relative rounded-3xl overflow-hidden aspect-[3/4] md:aspect-[4/5]">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-go-dark via-go-dark/40 to-transparent opacity-80" />
      
      {/* Top badge */}
      <div className="absolute top-4 left-4 md:top-5 md:left-5">
        <div className="px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-display font-semibold tracking-wider uppercase">
          {title}
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground mb-1.5 leading-tight">{title}</h3>
            <p className="text-xs sm:text-sm text-primary-foreground/70 line-clamp-2 max-w-xs leading-relaxed">{description}</p>
          </div>
          <div className="flex-shrink-0 p-2.5 md:p-3 rounded-2xl gradient-go text-primary-foreground shadow-go group-active:scale-90 transition-transform">
            <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ServiceCard;
