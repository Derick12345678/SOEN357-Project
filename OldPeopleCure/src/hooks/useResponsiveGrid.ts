import { useWindowDimensions } from "react-native";

interface GridConfig {
    minItemWidth?: number;
    gap?: number;
    horizontalPadding?: number;
}
export const useResponsiveGrid = (config?: GridConfig) => {
  const { width } = useWindowDimensions();

  const minItemWidth = config?.minItemWidth ?? 160;
  const gap = config?.gap ?? 12;
  const horizontalPadding = config?.horizontalPadding ?? 20;

  const availableWidth = width - horizontalPadding;

  // 👇 KEY FIX: don't include gap in divisor
  const numColumns = Math.max(
    1,
    Math.floor(availableWidth / minItemWidth)
  );

  // 👇 THEN subtract gaps AFTER
  const totalGapWidth = gap * (numColumns - 1);

  const itemWidth =
    (availableWidth - totalGapWidth) / numColumns;

  return {
    numColumns,
    itemWidth,
    gap,
  };
};