# IncidentsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createIncident**](#createincident) | **POST** /api/incidents | Crear nuevo incidente|
|[**deleteIncident**](#deleteincident) | **DELETE** /api/incidents/{id} | Eliminar incidente|
|[**getActiveIncidents**](#getactiveincidents) | **GET** /api/incidents/active | Obtener incidentes activos|
|[**getActiveIncidentsForVehicle**](#getactiveincidentsforvehicle) | **GET** /api/incidents/active/vehicle/{vehicleId} | Obtener incidentes activos por vehículo|
|[**getAllIncidents**](#getallincidents) | **GET** /api/incidents | Obtener todos los incidentes|
|[**getIncidentById**](#getincidentbyid) | **GET** /api/incidents/{id} | Obtener incidente por ID|
|[**getIncidentsByDateRange**](#getincidentsbydaterange) | **GET** /api/incidents/date-range | Obtener incidentes por rango de fechas|
|[**getIncidentsByType**](#getincidentsbytype) | **GET** /api/incidents/type/{type} | Obtener incidentes por tipo|
|[**getIncidentsByVehicle**](#getincidentsbyvehicle) | **GET** /api/incidents/vehicle/{vehicleId} | Obtener incidentes por vehículo|
|[**getResolvedIncidents**](#getresolvedincidents) | **GET** /api/incidents/resolved | Obtener incidentes resueltos|

# **createIncident**
> Incident createIncident(incident)

Registra un nuevo incidente en el sistema

### Example

```typescript
import {
    IncidentsApi,
    Configuration,
    Incident
} from './api';

const configuration = new Configuration();
const apiInstance = new IncidentsApi(configuration);

let incident: Incident; //

const { status, data } = await apiInstance.createIncident(
    incident
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **incident** | **Incident**|  | |


### Return type

**Incident**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Incidente creado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteIncident**
> deleteIncident()

Elimina un incidente del sistema

### Example

```typescript
import {
    IncidentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IncidentsApi(configuration);

let id: string; //ID del incidente a eliminar (default to undefined)

const { status, data } = await apiInstance.deleteIncident(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del incidente a eliminar | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**404** | Incidente no encontrado |  -  |
|**200** | Incidente eliminado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getActiveIncidents**
> Array<Incident> getActiveIncidents()

Retorna todos los incidentes actualmente activos (no resueltos)

### Example

```typescript
import {
    IncidentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IncidentsApi(configuration);

const { status, data } = await apiInstance.getActiveIncidents();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Incident>**

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

# **getActiveIncidentsForVehicle**
> Array<Incident> getActiveIncidentsForVehicle()

Retorna incidentes activos de un vehículo específico

### Example

```typescript
import {
    IncidentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IncidentsApi(configuration);

let vehicleId: string; //ID del vehículo (default to undefined)

const { status, data } = await apiInstance.getActiveIncidentsForVehicle(
    vehicleId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **vehicleId** | [**string**] | ID del vehículo | defaults to undefined|


### Return type

**Array<Incident>**

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

# **getAllIncidents**
> Incident getAllIncidents()

Retorna la lista completa de incidentes registrados

### Example

```typescript
import {
    IncidentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IncidentsApi(configuration);

const { status, data } = await apiInstance.getAllIncidents();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Incident**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Lista de incidentes obtenida exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getIncidentById**
> Incident getIncidentById()

Retorna un incidente específico

### Example

```typescript
import {
    IncidentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IncidentsApi(configuration);

let id: string; //ID del incidente (default to undefined)

const { status, data } = await apiInstance.getIncidentById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del incidente | defaults to undefined|


### Return type

**Incident**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**404** | Incidente no encontrado |  -  |
|**200** | Incidente encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getIncidentsByDateRange**
> Array<Incident> getIncidentsByDateRange()

Retorna incidentes en un rango de fechas específico

### Example

```typescript
import {
    IncidentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IncidentsApi(configuration);

let startDate: string; //Fecha de inicio (ISO 8601) (default to undefined)
let endDate: string; //Fecha de fin (ISO 8601) (default to undefined)

const { status, data } = await apiInstance.getIncidentsByDateRange(
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

**Array<Incident>**

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

# **getIncidentsByType**
> Array<Incident> getIncidentsByType()

Retorna incidentes filtrados por tipo

### Example

```typescript
import {
    IncidentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IncidentsApi(configuration);

let type: 'TYPE_1' | 'TYPE_2' | 'TYPE_3'; //Tipo de incidente (default to undefined)

const { status, data } = await apiInstance.getIncidentsByType(
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **type** | [**&#39;TYPE_1&#39; | &#39;TYPE_2&#39; | &#39;TYPE_3&#39;**]**Array<&#39;TYPE_1&#39; &#124; &#39;TYPE_2&#39; &#124; &#39;TYPE_3&#39;>** | Tipo de incidente | defaults to undefined|


### Return type

**Array<Incident>**

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

# **getIncidentsByVehicle**
> Array<Incident> getIncidentsByVehicle()

Retorna todos los incidentes de un vehículo específico

### Example

```typescript
import {
    IncidentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IncidentsApi(configuration);

let vehicleId: string; //ID del vehículo (default to undefined)

const { status, data } = await apiInstance.getIncidentsByVehicle(
    vehicleId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **vehicleId** | [**string**] | ID del vehículo | defaults to undefined|


### Return type

**Array<Incident>**

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

# **getResolvedIncidents**
> Array<Incident> getResolvedIncidents()

Retorna todos los incidentes que han sido resueltos

### Example

```typescript
import {
    IncidentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IncidentsApi(configuration);

const { status, data } = await apiInstance.getResolvedIncidents();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Incident>**

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

