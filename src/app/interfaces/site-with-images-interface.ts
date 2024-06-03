export interface SiteWithImagesInterface {
    navigation: NavigationItems;
    themeVariables: ThemeVariables;
    main: TextWithImage;
    news: NewsSettings;
    addresses: AddressesSettings;
    instructors: InstructorsSettings;
    services: ServicesSettings;
}

export interface NavigationItems {
    logoImg?: File;
    companyName: string;
    description: string;
    news: string;
    addresses: string;
    instructors: string;
    services: string;
}

export interface ThemeVariables {
    backgroundColor: string;
    fontColor: string;
    accentColor: string;
}

export interface TextWithImage {
    img?: File;
    title: string;
    text: string;
}

export interface NewsSettings {
    title: string;
    news: TextWithImage[];
}

// addresses

export interface Address {
    description: string;
    address: string;
    alt: number; // высота
    lat: number; // ширина
}

export interface AddressesSettings {
    title: string;
    addresses: Address[];
}

// instructors

export interface Instructor {
    img?: File;
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
    buttonWording: string;
}

export interface ServicesSettings {
    title: string;
    services: Service[];
}
