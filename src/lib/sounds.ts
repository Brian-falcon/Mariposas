/**
 * Utilidad para reproducir sonidos en actividades auditivas.
 * Usa Web Speech API (text-to-speech) con onomatopeyas en español.
 * También soporta URLs de audio para archivos reales (ej: /sounds/perro.mp3)
 */

const ONOMATOPEYAS: Record<string, string> = {
  perro: "¡Guau guau guau!",
  gato: "¡Miau, miau!",
  pájaro: "¡Pío pío pío!",
  vaca: "¡Muuuuu!",
  oveja: "¡Beee, beee!",
  auto: "¡Brum brum brum!",
  tren: "¡Chu chu chu!",
  avión: "¡Rum rum rum!",
  barco: "¡Pom pom!",
  lluvia: "¡Ploc ploc ploc!",
  viento: "¡Whooosh!",
  trueno: "¡Pum! ¡Trueno!",
  río: "¡Glug glug glug!",
  campana: "¡Din don din don!",
  tambor: "¡Bum bum bum!",
  flauta: "¡Tu ru ru!",
  guitarra: "¡Rasgueo!",
};

let audioInstance: HTMLAudioElement | null = null;

function speakText(text: string, lang = "es-ES") {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  utterance.volume = 1;

  const pickVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find((v) => v.lang.startsWith("es"));
    if (spanishVoice) utterance.voice = spanishVoice;
    window.speechSynthesis.speak(utterance);
  };
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) pickVoice();
  else {
    window.speechSynthesis.onvoiceschanged = () => { pickVoice(); window.speechSynthesis.onvoiceschanged = null; };
    setTimeout(pickVoice, 100);
  }
}

function playFromUrl(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("No window"));
      return;
    }
    if (audioInstance) {
      audioInstance.pause();
      audioInstance = null;
    }
    const audio = new Audio(url);
    audioInstance = audio;
    audio.onended = () => resolve();
    audio.onerror = () => reject(audio.error);
    audio.play().catch(reject);
  });
}

/**
 * Reproduce el sonido indicado.
 * Si hay audioUrl en los datos, la usa. Sino, usa onomatopeya con Speech API.
 */
export function playSound(
  soundKey: string,
  options?: { audioUrl?: string }
): void {
  const key = soundKey.toLowerCase().trim();
  const url = options?.audioUrl;

  if (url) {
    playFromUrl(url).catch(() => {
      speakText(ONOMATOPEYAS[key] || soundKey);
    });
  } else {
    speakText(ONOMATOPEYAS[key] || soundKey);
  }
}

/**
 * Detiene cualquier sonido en reproducción
 */
export function stopSound(): void {
  if (typeof window !== "undefined") {
    window.speechSynthesis?.cancel();
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
      audioInstance = null;
    }
  }
}
