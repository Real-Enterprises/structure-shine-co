import {
  HugeiconsIcon,
  type HugeiconsIconProps,
  type IconSvgElement,
} from "@hugeicons/react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  Building,
  Calendar,
  Call,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Clock,
  Close,
  FolderOpen,
  Expand,
  Facebook,
  Hammer,
  Home,
  Image,
  Instagram,
  Key,
  Linkedin,
  Loader,
  LogOut,
  Mail,
  MapPin,
  Medal,
  Menu,
  MessageSquare,
  PaintRoller,
  Pause,
  Play,
  Settings,
  Star,
  User,
  VolumeOff,
  VolumeUp,
  Wrench,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

type PremiumIconProps = Omit<HugeiconsIconProps, "icon"> & {
  icon: IconSvgElement;
};

export const premiumIcons = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowUpRight: ArrowUpRight,
  mapPin: MapPin,
  calendar: Calendar,
  checkBadge: BadgeCheck,
  call: Call,
  mail: Mail,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  home: Home,
  building: Building,
  paint: PaintRoller,
  structure: Hammer,
  key: Key,
  wrench: Wrench,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  star: Star,
  play: Play,
  pause: Pause,
  volumeOn: VolumeUp,
  volumeOff: VolumeOff,
  award: Medal,
  clock: Clock,
  user: CircleUser,
  team: User,
  menu: Menu,
  close: Close,
  folder: FolderOpen,
  alert: AlertCircle,
  image: Image,
  loader: Loader,
  logout: LogOut,
  message: MessageSquare,
  expand: Expand,
  settings: Settings,
} satisfies Record<string, IconSvgElement>;

export const serviceIconMap: Record<string, IconSvgElement> = {
  Home: premiumIcons.home,
  Building2: premiumIcons.building,
  Paintbrush: premiumIcons.paint,
  HardHat: premiumIcons.structure,
  Key: premiumIcons.key,
  Wrench: premiumIcons.wrench,
};

export function PremiumIcon({
  icon,
  className,
  strokeWidth = 1.85,
  ...props
}: PremiumIconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

export function FilledStarIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
