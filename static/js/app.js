class WeChatDidiSimulator {
    constructor() {
        this.currentScreen = 1;
        this.totalScreens = 10;
        this.init();
    }

    init() {
        this.loadScreen(1);
        this.setupEventListeners();
    }

    loadScreen(screenNumber) {
        fetch(`/screen/${screenNumber}`)
            .then(response => response.text())
            .then(html => {
                document.getElementById('screen-container').innerHTML = html;
                this.currentScreen = screenNumber;
                this.setupScreenSpecificEvents(screenNumber);
            })
            .catch(error => {
                console.error('Error loading screen:', error);
            });
    }

    nextScreen() {
        if (this.currentScreen < this.totalScreens) {
            this.loadScreen(this.currentScreen + 1);
        }
    }

    previousScreen() {
        if (this.currentScreen > 1) {
            this.loadScreen(this.currentScreen - 1);
        }
    }

    setupEventListeners() {
        // Global event listeners can be added here
    }

    setupScreenSpecificEvents(screenNumber) {
        switch (screenNumber) {
            case 1:
                this.setupScreen1Events();
                break;
            case 2:
                this.setupScreen2Events();
                break;
            case 3:
                this.setupScreen3Events();
                break;
            case 4:
                this.setupScreen4Events();
                break;
            case 5:
                this.setupScreen5Events();
                break;
            case 6:
                this.setupScreen6Events();
                break;
            case 7:
                this.setupScreen7Events();
                break;
            case 8:
                this.setupScreen8Events();
                break;
            case 9:
                this.setupScreen9Events();
                break;
            case 10:
                this.setupScreen10Events();
                break;
        }
    }

    setupScreen1Events() {
        const enterBtn = document.getElementById('enter-btn');
        if (enterBtn) {
            enterBtn.addEventListener('click', () => this.nextScreen());
        }
    }

    setupScreen2Events() {
        const nextBtn = document.getElementById('story-next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextScreen());
        }
    }

    setupScreen3Events() {
        const serviceBtn = document.getElementById('service-btn');
        const didiBtn = document.getElementById('didi-btn');
        
        if (serviceBtn) {
            serviceBtn.addEventListener('click', () => {
                // Show service options
                const serviceOptions = document.getElementById('service-options');
                if (serviceOptions) {
                    serviceOptions.style.display = 'block';
                }
            });
        }
        
        if (didiBtn) {
            didiBtn.addEventListener('click', () => this.nextScreen());
        }
    }

    setupScreen4Events() {
        const searchBtn = document.getElementById('search-btn');
        const destinationBtn = document.getElementById('destination-btn');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.nextScreen());
        }
        
        if (destinationBtn) {
            destinationBtn.addEventListener('click', () => this.nextScreen());
        }
    }

    setupScreen5Events() {
        const voiceBtn = document.getElementById('voice-btn');
        const confirmBtn = document.getElementById('confirm-location-btn');
        const destinationInput = document.getElementById('destination-input');
        
        // Initialize map
        this.initializeMap();
        
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => {
                // Use real voice input
                this.startVoiceInput();
            });
        }
        
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => this.nextScreen());
        }
        
        if (destinationInput) {
            destinationInput.addEventListener('input', () => {
                const confirmBtn = document.getElementById('confirm-location-btn');
                if (confirmBtn) {
                    confirmBtn.disabled = !destinationInput.value.trim();
                }
                // Update map when destination changes
                if (destinationInput.value.trim()) {
                    this.updateMapRoute(destinationInput.value);
                }
            });
        }
    }

    setupScreen6Events() {
        const carOptions = document.querySelectorAll('.car-option');
        const confirmBtn = document.getElementById('confirm-car-btn');
        
        carOptions.forEach(option => {
            option.addEventListener('click', () => {
                carOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
        
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => this.nextScreen());
        }
    }

    setupScreen7Events() {
        const longPressBtn = document.getElementById('long-press-btn');
        let pressTimer;
        let isPressing = false;
        
        if (longPressBtn) {
            longPressBtn.addEventListener('mousedown', () => {
                isPressing = true;
                longPressBtn.classList.add('pressing');
                this.startLongPressAnimation();
                
                pressTimer = setTimeout(() => {
                    if (isPressing) {
                        this.nextScreen();
                    }
                }, 2000); // 2 seconds long press
            });
            
            longPressBtn.addEventListener('mouseup', () => {
                isPressing = false;
                longPressBtn.classList.remove('pressing');
                clearTimeout(pressTimer);
                this.resetLongPressAnimation();
            });
            
            longPressBtn.addEventListener('mouseleave', () => {
                isPressing = false;
                longPressBtn.classList.remove('pressing');
                clearTimeout(pressTimer);
                this.resetLongPressAnimation();
            });
        }
    }

    setupScreen8Events() {
        const paymentMethods = document.querySelectorAll('.payment-method');
        const payBtn = document.getElementById('pay-btn');
        
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('selected'));
                method.classList.add('selected');
            });
        });
        
        if (payBtn) {
            payBtn.addEventListener('click', () => {
                // Simulate payment processing
                this.simulatePayment();
            });
        }
    }

    setupScreen9Events() {
        const confirmBtn = document.getElementById('confirm-driver-btn');
        
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                // Simulate driver arrival
                this.simulateDriverArrival();
            });
        }
    }

    setupScreen10Events() {
        const modal = document.getElementById('celebration-modal');
        const closeBtn = document.getElementById('close-modal-btn');
        
        // Start celebration animation
        this.startCelebration();
        
        // Show modal after animation
        setTimeout(() => {
            if (modal) {
                modal.classList.add('show');
            }
        }, 3000);
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
                // Reset to screen 1
                this.loadScreen(1);
            });
        }
    }

    // Map initialization
    initializeMap() {
        if (typeof AMap !== 'undefined') {
            // Create map instance
            this.map = new AMap.Map('map', {
                zoom: 12,
                center: [116.397428, 39.90923], // Beijing center
                viewMode: '2D'
            });
            
            // Add scale control
            this.map.addControl(new AMap.Scale());
            
            // Add toolbar
            this.map.addControl(new AMap.ToolBar());
            
            // Set current location marker
            this.currentLocation = [116.397428, 39.90923];
            this.addMarker(this.currentLocation, '当前位置', 'green');
            
        } else {
            console.log('Amap API not loaded');
        }
    }
    
    // Add marker to map
    addMarker(position, title, color) {
        if (this.map) {
            const marker = new AMap.Marker({
                position: position,
                title: title,
                icon: new AMap.Icon({
                    size: new AMap.Size(25, 34),
                    image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_' + color + '.png'
                })
            });
            this.map.add(marker);
            return marker;
        }
    }
    
    // Update map route
    updateMapRoute(destination) {
        if (this.map && destination) {
            // Geocode destination
            AMap.plugin('AMap.Geocoder', () => {
                const geocoder = new AMap.Geocoder();
                geocoder.getLocation(destination, (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        const destinationPos = result.geocodes[0].location;
                        
                        // Clear existing markers except current location
                        this.map.clearMap();
                        this.addMarker(this.currentLocation, '当前位置', 'green');
                        this.addMarker(destinationPos, destination, 'red');
                        
                        // Draw route
                        AMap.plugin('AMap.Driving', () => {
                            const driving = new AMap.Driving({
                                map: this.map,
                                panel: 'panel'
                            });
                            
                            driving.search(this.currentLocation, destinationPos, (status, result) => {
                                if (status === 'complete') {
                                    // Update trip info
                                    this.updateTripInfo(result);
                                }
                            });
                        });
                        
                        // Adjust map view to show both points
                        this.map.setFitView();
                    }
                });
            });
        }
    }
    
    // Update trip information
    updateTripInfo(result) {
        if (result && result.routes && result.routes.length > 0) {
            const route = result.routes[0];
            const distance = (route.distance / 1000).toFixed(1); // Convert to km
            const duration = Math.round(route.time / 60); // Convert to minutes
            
            // Update DOM elements
            const distanceElement = document.querySelector('.trip-distance');
            const durationElement = document.querySelector('.trip-duration');
            
            if (distanceElement) {
                distanceElement.textContent = `约 ${distance} 公里`;
            }
            if (durationElement) {
                durationElement.textContent = `约 ${duration} 分钟`;
            }
        }
    }
    
    // Real voice input implementation
    startVoiceInput() {
        const voiceBtn = document.getElementById('voice-btn');
        const destinationInput = document.getElementById('destination-input');
        const voiceAnimation = document.getElementById('voice-animation');
        
        if (voiceBtn && destinationInput) {
            // Show voice animation
            if (voiceAnimation) {
                voiceAnimation.style.display = 'block';
            }
            
            voiceBtn.innerHTML = '<div class="loading"></div>';
            voiceBtn.disabled = true;
            
            // Check if browser supports Web Speech API
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                
                recognition.lang = 'zh-CN';
                recognition.continuous = false;
                recognition.interimResults = false;
                
                recognition.onstart = () => {
                    console.log('Voice recognition started');
                };
                
                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    console.log('Voice input result:', transcript);
                    
                    destinationInput.value = transcript;
                    
                    // Trigger input event to update map and enable confirm button
                    destinationInput.dispatchEvent(new Event('input'));
                    
                    // Hide voice animation
                    if (voiceAnimation) {
                        voiceAnimation.style.display = 'none';
                    }
                    
                    voiceBtn.innerHTML = '🎤 语音输入';
                    voiceBtn.disabled = false;
                };
                
                recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    
                    // Fallback to simulated input
                    this.fallbackVoiceInput();
                };
                
                recognition.onend = () => {
                    console.log('Voice recognition ended');
                };
                
                recognition.start();
            } else {
                // Fallback to simulated input if speech recognition not supported
                this.fallbackVoiceInput();
            }
        }
    }
    
    // Fallback voice input method
    fallbackVoiceInput() {
        const voiceBtn = document.getElementById('voice-btn');
        const destinationInput = document.getElementById('destination-input');
        const voiceAnimation = document.getElementById('voice-animation');
        
        setTimeout(() => {
            destinationInput.value = '鸟巢';
            destinationInput.dispatchEvent(new Event('input'));
            
            if (voiceAnimation) {
                voiceAnimation.style.display = 'none';
            }
            
            voiceBtn.innerHTML = '🎤 语音输入';
            voiceBtn.disabled = false;
        }, 1500);
    }
    
    // Legacy method for backward compatibility
    simulateVoiceInput() {
        this.fallbackVoiceInput();
    }

    startLongPressAnimation() {
        const progressCircle = document.querySelector('.progress-ring-circle');
        if (progressCircle) {
            progressCircle.style.strokeDashoffset = '0';
        }
    }

    resetLongPressAnimation() {
        const progressCircle = document.querySelector('.progress-ring-circle');
        if (progressCircle) {
            progressCircle.style.strokeDashoffset = '440';
        }
    }

    simulatePayment() {
        const payBtn = document.getElementById('pay-btn');
        
        if (payBtn) {
            payBtn.innerHTML = '<div class="loading"></div> 处理中...';
            payBtn.disabled = true;
            
            setTimeout(() => {
                this.nextScreen();
            }, 2000);
        }
    }

    simulateDriverArrival() {
        const confirmBtn = document.getElementById('confirm-driver-btn');
        
        if (confirmBtn) {
            confirmBtn.innerHTML = '<div class="loading"></div> 等待司机到达...';
            confirmBtn.disabled = true;
            
            setTimeout(() => {
                this.nextScreen();
            }, 3000);
        }
    }

    startCelebration() {
        const characters = document.querySelectorAll('.character');
        characters.forEach(character => {
            character.classList.add('dancing');
        });
        
        const celebrationText = document.querySelector('.celebration-text');
        if (celebrationText) {
            celebrationText.classList.add('celebrating');
        }
    }
}

// Initialize the simulator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.simulator = new WeChatDidiSimulator();
});
