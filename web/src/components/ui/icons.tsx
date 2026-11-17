import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowReloadHorizontalIcon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  FastWindIcon,
  IdCardIcon,
  InformationCircleIcon,
  Location01Icon,
  Mail01Icon,
  Menu02Icon,
  PauseIcon,
  PlayIcon,
  ShieldCheckIcon,
} from "@hugeicons/core-free-icons";

/**
 * Site icon set, from Hugeicons (free, MIT). Size icons with Tailwind classes (e.g. `size-4`);
 * colour follows `currentColor`. Decorative by default (aria-hidden).
 */
export interface IconProps {
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean | "true" | "false";
}

export type Icon = (props: IconProps) => React.JSX.Element;

const make = (icon: IconSvgElement, name: string): Icon => {
  function SiteIcon({ className, strokeWidth = 1.5, "aria-hidden": ariaHidden = true }: IconProps) {
    return <HugeiconsIcon icon={icon} size={24} color="currentColor" strokeWidth={strokeWidth} className={className} aria-hidden={ariaHidden} focusable="false" />;
  }
  SiteIcon.displayName = name;
  return SiteIcon;
};

export const ArrowRight = make(ArrowRight02Icon, "ArrowRight");
export const ArrowLeft = make(ArrowLeft02Icon, "ArrowLeft");
export const ArrowUpRight = make(ArrowUpRight01Icon, "ArrowUpRight");
export const ChevronDown = make(ArrowDown01Icon, "ChevronDown");
export const Menu = make(Menu02Icon, "Menu");
export const X = make(Cancel01Icon, "X");
export const Mail = make(Mail01Icon, "Mail");
export const MapPin = make(Location01Icon, "MapPin");
export const Pause = make(PauseIcon, "Pause");
export const Play = make(PlayIcon, "Play");
export const AlertCircle = make(AlertCircleIcon, "AlertCircle");
export const CheckCircle2 = make(CheckmarkCircle02Icon, "CheckCircle2");
export const Info = make(InformationCircleIcon, "Info");

/** Lifecycle stage icons */
export const ShieldCheck = make(ShieldCheckIcon, "ShieldCheck");
export const IdCard = make(IdCardIcon, "IdCard");
export const Wind = make(FastWindIcon, "Wind");
export const RotateCcw = make(ArrowReloadHorizontalIcon, "RotateCcw");
