// BURN THAT HARDWARE - Component Database
// Team: Burn That Hardware
// Budget: ₹2000

const COMPONENTS_DATA = [
    // Controllers
    {
        id: 1,
        name: 'Glyph C3',
        description: 'ESP32-C3 based development board with WiFi and Bluetooth LE',
        price: 450,
        category: 'controller',
        image: 'https://files.pcbcupid.com/Events/components/pcbcupid-C3.avif',
        inStock: true
    },
    {
        id: 2,
        name: 'Glyph C6',
        description: 'ESP32-C6 based development board with advanced features',
        price: 550,
        category: 'controller',
        image: 'https://files.pcbcupid.com/Events/components/pcbcupid-C6.avif',
        inStock: true
    },
    {
        id: 3,
        name: 'Glyph H2',
        description: 'ESP32-H2 based development board for IoT applications',
        price: 500,
        category: 'controller',
        image: 'https://files.pcbcupid.com/Events/components/pcbcupid-H2.avif',
        inStock: true
    },
    
    // Sensors
    {
        id: 5,
        name: 'MEMS Microphone (1-Ch)',
        description: 'ICS-43434 high precision omnidirectional microphone I2S',
        price: 180,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/G-sense-MICROPHONE.avif',
        inStock: true
    },
    {
        id: 6,
        name: 'MEMS Microphone (2-Ch)',
        description: 'ICS-43434 2-channel high precision microphone array',
        price: 280,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_G-sense-2ch-mic.avif',
        inStock: true
    },
    {
        id: 12,
        name: 'Condenser Microphone',
        description: 'Sensitive analog microphone for audio capture',
        price: 40,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_condenser_mic.avif',
        inStock: true
    },
    {
        id: 41,
        name: 'DHT22 Temp/Humidity Sensor',
        description: 'High-accuracy digital temperature and humidity sensor',
        price: 90,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_DHT22.avif',
        inStock: true
    },
    {
        id: 42,
        name: 'Ultrasonic Sensor',
        description: 'Distance measurement sensor using sound waves',
        price: 70,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_ultrasonic%20sensor.avif',
        inStock: true
    },
    {
        id: 43,
        name: 'IR Sensor',
        description: 'Infrared sensor for object detection and proximity',
        price: 40,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_IR%20Sensor.avif',
        inStock: true
    },
    {
        id: 44,
        name: 'Limit Switch',
        description: 'Mechanical switch for position/presence detection',
        price: 30,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_LIMIT_SWITCH.avif',
        inStock: true
    },
    {
        id: 45,
        name: 'Soil Humidity Sensor',
        description: 'Moisture sensor for plant and soil monitoring',
        price: 55,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_Soil%20Humidity%20sensor.avif',
        inStock: true
    },
    {
        id: 46,
        name: 'SW420 Vibration Sensor',
        description: 'Digital vibration/shock detection with adjustable sensitivity',
        price: 35,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_SW420-Tilt-Sensor-Module.avif',
        inStock: true
    },
    {
        id: 47,
        name: 'ACS712 Current Sensor',
        description: 'Hall-effect current sensor (±20A range)',
        price: 65,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_acs712-5a-20a-30a-current-sensor.avif',
        inStock: true
    },
    {
        id: 48,
        name: 'DRV5032 Hall Sensor',
        description: 'Ultra-low power digital Hall effect sensor',
        price: 45,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_DRV5032.avif',
        inStock: true
    },
    {
        id: 51,
        name: 'LDR (5mm)',
        description: 'Light dependent resistor for ambient light sensing',
        price: 15,
        category: 'sensor',
        image: 'https://files.pcbcupid.com/Events/components/ldr.avif',
        inStock: true
    },
    
    // Actuators
    {
        id: 8,
        name: '1-Channel Relay Module',
        description: '5V relay module with optocoupler isolation',
        price: 80,
        category: 'actuator',
        image: 'https://files.pcbcupid.com/Events/components/gmod-pcbcupid-relay-1-ch.avif',
        inStock: true
    },
    {
        id: 9,
        name: '2-Channel Relay Module',
        description: '5V dual relay module with optocoupler isolation',
        price: 120,
        category: 'actuator',
        image: 'https://files.pcbcupid.com/Events/components/G-mod-2ch-relay-module.avif',
        inStock: true
    },
    {
        id: 11,
        name: 'Buzzer',
        description: 'Active buzzer for audio alerts and notifications',
        price: 30,
        category: 'actuator',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_Buzzer_3V.avif',
        inStock: true
    },
    {
        id: 38,
        name: 'DC Motor',
        description: 'Single shaft DC motor for mechanical movement',
        price: 60,
        category: 'actuator',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_DC%20Motor%20Single%20Shaft.avif',
        inStock: true
    },
    {
        id: 40,
        name: 'Servo Motor',
        description: 'Precision-controlled motor with built-in feedback',
        price: 120,
        category: 'actuator',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_Servo%20Motors.avif',
        inStock: true
    },
    
    // Displays
    {
        id: 10,
        name: 'OLED Display (SH1106)',
        description: 'Monochrome OLED display for text and graphics',
        price: 150,
        category: 'display',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_OLED.avif',
        inStock: true
    },
    {
        id: 27,
        name: '5mm Red LED',
        description: 'Standard red LED for indicators and status lights',
        price: 5,
        category: 'display',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_5mm_red_led.avif',
        inStock: true
    },
    {
        id: 28,
        name: '5mm Green LED',
        description: 'Standard green LED for status indicators',
        price: 5,
        category: 'display',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_5mm_green_led.avif',
        inStock: true
    },
    {
        id: 29,
        name: '3mm Red LED',
        description: 'Compact red LED for space-constrained applications',
        price: 4,
        category: 'display',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_3mm_red_led.avif',
        inStock: true
    },
    {
        id: 30,
        name: 'RGB LED',
        description: 'Full-color LED with PWM control capabilities',
        price: 12,
        category: 'display',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_RGB%20LED.avif',
        inStock: true
    },
    {
        id: 31,
        name: '7-Segment Display',
        description: 'Numeric display with common cathode configuration',
        price: 35,
        category: 'display',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_7%20segment_display.avif',
        inStock: true
    },
    
    // Power
    {
        id: 54,
        name: '5V 1A Power Adapter',
        description: 'Compact power supply for electronics projects',
        price: 100,
        category: 'power',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_5V%201A%20Adaptor.avif',
        inStock: true
    },
    {
        id: 55,
        name: 'DC Power Connector',
        description: 'Female DC adapter connector for power supplies',
        price: 20,
        category: 'power',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_dc%20female%20adaptor.avif',
        inStock: true
    },
    
    // Components/Misc
    {
        id: 4,
        name: 'FR4 Perfboard',
        description: 'High quality zero board PCB for prototyping',
        price: 50,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_FR4.avif',
        inStock: true
    },
    {
        id: 7,
        name: 'MicroSD Card Module',
        description: 'SPI/SDIO/SDMMC card breakout board - 3.3V',
        price: 120,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_G-mod-SD_Card.avif',
        inStock: true
    },
    {
        id: 13,
        name: 'Self-Lock Push Button',
        description: 'Tactile push button switch with self-locking mechanism',
        price: 25,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_Push_%20button_self_lock.avif',
        inStock: true
    },
    {
        id: 14,
        name: 'Right Angle Push Button',
        description: 'Compact right-angle tactile switch for edge mounting',
        price: 20,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_Right_angle_push_button.avif',
        inStock: true
    },
    {
        id: 15,
        name: 'Push Button with Cap',
        description: 'Standard push button switch with comfortable cap',
        price: 15,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_Push_button_with_cap.avif',
        inStock: true
    },
    {
        id: 16,
        name: 'SMT Tactile Switch',
        description: 'Low-profile SMT tactile switch (TS04-66-65-BK-160)',
        price: 18,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_Push_button_TS04.avif',
        inStock: true
    },
    {
        id: 17,
        name: 'SPDT Slide Switch',
        description: 'Compact PCB-mount slide switch (OS202011MS2QN1)',
        price: 22,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_OS202011MS2QN1_Slide_switch_spdt.avif',
        inStock: true
    },
    {
        id: 32,
        name: 'Resistor Assortment',
        description: 'Wide range of resistor values for prototyping',
        price: 80,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_Resistor_box.avif',
        inStock: true
    },
    {
        id: 33,
        name: 'Capacitor Assortment',
        description: 'Various capacitance values for circuit design',
        price: 90,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_capacitor_box.avif',
        inStock: true
    },
    {
        id: 34,
        name: '1N4001 Diode',
        description: 'General-purpose silicon rectifier diode (50V)',
        price: 8,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_1n4007_diode.avif',
        inStock: true
    },
    {
        id: 35,
        name: 'BC547 NPN Transistor',
        description: 'General-purpose NPN transistor for switching/amplification',
        price: 6,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_BC547_NPN_Transistor.avif',
        inStock: true
    },
    {
        id: 36,
        name: 'BC557 PNP Transistor',
        description: 'General-purpose PNP transistor for low-power applications',
        price: 6,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_BC557_PNP_Transistors.avif',
        inStock: true
    },
    {
        id: 37,
        name: 'Potentiometer',
        description: 'Adjustable resistor for voltage/signal control',
        price: 25,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_POTENTIOMETER2.avif',
        inStock: true
    },
    {
        id: 39,
        name: 'L293D Motor Driver',
        description: 'Dual H-bridge IC for motor control',
        price: 45,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_Motor%20Driver%20IC-%20L293D.avif',
        inStock: true
    },
    {
        id: 49,
        name: 'BO Motor Wheels',
        description: 'Wheels for BO motors and robotics projects',
        price: 25,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/wheels.avif',
        inStock: true
    },
    {
        id: 52,
        name: 'Breadboard',
        description: 'Solderless prototyping platform',
        price: 80,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_Breadboard.avif',
        inStock: true
    },
    {
        id: 53,
        name: 'Jumper Wires',
        description: 'Male-male, female-female, male-female connection wires',
        price: 40,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_jumper%20wires.avif',
        inStock: true
    },
    {
        id: 56,
        name: 'Male Header Pins',
        description: 'Straight pins for PCB connections',
        price: 15,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_male%20header%20pins.avif',
        inStock: true
    },
    {
        id: 57,
        name: 'Female Header Pins',
        description: 'Socket-style connectors for modular connections',
        price: 18,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/PCBCUPID_Female%20header%20pins.avif',
        inStock: true
    },
    {
        id: 58,
        name: 'Connection Wires',
        description: 'Essential wires for circuit connections',
        price: 30,
        category: 'misc',
        image: 'https://files.pcbcupid.com/Events/components/wires.avif',
        inStock: true
    }
];

// Budget configuration
const BUDGET_CONFIG = {
    total: 2000,
    bonusPointsScale: [
        { saved: 901, points: 10 },
        { saved: 801, points: 9 },
        { saved: 701, points: 8 },
        { saved: 601, points: 7 },
        { saved: 501, points: 6 },
        { saved: 401, points: 5 },
        { saved: 301, points: 4 },
        { saved: 201, points: 3 },
        { saved: 101, points: 2 },
        { saved: 1, points: 1 },
        { saved: 0, points: 0 }
    ]
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COMPONENTS_DATA, BUDGET_CONFIG };
}