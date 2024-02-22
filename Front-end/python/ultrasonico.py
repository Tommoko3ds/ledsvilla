import serial
import mysql.connector

# Configuración de la conexión a la base de datos MySQL
db_config = {
    'host': "localhost",
    'user': "root",
    'password': "",
    'database': "sm52_arduino"
}

# Intentar conectar a la base de datos
try:
    db = mysql.connector.connect(**db_config)
    cursor = db.cursor()
except mysql.connector.Error as err:
    print(f"Error al conectar a MySQL: {err}")
    exit(1)

# Abrir conexión serial
arduino = serial.Serial('COM4', 9600, timeout=1)  # Ajusta esto al puerto correcto

try:
    while True:
        data = arduino.readline().decode().strip()  # Leer y decodificar datos del Arduino
        if data:
            # Dividir la cadena para obtener distancia y estado del PIR
            distancia_str, pir_state_str = data.split(',')
            distancia = int(distancia_str)  # Convertir la distancia a entero
            pir_state = int(pir_state_str)  # Convertir el estado del PIR a entero
            
            # Determinar el color del LED basado en la distancia
            if distancia < 10:
                led_color = 'rojo'
                arduino.write(b'R')  # Enviar comando para LED Rojo
            elif distancia < 20:
                led_color = 'amarillo'
                arduino.write(b'A')  # Enviar comando para LED Amarillo
            else:
                led_color = 'verde'
                arduino.write(b'V')  # Enviar comando para LED Verde
            
            # Preparar sentencia SQL para insertar los datos incluyendo el color del LED y el estado del PIR
            sql = "INSERT INTO practica (mensaje, led_color, pir_led) VALUES (%s, %s, %s)"
            cursor.execute(sql, (data, led_color, pir_state))
            db.commit()
            print(f"Distancia: {distancia} cm, LED: {led_color}, PIR: {pir_state}")
            
except KeyboardInterrupt:
    print("Programa terminado por el usuario")
except mysql.connector.Error as err:
    print(f"Error al interactuar con MySQL: {err}")
finally:
    # Cerrar conexiones
    if db.is_connected():
        cursor.close()
        db.close()
    arduino.close()
