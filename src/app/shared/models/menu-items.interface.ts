import { Icon } from "@visurel/iconify-angular";

export interface MenuItems{
    type: 'link' | 'subheading' | 'button';
    id?: 'all' | 'Activo' | 'Inactivo';
    icon?: Icon;
    label: string;
    value?: number;
    class?: {
        icon?: string;
    };
    size?: string;
}