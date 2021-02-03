export interface NavigationTab {
    tabName: string;
    tabId: string;
    icon?: string;
}

export enum ColumnType {
    STRING = 'string',
    NUMBER = 'number',
    DATE = 'date',
    BUTTON = 'button',
    DROPDOWN = 'dropdown'
}

export enum AreaOfInterest {
    BUT = 'BUT',
    Defense = 'DIFESA',
    FINANCE = 'FINANCE',
    IOT = 'IOT',
    INDUSTRY = 'INDUSTRY',
    PAC = 'PAC',
    PAL = 'PAL',
    Other = 'OTHER'
}

export enum Seniority {
    Junior = 'Junior',
    Middle = 'Middle',
    Senior = 'Senior',
    Expert = 'Expert'
}

export enum Skills {
    Java = 'Java',
    Angular = 'Angular',
    CSS = 'CSS',
    HTML = 'HTML',
    SpringBoot = 'SpringBoot',
    SQL = 'SQL',
    Typescript = 'Typescript',
    React = 'React',
    NgRx = 'NgRx'
}

export interface Column {
    type: ColumnType;
    field: string;
    text: string;
    sortable?: boolean;
    defaultContent?: (datum: any) => any;
}

export interface TableConfig {
    columns: Array<Column>;
}

export interface ButtonConfiguration {
    type?: ButtonType;
    icon?: string;
    text: string;
    disabled?: boolean;
    hidden?: boolean;
    onClick?: (e: MouseEvent, value?: any) => void;
}

export interface DropdownColumn {
    button: ButtonConfiguration;
    values: Array<ButtonConfiguration>;
}

export enum ButtonType {
    PRIMARY = 'btn-primary',
    SECONDARY = 'btn-secondary',
    DARK = 'btn-dark',
    LIGHT = 'btn-light',
    DANGER = 'btn-danger',
    OUTLINE_SECONDARY = 'btn-outline-secondary'
}

export const globalModalConfig = {
    animated: true,
    ignoreBackdropClick: true,
    backdrop: true
}

export interface Tab {
    id: string;
    name: string;
    onClick?: (value?: any) => void;
  }
