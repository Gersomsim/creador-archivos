import fs from 'fs';
import {serviceTemplate} from './templates/service.mjs'
import {controllerTemplate} from './templates/controller.mjs'


function generateService(entityName, entityNameLC, serviceName) {
    return serviceTemplate
        .replace(/{{entityName}}/g, entityName)
        .replace(/{{entityNameLC}}/g, entityNameLC)
        .replace(/{{serviceName}}/g, serviceName);
}
function generateController(entityName, entityNameLC, serviceName) {
    return controllerTemplate
        .replace(/{{entityName}}/g, entityName)
        .replace(/{{entityNameLC}}/g, entityNameLC)
        .replace(/{{serviceName}}/g, serviceName);
}

const [, , module, entityName, entityNameLC] = process.argv;

if (!entityName || !entityNameLC) {
    console.error('Missing: entityName, entityNameLC, serviceName');
    process.exit(1);
}

const serviceName = entityName;
const serviceCode = generateService(entityName, entityNameLC, serviceName);
const controllerCode = generateController(entityName, entityNameLC, serviceName);

const partialUrl = `../nest/proyecto/src/modules/${module}`
const controllerUrl = `${partialUrl}/controllers/${entityNameLC}.controller.ts`;
const serviceUrl = `${partialUrl}/services/${entityNameLC}.service.ts`;
fs.writeFileSync(serviceUrl, serviceCode);
fs.writeFileSync(controllerUrl, controllerCode);
