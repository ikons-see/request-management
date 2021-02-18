export interface NavigationTab {
    tabName: string;
    tabId: string;
    icon?: string;
    href?: string;
}

export enum Role {
    admin = 'ROLE_ADMIN',
    requester = 'ROLE_REQUESTER',
    systemAdmin = 'ROLE_SYSADMIN'
}

export enum ColumnType {
    STRING = 'string',
    NUMBER = 'number',
    DATE = 'date',
    BUTTON = 'button',
    DROPDOWN = 'dropdown',
    STATUS = 'status'
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
    NgRx = 'NgRx',
    Other = "Other"
}

export enum RequestStatus {
    CREATED = 'CREATED',
    UPDATED = 'UPDATED',
    CLOSED = 'CLOSED',
    ON_GOING = 'ON_GOING',
    PENDING = 'PENDING',
    REJECTED = 'REJECTED',
    DELETED = 'DELETED'
}

export enum ActionType {
    edit = 'EDIT',
    close = 'CLOSE',
    reject = 'REJECT',
    pending = 'PENDING',
    on_going = 'ON_GOING',
    view = 'VIEW',
    history = 'HISTORY',
    delete = 'DELETE'
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
    action?: ActionType;
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

export interface JWTToken {
    id_token: string;
}