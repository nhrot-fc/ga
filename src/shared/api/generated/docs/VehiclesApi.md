# VehiclesApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createVehicle**](#createvehicle) | **POST** /api/vehicles | Crear nuevo vehículo|
|[**deleteVehicle**](#deletevehicle) | **DELETE** /api/vehicles/{id} | Eliminar vehículo|
|[**getAllVehicles**](#getallvehicles) | **GET** /api/vehicles | Obtener todos los vehículos|
|[**getAvailableFleetGLP**](#getavailablefleetglp) | **GET** /api/vehicles/fleet/available-glp | Obtener GLP disponible en la flota|
|[**getAvailableVehicles**](#getavailablevehicles) | **GET** /api/vehicles/available | Obtener vehículos disponibles|
|[**getTotalFleetCapacity**](#gettotalfleetcapacity) | **GET** /api/vehicles/fleet/capacity | Obtener capacidad total de la flota|
|[**getVehicleById**](#getvehiclebyid) | **GET** /api/vehicles/{id} | Obtener vehículo por ID|
|[**getVehiclesByRadius**](#getvehiclesbyradius) | **GET** /api/vehicles/radius | Obtener vehículos por radio|
|[**getVehiclesByStatus**](#getvehiclesbystatus) | **GET** /api/vehicles/status/{status} | Obtener vehículos por estado|
|[**getVehiclesByType**](#getvehiclesbytype) | **GET** /api/vehicles/type/{type} | Obtener vehículos por tipo|
|[**updateGLPLevel**](#updateglplevel) | **PUT** /api/vehicles/{id}/glp | Actualizar nivel de GLP|
|[**updateVehiclePosition**](#updatevehicleposition) | **PUT** /api/vehicles/{id}/position | Actualizar posición del vehículo|
|[**updateVehicleStatus**](#updatevehiclestatus) | **PUT** /api/vehicles/{id}/status | Actualizar estado del vehículo|

# **createVehicle**
> Vehicle createVehicle(vehicle)

Crea un nuevo vehículo en el sistema

### Example

```typescript
import {
    VehiclesApi,
    Configuration,
    Vehicle
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

let vehicle: Vehicle; //

const { status, data } = await apiInstance.createVehicle(
    vehicle
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **vehicle** | **Vehicle**|  | |


### Return type

**Vehicle**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Vehículo creado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteVehicle**
> deleteVehicle()

Elimina un vehículo del sistema

### Example

```typescript
import {
    VehiclesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

let id: string; //ID del vehículo a eliminar (default to undefined)

const { status, data } = await apiInstance.deleteVehicle(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del vehículo a eliminar | defaults to undefined|


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
|**200** | Vehículo eliminado exitosamente |  -  |
|**404** | Vehículo no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllVehicles**
> Vehicle getAllVehicles()

Retorna una lista de todos los vehículos en el sistema

### Example

```typescript
import {
    VehiclesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

const { status, data } = await apiInstance.getAllVehicles();
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
|**200** | Lista de vehículos obtenida exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAvailableFleetGLP**
> number getAvailableFleetGLP()

Retorna el total de GLP disponible en vehículos disponibles

### Example

```typescript
import {
    VehiclesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

const { status, data } = await apiInstance.getAvailableFleetGLP();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | GLP disponible obtenido exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAvailableVehicles**
> Array<Vehicle> getAvailableVehicles()

Retorna todos los vehículos disponibles

### Example

```typescript
import {
    VehiclesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

const { status, data } = await apiInstance.getAvailableVehicles();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Vehicle>**

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

# **getTotalFleetCapacity**
> number getTotalFleetCapacity()

Retorna la capacidad total de GLP de todos los vehículos

### Example

```typescript
import {
    VehiclesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

const { status, data } = await apiInstance.getTotalFleetCapacity();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Capacidad total obtenida exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getVehicleById**
> Vehicle getVehicleById()

Retorna un vehículo específico por su ID

### Example

```typescript
import {
    VehiclesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

let id: string; //ID del vehículo (default to undefined)

const { status, data } = await apiInstance.getVehicleById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del vehículo | defaults to undefined|


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
|**404** | Vehículo no encontrado |  -  |
|**200** | Vehículo encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getVehiclesByRadius**
> Array<Vehicle> getVehiclesByRadius()

Retorna vehículos dentro de un radio específico

### Example

```typescript
import {
    VehiclesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

let x: number; //Coordenada X del centro (default to undefined)
let y: number; //Coordenada Y del centro (default to undefined)
let radius: number; //Radio de búsqueda (default to undefined)

const { status, data } = await apiInstance.getVehiclesByRadius(
    x,
    y,
    radius
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **x** | [**number**] | Coordenada X del centro | defaults to undefined|
| **y** | [**number**] | Coordenada Y del centro | defaults to undefined|
| **radius** | [**number**] | Radio de búsqueda | defaults to undefined|


### Return type

**Array<Vehicle>**

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

# **getVehiclesByStatus**
> Array<Vehicle> getVehiclesByStatus()

Retorna vehículos filtrados por estado

### Example

```typescript
import {
    VehiclesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

let status: 'AVAILABLE' | 'IN_TRANSIT' | 'MAINTENANCE' | 'BROKEN_DOWN'; //Estado del vehículo (default to undefined)

const { status, data } = await apiInstance.getVehiclesByStatus(
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **status** | [**&#39;AVAILABLE&#39; | &#39;IN_TRANSIT&#39; | &#39;MAINTENANCE&#39; | &#39;BROKEN_DOWN&#39;**]**Array<&#39;AVAILABLE&#39; &#124; &#39;IN_TRANSIT&#39; &#124; &#39;MAINTENANCE&#39; &#124; &#39;BROKEN_DOWN&#39;>** | Estado del vehículo | defaults to undefined|


### Return type

**Array<Vehicle>**

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

# **getVehiclesByType**
> Array<Vehicle> getVehiclesByType()

Retorna vehículos filtrados por tipo

### Example

```typescript
import {
    VehiclesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

let type: 'TA' | 'TB' | 'TC' | 'TD'; //Tipo de vehículo (default to undefined)

const { status, data } = await apiInstance.getVehiclesByType(
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **type** | [**&#39;TA&#39; | &#39;TB&#39; | &#39;TC&#39; | &#39;TD&#39;**]**Array<&#39;TA&#39; &#124; &#39;TB&#39; &#124; &#39;TC&#39; &#124; &#39;TD&#39;>** | Tipo de vehículo | defaults to undefined|


### Return type

**Array<Vehicle>**

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

# **updateGLPLevel**
> Vehicle updateGLPLevel()

Actualiza el nivel de GLP del vehículo (cantidad a agregar/quitar)

### Example

```typescript
import {
    VehiclesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

let id: string; //ID del vehículo (default to undefined)
let amount: number; //Cantidad de GLP a agregar (positivo) o quitar (negativo) (default to undefined)

const { status, data } = await apiInstance.updateGLPLevel(
    id,
    amount
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del vehículo | defaults to undefined|
| **amount** | [**number**] | Cantidad de GLP a agregar (positivo) o quitar (negativo) | defaults to undefined|


### Return type

**Vehicle**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Nivel de GLP actualizado exitosamente |  -  |
|**404** | Vehículo no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateVehiclePosition**
> Vehicle updateVehiclePosition(position)

Actualiza la posición actual del vehículo

### Example

```typescript
import {
    VehiclesApi,
    Configuration,
    Position
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

let id: string; //ID del vehículo (default to undefined)
let position: Position; //

const { status, data } = await apiInstance.updateVehiclePosition(
    id,
    position
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **position** | **Position**|  | |
| **id** | [**string**] | ID del vehículo | defaults to undefined|


### Return type

**Vehicle**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Posición actualizada exitosamente |  -  |
|**404** | Vehículo no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateVehicleStatus**
> Vehicle updateVehicleStatus()

Actualiza el estado operacional del vehículo

### Example

```typescript
import {
    VehiclesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehiclesApi(configuration);

let id: string; //ID del vehículo (default to undefined)
let status: 'AVAILABLE' | 'IN_TRANSIT' | 'MAINTENANCE' | 'BROKEN_DOWN'; //Nuevo estado del vehículo (default to undefined)

const { status, data } = await apiInstance.updateVehicleStatus(
    id,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del vehículo | defaults to undefined|
| **status** | [**&#39;AVAILABLE&#39; | &#39;IN_TRANSIT&#39; | &#39;MAINTENANCE&#39; | &#39;BROKEN_DOWN&#39;**]**Array<&#39;AVAILABLE&#39; &#124; &#39;IN_TRANSIT&#39; &#124; &#39;MAINTENANCE&#39; &#124; &#39;BROKEN_DOWN&#39;>** | Nuevo estado del vehículo | defaults to undefined|


### Return type

**Vehicle**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Estado actualizado exitosamente |  -  |
|**404** | Vehículo no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

