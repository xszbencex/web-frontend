import {BrandDTO} from "./BrandDTO";

export type MonitorDTO = {
  id: number;
  name: string;
  brand: BrandDTO;
  aspectRatio: String;
  refreshRate: number;
  resolution: String;
  panelType: string;
  displaySize: number;
}
