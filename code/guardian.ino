#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <ESP32Servo.h>
#include <Bonezegei_DHT22.h>

// Hardware setup
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Sensors & actuators
Servo earServo;
int servoPin = 2;              // GPIO2 (pin 7 on ESP32-C3)
int soilSensorPin = A2;        // Soil sensor on A2
Bonezegei_DHT22 dht22(8);      // DHT22 on GPIO8 (D8)

// Guardian emotional states
struct GuardianState {
  String face;
  String name;
  String category;
  int sweepMin, sweepMax;
  int sweepSpeed;
  String condition;
  float tempMin, tempMax;
  float humidMin, humidMax;
  int soilMin, soilMax;
};

// Environmental emotion mapping
GuardianState emotions[] = {
  // Crisis states
  {"X_X", "DROUGHT CRISIS", "EMERGENCY", 0, 40, 20, "soil < 10", 35.0, 50.0, 0.0, 30.0, 0, 10},
  {"@_@", "HEAT STRESS", "EMERGENCY", 160, 180, 8, "temp > 35", 35.0, 50.0, 0.0, 100.0, 0, 100},
  
  // Sad/worried states  
  {"T_T", "Very Thirsty", "SAD", 20, 60, 25, "dry soil", 28.0, 40.0, 20.0, 50.0, 10, 25},
  {"v_v", "Kinda Dry", "WORRIED", 40, 80, 18, "getting dry", 25.0, 35.0, 30.0, 60.0, 25, 40},
  {">_<", "Stressed", "WORRIED", 30, 70, 15, "poor conditions", 30.0, 40.0, 15.0, 35.0, 15, 35},
  
  // Alert/monitoring states
  {"._.", "Monitoring", "ALERT", 50, 110, 16, "watching", 20.0, 30.0, 40.0, 70.0, 40, 60},
  {"o_o", "Checking Weather", "ALERT", 60, 120, 14, "environmental", 15.0, 25.0, 60.0, 80.0, 45, 65},
  
  // Happy/content states
  {"^_^", "Happy Plant", "CONTENT", 70, 130, 12, "good soil", 18.0, 28.0, 50.0, 75.0, 60, 75},
  {"=_=", "Comfortable", "CONTENT", 80, 140, 14, "nice weather", 20.0, 26.0, 55.0, 70.0, 65, 80},
  
  // Excited/thriving states
  {"^o^", "Thriving!", "HAPPY", 90, 150, 10, "great conditions", 22.0, 28.0, 60.0, 80.0, 75, 85},
  {"*_*", "Garden Paradise", "EXCITED", 100, 160, 8, "perfect combo", 20.0, 25.0, 65.0, 75.0, 78, 88},
  
  // Love/optimal states
  {"<3", "Perfect Day", "LOVE", 110, 170, 12, "optimal", 18.0, 24.0, 60.0, 70.0, 85, 92},
  
  // Panic states
  {"@_@", "Drowning!", "PANIC", 30, 90, 6, "too wet", 0.0, 50.0, 90.0, 100.0, 92, 100}
};

const int NUM_EMOTIONS = sizeof(emotions) / sizeof(emotions[0]);

// Current readings
float currentTemp = 0.0;
float currentHumidity = 0.0;
int currentSoil = 50;
int currentEmotion = 5;  // Start with monitoring

// Timing
unsigned long lastSensorRead = 0;
unsigned long lastEmotionChange = 0;
unsigned long blinkTimer = 0;
bool isBlinking = false;

void setup() {
  Serial.begin(9600);
  
  // Initialize I2C for display
  Wire.begin(A1, A0);
  
  if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  
  // Initialize sensors
  dht22.begin();
  pinMode(soilSensorPin, INPUT);
  
  // Initialize servo
  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);
  earServo.setPeriodHertz(50);
  earServo.attach(servoPin, 1000, 2000);
  
  bootSequence();
  
  Serial.println("🤖 Guardian v10.0 - Environmental Monitor Online! 🌱");
}

void loop() {
  unsigned long now = millis();
  
  // Read sensors every 3 seconds
  if (now - lastSensorRead > 3000) {
    readEnvironmentalData();
    evaluateEmotionalState();
    lastSensorRead = now;
  }
  
  // Handle blinking animation
  if (now - blinkTimer > random(3000, 6000)) {
    isBlinking = true;
    blinkTimer = now;
  }
  if (isBlinking && (now - blinkTimer > 150)) {
    isBlinking = false;
  }
  
  updateDisplay();
  delay(50);
}

void readEnvironmentalData() {
  // Read DHT22 with Bonezegei library
  if (dht22.getData()) {
    currentTemp = dht22.getTemperature();
    currentHumidity = dht22.getHumidity();
  }
  
  // Read soil moisture sensor
  int soilRaw = analogRead(soilSensorPin);
  currentSoil = map(soilRaw, 4095, 1500, 0, 100);  // Adjust mapping as needed
  currentSoil = constrain(currentSoil, 0, 100);
  
  // Debug output
  Serial.print("🌡️ ");
  Serial.print(currentTemp, 1);
  Serial.print("°C | 💧 ");
  Serial.print(currentHumidity, 1);
  Serial.print("% | 🌱 ");
  Serial.print(currentSoil);
  Serial.println("%");
}

