const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.volume = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function wishMe() {
  const hour = new Date().getHours();
  if (hour < 12) speak("Good morning Boss...");
  else if (hour < 17) speak("Good afternoon Master...");
  else speak("Good evening Sir...");
}

window.addEventListener('load', () => {
  speak("Initializing Jarvis...");
  wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const transcript = event.results[event.resultIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
  content.textContent = "Listening...";
  recognition.start();
});

function takeCommand(message) {
  if (message.includes('hello') || message.includes('hey')) {
    speak("Hello Sir, how may I help you?");
  } 
  else if (message.includes('open google')) {
    window.open("https://google.com", "_blank");
    speak("Opening Google...");
  } 
  else if (message.includes('open youtube')) {
    window.open("https://youtube.com", "_blank");
    speak("Opening YouTube...");
  } 
  else if (message.includes('time')) {
    const time = new Date().toLocaleTimeString();
    speak("The current time is " + time);
  } 
  else if (message.includes('date')) {
    const date = new Date().toLocaleDateString();
    speak("Today's date is " + date);
  } 
  else {
    window.open(`https://www.google.com/search?q=${message}`, "_blank");
    speak("Here’s what I found on Google for " + message);
  }
}
