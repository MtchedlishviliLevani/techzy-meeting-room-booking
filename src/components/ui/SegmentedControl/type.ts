export type SegmentedOption<V extends string = string> = {
  label: string;
  value: V;
};

export type SegmentedControlProps<V extends string = string> = {
  
  label: string;
  options: readonly SegmentedOption<V>[];
  
  value?: V;
  
  defaultValue?: V;
  onValueChange?: (value: V) => void;
  hideLabel?: boolean;
  className?: string;
};
