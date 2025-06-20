# OrdersApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createOrder**](#createorder) | **POST** /api/orders | Crear nueva orden|
|[**deleteOrder**](#deleteorder) | **DELETE** /api/orders/{id} | Eliminar orden|
|[**getAllOrders**](#getallorders) | **GET** /api/orders | Obtener todas las órdenes|
|[**getCompletedOrders**](#getcompletedorders) | **GET** /api/orders/completed | Obtener órdenes completadas|
|[**getOrderById**](#getorderbyid) | **GET** /api/orders/{id} | Obtener orden por ID|
|[**getOrdersByDateRange**](#getordersbydaterange) | **GET** /api/orders/date-range | Obtener órdenes por rango de fechas|
|[**getOrdersByDueTime**](#getordersbyduetime) | **GET** /api/orders/due-by | Obtener órdenes por fecha límite|
|[**getOrdersByRadius**](#getordersbyradius) | **GET** /api/orders/radius | Obtener órdenes por radio|
|[**getOverdueOrders**](#getoverdueorders) | **GET** /api/orders/overdue | Obtener órdenes vencidas|
|[**getPendingOrders**](#getpendingorders) | **GET** /api/orders/pending | Obtener órdenes pendientes|
|[**getUrgentOrders**](#geturgentorders) | **GET** /api/orders/urgent | Obtener órdenes urgentes|
|[**recordDelivery**](#recorddelivery) | **PUT** /api/orders/{id}/deliver | Registrar entrega|

# **createOrder**
> Order createOrder(order)

Registra una nueva orden en el sistema

### Example

```typescript
import {
    OrdersApi,
    Configuration,
    Order
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let order: Order; //

const { status, data } = await apiInstance.createOrder(
    order
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **order** | **Order**|  | |


### Return type

**Order**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Orden creada exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteOrder**
> deleteOrder()

Elimina una orden del sistema

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: string; //ID de la orden a eliminar (default to undefined)

const { status, data } = await apiInstance.deleteOrder(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID de la orden a eliminar | defaults to undefined|


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
|**200** | Orden eliminada exitosamente |  -  |
|**404** | Orden no encontrada |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllOrders**
> Order getAllOrders()

Retorna la lista completa de órdenes registradas

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

const { status, data } = await apiInstance.getAllOrders();
```

### Parameters
This endpoint does not have any parameters.


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
|**200** | Lista de órdenes obtenida exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCompletedOrders**
> Array<Order> getCompletedOrders()

Retorna todas las órdenes que han sido completadas

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

const { status, data } = await apiInstance.getCompletedOrders();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Order>**

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

# **getOrderById**
> Order getOrderById()

Retorna una orden específica

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: string; //ID de la orden (default to undefined)

const { status, data } = await apiInstance.getOrderById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID de la orden | defaults to undefined|


### Return type

**Order**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Orden encontrada |  -  |
|**404** | Orden no encontrada |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getOrdersByDateRange**
> Array<Order> getOrdersByDateRange()

Retorna órdenes en un rango de fechas específico

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let startDate: string; //Fecha de inicio (ISO 8601) (default to undefined)
let endDate: string; //Fecha de fin (ISO 8601) (default to undefined)

const { status, data } = await apiInstance.getOrdersByDateRange(
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

**Array<Order>**

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

# **getOrdersByDueTime**
> Array<Order> getOrdersByDueTime()

Retorna órdenes que deben ser entregadas antes de una fecha específica

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let time: string; //Fecha límite (ISO 8601) (default to undefined)

const { status, data } = await apiInstance.getOrdersByDueTime(
    time
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **time** | [**string**] | Fecha límite (ISO 8601) | defaults to undefined|


### Return type

**Array<Order>**

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

# **getOrdersByRadius**
> Array<Order> getOrdersByRadius()

Retorna órdenes dentro de un radio específico desde una posición

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let x: number; //Coordenada X del centro (default to undefined)
let y: number; //Coordenada Y del centro (default to undefined)
let radius: number; //Radio de búsqueda (default to undefined)

const { status, data } = await apiInstance.getOrdersByRadius(
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

**Array<Order>**

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

# **getOverdueOrders**
> Array<Order> getOverdueOrders()

Retorna todas las órdenes que han superado su fecha límite

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

const { status, data } = await apiInstance.getOverdueOrders();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Order>**

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

# **getPendingOrders**
> Array<Order> getPendingOrders()

Retorna todas las órdenes que están pendientes de entrega

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

const { status, data } = await apiInstance.getPendingOrders();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Order>**

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

# **getUrgentOrders**
> Array<Order> getUrgentOrders()

Retorna órdenes que deben ser entregadas en las próximas horas

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let hoursAhead: number; //Horas hacia adelante para considerar urgente (optional) (default to 4)

const { status, data } = await apiInstance.getUrgentOrders(
    hoursAhead
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **hoursAhead** | [**number**] | Horas hacia adelante para considerar urgente | (optional) defaults to 4|


### Return type

**Array<Order>**

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

# **recordDelivery**
> Order recordDelivery()

Registra la entrega de una cantidad específica de GLP para una orden

### Example

```typescript
import {
    OrdersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OrdersApi(configuration);

let id: string; //ID de la orden (default to undefined)
let amount: number; //Volumen entregado (default to undefined)

const { status, data } = await apiInstance.recordDelivery(
    id,
    amount
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | ID de la orden | defaults to undefined|
| **amount** | [**number**] | Volumen entregado | defaults to undefined|


### Return type

**Order**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**404** | Orden no encontrada |  -  |
|**200** | Entrega registrada exitosamente |  -  |
|**400** | Cantidad de entrega inválida |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

