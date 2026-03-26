/**
 * Utilidad para reproducir sonidos en actividades auditivas.
 * Por defecto usa grabaciones de Wikimedia Commons (dominio público / CC).
 * Si falla la carga, usa Web Speech API con onomatopeyas en español.
 */

const ONOMATOPEYAS: Record<string, string> = {
  perro: "¡Guau guau guau!",
  gato: "¡Miau, miau!",
  pájaro: "¡Pío pío pío!",
  vaca: "¡Muuuuu!",
  oveja: "¡Beee, beee!",
  cerdo: "¡Oink oink oink!",
  pato: "¡Cuac cuac cuac!",
  caballo: "¡Ighh Ighh!",
  gallo: "¡Quiquiriquí!",
  auto: "¡Brum brum brum!",
  tren: "¡Chu chu chu!",
  avión: "¡Rum rum rum!",
  barco: "¡Pom pom!",
  camion: "¡Brrr brrr!",
  lluvia: "¡Ploc ploc ploc!",
  olas: "¡Splash splash!",
  mar: "¡Glug glug!",
  viento: "¡Whooosh!",
  cigarra: "¡Zii-ziaaa!",
  trueno: "¡Pum! ¡Trueno!",
  río: "¡Glug glug glug!",
  campana: "¡Din don din don!",
  timbre: "¡Ding dong!",
  puerta: "¡Toc toc toc!",
  reloj: "¡Tic tac tic tac!",
  aspiradora: "¡Vuuuuum!",
  sirena: "¡Nee-oo nee-oo!",
  piano: "¡Plim plim!",
  violin: "¡Violin violin!",
  trompeta: "¡Tu tu tu!",
  guitarra2: "¡Ras ras ras!",
  tambor: "¡Bum bum bum!",
  flauta: "¡Tu ru ru!",
  guitarra: "¡Rasgueo!",
};

/** Grabaciones reales (Wikimedia Commons) — encajan con la etiqueta en español de cada actividad */
const DEFAULT_SOUND_URLS: Record<string, string> = {
  perro: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Barking_of_a_dog.ogg",
  gato: "https://upload.wikimedia.org/wikipedia/commons/6/62/Meow.ogg",
  pájaro: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Spizella_passerina_-_Chipping_Sparrow_-_XC79970.ogg",
  vaca: "https://upload.wikimedia.org/wikipedia/commons/4/48/Mudchute_cow_1.ogg",
  oveja: "https://upload.wikimedia.org/wikipedia/commons/1/13/Sheep_bleating.ogg",
  auto: "https://upload.wikimedia.org/wikipedia/commons/9/90/Speeding-car-horn_doppler_effect_sample.ogg",
  tren: "https://upload.wikimedia.org/wikipedia/commons/8/89/AirChime_K5LA.ogg",
  avión: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Jet_airliner_overhead.ogg",
  barco: "https://upload.wikimedia.org/wikipedia/commons/0/07/Cruise_ship_Albatros_ship_horn.ogg",
  lluvia: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Rain.ogg",
  viento: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Wind_in_Swedish_pine_forest_at_25_mps.ogg",
  trueno: "https://upload.wikimedia.org/wikipedia/commons/9/93/Thunder.ogg",
  río: "https://upload.wikimedia.org/wikipedia/commons/1/19/Rivernoise3.ogg",
  campana: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Samariter_Church_bell_III_%28b%29.ogg",
  tambor: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Snare_drum_unmuffled.ogg",
  flauta: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Flute_2.ogg",
  guitarra: "https://upload.wikimedia.org/wikipedia/commons/a/ae/G_chord.ogg",
};

let audioInstance: HTMLAudioElement | null = null;

function speakText(text: string, lang = "es-ES", onEnd?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd?.();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  utterance.volume = 1;
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();

  const pickVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find((v) => v.lang.startsWith("es"));
    if (spanishVoice) utterance.voice = spanishVoice;
    window.speechSynthesis.speak(utterance);
  };
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) pickVoice();
  else {
    window.speechSynthesis.onvoiceschanged = () => {
      pickVoice();
      window.speechSynthesis.onvoiceschanged = null;
    };
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

export type PlaySoundOptions = {
  audioUrl?: string;
  /** Se llama cuando termina el audio o la voz sintética */
  onPlaybackEnd?: () => void;
};

/**
 * Reproduce el sonido indicado.
 * Prioridad: audioUrl explícita → URL por defecto (Commons) → TTS con onomatopeya.
 */
export function playSound(soundKey: string, options?: PlaySoundOptions): void {
  const key = soundKey.toLowerCase().trim();
  const onEnd = options?.onPlaybackEnd;
  const explicitUrl = options?.audioUrl;
  const fallbackUrl = DEFAULT_SOUND_URLS[key];
  const url = explicitUrl || fallbackUrl;

  const speakFallback = () => {
    speakText(ONOMATOPEYAS[key] || soundKey, "es-ES", onEnd);
  };

  if (url) {
    playFromUrl(url)
      .then(() => onEnd?.())
      .catch(() => {
        speakFallback();
      });
  } else {
    speakFallback();
  }
}

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
