export class WorksheetsRoutes {
  static path = {
    ENTRY: 'worksheet-entry',
    SUPPLY: 'supply',
    SERVICE: 'vehicle-service',
    OPEN: 'open',
    SERVICEPROVIDER: 'service-provider-selection',
    FLEETSELECTION: 'fleet-selection',
    VEHICLESELECTION: 'vehicle-selection',
    VEHICLECREATION: 'vehicle-creation',
    VEHICLESEARCH: 'vehicle-search',
    CONFIRM_LAYOUT: 'confirm-layout',
    SUPPLY_TAB_HEADER: 'header-tab',
    SUPPLY_TAB_TBR: 'tbr-tab',
    SUPPLY_TAB_PSR: 'psr-tab',
    SUPPLY_TAB_SERVICES: 'services-tab',
    SUPPLY_TAB_ATTACHMENTS: 'attachments-tab',
    SERVICE_TAB_HEADER: 'header-tab',
    SERVICE_TAB_LAYOUT: 'change-layout-tab',
    SERVICE_TAB_SERVICES: 'services-tab',
    SERVICE_TAB_SERVICE_VEHICLE: 'service-vehicle-tab',
    SERVICE_TAB_INSPECTION: 'inspection-tab',
    SERVICE_TAB_ATTACHMENTS: 'attachments-tab'

  };
  static url = {
    ENTRY: `/${WorksheetsRoutes.path.ENTRY}`,
    OPEN: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.OPEN}`,
    SUPPLY: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SUPPLY}`,
    SERVICE: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}`,
    SERVICEPROVIDERSUPPLY: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SUPPLY}/${WorksheetsRoutes.path.SERVICEPROVIDER}`,
    SERVICEPROVIDERSERVICE: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}/${WorksheetsRoutes.path.SERVICEPROVIDER}`,
    FLEETSELECTION: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SUPPLY}/${WorksheetsRoutes.path.FLEETSELECTION}`,
    VEHICLESELECTION: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}/${WorksheetsRoutes.path.VEHICLESELECTION}`,
    VEHICLECREATION: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}/${WorksheetsRoutes.path.VEHICLECREATION}`,
    VEHICLESEARCH: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}/${WorksheetsRoutes.path.VEHICLESEARCH}`,
    CONFIRM_LAYOUT: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}/${WorksheetsRoutes.path.CONFIRM_LAYOUT}`,
    SUPPLY_TAB_HEADER: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SUPPLY}/${WorksheetsRoutes.path.SUPPLY_TAB_HEADER}`,
    SUPPLY_TAB_TBR: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SUPPLY}/${WorksheetsRoutes.path.SUPPLY_TAB_TBR}`,
    SUPPLY_TAB_PSR: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SUPPLY}/${WorksheetsRoutes.path.SUPPLY_TAB_PSR}`,
    SUPPLY_TAB_SERVICES: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SUPPLY}/${WorksheetsRoutes.path.SUPPLY_TAB_SERVICES}`,
    SUPPLY_TAB_ATTACHMENTS: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SUPPLY}/${WorksheetsRoutes.path.SUPPLY_TAB_ATTACHMENTS}`,
    SERVICE_TAB_LAYOUT: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}/${WorksheetsRoutes.path.SERVICE_TAB_LAYOUT}`,
    SERVICE_TAB_HEADER: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}/${WorksheetsRoutes.path.SERVICE_TAB_HEADER}`,
    SERVICE_TAB_SERVICE_VEHICLE: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}/${WorksheetsRoutes.path.SERVICE_TAB_SERVICE_VEHICLE}`,
    SERVICE_TAB_SERVICES: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}/${WorksheetsRoutes.path.SUPPLY_TAB_SERVICES}`,
    SERVICE_TAB_ATTACHMENTS: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}/${WorksheetsRoutes.path.SERVICE_TAB_ATTACHMENTS}`,
    SERVICE_TAB_INSPECTION: `/${WorksheetsRoutes.path.ENTRY}/${WorksheetsRoutes.path.SERVICE}/${WorksheetsRoutes.path.SERVICE_TAB_INSPECTION}`
  };
}
