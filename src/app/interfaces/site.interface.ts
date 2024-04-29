export interface SiteInterface {
    themeVariables: ThemeVariables;
    main: TextWithImage;
    news: NewsSettings;
    addresses: AddressesSettings;
    instructors: InstructorsSettings;
    services: ServicesSettings;
}

export interface ThemeVariables {
    backgroundColor: string;
    fontColor: string;
    accentColor: string;
}

export interface TextWithImage {
    img: string;
    title: string;
    text: string;
}

export interface NewsSettings {
    title: string;
    news: TextWithImage[];
}

// addresses

export interface Address {
    sportType: string;
    address: string;
}

export interface AddressesSettings {
    title: string;
    addresses: Address[];
}

// instructors

export interface Instructor {
    img: string;
    name: string;
    sportType: string;
    info: string;
}

export interface InstructorsSettings {
    title: string;
    instructors: Instructor[];
}

// services

export interface Service {
    sportType: string;
    text: string;
    address: string;
}

export interface ServicesSettings {
    title: string;
    services: Service[];
}
