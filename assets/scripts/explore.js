// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const voiceSelect = document.querySelector('#voice-select');
  const textToSpeak = document.querySelector('#text-to-speak');
  const speakButton = document.querySelector('button');
  const faceImage = document.querySelector('img');

  const synth = window.speechSynthesis;

  // Load available voices and populate dropdown
  function loadVoices() {
    voices = synth.getVoices();
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;
      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
    });
  }
  loadVoices();
  
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }

  // Speak the text with the selected voice
  function speakText() {
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const utterance = new SpeechSynthesisUtterance(textToSpeak.value);

    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        utterance.voice = voice;
      }
    });

    utterance.addEventListener('end', () => {
      faceImage.src = 'assets/images/smiling.png'; // Set face to smiling after speaking ends
    });

    synth.speak(utterance);

    faceImage.src = 'assets/images/smiling-open.png'; // Set face to open-mouthed while synthesizer is speaking
  }

  speakButton.addEventListener('click', speakText);
}
