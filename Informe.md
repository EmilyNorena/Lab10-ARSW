# Azure Function Fibonacci
A continuación evaluamos el desempeño de la Azure Function Fibonacci bajo 10 ejecuciones concurrentes utilizando Newman para ejecutar la colección de Postman en paralelo.

`seq 10 | xargs -n1 -P10 -I{} newman run FibonacciARSW.postman_collection1.json`

POST: `https://functionprojectfibonacciarsw-dve5cehqeuh2a9ac.canadacentral-01.azurewebsites.net/api/Fibonacci`

Body: `{"nth": 1000000}`

La Azure Function escala pero no instantáneamente. El tiempo más rápido fue de 13.9 s y el más lento 96.8 s. Esto representa una degradación de ×7 entre la mejor y la peor ejecución. 

## Conclusiones
1. La función soporta la concurrencia: todas las respuestas fueron 200 OK.
2. Se puede observar que la función no escala suficientemente rápido y se queda sin CPU.

