import { Badge } from "@/components/ui";
import type { EquipmentTagProps } from "./type";
import { EQUIPMENT_ICONS } from "./data";

function EquipmentTag({ name, className = "" }: EquipmentTagProps) {
  return (
    <Badge icon={EQUIPMENT_ICONS[name]} className={className}>
      {name}
    </Badge>
  );
}

export default EquipmentTag;
