// Before you run the script, you need to
// 1. Install the azure-storage package: `npm install azure-storage`
// 2. Assign the storage connection string to the connectionString variable below

const azure = require('azure-storage');

let connectionString = "DefaultEndpointsProtocol=https;AccountName=apimstmyrvamtc3dsy8hsqtn;AccountKey=gHgjzwYY+77xTyFfvQWN3J6ckygJeBHs6UBxH0OK2Ht5fGf9Ci4MbAHZyMEi0q2OHS240hhe06wtJhpNZBw47Q==;EndpointSuffix=core.windows.net";

function generateSasToken(container, connectionString) {
  const blobName = "";
  let blobService = azure.createBlobService(connectionString);

  // Create a SAS token that expires in 60 days
  // Set start time to five minutes ago to avoid clock skew.
  let startDate = new Date();
  startDate.setMinutes(startDate.getMinutes() - 5);
  let expiryDate = new Date(startDate);
  expiryDate.setHours(startDate.getHours() + 24 * 60);

  permissions = azure.BlobUtilities.SharedAccessPermissions.READ +
    azure.BlobUtilities.SharedAccessPermissions.WRITE +
    azure.BlobUtilities.SharedAccessPermissions.DELETE +
    azure.BlobUtilities.SharedAccessPermissions.LIST;

  let sharedAccessPolicy = {
    AccessPolicy: {
      Permissions: permissions,
      Start: startDate,
      Expiry: expiryDate
    }
  };

  let sasToken = blobService.generateSharedAccessSignature(
    container,
    blobName,
    sharedAccessPolicy
  );

  return {
    token: sasToken,
    uri: blobService.getUrl(container, blobName, sasToken, true)
  };
}

const container = "content";
let tokenObject = generateSasToken(container, connectionString);
let url = `${tokenObject.uri}?${tokenObject.token}`;

console.log("SAS URL: ", url)
