export interface ColorStop {
  color: string;
  offset?: { unit: string; value: number };
  hint?: { unit: string; value: number };
}

export type PositionKeyword = 'center' | 'left' | 'right' | 'top' | 'bottom';

export interface PositionPropertyValue {
  type: 'keyword' | 'length';
  value: string;
}
