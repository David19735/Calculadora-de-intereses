Calculadora de intereses.

*Clonar el repositorio:
    git clone https://github.com/David19735/Calculadora-de-intereses

Instalar dependencias:
    npm install

Iniciar entorno de desarrollo:
    npm run build
    npm run sass:watch


*Tecnologías usadas:
    HTML
    SASS 
    JavaScript
    AOS (para animaciones)
    Chart.js (Gráficas)
    bootstrap-icons

*Lógica financiera y algoritmos:

    -Intereses simples:

    -Intereses compuestos:

    -Pago para no generar intereses con intereses
        El cálculo de los intereses es más bien una predicción de los intereses que puede llegar a generar un cliente en su próxima fecha de corte, ya que estos se calculan con un saldo diario promedio. 
        En estos el cliente puede ingresar su última fecha de corte y su próxima fecha de corte, dentro de ese periodo el cliente puede seleccionar fechas, nombres de conceptos y pagos o cargos a su cuenta. Esto hace que su saldo promedio cambie. 
        Para resolver este problema, lo que se realizó fue un array con objetos, cada objeto tenía la fecha de un día e iniciando el saldo era su último PPNGI. Además de que los calenadarios se van bloqueando según el periodo de su fecha de corte y también cada que el cliente agrega un movimiento no es posible regresar a algún día por detrás de ese.
        El cliente cada que ingresa un movimiento se suma o se resta, según sea cargo o abono, a los movimientos con fecha mayores o iguales a ese, mismo que se hace con un forEach, también es importante señalar que ese saldo no puede ser menor a 0.
        Una vez tengamos todos los días ya con su respectivo saldo diario, se itera con un for el array, se crea una variable para que se sumen dentro de la misma todos los saldos diarios y se dividan entre el número de días facturados, que es el .length del array. Por último para generar ese cálculo de intereses se usa la tasa de interés del cliente entre 360/100 por el número de días facturados por el saldo promedio diario.

        Es importante señalar que el cliente tiene que ingresar sus movimientos en órden cronológico debido a que el mismo cálculo de esos intereses solicita que sea así, es por eso mismo que el cliente cada que ingrese un movimiento, en su siguiente movimiento la fecha a escoger solo puede ser igual o mayor a esa, y también está restringida hasta su siguiente fecha de corte.

    -Tablas de amortización: 
        Para los préstamos con intereses, lo que se utiliza primero es el sistema francés de amortización para poder calcular el pago mensual.
        Primero, creo un array vacío, este llenara los campos dependiendo del número de meses en el que el cliente va a pagar, este mismo array lo hago iterar el número de meses, creo una variable donde resto el pago mensual menos el calculo de los intereses cobrados en ese mes, para el cálculo de estos intereses se utiliza la tasa de intereses del cliente dividida entre 360 por 30 días que es el número de días en un mes y se divide entre 100. 
        Este último monto calculado se resta al saldo remanente en cada una de la iteración, lo que genera que este saldo baje mes a mes y el cobro de los intereses también disminuya.
        Los demás datos son aritmética simple, el calculo del IVA y la suma del IVA y pago total.


*¿Qué se busca con este proyecto?
    Que los clientes puedan generar o jugar con los datos de una tabla de amortización, dependiendo la tasa de interés anual que su banco le proporciona, así como los meses y monto a solicitar y con una gráfica interactiva, pueda visualizar cuánto paga mensualmente, desglosado con cada uno de los datos de su pago, así como el cobro final tanto de intereses, IVA y saldo total.
    Que los clientes puedan jugar con una página interactiva para el cálculo de sus próximos intereses si se tiene en cuenta cuando pagarían y que monto pagarían(No el total de su PPNGI), así como una gráfica dónde visualicen su saldo diario en gráficas y puedan entender mejor cómo se calculan sus intereses.
    Por último, intereses compuestos y simples. En este apartado el cliente puede ingresar un monto, años y periodo(solo en saldos compuestos) y pueda verificar cómo su dinero incrementa, según  la tasa de interés. Él mismo puede hacer una comparativa de dónde invertir su dinero y también contando con una gráfica interactiva de sus ganancias.


*Próximas mejoras:
    -Exportar datos en tablas de excel
    -Exportar datos en PDF    