void evaluateEmotionalState() {
  int bestEmotion = currentEmotion;
  int bestScore = 0;
  
  for (int i = 0; i < NUM_EMOTIONS; i++) {
    int score = 0;
    
    // Check soil moisture (primary factor)
    if (currentSoil >= emotions[i].soilMin && currentSoil <= emotions[i].soilMax) {
      score += 40;
    }
    
    // Check temperature
    if (currentTemp >= emotions[i].tempMin && currentTemp <= emotions[i].tempMax) {
      score += 30;
    }
    
    // Check humidity  
    if (currentHumidity >= emotions[i].humidMin && currentHumidity <= emotions[i].humidMax) {
      score += 30;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestEmotion = i;
    }
  }
  
  // Change emotion if needed
  if (bestEmotion != currentEmotion) {
    currentEmotion = bestEmotion;
    lastEmotionChange = millis();
    
    Serial.print("🎭 Emotion: ");
    Serial.print(emotions[currentEmotion].name);
    Serial.print(" (");
    Serial.print(emotions[currentEmotion].condition);
    Serial.println(")");
    
    // Perform emotional sweep!
    performEmotionalSweep();
  }
}

void performEmotionalSweep() {
  GuardianState emotion = emotions[currentEmotion];
  
  Serial.print("🎯 Sweeping: ");
  Serial.print(emotion.sweepMin);
  Serial.print("° to ");
  Serial.print(emotion.sweepMax);
  Serial.println("°");
  
  // Sweep from min to max
  for (int pos = emotion.sweepMin; pos <= emotion.sweepMax; pos += 3) {
    earServo.write(pos);
    delay(emotion.sweepSpeed);
  }
  
  delay(200);  // Pause at top
  
  // Return to center
  int center = (emotion.sweepMin + emotion.sweepMax) / 2;
  for (int pos = emotion.sweepMax; pos >= center; pos -= 3) {
    earServo.write(pos);
    delay(emotion.sweepSpeed);
  }
  
  Serial.println("✅ Sweep complete!");
}

void updateDisplay() {
  display.clearDisplay();
  
  GuardianState emotion = emotions[currentEmotion];
  String face = emotion.face;
  
  // Handle blinking
  if (isBlinking) {
    face.replace("^", "-");
    face.replace("@", "-");
    face.replace("o", "-");
    face.replace("O", "-");
    face.replace("*", "-");
    face.replace(".", "-");
    face.replace("T", "-");
    face.replace("v", "-");
    face.replace("<", "-");
    face.replace("=", "-");
    face.replace("X", "-");
    face.replace(">", "-");
  }
  
  // Main face display
  display.setTextSize(3);
  display.setCursor(45, 12);
  display.print(face);
  
  // Emotion info
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print(emotion.category);
  display.print(" - ");
  display.print(emotion.name);
  
  // Environmental readings
  display.setCursor(0, 35);
  display.print("TEMP: ");
  display.print(currentTemp, 1);
  display.print("C");
  
  display.setCursor(0, 45);
  display.print("HUMID: ");
  display.print(currentHumidity, 1);
  display.print("%");
  
  display.setCursor(0, 55);
  display.print("SOIL: ");
  display.print(currentSoil);
  display.print("%");
  
  // Soil condition
  String condition = "";
  if (currentSoil < 10) condition = " CRISIS";
  else if (currentSoil < 25) condition = " DRY";
  else if (currentSoil < 40) condition = " LOW";
  else if (currentSoil < 60) condition = " OK";
  else if (currentSoil < 75) condition = " GOOD";
  else if (currentSoil < 85) condition = " GREAT";
  else if (currentSoil < 92) condition = " PERFECT";
  else condition = " FLOOD";
  
  display.print(condition);
  
  // Sweep range indicator
  display.setCursor(90, 45);
  display.print("R:");
  display.print(emotion.sweepMin);
  display.print("-");
  display.print(emotion.sweepMax);
  
  display.display();
}

void bootSequence() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(20, 15);
  display.print("Guardian v10.0");
  display.setCursor(5, 25);
  display.print("Environmental Monitor");
  display.setCursor(25, 40);
  display.print("Absurd Industries");
  display.display();
  
  Serial.println("🤖 Guardian Boot Sequence");
  Serial.println("========================");
  
  // Test DHT22
  Serial.print("🌡️ Testing Bonezegei_DHT22... ");
  if (dht22.getData()) {
    Serial.print("✅ Working! ");
    Serial.print(dht22.getTemperature());
    Serial.print("°C, ");
    Serial.print(dht22.getHumidity());
    Serial.println("%");
  } else {
    Serial.println("❌ Failed!");
  }
  
  // Test soil sensor
  Serial.print("🌱 Testing soil sensor... ");
  int soilTest = analogRead(soilSensorPin);
  Serial.print("✅ Raw: ");
  Serial.println(soilTest);
  
  // Test servo
  Serial.println("🎯 Testing servo sweep...");
  earServo.write(90);   delay(500);
  earServo.write(45);   delay(500);
  earServo.write(135);  delay(500);
  earServo.write(90);   delay(500);
  
  // Quick demo sweep
  Serial.println("Demo emotional sweep...");
  for (int pos = 60; pos <= 120; pos += 4) {
    earServo.write(pos);
    delay(15);
  }
  for (int pos = 120; pos >= 90; pos -= 4) {
    earServo.write(pos);
    delay(15);
  }
  
  Serial.println("✅ Boot complete!");
  
  // Show startup faces
  String faces[] = {"u_u", "._.", "o_o", "^_^"};
  for (int i = 0; i < 4; i++) {
    display.clearDisplay();
    display.setTextSize(3);
    display.setCursor(45, 20);
    display.print(faces[i]);
    display.display();
    delay(1000);
  }
}