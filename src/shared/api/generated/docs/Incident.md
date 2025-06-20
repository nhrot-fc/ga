# Incident


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**vehicleId** | **string** |  | [optional] [default to undefined]
**type** | **string** |  | [optional] [default to undefined]
**occurrenceTime** | **string** |  | [optional] [default to undefined]
**resolutionTime** | **string** |  | [optional] [default to undefined]
**location** | [**Position**](Position.md) |  | [optional] [default to undefined]
**onSiteImmobilizationDuration** | [**IncidentOnSiteImmobilizationDuration**](IncidentOnSiteImmobilizationDuration.md) |  | [optional] [default to undefined]
**workshopRepairDuration** | [**IncidentOnSiteImmobilizationDuration**](IncidentOnSiteImmobilizationDuration.md) |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**resolved** | **boolean** |  | [optional] [default to undefined]
**position** | [**Position**](Position.md) |  | [optional] [default to undefined]
**timestamp** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { Incident } from './api';

const instance: Incident = {
    id,
    vehicleId,
    type,
    occurrenceTime,
    resolutionTime,
    location,
    onSiteImmobilizationDuration,
    workshopRepairDuration,
    description,
    resolved,
    position,
    timestamp,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
