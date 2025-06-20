# MaintenanceApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**completeMaintenance**](#completemaintenance) | **PUT** /api/maintenance/{id}/complete | Completar mantenimiento|
|[**createMaintenance**](#createmaintenance) | **POST** /api/maintenance | Crear nuevo mantenimiento|
|[**getActiveMaintenance**](#getactivemaintenance) | **GET** /api/maintenance/active | Obtener mantenimientos activos|
|[**getActiveMaintenanceForVehicle**](#getactivemaintenanceforvehicle) | **GET** /api/maintenance/active/vehicle/{vehicleId} | Obtener mantenimientos activos por vehículo|
|[**getAllMaintenance**](#getallmaintenance) | **GET** /api/maintenance | Obtener todos los mantenimientos|
|[**getMaintenanceById**](#getmaintenancebyid) | **GET** /api/maintenance/{id} | Obtener mantenimiento por ID|
|[**getMaintenanceByType**](#getmaintenancebytype) | **GET** /api/maintenance/type/{type} | Obtener mantenimientos por tipo|
|[**getMaintenanceByVehicle**](#getmaintenancebyvehicle) | **GET** /api/maintenance/vehicle/{vehicleId} | Obtener mantenimientos por vehículo|
|[**getUpcomingMaintenance**](#getupcomingmaintenance) | **GET** /api/maintenance/upcoming | Obtener mantenimientos próximos|
|[**scheduleMaintenance**](#schedulemaintenance) | **POST** /api/maintenance/schedule | Programar mantenimiento|

# **completeMaintenance**
> Maintenance completeMaintenance()

Marca un mantenimiento como completado

### Example

```typescript
import {
    MaintenanceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MaintenanceApi(configuration);

let id: number; //ID del mantenimiento (default to undefined)

const { status, data } = await apiInstance.completeMaintenance(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID del mantenimiento | defaults to undefined|


### Return type

**Maintenance**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Mantenimiento completado exitosamente |  -  |
|**404** | Mantenimiento no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createMaintenance**
> Maintenance createMaintenance(maintenance)

Registra un nuevo mantenimiento en el sistema

### Example

```typescript
import {
    MaintenanceApi,
    Configuration,
    Maintenance
} from './api';

const configuration = new Configuration();
const apiInstance = new MaintenanceApi(configuration);

let maintenance: Maintenance; //

const { status, data } = await apiInstance.createMaintenance(
    maintenance
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **maintenance** | **Maintenance**|  | |


### Return type

**Maintenance**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Mantenimiento creado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getActiveMaintenance**
> Array<Maintenance> getActiveMaintenance()

Retorna todos los mantenimientos actualmente en curso

### Example

```typescript
import {
    MaintenanceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MaintenanceApi(configuration);

const { status, data } = await apiInstance.getActiveMaintenance();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Maintenance>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getActiveMaintenanceForVehicle**
> Array<Maintenance> getActiveMaintenanceForVehicle()

Retorna mantenimientos activos de un vehículo específico

### Example

```typescript
import {
    MaintenanceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MaintenanceApi(configuration);

let vehicleId: string; //ID del vehículo (default to undefined)

const { status, data } = await apiInstance.getActiveMaintenanceForVehicle(
    vehicleId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **vehicleId** | [**string**] | ID del vehículo | defaults to undefined|


### Return type

**Array<Maintenance>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllMaintenance**
> Maintenance getAllMaintenance()

Retorna la lista completa de mantenimientos registrados

### Example

```typescript
import {
    MaintenanceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MaintenanceApi(configuration);

const { status, data } = await apiInstance.getAllMaintenance();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Maintenance**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Lista de mantenimientos obtenida exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMaintenanceById**
> Maintenance getMaintenanceById()

Retorna un mantenimiento específico

### Example

```typescript
import {
    MaintenanceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MaintenanceApi(configuration);

let id: number; //ID del mantenimiento (default to undefined)

const { status, data } = await apiInstance.getMaintenanceById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID del mantenimiento | defaults to undefined|


### Return type

**Maintenance**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**404** | Mantenimiento no encontrado |  -  |
|**200** | Mantenimiento encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMaintenanceByType**
> Array<Maintenance> getMaintenanceByType()

Retorna mantenimientos filtrados por tipo

### Example

```typescript
import {
    MaintenanceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MaintenanceApi(configuration);

let type: 'PREVENTIVE' | 'CORRECTIVE'; //Tipo de mantenimiento (default to undefined)

const { status, data } = await apiInstance.getMaintenanceByType(
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **type** | [**&#39;PREVENTIVE&#39; | &#39;CORRECTIVE&#39;**]**Array<&#39;PREVENTIVE&#39; &#124; &#39;CORRECTIVE&#39;>** | Tipo de mantenimiento | defaults to undefined|


### Return type

**Array<Maintenance>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMaintenanceByVehicle**
> Array<Maintenance> getMaintenanceByVehicle()

Retorna todos los mantenimientos de un vehículo específico

### Example

```typescript
import {
    MaintenanceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MaintenanceApi(configuration);

let vehicleId: string; //ID del vehículo (default to undefined)

const { status, data } = await apiInstance.getMaintenanceByVehicle(
    vehicleId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **vehicleId** | [**string**] | ID del vehículo | defaults to undefined|


### Return type

**Array<Maintenance>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUpcomingMaintenance**
> Array<Maintenance> getUpcomingMaintenance()

Retorna mantenimientos programados en un rango de fechas

### Example

```typescript
import {
    MaintenanceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MaintenanceApi(configuration);

let startDate: string; //Fecha de inicio (ISO 8601) (default to undefined)
let endDate: string; //Fecha de fin (ISO 8601) (default to undefined)

const { status, data } = await apiInstance.getUpcomingMaintenance(
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startDate** | [**string**] | Fecha de inicio (ISO 8601) | defaults to undefined|
| **endDate** | [**string**] | Fecha de fin (ISO 8601) | defaults to undefined|


### Return type

**Array<Maintenance>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **scheduleMaintenance**
> Maintenance scheduleMaintenance()

Programa un nuevo mantenimiento para un vehículo

### Example

```typescript
import {
    MaintenanceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MaintenanceApi(configuration);

let vehicleId: string; //ID del vehículo (default to undefined)
let startDate: string; //Fecha de inicio (ISO 8601) (default to undefined)
let type: 'PREVENTIVE' | 'CORRECTIVE'; //Tipo de mantenimiento (default to undefined)

const { status, data } = await apiInstance.scheduleMaintenance(
    vehicleId,
    startDate,
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **vehicleId** | [**string**] | ID del vehículo | defaults to undefined|
| **startDate** | [**string**] | Fecha de inicio (ISO 8601) | defaults to undefined|
| **type** | [**&#39;PREVENTIVE&#39; | &#39;CORRECTIVE&#39;**]**Array<&#39;PREVENTIVE&#39; &#124; &#39;CORRECTIVE&#39;>** | Tipo de mantenimiento | defaults to undefined|


### Return type

**Maintenance**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

