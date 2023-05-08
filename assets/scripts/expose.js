// get necessary elements from the HTML
const selectVoice = document.createElement("select");
const speakButton = document.querySelector("button");
const textarea = document.querySelector("textarea");
const faceImg = document.querySelector("img");

// create a SpeechSynthesisUtterance object
const utterance = new SpeechSynthesisUtterance();

// populate the "Select Voice" dropdown with available voices
function populateVoices() {
  const voices = speechSynthesis.getVoices();
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = voices[i].name;
    selectVoice.appendChild(option);
  }
}
// wait for the voices to be loaded before populating the dropdown
speechSynthesis.onvoiceschanged = populateVoices;

// when the "Press to Talk" button is clicked, speak the text using the selected voice
speakButton.addEventListener("click", () => {
  if (speechSynthesis.speaking) return; // if already speaking, do nothing
  const selectedVoice = selectVoice.selectedOptions[0].textContent;
  utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === selectedVoice);
  utterance.text = textarea.value;
  speechSynthesis.speak(utterance);

  // swap the face image to the open mouthed version
  faceImg.src = "assets/images/smiling-open.png";
});


utterance.onend = () => {
  faceImg.src = "assets/images/smiling.png";
};
