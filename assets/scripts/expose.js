// Wait for the DOM to load before executing any code
window.addEventListener('DOMContentLoaded', init);

function init() {
  // Get all necessary elements
  const hornSelect = document.getElementById('horn-select');
  const volumeControl = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const playButton = document.querySelector('button');
  const audioElement = document.querySelector('audio');
  const imageElement = document.querySelector('#expose img');

  // Set up event listeners
  hornSelect.addEventListener('change', onHornSelect);
  volumeControl.addEventListener('input', onVolumeChange);
  playButton.addEventListener('click', onPlayButtonClick);
  
  // Initialize with the first horn
  onHornSelect();

  function onHornSelect() {
    // Set the correct image and audio file
    const hornName = hornSelect.value;
    imageElement.src = `./assets/images/${hornName}.svg`;
    audioElement.src = `./assets/audio/${hornName}.mp3`;
  }

  function onVolumeChange() {
    // Set the correct volume icon and adjust audio volume
    const volume = volumeControl.value;
    audioElement.volume = volume / 100;
    if (volume === '0') {
      volumeIcon.src = './assets/icons/volume-level-0.svg';
      volumeIcon.alt = 'Volume level 0';
    } else if (volume < 33) {
      volumeIcon.src = './assets/icons/volume-level-1.svg';
      volumeIcon.alt = 'Volume level 1';
    } else if (volume < 67) {
      volumeIcon.src = './assets/icons/volume-level-2.svg';
      volumeIcon.alt = 'Volume level 2';
    } else {
      volumeIcon.src = './assets/icons/volume-level-3.svg';
      volumeIcon.alt = 'Volume level 3';
    }
  }

  function onPlayButtonClick() {
    // Play the audio and confetti if the Party Horn is selected
    audioElement.play();
    if (hornSelect.value === 'party-horn') {
      confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 },
      });
    }
  }
}
