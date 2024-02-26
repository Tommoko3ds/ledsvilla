$(document).ready(function () {
    var ctx = document.getElementById("sensorUltrasonico").getContext("2d");
    var chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Sensor Data",
                    backgroundColor: "rgb(51, 141, 255)",
                    borderColor: "rgb(93, 164, 255)",
                    data: [],
                },
            ],
        },
        options: {},
    });

    var ctx2 = document.getElementById("sensorPir").getContext("2d");
    var chart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Pir",
                    backgroundColor: "rgb(51, 141, 255)",
                    borderColor: "rgb(93, 164, 255)",
                    data: [],
                },
            ],
        },
        options: {},
    });

    function fetchData() {
        $.ajax({
            url: "http://localhost:8080/api/practica",
            type: "GET",
            success: function (data) {
                var ultrasonicoLabels = [];
                var ultrasonicoData = [];
                var pirLabels = [];
                var pirData = [];

                data.forEach(function(row) {
                    ultrasonicoLabels.push(row.Led_color);
                    ultrasonicoData.push(parseFloat(row.Mensaje));

                    pirLabels.push(row.fecha); // Ajusta si 'fecha' es la propiedad correcta
                    pirData.push(parseFloat(row.pir_led)); // Ajusta si 'Dato_sensor' es la propiedad correcta
                });

                chart.data.labels = ultrasonicoLabels;
                chart.data.datasets[0].data = ultrasonicoData;
                chart.update();

                chart2.data.labels = pirLabels;
                chart2.data.datasets[0].data = pirData;
                chart2.update();

                // Lógica para manejar las imágenes SVG del sensor PIR
                var ultimoEstadoPIR = data[0].pir_led;
                var pirr1 = document.getElementById("pirr1");

                if (ultimoEstadoPIR == 0) {
                    pirr1.src = "img/sinmov.svg";
                } else if (ultimoEstadoPIR == 1) {
                    pirr1.src = "img/conmov.svg";
                }

                // Lógica para manejar las imágenes SVG del sensor ultrasónico
                var lastColor = data[0].Led_color;
                var led0 = document.getElementById("led0");
                // var led1 = document.getElementById("led1");
                // var led2 = document.getElementById("led2");
                // var led3 = document.getElementById("led3");

                if (lastColor === "rojo") {
                    led0.src = "img/NUEVOROJO-ON.svg";
                    // led1.src = "img/VERDE-OFF.svg";
                    // led2.src = "img/AMARILLO-OFF.svg";
                    // led3.src = "img/ROJO-ON.svg";
                } else if (lastColor === "amarillo") {
                    led0.src = "img/NUEVOAMARILLO-ON.svg";
                    // led1.src = "img/VERDE-OFF.svg";
                    // led2.src = "img/AMARILLO-ON.svg";
                    // led3.src = "img/ROJO-OFF.svg";
                } else if (lastColor === "verde") {
                    led0.src = "img/NUEVOVERDE-ON.svg";
                    // led1.src = "img/VERDE-ON.svg";
                    // led2.src = "img/AMARILLO-OFF.svg";
                    // led3.src = "img/ROJO-OFF.svg";
                }
            },
        });
    }

    setInterval(function () {
        fetchData();
    }, 1000);
});
