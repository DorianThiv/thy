

export enum ThyObjectStrings {
    Meters = 'meters',
    Locations = 'locations',
    Sites = 'locations',
    Groups = 'groups',
    Natures = 'natures',
    Dashboards = 'reports',
    Dashboardslist = 'reportlists',
    Folders = 'folders',
    Reports = 'reportbooks',
    Trends = 'trends',
    Trendgroups = 'trendgroups',
    Points = 'points',
    Devices = 'devices',
    DataProviders = 'dataproviders',
    Cabinets = 'devices',
    Alarms = 'alarms',
    AlarmsDefs = 'alarmdefs',
    AlarmsSources = 'alarmsources',
    Consumptions = 'consumptions',
    Degrees = 'degrees',
    Measures = 'measures',
    DeviceModels = 'device_models',
    Categories = 'categorys',
    Users = 'users',
    Units = 'units',
    Tariffs = 'tariffs',
    Customproperties = 'custompropertys',
    Securityroles = 'securityroles',
    Securityrights = 'securityrights',
    Udds = 'udds',
    Comments = 'comments',
    CommentCategorys = 'commentcategorys',
    Thresholds = 'thresholds',
    Plans = 'maps',
    EntityList = 'entitylist',
    ChronoProgram = 'chronoprograms',
    GroupToMeters = 'grouptometers',
    CommDrvs = 'commdrvs',
    UserGroups = 'usergroups'
}

/**
 * Define all entities types with an identifier.
 * Use it when you want resolve an entity by his type.
 */
export enum ThyObjectType {
    Meter = 0,
    Location = 1,
    Group = 3,
    Site = 4,
    Nature = 5,
    Dashboard = 6,
    Folder = 7,
    Report = 8,
    Trend = 9,
    TrendsGroup = 10,
    Device = 11,
    DashboardsList = 12,
    DataProvider = 13,
    Alarm = 14,
    Measure = 15,
    DeviceModel = 16,
    Category = 17,
    ChronoProgram = 18,
    User = 19,
    Unit = 20,
    Tariff = 21,
    Point = 22,
    AlarmsDefs = 23,
    AlarmsSources = 24,
    CustomProperties = 25,
    SecurityRoles = 26,
    SecurityRights = 27,
    Udds = 28,
    Comments = 29,
    CommentCategorys = 30,
    Thresholds = 31,
    Plan = 32,
    GroupToMeter = 33
}

export enum ThyObjectReferenceType {
    Meters = 'Meters',
    Locations = 'Locations',
    Groups = 'Groups',
    Trends = 'Trends',
    Points = 'Points',
    Udds = '-',
}

/**
 * Help to build consumption objects references
 */
export enum ThyConversionFunctionsStr {
    None = 'None',
    FinalEnergy = 'FinalEnergy',
    PrimaryEnergy = 'Primary',
    PrimaryEnergyFull = 'PrimaryEnergy',
    Carbon = 'Carbon',
    Cost = 'Cost',
    Area = 'Area',
    UnitPrice = 'UnitPrice',
    Average = 'Avg',
    Minimum = 'Min',
    Maximum = 'Max',
    Sum = 'Sum',
    AverageFull = 'Average',
    MinimumFull = 'Minimum',
    MaximumFull = 'Maximum',
}

export const TYPE_USAGE = {
    DEFAULT: 0,
    CHAUD: 1,
    FROID: 2,
    EAU: 3,
    IT: 4,
    ELECTRICITY: 5,
};

export const TYPE_FOLDER = {
    DASHBOARDS: 0,
    REPORTS: 2,
    TRENDGROUPS: 4,
    TRENDS: 100,
};

export enum ThyFolderType {
    Dashboards = 0,
    Plan = 1,
    Reports = 2,
    View = 3,
    TrendsGroups = 4,
    Trends = 100,
    Device = 200,
    DeviceLocation = 201,
}

