function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRarity() {
    const roll = Math.random();
    if (roll < 0.5) return "Common 🌿";
    if (roll < 0.75) return "Rare 🔷";
    if (roll < 0.93) return "Epic 🔥";
    return "Mythical 🌟";
  }
  
  document.getElementById('generateBtn').addEventListener('click', () => {
    const job = document.getElementById('jobInput').value.trim();
  
    if (job === '') {
      alert('Please enter a job title!');
      return;
    }
  
    const lowerJob = job.toLowerCase();
  
    const historicalTitles = {
      "accountant": "Royal Coin Keeper - 1300 AD",
      "barista": "Steam Brew Alchemist - 1888",
      "default": "Guild Member - Medieval Era"
    };
  
    const futureTitles = {
      "accountant": "Ledger Tamer - Year 3024",
      "barista": "Quantum Bean Synthesizer - 2489",
      "default": "Cybernetic Role Coder - 3024"
    };
  
    const backDescription = {
      "accountant": "Master of numbers, controller of coin. From royal scrolls to galactic crypto chips.",
      "barista": "They don't just make coffee… they awaken souls.",
      "default": "An eternal role through ages — reimagined in gears and lasers."
    };
  
    const rarity = getRarity();
  
    const cardHTML = `
      <div class="flip-card w-full h-64">
        <div class="flip-inner w-full h-full transition-transform duration-300 ease-in-out will-change-transform">
          <!-- Front of Card -->
          <div class="flip-front bg-yellow-100 shadow-xl rounded-2xl p-4 border-4 border-yellow-400">
            <div class="flex justify-between items-center mb-2">
              <h2 class="text-2xl font-extrabold">${job}</h2>
              <span class="text-sm px-2 py-1 bg-purple-200 rounded-xl">${rarity}</span>
            </div>
            <p class="text-sm italic text-gray-600 mb-1">🕰️ ${historicalTitles[lowerJob] || historicalTitles.default}</p>
            <p class="text-sm italic text-gray-600 mb-3">🚀 ${futureTitles[lowerJob] || futureTitles.default}</p>
            <p class="text-center mt-10 text-gray-400 italic">Click to flip 🔄</p>
          </div>
  
          <!-- Back of Card -->
          <div class="flip-back bg-white shadow-xl rounded-2xl p-4 border-4 border-purple-400">
            <h3 class="font-bold text-lg mb-2 text-purple-700">🧬 Stats & Lore</h3>
            <p class="text-sm text-gray-700 mb-4">
              ${backDescription[lowerJob] || backDescription.default}
            </p>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <p>🧠 Intelligence: ${randomBetween(50, 100)}</p>
              <p>🎭 Charisma: ${randomBetween(30, 100)}</p>
              <p>⚡ Speed: ${randomBetween(20, 90)}</p>
              <p>🎯 Accuracy: ${randomBetween(40, 100)}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  
    document.getElementById('cardContainer').innerHTML = cardHTML;

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex gap-8 mt-4';

    // Add Save to Deck button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save to Deck';
    saveButton.className = 'px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors';
    saveButton.addEventListener('click', () => {
      // Get current card data
      const cardData = {
        job,
        rarity,
        historicalTitle: historicalTitles[lowerJob] || historicalTitles.default,
        futureTitle: futureTitles[lowerJob] || futureTitles.default,
        description: backDescription[lowerJob] || backDescription.default,
        stats: {
          intelligence: randomBetween(50, 100),
          charisma: randomBetween(30, 100),
          speed: randomBetween(20, 90),
          accuracy: randomBetween(40, 100)
        }
      };

      // Get existing deck or create new one
      let deck = JSON.parse(localStorage.getItem('timeJobberDeck')) || [];
      
      // Check for duplicates
      const isDuplicate = deck.some(card => card.job.toLowerCase() === job.toLowerCase());
      
      if (isDuplicate) {
        alert('This job is already in your deck!');
        return;
      }

      // Add new card to deck
      deck.push(cardData);
      localStorage.setItem('timeJobberDeck', JSON.stringify(deck));
      alert('Card saved to deck!');
    });

    // Add View My Deck button
    const viewDeckButton = document.createElement('a');
    viewDeckButton.href = 'deck.html';
    viewDeckButton.textContent = 'View My Deck →';
    viewDeckButton.className = 'px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors';

    // Append buttons to container
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(viewDeckButton);
    document.getElementById('cardContainer').appendChild(buttonContainer);

    // Add click handler for card flip
    const flipInner = document.querySelector('.flip-inner');
    flipInner.addEventListener('click', () => {
      flipInner.classList.toggle('flipped');
    });
  });
  
  // Allow Enter key to trigger the button
  document.getElementById('jobInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('generateBtn').click();
    }
  });
  
  // Fusion system prefixes and suffixes
  const fusionPrefixes = [
    "Quantum", "Chrono", "Techno", "Arcane", "Flame", "Synth", 
    "Cyber", "Mystic", "Nova", "Void", "Astro", "Hyper"
  ];

  const fusionSuffixes = [
    "Master", "Pilot", "Warden", "Sage", "Engineer", "Architect",
    "Champion", "Voyager", "Synthesizer", "Conduit", "Operator", "Savant"
  ];

  function generateFusionName(job1, job2) {
    const prefix = fusionPrefixes[Math.floor(Math.random() * fusionPrefixes.length)];
    const suffix = fusionSuffixes[Math.floor(Math.random() * fusionSuffixes.length)];
    return `${prefix} ${suffix}`;
  }

  function generateFusionStats(job1, job2) {
    return {
      intelligence: randomBetween(60, 100),
      charisma: randomBetween(40, 100),
      speed: randomBetween(30, 100),
      accuracy: randomBetween(50, 100)
    };
  }

  function generateFusionDescription(job1, job2) {
    const descriptions = [
      `A perfect fusion of ${job1} and ${job2}, mastering both arts with unprecedented skill.`,
      `Where ${job1} meets ${job2}, creating something entirely new and extraordinary.`,
      `The ultimate combination of ${job1} and ${job2}, breaking the boundaries of both professions.`,
      `A revolutionary blend of ${job1} and ${job2}, redefining what's possible.`
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  // Add event listener for fusion button
  document.getElementById('fuseBtn').addEventListener('click', () => {
    const job1 = document.getElementById('jobInput1').value.trim();
    const job2 = document.getElementById('jobInput2').value.trim();

    if (job1 === '' || job2 === '') {
      alert('Please enter both jobs to fuse!');
      return;
    }

    const fusedName = generateFusionName(job1, job2);
    const rarity = getRarity();
    const stats = generateFusionStats(job1, job2);
    const description = generateFusionDescription(job1, job2);

    const cardHTML = `
      <div class="flip-card w-full h-64">
        <div class="flip-inner w-full h-full transition-transform duration-300 ease-in-out will-change-transform">
          <!-- Front of Card -->
          <div class="flip-front bg-gradient-to-br from-purple-100 to-pink-100 shadow-xl rounded-2xl p-4 border-4 border-purple-400">
            <div class="flex justify-between items-center mb-2">
              <h2 class="text-2xl font-extrabold">${fusedName}</h2>
              <span class="text-sm px-2 py-1 bg-purple-200 rounded-xl">${rarity}</span>
            </div>
            <p class="text-sm italic text-gray-600 mb-1">🕰️ ${job1} + ${job2} - Fusion Era</p>
            <p class="text-sm italic text-gray-600 mb-3">🚀 ${fusedName} - Year 4024</p>
            <p class="text-center mt-10 text-gray-400 italic">Click to flip 🔄</p>
          </div>

          <!-- Back of Card -->
          <div class="flip-back bg-white shadow-xl rounded-2xl p-4 border-4 border-purple-400">
            <h3 class="font-bold text-lg mb-2 text-purple-700">🧬 Fusion Stats & Lore</h3>
            <p class="text-sm text-gray-700 mb-4">
              ${description}
            </p>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <p>🧠 Intelligence: ${stats.intelligence}</p>
              <p>🎭 Charisma: ${stats.charisma}</p>
              <p>⚡ Speed: ${stats.speed}</p>
              <p>🎯 Accuracy: ${stats.accuracy}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('cardContainer').innerHTML = cardHTML;

    // Add click handler for card flip
    const flipInner = document.querySelector('.flip-inner');
    flipInner.addEventListener('click', () => {
      flipInner.classList.toggle('flipped');
    });

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex gap-8 mt-4';

    // Add Save to Deck button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save to Deck';
    saveButton.className = 'px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors';
    saveButton.addEventListener('click', () => {
      const cardData = {
        job: fusedName,
        rarity,
        historicalTitle: `${job1} + ${job2} - Fusion Era`,
        futureTitle: `${fusedName} - Year 4024`,
        description,
        stats
      };

      let deck = JSON.parse(localStorage.getItem('timeJobberDeck')) || [];
      const isDuplicate = deck.some(card => card.job.toLowerCase() === fusedName.toLowerCase());
      
      if (isDuplicate) {
        alert('This fusion is already in your deck!');
        return;
      }

      deck.push(cardData);
      localStorage.setItem('timeJobberDeck', JSON.stringify(deck));
      alert('Fusion saved to deck!');
    });

    // Add View My Deck button
    const viewDeckButton = document.createElement('a');
    viewDeckButton.href = 'deck.html';
    viewDeckButton.textContent = 'View My Deck →';
    viewDeckButton.className = 'px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors';

    // Append buttons to container
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(viewDeckButton);
    document.getElementById('cardContainer').appendChild(buttonContainer);

    // Clear inputs
    document.getElementById('jobInput1').value = '';
    document.getElementById('jobInput2').value = '';
  });
  
  // Allow Enter key to focus on second job input
  document.getElementById('jobInput1').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('jobInput2').focus();
    }
  });
  
  // Allow Enter key to trigger the fusion button
  document.getElementById('jobInput2').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('fuseBtn').click();
    }
  });
  
  // Add event listener for fusion system toggle
  document.getElementById('toggleFusionBtn').addEventListener('click', () => {
    const fusionSystem = document.getElementById('fusionSystem');
    fusionSystem.classList.toggle('hidden');
    
    // Update button text based on visibility
    const toggleBtn = document.getElementById('toggleFusionBtn');
    toggleBtn.textContent = fusionSystem.classList.contains('hidden') ? '⚛️ Try Job Fusion' : '❌ Close Fusion';
  });
  
  // Era mapping and theme management
  const eras = {
    'mythic': {
      name: 'Mythic Era',
      range: [-Infinity, -2000],
      bgClass: 'mythic-bg',
      sound: 'assets/sounds/mythic.mp3',
      colors: {
        primary: 'from-amber-900 to-yellow-800',
        secondary: 'text-amber-900'
      }
    },
    'ancient-egypt': {
      name: 'Ancient Egypt',
      range: [-2000, -1000],
      bgClass: 'ancient-egypt-bg',
      sound: 'assets/sounds/ancient-egypt.mp3',
      colors: {
        primary: 'from-amber-800 to-yellow-600',
        secondary: 'text-amber-800'
      }
    },
    'classical': {
      name: 'Classical Antiquity',
      range: [-1000, 0],
      bgClass: 'classical-bg',
      sound: 'assets/sounds/classical.mp3',
      colors: {
        primary: 'from-blue-800 to-blue-600',
        secondary: 'text-blue-800'
      }
    },
    'roman': {
      name: 'Roman Era',
      range: [0, 500],
      bgClass: 'roman-bg',
      sound: 'assets/sounds/roman.mp3',
      colors: {
        primary: 'from-red-800 to-red-600',
        secondary: 'text-red-800'
      }
    },
    'medieval': {
      name: 'Medieval Era',
      range: [500, 1300],
      bgClass: 'medieval-bg',
      sound: 'assets/sounds/medieval.mp3',
      colors: {
        primary: 'from-gray-800 to-gray-600',
        secondary: 'text-gray-800'
      }
    },
    'renaissance': {
      name: 'Renaissance',
      range: [1300, 1700],
      bgClass: 'renaissance-bg',
      sound: 'assets/sounds/renaissance.mp3',
      colors: {
        primary: 'from-purple-800 to-purple-600',
        secondary: 'text-purple-800'
      }
    },
    'industrial': {
      name: 'Industrial Revolution',
      range: [1700, 1850],
      bgClass: 'industrial-bg',
      sound: 'assets/sounds/industrial.mp3',
      colors: {
        primary: 'from-amber-800 to-amber-600',
        secondary: 'text-amber-800'
      }
    },
    'modern': {
      name: 'Modern Era',
      range: [1850, 1950],
      bgClass: 'modern-bg',
      sound: 'assets/sounds/modern.mp3',
      colors: {
        primary: 'from-blue-600 to-blue-400',
        secondary: 'text-blue-600'
      }
    },
    'contemporary': {
      name: 'Contemporary',
      range: [1950, 2020],
      bgClass: 'contemporary-bg',
      sound: 'assets/sounds/contemporary.mp3',
      colors: {
        primary: 'from-green-600 to-green-400',
        secondary: 'text-green-600'
      }
    },
    'near-future': {
      name: 'Near Future',
      range: [2020, 2100],
      bgClass: 'near-future-bg',
      sound: 'assets/sounds/near-future.mp3',
      colors: {
        primary: 'from-purple-600 to-pink-600',
        secondary: 'text-purple-600'
      }
    },
    'cyberpunk': {
      name: 'Cyberpunk',
      range: [2100, 2500],
      bgClass: 'cyberpunk-bg',
      sound: 'assets/sounds/cyberpunk.mp3',
      colors: {
        primary: 'from-indigo-600 to-purple-600',
        secondary: 'text-indigo-600'
      }
    },
    'space-age': {
      name: 'Space Age',
      range: [2500, Infinity],
      bgClass: 'space-age-bg',
      sound: 'assets/sounds/space-age.mp3',
      colors: {
        primary: 'from-blue-900 to-indigo-900',
        secondary: 'text-blue-900'
      }
    }
  };

  function parseYear(yearStr) {
    // Remove any whitespace
    yearStr = yearStr.trim();
    
    // Handle BC/AD formats
    if (yearStr.toLowerCase().includes('bc')) {
      const yearNum = parseInt(yearStr.replace(/[^0-9]/g, ''));
      return -yearNum;
    } else if (yearStr.toLowerCase().includes('ad')) {
      return parseInt(yearStr.replace(/[^0-9]/g, ''));
    } else {
      // Assume AD if no era specified
      return parseInt(yearStr);
    }
  }

  function getEraForYear(year) {
    for (const [eraKey, era] of Object.entries(eras)) {
      if (year >= era.range[0] && year < era.range[1]) {
        return eraKey;
      }
    }
    return 'contemporary'; // Default era
  }

  function switchTheme(eraKey) {
    const era = eras[eraKey];
    const body = document.body;
    
    // Remove all era-specific classes
    Object.values(eras).forEach(e => {
      body.classList.remove(e.bgClass);
    });
    
    // Add new era classes
    body.classList.add(era.bgClass);
    body.className = body.className.replace(/bg-gradient-to-br from-\S+ to-\S+/, `bg-gradient-to-br ${era.colors.primary}`);
    
    // Update text colors
    document.querySelectorAll('.text-purple-800').forEach(el => {
      el.classList.remove('text-purple-800');
      el.classList.add(era.colors.secondary);
    });
    
    // Play era sound
    const audio = new Audio(era.sound);
    audio.play().catch(e => console.log('Audio playback failed:', e));
    
    // Update current era display
    document.getElementById('currentEraTitle').textContent = era.name;
  }

  // Update dropdown options
  function updateEraDropdown() {
    const eraSelect = document.getElementById('eraSelect');
    eraSelect.innerHTML = '<option value="">Select Era</option>';
    
    Object.entries(eras).forEach(([key, era]) => {
      const option = document.createElement('option');
      option.value = era.range[0];
      option.textContent = `${era.name} (${era.range[0]} - ${era.range[1]})`;
      eraSelect.appendChild(option);
    });
  }

  // Handle era selection from dropdown
  document.getElementById('eraSelect').addEventListener('change', (e) => {
    if (e.target.value) {
      const year = parseInt(e.target.value);
      const eraKey = getEraForYear(year);
      document.getElementById('yearInput').value = year;
      switchTheme(eraKey);
    }
  });

  // Handle year input
  document.getElementById('yearInput').addEventListener('input', (e) => {
    const year = parseYear(e.target.value);
    if (!isNaN(year)) {
      const eraKey = getEraForYear(year);
      const eraSelect = document.getElementById('eraSelect');
      const era = eras[eraKey];
      eraSelect.value = era.range[0];
      switchTheme(eraKey);
    }
  });

  // Handle set year button
  document.getElementById('setYearBtn').addEventListener('click', () => {
    const yearInput = document.getElementById('yearInput');
    const year = parseYear(yearInput.value);
    
    if (isNaN(year)) {
      alert('Please enter a valid year');
      return;
    }
    
    const eraKey = getEraForYear(year);
    switchTheme(eraKey);
  });

  // Allow Enter key to trigger era change
  document.getElementById('yearInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('setYearBtn').click();
    }
  });

  // Initialize
  updateEraDropdown();
  switchTheme('contemporary');
  