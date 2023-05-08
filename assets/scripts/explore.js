// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO

  const voiceSelect = document.querySelector('#voice-select');
  const textToSpeak = document.querySelector('#text-to-speak');
  const speakButton = document.querySelector('button');
  const faceImage = document.querySelector('img');

  const synth = window.speechSynthesis;

  let voices = [];
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

  function speakText() {
    // Get the selected voice and create a new SpeechSynthesisUtterance object
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const utterance = new SpeechSynthesisUtterance(textToSpeak.value);

    // Set the voice and speak the text
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        utterance.voice = voice;
      }
    });

    utterance.addEventListener('end', () => {
      // Set the face image to smiling
      faceImage.src = 'assets/images/smiling.png';
    });

    synth.speak(utterance);

    // Set the face image to open-mouthed when synthesizer is speaking
    faceImage.src = 'assets/images/smiling-open.png';

  }

  speakButton.addEventListener('click', () => {
    speakText();
  });
}
