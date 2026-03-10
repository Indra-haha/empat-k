export interface Menu {
    name: string;
    route: string;
    icon?: string;
    subMenus?: Menu[];
}