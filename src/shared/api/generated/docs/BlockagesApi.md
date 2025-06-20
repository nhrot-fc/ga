# BlockagesApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createBlockage**](#createblockage) | **POST** /api/blockages | Crear nuevo bloqueo|
|[**deleteBlockage**](#deleteblockage) | **DELETE** /api/blockages/{id} | Eliminar bloqueo|
|[**getActiveBlockages**](#getactiveblockages) | **GET** /api/blockages/active | Obtener bloqueos activos|
|[**getActiveBlockagesAt**](#getactiveblockagesat) | **GET** /api/blockages/active/{dateTime} | Obtener bloqueos activos en fecha específica|
|[**getAllBlockages**](#getallblockages) | **GET** /api/blockages | Obtener todos los bloqueos|
|[**getBlockageById**](#getblockagebyid) | **GET** /api/blockages/{id} | Obtener bloqueo por ID|
|[**getBlockagesByDateRange**](#getblockagesbydaterange) | **GET** /api/blockages/date-range | Obtener bloqueos por rango de fechas|
|[**getBlockagesForSegment**](#getblockagesforsegment) | **GET** /api/blockages/segment | Obtener bloqueos en segmento|

# **createBlockage**
> Blockage createBlockage(blockage)

Registra un nuevo bloqueo en el sistema

### Example

```typescript
import {
    BlockagesApi,
    Configuration,
    Blockage
} from './api';

const configuration = new Configuration();
const apiInstance = new BlockagesApi(configuration);

let blockage: Blockage; //

const { status, data } = await apiInstance.createBlockage(
    blockage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **blockage** | **Blockage**|  | |


### Return type

**Blockage**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Bloqueo creado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteBlockage**
> deleteBlockage()

Elimina un bloqueo del sistema

### Example

```typescript
import {
    BlockagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BlockagesApi(configuration);

let id: number; //ID del bloqueo a eliminar (default to undefined)

const { status, data } = await apiInstance.deleteBlockage(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID del bloqueo a eliminar | defaults to undefined|


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
|**200** | Bloqueo eliminado exitosamente |  -  |
|**404** | Bloqueo no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getActiveBlockages**
> Array<Blockage> getActiveBlockages()

Retorna todos los bloqueos actualmente activos

### Example

```typescript
import {
    BlockagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BlockagesApi(configuration);

const { status, data } = await apiInstance.getActiveBlockages();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Blockage>**

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

# **getActiveBlockagesAt**
> Array<Blockage> getActiveBlockagesAt()

Retorna bloqueos activos en una fecha y hora específica

### Example

```typescript
import {
    BlockagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BlockagesApi(configuration);

let dateTime: string; //Fecha y hora para consultar (ISO 8601) (default to undefined)

const { status, data } = await apiInstance.getActiveBlockagesAt(
    dateTime
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **dateTime** | [**string**] | Fecha y hora para consultar (ISO 8601) | defaults to undefined|


### Return type

**Array<Blockage>**

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

# **getAllBlockages**
> Blockage getAllBlockages()

Retorna la lista completa de bloqueos registrados

### Example

```typescript
import {
    BlockagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BlockagesApi(configuration);

const { status, data } = await apiInstance.getAllBlockages();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Blockage**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Lista de bloqueos obtenida exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getBlockageById**
> Blockage getBlockageById()

Retorna un bloqueo específico

### Example

```typescript
import {
    BlockagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BlockagesApi(configuration);

let id: number; //ID del bloqueo (default to undefined)

const { status, data } = await apiInstance.getBlockageById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID del bloqueo | defaults to undefined|


### Return type

**Blockage**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Bloqueo encontrado |  -  |
|**404** | Bloqueo no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getBlockagesByDateRange**
> Array<Blockage> getBlockagesByDateRange()

Retorna bloqueos en un rango de fechas específico

### Example

```typescript
import {
    BlockagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BlockagesApi(configuration);

let startDate: string; //Fecha de inicio (ISO 8601) (default to undefined)
let endDate: string; //Fecha de fin (ISO 8601) (default to undefined)

const { status, data } = await apiInstance.getBlockagesByDateRange(
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

**Array<Blockage>**

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

# **getBlockagesForSegment**
> Array<Blockage> getBlockagesForSegment()

Retorna bloqueos que afectan un segmento específico de ruta

### Example

```typescript
import {
    BlockagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BlockagesApi(configuration);

let x1: number; //Coordenada X del punto inicial (default to undefined)
let y1: number; //Coordenada Y del punto inicial (default to undefined)
let x2: number; //Coordenada X del punto final (default to undefined)
let y2: number; //Coordenada Y del punto final (default to undefined)

const { status, data } = await apiInstance.getBlockagesForSegment(
    x1,
    y1,
    x2,
    y2
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **x1** | [**number**] | Coordenada X del punto inicial | defaults to undefined|
| **y1** | [**number**] | Coordenada Y del punto inicial | defaults to undefined|
| **x2** | [**number**] | Coordenada X del punto final | defaults to undefined|
| **y2** | [**number**] | Coordenada Y del punto final | defaults to undefined|


### Return type

**Array<Blockage>**

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

