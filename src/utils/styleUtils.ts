type AlignItemsType = 'flex-start' | 'flex-end' | 'center';
type JustifyContentType = 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'space-between';
type FlexDirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export const flexStyles = (
    alignItems?: AlignItemsType | undefined,
    justifyContent?: JustifyContentType | undefined,
    flexDirection?: FlexDirectionType | undefined,
) => {
  return {
    display: 'flex',
    alignItems,
    justifyContent,
    flexDirection,
  };
};
