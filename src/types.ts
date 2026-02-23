export interface Position {
  x: number;
  y: number;
}

export interface CardDesign {
  background: string;
  type: 'color' | 'image' | 'gradient';
  
  logo: string | null;
  logoPosition: Position;
  logoSize: number;
  
  text: string;
  textColor: string;
  textPosition: Position;
  textSize: number;
  textFont: string;
  
  showQR: boolean;
  qrPosition: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

export interface OrderDetails {
  quantity: number;
  shippingName: string;
  shippingAddress: string;
}

export type WizardStep = 'design' | 'customize' | 'checkout';
