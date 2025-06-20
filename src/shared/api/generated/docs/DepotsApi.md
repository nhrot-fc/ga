# DepotsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createDepot**](#createdepot) | **POST** /api/depots | Crear nuevo depósito|
|[**deleteDepot**](#deletedepot) | **DELETE** /api/depots/{id} | Eliminar depósito|
|[**getAllDepots**](#getalldepots) | **GET** /api/depots | Obtener todos los depósitos|
|[**getCurrentTotalGLP**](#getcurrenttotalglp) | **GET** /api/depots/glp/current-total | Obtener GLP total actual|
|[**getDepotById**](#getdepotbyid) | **GET** /api/depots/{id} | Obtener depósito por ID|
|[**getDepotsByLocationRange**](#getdepotsbylocationrange) | **GET** /api/depots/location-range | Obtener depósitos por rango de ubicación|
|[**getDepotsByRadius**](#getdepotsbyradius) | **GET** /api/depots/radius | Obtener depósitos por radio|
|[**getDepotsWithAvailableCapacity**](#getdepotswithavailablecapacity) | **GET** /api/depots/available | Obtener depósitos con capacidad disponible|
|[**getDepotsWithSufficientGLP**](#getdepotswithsufficientglp) | **GET** /api/depots/sufficient-glp/{requiredGLP} | Obtener depósitos con GLP suficiente|
|[**getTotalStorageCapacity**](#gettotalstoragecapacity) | **GET** /api/depots/capacity/total | Obtener capacidad total de almacenamiento|
|[**refillDepot**](#refilldepot) | **PUT** /api/depots/{id}/refill | Rellenar depósito|
|[**serveFromDepot**](#servefromdepot) | **PUT** /api/depots/{id}/serve | Servir GLP desde depósito|
|[**updateGLPLevel1**](#updateglplevel1) | **PUT** /api/depots/{id}/glp | Actualizar nivel de GLP|
|[**updateMinimumThreshold**](#updateminimumthreshold) | **PUT** /api/depots/{id}/threshold | Actualizar umbral mínimo|

# **createDepot**
> Depot createDepot(depot)

Registra un nuevo depósito en el sistema

### Example

```typescript
import {
    DepotsApi,
    Configuration,
    Depot
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

let depot: Depot; //

const { status, data } = await apiInstance.createDepot(
    depot
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **depot** | **Depot**|  | |


### Return type

**Depot**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Depósito creado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteDepot**
> deleteDepot()

Elimina un depósito del sistema

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

let id: string; //ID del depósito a eliminar (default to undefined)

const { status, data } = await apiInstance.deleteDepot(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del depósito a eliminar | defaults to undefined|


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
|**404** | Depósito no encontrado |  -  |
|**200** | Depósito eliminado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllDepots**
> Depot getAllDepots()

Retorna la lista completa de depósitos registrados

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

const { status, data } = await apiInstance.getAllDepots();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Depot**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Lista de depósitos obtenida exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCurrentTotalGLP**
> number getCurrentTotalGLP()

Retorna la cantidad total de GLP actualmente almacenada en todos los depósitos

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

const { status, data } = await apiInstance.getCurrentTotalGLP();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**number**

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

# **getDepotById**
> Depot getDepotById()

Retorna un depósito específico

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

let id: string; //ID del depósito (default to undefined)

const { status, data } = await apiInstance.getDepotById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del depósito | defaults to undefined|


### Return type

**Depot**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Depósito encontrado |  -  |
|**404** | Depósito no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDepotsByLocationRange**
> Array<Depot> getDepotsByLocationRange()

Retorna depósitos dentro de un rango geográfico específico

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

let minX: number; //Coordenada X mínima (default to undefined)
let maxX: number; //Coordenada X máxima (default to undefined)
let minY: number; //Coordenada Y mínima (default to undefined)
let maxY: number; //Coordenada Y máxima (default to undefined)

const { status, data } = await apiInstance.getDepotsByLocationRange(
    minX,
    maxX,
    minY,
    maxY
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **minX** | [**number**] | Coordenada X mínima | defaults to undefined|
| **maxX** | [**number**] | Coordenada X máxima | defaults to undefined|
| **minY** | [**number**] | Coordenada Y mínima | defaults to undefined|
| **maxY** | [**number**] | Coordenada Y máxima | defaults to undefined|


### Return type

**Array<Depot>**

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

# **getDepotsByRadius**
> Array<Depot> getDepotsByRadius()

Retorna depósitos dentro de un radio específico desde una posición

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

let x: number; //Coordenada X del centro (default to undefined)
let y: number; //Coordenada Y del centro (default to undefined)
let radius: number; //Radio de búsqueda (default to undefined)

const { status, data } = await apiInstance.getDepotsByRadius(
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

**Array<Depot>**

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

# **getDepotsWithAvailableCapacity**
> Array<Depot> getDepotsWithAvailableCapacity()

Retorna depósitos que tienen al menos la capacidad libre mínima especificada

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

let minCapacity: number; //Capacidad mínima libre requerida (default to undefined)

const { status, data } = await apiInstance.getDepotsWithAvailableCapacity(
    minCapacity
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **minCapacity** | [**number**] | Capacidad mínima libre requerida | defaults to undefined|


### Return type

**Array<Depot>**

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

# **getDepotsWithSufficientGLP**
> Array<Depot> getDepotsWithSufficientGLP()

Retorna depósitos que tienen al menos la cantidad requerida de GLP

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

let requiredGLP: number; //Cantidad mínima de GLP requerida (default to undefined)

const { status, data } = await apiInstance.getDepotsWithSufficientGLP(
    requiredGLP
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requiredGLP** | [**number**] | Cantidad mínima de GLP requerida | defaults to undefined|


### Return type

**Array<Depot>**

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

# **getTotalStorageCapacity**
> number getTotalStorageCapacity()

Retorna la capacidad total de almacenamiento de todos los depósitos

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

const { status, data } = await apiInstance.getTotalStorageCapacity();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**number**

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

# **refillDepot**
> Depot refillDepot()

Rellena un depósito a su capacidad máxima

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

let id: string; //ID del depósito (default to undefined)

const { status, data } = await apiInstance.refillDepot(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del depósito | defaults to undefined|


### Return type

**Depot**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**404** | Depósito no encontrado |  -  |
|**200** | Depósito rellenado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **serveFromDepot**
> Depot serveFromDepot()

Retira una cantidad específica de GLP del depósito

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

let id: string; //ID del depósito (default to undefined)
let requestedGLP: number; //Cantidad de GLP solicitada (default to undefined)

const { status, data } = await apiInstance.serveFromDepot(
    id,
    requestedGLP
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del depósito | defaults to undefined|
| **requestedGLP** | [**number**] | Cantidad de GLP solicitada | defaults to undefined|


### Return type

**Depot**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**404** | Depósito no encontrado |  -  |
|**200** | GLP servido exitosamente |  -  |
|**400** | Cantidad solicitada no disponible |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateGLPLevel1**
> Depot updateGLPLevel1()

Ajusta el nivel de GLP de un depósito (puede ser positivo o negativo)

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

let id: string; //ID del depósito (default to undefined)
let amount: number; //Cantidad a agregar/restar al nivel actual (default to undefined)

const { status, data } = await apiInstance.updateGLPLevel1(
    id,
    amount
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del depósito | defaults to undefined|
| **amount** | [**number**] | Cantidad a agregar/restar al nivel actual | defaults to undefined|


### Return type

**Depot**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**404** | Depósito no encontrado |  -  |
|**400** | Nivel resultante fuera de los límites permitidos |  -  |
|**200** | Nivel de GLP actualizado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateMinimumThreshold**
> Depot updateMinimumThreshold()

Actualiza el umbral mínimo de GLP para un depósito

### Example

```typescript
import {
    DepotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DepotsApi(configuration);

let id: string; //ID del depósito (default to undefined)
let threshold: number; //Nuevo umbral mínimo (default to undefined)

const { status, data } = await apiInstance.updateMinimumThreshold(
    id,
    threshold
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID del depósito | defaults to undefined|
| **threshold** | [**number**] | Nuevo umbral mínimo | defaults to undefined|


### Return type

**Depot**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**404** | Depósito no encontrado |  -  |
|**200** | Umbral actualizado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

