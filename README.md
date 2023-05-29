# Creador de Archivos

Este proyecto es un script de Node.js que genera automáticamente archivos de código repetitivo para un servicio y controlador en una aplicación NestJS. El objetivo principal es reducir la duplicación de código al generar automáticamente los archivos necesarios con base en las plantillas predefinidas.

El script toma como entrada los parámetros de entidad (entityName), nombre en minúsculas de la entidad (entityNameLC) y nombre del servicio (serviceName). Utiliza estas entradas para generar el código del servicio y controlador correspondientes.

## Uso

- Asegúrate de tener Node.js instalado en tu sistema.
- Clona este repositorio o descarga los archivos del proyecto.
- Navega al directorio del proyecto en tu terminal.
- Ejecuta el siguiente comando para instalar las dependencias:

```shell
npm install
```
- Configura las plantillas de código para el servicio y el controlador según tus necesidades en los archivos correspondientes.
- Ejecuta el siguiente comando para generar los archivos:

```shell
node main.js <entityName> <entityNameLC>
```
Sustituye <entityName> y <entityNameLC> con los valores deseados para tu entidad.
- Los archivos generados se guardarán en la ubicación especificada en el script.

## Plantillas de Código

En el directorio templates, encontrarás las plantillas de código para el servicio y el controlador. Puedes personalizar estas plantillas según tus necesidades, utilizando marcadores de posición para los valores dinámicos.

## Contribución

Si deseas contribuir a este proyecto, siéntete libre de enviar pull requests con mejoras, correcciones de errores o nuevas características. También puedes abrir issues para informar sobre problemas o sugerir nuevas ideas.

¡Espero que este script sea útil para automatizar la generación de archivos repetitivos en tu proyecto NestJS! Si tienes alguna pregunta, no dudes en contactarme.