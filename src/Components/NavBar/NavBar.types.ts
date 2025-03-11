import { LinkProps } from "@mui/material";
import { ROUTES } from "./NanBar.constants";

export interface NavBarProps {
    activeHref: string;
}
export interface CustomLinkProps extends LinkProps {
    active?: boolean; 
  }

export type RouteKey = keyof typeof ROUTES