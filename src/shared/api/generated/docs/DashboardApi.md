# DashboardApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getDashboardOverview**](#getdashboardoverview) | **GET** /api/dashboard/overview | Obtener resumen del dashboard|
|[**getSystemHealth**](#getsystemhealth) | **GET** /api/dashboard/system-health | Obtener salud del sistema|
|[**getUrgentOrders1**](#geturgentorders1) | **GET** /api/dashboard/urgent-orders | Obtener órdenes urgentes|
|[**getVehicleStatusBreakdown**](#getvehiclestatusbreakdown) | **GET** /api/dashboard/vehicle-status | Obtener estado de vehículos|

# **getDashboardOverview**
> getDashboardOverview()

Proporciona estadísticas generales del sistema incluyendo vehículos, órdenes, depósitos y estado operacional

### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.getDashboardOverview();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Resumen del dashboard obtenido exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSystemHealth**
> getSystemHealth()

Calcula y devuelve puntuaciones de salud del sistema basadas en vehículos, incidentes y órdenes

### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.getSystemHealth();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Salud del sistema obtenida exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUrgentOrders1**
> Order getUrgentOrders1()

Devuelve las órdenes que vencen dentro del plazo especificado

### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

let hoursAhead: number; //Horas de anticipación para considerar urgente (optional) (default to 4)

const { status, data } = await apiInstance.getUrgentOrders1(
    hoursAhead
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **hoursAhead** | [**number**] | Horas de anticipación para considerar urgente | (optional) defaults to 4|


### Return type

**Order**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Órdenes urgentes obtenidas exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getVehicleStatusBreakdown**
> Vehicle getVehicleStatusBreakdown()

Devuelve un desglose de vehículos agrupados por su estado operativo

### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.getVehicleStatusBreakdown();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Vehicle**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Estado de vehículos obtenido exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

