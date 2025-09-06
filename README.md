# Azure OpenAI Authentication

As per docs, there are several ways to authenticate with the Azure OpenAI service and the recommended way is to use Microsoft Entra ID via the Azure Identity library.

## Getting Azure Environment Variables

### Creating a Service Principal

For other required values, you need to create a service principal:

```bash
az ad sp create-for-rbac --name "<sp-name>" --skip-assignment --sdk-auth
```

This outputs JSON containing clientId, clientSecret, and tenantId.
Save these values, you’ll map them to environment variables later.

### Assign roles at the Azure OpenAI resource scope

First, get the resource ID of your Azure OpenAI account

```bash
SCOPE=$(az resource show \
  --subscription <your-subscription-id> \
  --resource-group <your-resource-group> \
  --name <your-azure-openai-account-name> \
  --resource-type "Microsoft.CognitiveServices/accounts" \
  --query id -o tsv)
```

Then assign the Cognitive Services OpenAI User role so the SP can call the API:

```bash
az role assignment create \
  --assignee <clientId> \
  --role "Cognitive Services OpenAI User" \
  --scope "$SCOPE"
```

### Environment Variable Mapping

Map the service principal values to your environment variables:

| Service Principal Field | Environment Variable  |
| ----------------------- | --------------------- |
| `clientId`              | `AZURE_CLIENT_ID`     |
| `tenantId`              | `AZURE_TENANT_ID`     |
| `clientSecret`          | `AZURE_CLIENT_SECRET` |
