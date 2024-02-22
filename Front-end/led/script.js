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

    function fetchData() {
        $.ajax({
            url: "http://localhost:5000/api/practica", // Aquí se actualiza la URL para que apunte a tu API
            type: "GET",
            success: function (data) {
                var labels = [];
                var sensorData = [];

                data.forEach(function (row) {
                    labels.push(row.led_color);
                    sensorData.push(row.mensaje);
                });

                chart.data.labels = labels;
                chart.data.datasets[0].data = sensorData;
                chart.update();

                var led1 = document.getElementById("led1");
                var led2 = document.getElementById("led2");
                var led3 = document.getElementById("led3");

                var lastColor = data[0].led_color;

                if (lastColor === "rojo") {
                    led1.src = "img/VERDE-OFF.svg";
                    led2.src = "img/AMARILLO-OFF.svg";
                    led3.src = "img/ROJO-ON.svg";
                } else if (lastColor === "amarillo") {
                    led1.src = "img/VERDE-OFF.svg";
                    led2.src = "img/AMARILLO-ON.svg";
                    led3.src = "img/ROJO-OFF.svg";
                } else if (lastColor === "verde") {
                    led1.src = "img/VERDE-ON.svg";
                    led2.src = "img/AMARILLO-OFF.svg";
                    led3.src = "img/ROJO-OFF.svg";
                }
            },
        });
    }

    setInterval(function () {
        fetchData();
    }, 500);
});
