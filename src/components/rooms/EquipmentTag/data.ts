import {
  Cable,
  Presentation,
  Projector,
  Tv,
  Video,
  type LucideIcon,
} from "lucide-react";

export const EQUIPMENT_ICONS: Record<string, LucideIcon> = {
  TV: Tv,
  Projector: Projector,
  Whiteboard: Presentation,
  "Video Conferencing": Video,
  HDMI: Cable,
};
