#include <Ultrasonic.h>
int pirPin = 2;
int pirState = LOW;

int trigPin = 12; // Pin de TRIGGER
int echoPin = 13; // Pin de ECHO
Ultrasonic ultrasonic(trigPin, echoPin); // Crear instancia de Ultrasonic

int ledR = 8; // LED Rojo
int ledA = 9; // LED Amarillo
int ledV = 10; // LED Amarillo 2

int ledF = 11; // Foco

void setup() {
  Serial.begin(9600);
  pinMode(ledR, OUTPUT);
  pinMode(ledA, OUTPUT);
  pinMode(ledV, OUTPUT);

  pinMode(pirPin, INPUT);
}

void loop() {
  pirState = digitalRead(pirPin);
  long distance = ultrasonic.read(CM);
  Serial.print(distance);
  Serial.print(",");
  Serial.println(pirState);
  
  while (Serial.available() >= 2) {
    char command = Serial.read();
    char commandPIR = Serial.read();
    controlarPIR(commandPIR);
    controlLEDs(command);
  }

  delay(1000);
}

void controlarPIR(char commandPIR) {
  if (commandPIR == 'M') {
    
    Serial.println("Movimiento detectado");
    digitalWrite(ledF, HIGH);
  } else if (commandPIR == 'N') {
    
    Serial.println("Sin movimiento");
    digitalWrite(ledF, LOW);
  }
}


void controlLEDs(char command) {
  // Apagar todos los LEDs primero
  digitalWrite(ledR, LOW);
  digitalWrite(ledA, LOW);
  digitalWrite(ledV, LOW);
  
  // Encender el LED basado en el comando recibido
  switch (command) {
    case 'R':
      digitalWrite(ledR, HIGH);
      break;
    case 'A':
      digitalWrite(ledA, HIGH);
      break;
    case 'V':
      digitalWrite(ledV, HIGH);
      break;
    default:
      // Si se recibe otro carácter, no hacer nada o apagar todos los LEDs
      break;
  }
}