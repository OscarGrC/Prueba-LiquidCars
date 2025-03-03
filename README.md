# Prueba-LiquidCars
Prueba tecnica 

Ejercicio

Queremos desarrollar una pequeña aplicación que permita a un usuario autenticado subir un documento dentro de una plataforma existente. Esta plataforma es un gestor de casos que asocia a cada expediente (identificado con un literal tipo GAR25INS00001) una serie de documentos. Cada documento está identificado con un UUID e inicialmente no dispone de archivo alguno.
Lamentablemente no nos han podido pasar una especificación muy completa y sólo hemos logrado algunas piezas de información, gracias a un buen amigo hacker. 

Esta plataforma tiene un control de cupos, por lo que puede rechazar que un archivo se almacene en la nube. Si no lo rechaza, el archivo queda almacenado y el archivo se marca como proporcionado (provided). El servidor puede informar de la utilización actual de los cupos. 
Para no bloquear la web mientras el archivo se sube y se procesa (el back lo analiza) el proceso de subida es asíncrono. Para informar al usuario de que el archivo se ha procesado adecuadamente, se podrá emplear técnicas de polling o utilizar notificaciones websocket o una combinación de ambas.

Objetivo
El objetivo del ejercicio es el de analizar, diseñar e implementar hasta dónde pueda esta solución. Sabemos que el desafío no es menor en el tiempo dado, por lo que queda al criterio del examinado profundizar en las áreas que considere más relevantes si se ve obligado a priorizar actividades. 

Se evaluará tanto el entregable construido cómo la exposición verbal del trabajo de análisis, diseño y desarrollo realizado.

Datos

Hemos conseguido hackear un fichero de configuraciones de una aplicación que se conecta a este api. Creemos que proporciona ciertas configuraciones que nos podrán ser útiles.

export const environment = {
  production: false,
  security:false,  
  oauthClientId: '72cLnBmbyWrSqHiwrPPqXBptXxgp6UiO',
  redirectAfterLogin: 'dashboard',
  redirectAfterLogout: 'http://localhost:4200',
  redirectOAuthUrl: 'http://localhost:4200/library/auth',
  cacheBlockSize: 100, 
  loginType: 'oauth2-lc',
  oauthUrl: '',
  backend: {
    base: '/api/v1/',
    basev2: '/api/v2/',
    baseAdmin: '/admin/v1/',
    externalClient: '/externalClient/v1/',
    types: [ '/api/v1/','/admin/v1/', '/externalClient/v1/'], 
    url: 'https://be-dev-eu.lawyerty.es', 
  }, 
  websockets: {
    url: "lc-ws"
  },
};

Proceso de Login

En este proceso de hackeo, hemos capturado el endpoint y el usuario/contraseña que nos permite obtener los tokens de autenticación que necesitaremos para completar las llamadas al API del sistema.

curl --location '{url}/api/v1/security/login-direct/{{oauthClientId}}' \		
--header 'Content-Type: application/json' \						
--header 'Cookie: JSESSIONID={{JSESSIONI}}' \			
--data-raw '{											
    "email": "j.zaldo@gmail.com",								
    "pwd": ".Liquidcars1"									
}’																			

Esta llamada nos devuelve un payload cómo el siguiente, del que deberemos extraer los tokens correspondientes:
{
    "token": {
        "access_token": "xxxxx",
        "token_type": "Bearer",
        "expires_in": "86400",
        "ok": true
    },
    "userToken": {
        "token": "xxxxx",
        "expiration": 1740777435171
    }
}


El hacker nos ha conseguido 5 entornos de pruebas con los siguientes datos:


[
    {
        "tenantId": "94e07058-2239-4626-ba5d-0b88b975f280",
        "login": "1_asimovguy@gmail.com",
        "password": "asimovguy@gmail.com",
        "recordId": "RECORD01"
    },
    {
        "tenantId": "ac46f54b-c517-4093-a495-0be869ec3c7a",
        "login": "2_asimovguy@gmail.com",
        "password": "asimovguy@gmail.com",
        "recordId": "RECORD01"
    },
    {
        "tenantId": "90e10d9f-2bd5-49a6-9387-a3441861696e",
        "login": "3_asimovguy@gmail.com",
        "password": "asimovguy@gmail.com",
        "recordId": "RECORD01"
    },
    {
        "tenantId": "5c5dd24b-1b5b-49b6-9510-31977a34361b",
        "login": "4_asimovguy@gmail.com",
        "password": "asimovguy@gmail.com",
        "recordId": "RECORD01"
    },
    {
        "tenantId": "1ca8af69-fee6-4ebe-ab1a-55c4e182878b",
        "login": "5_asimovguy@gmail.com",
        "password": "asimovguy@gmail.com",
        "recordId": "RECORD01"
    }
]


Para las siguientes llamadas al api, deberemos proporcionar el access_token y el userToken obtenido del siguiente modo:


curl --location {url}/{{enpoint_path}} \						
--header 'X-LC-TOKEN: {{userToken}} \							
--header 'Authorization: Bearer {{AccessToken}} \					
--header 'Cookie: JSESSIONID={{JSESSIONI}}'\						
--data ''											

Endpoints
Nuestro hacker nos ha conseguido una documentación somera para completar las acciones que nos proponemos completar:

OBTENER MIS DATOS
curl --location {url}/externalClient/v1/dpm/users/me' \

BUSCAR EXPEDIENTES
curl --location 'http://localhost:8888/externalClient/v1/dpm/records/search' \
--data '{
    "textSearch":null,
    "engagement":null,
    "creation":null,
    "lastUpdate":null,
    "closure":null,
    "statuses":null,
    "processTypes":null,
    "visibility":null,
    "sortBy":"DT_ENGAGEMENT_ASC"
}'

OBTENER FICHEROS
curl --location {url}/externalClient/v1/dpm/records/{recordId}/documents' \

SUBIR UN FICHERO
curl --location '{url}/externalClient/v1/dpm/records/documents/{documentId}/file' \
--form 'file=@"/somefile.xxx"'

OBTENER EL ESTADO DE UN DOCUMENTO
curl --location '{url}/externalClient/v1/dpm/records/documents/{documentId}/status' \

OBTENER LAS CUOTAS DE UTILIZACIÓN DEL USUARIO
curl --location '{url}/externalClient/v1/tenants/features/usage' \

Bonus
Sabemos que el back utiliza notificaciones por websocket.
Para que nos identifique, debemos pasar en nuestra inicialización (tras el establecimiento del websocket), un mensaje con este formato, donde userId es el identificador de usuario (rguId) con el que estemos identificados en el tenant (la aplicación).

    const connectMessage = {
      userId: this.userId, // Registered user ID
      messageType: "Connect",
      properties: { locale: 'es' }
    };


