import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
} from "@react-three/drei";

import {
  useRef,
  useEffect,
  useMemo,
  useState,
} from "react";

/* =====================================================
   SUPPORTED LANGUAGES
   Gemini language code + Browser Speech BCP-47 code
   ===================================================== */

const SUPPORTED_LANGUAGES = [
  { name: "Afrikaans", geminiCode: "af", speechCode: "af-ZA" },
  { name: "Akan", geminiCode: "ak", speechCode: "ak-GH" },
  { name: "Albanian", geminiCode: "sq", speechCode: "sq-AL" },
  { name: "Amharic", geminiCode: "am", speechCode: "am-ET" },
  { name: "Arabic", geminiCode: "ar", speechCode: "ar-SA" },
  { name: "Armenian", geminiCode: "hy", speechCode: "hy-AM" },
  { name: "Assamese", geminiCode: "as", speechCode: "as-IN" },
  { name: "Azerbaijani", geminiCode: "az", speechCode: "az-AZ" },
  { name: "Basque", geminiCode: "eu", speechCode: "eu-ES" },
  { name: "Belarusian", geminiCode: "be", speechCode: "be-BY" },
  { name: "Bengali", geminiCode: "bn", speechCode: "bn-IN" },
  { name: "Bosnian", geminiCode: "bs", speechCode: "bs-BA" },
  { name: "Bulgarian", geminiCode: "bg", speechCode: "bg-BG" },
  { name: "Burmese", geminiCode: "my", speechCode: "my-MM" },
  { name: "Catalan", geminiCode: "ca", speechCode: "ca-ES" },
  { name: "Cebuano", geminiCode: "ceb", speechCode: "ceb-PH" },
  { name: "Chinese", geminiCode: "zh", speechCode: "zh-CN" },
  { name: "Croatian", geminiCode: "hr", speechCode: "hr-HR" },
  { name: "Czech", geminiCode: "cs", speechCode: "cs-CZ" },
  { name: "Danish", geminiCode: "da", speechCode: "da-DK" },
  { name: "Dutch", geminiCode: "nl", speechCode: "nl-NL" },
  { name: "English", geminiCode: "en", speechCode: "en-IN" },
  { name: "Estonian", geminiCode: "et", speechCode: "et-EE" },
  { name: "Faroese", geminiCode: "fo", speechCode: "fo-FO" },
  { name: "Filipino", geminiCode: "fil", speechCode: "fil-PH" },
  { name: "Finnish", geminiCode: "fi", speechCode: "fi-FI" },
  { name: "French", geminiCode: "fr", speechCode: "fr-FR" },
  { name: "Galician", geminiCode: "gl", speechCode: "gl-ES" },
  { name: "Georgian", geminiCode: "ka", speechCode: "ka-GE" },
  { name: "German", geminiCode: "de", speechCode: "de-DE" },
  { name: "Greek", geminiCode: "el", speechCode: "el-GR" },
  { name: "Gujarati", geminiCode: "gu", speechCode: "gu-IN" },
  { name: "Hausa", geminiCode: "ha", speechCode: "ha-NG" },
  { name: "Hebrew", geminiCode: "iw", speechCode: "he-IL" },
  { name: "Hindi", geminiCode: "hi", speechCode: "hi-IN" },
  { name: "Hungarian", geminiCode: "hu", speechCode: "hu-HU" },
  { name: "Icelandic", geminiCode: "is", speechCode: "is-IS" },
  { name: "Indonesian", geminiCode: "id", speechCode: "id-ID" },
  { name: "Irish", geminiCode: "ga", speechCode: "ga-IE" },
  { name: "Italian", geminiCode: "it", speechCode: "it-IT" },
  { name: "Japanese", geminiCode: "ja", speechCode: "ja-JP" },
  { name: "Kannada", geminiCode: "kn", speechCode: "kn-IN" },
  { name: "Kazakh", geminiCode: "kk", speechCode: "kk-KZ" },
  { name: "Khmer", geminiCode: "km", speechCode: "km-KH" },
  { name: "Kinyarwanda", geminiCode: "rw", speechCode: "rw-RW" },
  { name: "Korean", geminiCode: "ko", speechCode: "ko-KR" },
  { name: "Kurdish", geminiCode: "ku", speechCode: "ku-TR" },
  { name: "Kyrgyz", geminiCode: "ky", speechCode: "ky-KG" },
  { name: "Lao", geminiCode: "lo", speechCode: "lo-LA" },
  { name: "Malay", geminiCode: "ms", speechCode: "ms-MY" },
  { name: "Malayalam", geminiCode: "ml", speechCode: "ml-IN" },
  { name: "Maltese", geminiCode: "mt", speechCode: "mt-MT" },
  { name: "Maori", geminiCode: "mi", speechCode: "mi-NZ" },
  { name: "Marathi", geminiCode: "mr", speechCode: "mr-IN" },
  { name: "Mongolian", geminiCode: "mn", speechCode: "mn-MN" },
  { name: "Nepali", geminiCode: "ne", speechCode: "ne-NP" },
  { name: "Norwegian", geminiCode: "no", speechCode: "nb-NO" },
  { name: "Odia", geminiCode: "or", speechCode: "or-IN" },
  { name: "Oromo", geminiCode: "om", speechCode: "om-ET" },
  { name: "Pashto", geminiCode: "ps", speechCode: "ps-AF" },
  { name: "Persian", geminiCode: "fa", speechCode: "fa-IR" },
  { name: "Polish", geminiCode: "pl", speechCode: "pl-PL" },
  { name: "Portuguese", geminiCode: "pt", speechCode: "pt-BR" },
  { name: "Punjabi", geminiCode: "pa", speechCode: "pa-IN" },
  { name: "Quechua", geminiCode: "qu", speechCode: "qu-PE" },
  { name: "Romanian", geminiCode: "ro", speechCode: "ro-RO" },
  { name: "Romansh", geminiCode: "rm", speechCode: "rm-CH" },
  { name: "Russian", geminiCode: "ru", speechCode: "ru-RU" },
  { name: "Serbian", geminiCode: "sr", speechCode: "sr-RS" },
  { name: "Sindhi", geminiCode: "sd", speechCode: "sd-Arab-IN" },
  { name: "Sinhala", geminiCode: "si", speechCode: "si-LK" },
  { name: "Slovak", geminiCode: "sk", speechCode: "sk-SK" },
  { name: "Slovenian", geminiCode: "sl", speechCode: "sl-SI" },
  { name: "Somali", geminiCode: "so", speechCode: "so-SO" },
  { name: "Southern Sotho", geminiCode: "st", speechCode: "st-ZA" },
  { name: "Spanish", geminiCode: "es", speechCode: "es-ES" },
  { name: "Swahili", geminiCode: "sw", speechCode: "sw-KE" },
  { name: "Swedish", geminiCode: "sv", speechCode: "sv-SE" },
  { name: "Tajik", geminiCode: "tg", speechCode: "tg-TJ" },
  { name: "Tamil", geminiCode: "ta", speechCode: "ta-IN" },
  { name: "Telugu", geminiCode: "te", speechCode: "te-IN" },
  { name: "Thai", geminiCode: "th", speechCode: "th-TH" },
  { name: "Tswana", geminiCode: "tn", speechCode: "tn-BW" },
  { name: "Turkish", geminiCode: "tr", speechCode: "tr-TR" },
  { name: "Turkmen", geminiCode: "tk", speechCode: "tk-TM" },
  { name: "Ukrainian", geminiCode: "uk", speechCode: "uk-UA" },
  { name: "Urdu", geminiCode: "ur", speechCode: "ur-IN" },
  { name: "Uzbek", geminiCode: "uz", speechCode: "uz-UZ" },
  { name: "Vietnamese", geminiCode: "vi", speechCode: "vi-VN" },
  { name: "Welsh", geminiCode: "cy", speechCode: "cy-GB" },
  { name: "Western Frisian", geminiCode: "fy", speechCode: "fy-NL" },
  { name: "Wolof", geminiCode: "wo", speechCode: "wo-SN" },
  { name: "Yoruba", geminiCode: "yo", speechCode: "yo-NG" },
  { name: "Zulu", geminiCode: "zu", speechCode: "zu-ZA" },
];

/* =====================================================
   ROBOT
   ===================================================== */

function Robot() {
  const group = useRef(null);

  const { scene, animations } =
    useGLTF("/models/ai-coach.glb");

  const { actions } =
    useAnimations(animations, group);

  useEffect(() => {
    if (!actions) return;

    Object.values(actions).forEach((action) => {
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
    });

    return () => {
      Object.values(actions).forEach((action) => {
        if (action) {
          action.fadeOut(0.3);
        }
      });
    };
  }, [actions]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.60}
      position={[0, -0.45, 0]}
    />
  );
}

/* =====================================================
   AI COACH
   ===================================================== */

export default function AICoach() {
  const welcomeAudio = useMemo(
    () => new Audio("/audio/titan-welcome.mp3"),
    []
  );

  const [activated, setActivated] = useState(() => {
    try {
      return (
        sessionStorage.getItem("aiCoachActivated") ===
        "true"
      );
    } catch {
      return false;
    }
  });

  const [mode, setMode] = useState(null);
  const [status, setStatus] = useState("Click the robot");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [language, setLanguage] = useState(
    SUPPORTED_LANGUAGES.find(
      (item) => item.name === "Hindi"
    ) || SUPPORTED_LANGUAGES[0]
  );

  /* =====================================================
     REFS
     ===================================================== */

  const recognitionRef = useRef(null);
  const recognitionStartingRef = useRef(false);

  const speakingRef = useRef(false);
  const thinkingRef = useRef(false);
  const talkActiveRef = useRef(false);

  const languageRef = useRef(language);
  const messagesRef = useRef([]);

  const speechGenerationRef = useRef(0);

  const micStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const vadAnimationRef = useRef(null);

  const userVoiceDetectedRef = useRef(false);
  const interruptCooldownRef = useRef(false);

  /*
   * Current Titan answer.
   * Used to reduce false interruption caused by
   * Titan's own voice leaking into the microphone.
   */
  const currentSpokenTextRef = useRef("");

  /*
   * Prevent duplicate barge-in recognition.
   */
  const bargeInRecognitionRef = useRef(false);

  /* =====================================================
     UPDATE REFS
     ===================================================== */

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  /* =====================================================
     STOP TITAN SPEAKING
     ===================================================== */

  const stopTitanSpeaking = () => {
    speechGenerationRef.current += 1;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    speakingRef.current = false;
    setIsSpeaking(false);
    currentSpokenTextRef.current = "";
  };

  /* =====================================================
     STOP MICROPHONE MONITOR
     ===================================================== */

  const stopMicrophoneMonitor = () => {
    if (vadAnimationRef.current) {
      cancelAnimationFrame(
        vadAnimationRef.current
      );

      vadAnimationRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch { /* ignore cleanup errors */ }

      audioContextRef.current = null;
    }

    if (micStreamRef.current) {
      micStreamRef.current
        .getTracks()
        .forEach((track) => {
          try {
            track.stop();
          } catch { /* ignore cleanup errors */ }
        });

      micStreamRef.current = null;
    }

    analyserRef.current = null;
    userVoiceDetectedRef.current = false;
  };

  /* =====================================================
     START MICROPHONE MONITOR

     IMPORTANT CHANGE:
     We don't wait for VAD before starting recognition.

     Titan starts speaking
            ↓
     interruption recognition starts immediately
            ↓
     user starts speaking
            ↓
     Titan stops
     ===================================================== */

  const startMicrophoneMonitor = async () => {
    if (!talkActiveRef.current) return;
    if (!speakingRef.current) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    if (
      recognitionRef.current ||
      recognitionStartingRef.current ||
      bargeInRecognitionRef.current
    ) {
      return;
    }

    try {
      bargeInRecognitionRef.current = true;

      startListening({
        interruptMode: true,
      });
    } catch (error) {
      console.warn(
        "Barge-in recognition error:",
        error
      );

      bargeInRecognitionRef.current = false;
    }
  };

  /* =====================================================
     STOP RECOGNITION
     ===================================================== */

  const stopRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch { /* ignore cleanup errors */ }

      recognitionRef.current = null;
    }

    setIsListening(false);
    recognitionStartingRef.current = false;
    bargeInRecognitionRef.current = false;
    userVoiceDetectedRef.current = false;
  };

  /* =====================================================
     START SPEECH RECOGNITION
     ===================================================== */

  const startListening = ({
    interruptMode = false,
  } = {}) => {
    if (!talkActiveRef.current) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus(
        "🎤 Please use Google Chrome for Talk mode."
      );

      return;
    }

    if (recognitionRef.current) return;
    if (recognitionStartingRef.current) return;

    const currentLanguage =
      languageRef.current;

    const recognition =
      new SpeechRecognition();

    recognitionRef.current = recognition;
    recognitionStartingRef.current = true;
    setIsListening(true);

    /*
     * In interruption mode we keep recognition alive.
     */
    recognition.continuous =
      interruptMode;

    /*
     * Interim results are essential for fast
     * interruption.
     */
    recognition.interimResults = true;

    recognition.maxAlternatives = 1;

    /*
     * Selected language.
     */
    recognition.lang =
      currentLanguage.speechCode;

    recognition.onstart = () => {
      recognitionStartingRef.current =
        false;
      setIsListening(true);

      if (interruptMode) {
        bargeInRecognitionRef.current =
          true;

        setStatus(
          "🎤 Listening for interruption..."
        );
      } else {
        setStatus(
          `🎤 Listening in ${currentLanguage.name}...`
        );
      }
    };

    recognition.onresult = async (
      event
    ) => {
      let transcript = "";
      let finalFound = false;

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const result =
          event.results[i];

        if (result?.[0]) {
          transcript +=
            result[0].transcript;
        }

        if (result?.isFinal) {
          finalFound = true;
        }
      }

      transcript =
        transcript.trim();

      if (!transcript) return;

      /* =================================================
         FAST BARGE-IN
         ================================================= */

      if (
        interruptMode &&
        speakingRef.current &&
        transcript.length >= 2 &&
        !interruptCooldownRef.current
      ) {
        const spokenText =
          currentSpokenTextRef.current
            .toLowerCase()
            .replace(
              /[^\p{L}\p{N}\s]/gu,
              " "
            )
            .replace(/\s+/g, " ")
            .trim();

        const recognizedText =
          transcript
            .toLowerCase()
            .replace(
              /[^\p{L}\p{N}\s]/gu,
              " "
            )
            .replace(/\s+/g, " ")
            .trim();

        const spokenWords =
          spokenText
            .split(" ")
            .filter(Boolean);

        const recognizedWords =
          recognizedText
            .split(" ")
            .filter(Boolean);

        let matchingWords = 0;

        recognizedWords.forEach(
          (word) => {
            if (
              spokenWords.includes(word)
            ) {
              matchingWords++;
            }
          }
        );

        const matchRatio =
          recognizedWords.length > 0
            ? matchingWords /
              recognizedWords.length
            : 0;

        /*
         * If browser recognition hears words that are
         * strongly present in Titan's current answer,
         * it is probably speaker echo.
         */
        const probablyTitanEcho =
          recognizedWords.length >= 2 &&
          matchRatio >= 0.85;

        if (!probablyTitanEcho) {
          interruptCooldownRef.current =
            true;

          console.log(
            "🛑 USER INTERRUPTED TITAN:",
            transcript
          );

          /*
           * THIS IS THE IMPORTANT PART:
           * Titan stops immediately on interim speech.
           */
          stopTitanSpeaking();

          setStatus(
            `🎤 Listening in ${currentLanguage.name}...`
          );

          setTimeout(() => {
            interruptCooldownRef.current =
              false;
          }, 250);
        } else {
          console.log(
            "🔊 Ignoring probable Titan echo:",
            transcript
          );
        }
      }

      /*
       * Never send interim text to Gemini.
       */
      if (!finalFound) {
        return;
      }

      if (!transcript) {
        return;
      }

      /*
       * Final safety check.
       */
      if (speakingRef.current) {
        stopTitanSpeaking();
      }

      try {
        recognition.stop();
      } catch { /* ignore cleanup errors */ }

      recognitionRef.current = null;
      recognitionStartingRef.current =
        false;
      setIsListening(false);

      bargeInRecognitionRef.current =
        false;

      userVoiceDetectedRef.current =
        false;

      const previousHistory =
        messagesRef.current;

      const userMessage = {
        role: "user",
        text: transcript,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      messagesRef.current = [
        ...messagesRef.current,
        userMessage,
      ];

      await askGemini(
        transcript,
        previousHistory
      );
    };

    recognition.onerror = (
      event
    ) => {
      console.warn(
        "🎤 Speech recognition:",
        event.error
      );

      recognitionRef.current = null;
      recognitionStartingRef.current =
        false;
      setIsListening(false);

      /*
       * If Titan is still speaking, rebuild the
       * interruption listener immediately.
       */
      if (
        interruptMode &&
        speakingRef.current &&
        talkActiveRef.current
      ) {
        bargeInRecognitionRef.current =
          false;

        setTimeout(() => {
          if (
            talkActiveRef.current &&
            speakingRef.current &&
            !recognitionRef.current &&
            !recognitionStartingRef.current
          ) {
            startListening({
              interruptMode: true,
            });
          }
        }, 50);

        return;
      }

      bargeInRecognitionRef.current =
        false;

      userVoiceDetectedRef.current =
        false;

      if (
        event.error ===
        "not-allowed"
      ) {
        setStatus(
          "🎤 Microphone permission denied"
        );

        return;
      }

      if (
        event.error ===
        "service-not-allowed"
      ) {
        setStatus(
          "🎤 Voice service not allowed"
        );

        return;
      }

      if (
        event.error ===
        "aborted"
      ) {
        return;
      }

      if (
        event.error ===
        "no-speech"
      ) {
        if (
          talkActiveRef.current &&
          !speakingRef.current &&
          !thinkingRef.current
        ) {
          setTimeout(() => {
            if (
              talkActiveRef.current &&
              !speakingRef.current &&
              !thinkingRef.current &&
              !recognitionRef.current
            ) {
              startListening();
            }
          }, 250);
        }
      }
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      recognitionStartingRef.current =
        false;
      setIsListening(false);

      /*
       * Titan is still speaking.
       * Restart interruption recognition immediately.
       */
      if (
        interruptMode &&
        speakingRef.current &&
        talkActiveRef.current
      ) {
        bargeInRecognitionRef.current =
          false;

        setTimeout(() => {
          if (
            talkActiveRef.current &&
            speakingRef.current &&
            !recognitionRef.current &&
            !recognitionStartingRef.current
          ) {
            startListening({
              interruptMode: true,
            });
          }
        }, 50);

        return;
      }

      bargeInRecognitionRef.current =
        false;

      /*
       * Normal listening after Titan finishes.
       */
      if (
        talkActiveRef.current &&
        !thinkingRef.current &&
        !speakingRef.current
      ) {
        setTimeout(() => {
          if (
            talkActiveRef.current &&
            !speakingRef.current &&
            !thinkingRef.current &&
            !recognitionRef.current &&
            !recognitionStartingRef.current
          ) {
            startListening();
          }
        }, 150);
      }
    };

    try {
      recognition.start();
    } catch (error) {
      console.warn(
        "Recognition start failed:",
        error
      );

      recognitionRef.current =
        null;

      recognitionStartingRef.current =
        false;

      bargeInRecognitionRef.current =
        false;
    }
  };

  /* =====================================================
     TITAN SPEAK
     ===================================================== */

  const speakText = (reply) => {
    if (!reply) return;

    if (
      !("speechSynthesis" in window)
    ) {
      setStatus(
        "🔊 Speech output is not supported."
      );

      return;
    }

    stopTitanSpeaking();

    const generation =
      speechGenerationRef.current;

    const currentLanguage =
      languageRef.current;

    /*
     * Save current answer for echo protection.
     */
    currentSpokenTextRef.current =
      reply;

    const utterance =
      new SpeechSynthesisUtterance(
        reply
      );

    /*
     * Selected language.
     */
    utterance.lang =
      currentLanguage.speechCode;

    utterance.rate = 0.88;
    utterance.pitch = 0.55;
    utterance.volume = 1;

    const chooseVoice = () => {
      const voices =
        window.speechSynthesis.getVoices();

      const selectedCode =
        currentLanguage.speechCode.toLowerCase();

      const selectedBase =
        selectedCode.split("-")[0];

      const matchingVoices =
        voices.filter((voice) => {
          const voiceLang =
            voice.lang.toLowerCase();

          const voiceBase =
            voiceLang.split("-")[0];

          return (
            voiceLang ===
              selectedCode ||
            voiceBase ===
              selectedBase
          );
        });

      /*
       * Prefer male-style voice names if
       * the browser exposes such information.
       */
      const maleVoice =
        matchingVoices.find(
          (voice) =>
            /male|man|david|ravi|hemant|prabhat|madhur|amit|arjun|alex|daniel/i.test(
              voice.name
            )
        );

      const selectedVoice =
        maleVoice ||
        matchingVoices[0];

      if (selectedVoice) {
        utterance.voice =
          selectedVoice;

        console.log(
          "🔊 Titan Voice:",
          selectedVoice.name,
          selectedVoice.lang
        );

        return true;
      }

      console.warn(
        `No browser voice available for ${currentLanguage.name} (${currentLanguage.speechCode})`
      );

      return false;
    };

    const hasVoice =
      chooseVoice();

    if (!hasVoice) {
      setStatus(
        `🔊 Voice unavailable for ${currentLanguage.name} on this device`
      );
    }

    utterance.onstart = () => {
      if (
        generation !==
        speechGenerationRef.current
      ) {
        return;
      }

      speakingRef.current = true;
      setIsSpeaking(true);

      /*
       * Immediately start interruption recognition.
       */
      setStatus(
        `🔊 Titan is speaking in ${currentLanguage.name}...`
      );

      if (talkActiveRef.current) {
        startMicrophoneMonitor();
      }
    };

    utterance.onend = () => {
      if (
        generation !==
        speechGenerationRef.current
      ) {
        return;
      }

      speakingRef.current = false;
      setIsSpeaking(false);
      currentSpokenTextRef.current =
        "";
      bargeInRecognitionRef.current =
        false;

      /*
       * Do not keep the extra monitor alive.
       */
      stopMicrophoneMonitor();

      if (talkActiveRef.current) {
        setStatus(
          `🎤 Listening in ${currentLanguage.name}...`
        );

        setTimeout(() => {
          if (
            talkActiveRef.current &&
            !thinkingRef.current &&
            !speakingRef.current &&
            !recognitionRef.current &&
            !recognitionStartingRef.current
          ) {
            startListening();
          }
        }, 150);
      } else {
        setStatus(
          "Chat connected"
        );
      }
    };

    utterance.onerror = (
      event
    ) => {
      /*
       * Expected when the user interrupts Titan.
       */
      if (
        event.error ===
        "interrupted"
      ) {
        speakingRef.current =
          false;
        setIsSpeaking(false);

        currentSpokenTextRef.current =
          "";

        bargeInRecognitionRef.current =
          false;

        stopMicrophoneMonitor();

        return;
      }

      console.error(
        "🔊 Titan speech error:",
        event
      );

      speakingRef.current =
        false;
      setIsSpeaking(false);

      currentSpokenTextRef.current =
        "";

      bargeInRecognitionRef.current =
        false;

      stopMicrophoneMonitor();

      if (
        talkActiveRef.current &&
        !thinkingRef.current
      ) {
        setTimeout(() => {
          startListening();
        }, 300);
      }
    };

    /*
     * Browser voices can load asynchronously.
     */
    if (!hasVoice) {
      const retryVoices = () => {
        if (
          generation !==
          speechGenerationRef.current
        ) {
          return;
        }

        chooseVoice();

        window.speechSynthesis.speak(
          utterance
        );
      };

      setTimeout(() => {
        if (
          !window.speechSynthesis
            .speaking &&
          generation ===
            speechGenerationRef.current
        ) {
          retryVoices();
        }
      }, 150);

      return;
    }

    window.speechSynthesis.speak(
      utterance
    );
  };

  /* =====================================================
     ACTIVATE ROBOT
     ===================================================== */

  const activateRobot = async (
    e
  ) => {
    e.stopPropagation();

    if (activated) return;

    welcomeAudio.currentTime = 0;
    welcomeAudio.volume = 1;

    try {
      await welcomeAudio.play();
    } catch (error) {
      console.log(
        "Welcome audio blocked:",
        error
      );
    }

    try {
      sessionStorage.setItem(
        "aiCoachActivated",
        "true"
      );
    } catch { /* ignore cleanup errors */ }

    setActivated(true);

    setStatus(
      "Choose Chat or Talk"
    );
  };

  /* =====================================================
     GEMINI
     ===================================================== */

  const askGemini = async (
    userMessage,
    historyOverride = null
  ) => {
    try {
      thinkingRef.current = true;

      setIsThinking(true);

      setStatus(
        "🧠 Titan is thinking..."
      );

      /*
       * Stop microphone while Gemini processes.
       */
      stopMicrophoneMonitor();
      stopRecognition();

      const sourceHistory =
        historyOverride ??
        messagesRef.current;

      const history =
        sourceHistory
          .filter(
            (message) =>
              message &&
              (
                message.role ===
                  "user" ||
                message.role ===
                  "assistant"
              ) &&
              typeof message.text ===
                "string"
          )
          .map((message) => ({
            role:
              message.role === "user"
                ? "user"
                : "model",

            parts: [
              {
                text: message.text,
              },
            ],
          }))
          .slice(-20);

      const currentLanguage =
        languageRef.current;

      const response =
        await fetch(
          "http://localhost:3001/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              message: userMessage,
              history,

              language:
                currentLanguage.name,

              languageCode:
                currentLanguage.geminiCode,

              speechCode:
                currentLanguage.speechCode,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Gemini request failed"
        );
      }

      const reply =
        data.reply?.trim();

      if (!reply) {
        throw new Error(
          "Gemini returned an empty response."
        );
      }

      const assistantMessage = {
        role: "assistant",
        text: reply,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

      messagesRef.current = [
        ...messagesRef.current,
        assistantMessage,
      ];

      thinkingRef.current = false;
      setIsThinking(false);

      if (
        talkActiveRef.current
      ) {
        speakText(reply);
      } else {
        setStatus(
          "Chat connected"
        );
      }

      return reply;
    } catch (error) {
      console.error(
        "❌ Gemini connection error:",
        error
      );

      thinkingRef.current = false;
      setIsThinking(false);

      setStatus(
        "AI connection failed"
      );

      const errorMessage = {
        role: "assistant",
        text:
          "Sorry, I am having trouble connecting right now. Please try again.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);

      messagesRef.current = [
        ...messagesRef.current,
        errorMessage,
      ];

      if (
        talkActiveRef.current
      ) {
        setTimeout(() => {
          if (
            talkActiveRef.current &&
            !speakingRef.current &&
            !thinkingRef.current
          ) {
            startListening();
          }
        }, 800);
      }

      return null;
    }
  };

  /* =====================================================
     START CHAT
     ===================================================== */

  const startChat = (e) => {
    e.stopPropagation();

    talkActiveRef.current =
      false;

    stopRecognition();
    stopMicrophoneMonitor();
    stopTitanSpeaking();

    setMode("chat");

    setStatus(
      "Chat connected"
    );
  };

  /* =====================================================
     SEND CHAT MESSAGE
     ===================================================== */

  const sendMessage = async (
    e
  ) => {
    e.preventDefault();

    if (!text.trim()) return;
    if (thinkingRef.current) return;

    const userMessage =
      text.trim();

    const previousHistory =
      messagesRef.current;

    const newMessage = {
      role: "user",
      text: userMessage,
    };

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

    messagesRef.current = [
      ...messagesRef.current,
      newMessage,
    ];

    setText("");

    await askGemini(
      userMessage,
      previousHistory
    );
  };

  /* =====================================================
     START TALK
     ===================================================== */

  const startTalk = async (
    e
  ) => {
    e.stopPropagation();

    talkActiveRef.current =
      true;

    setMode("talk");

    setStatus(
      "🎤 Starting microphone..."
    );

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          }
        );

      stream
        .getTracks()
        .forEach((track) => {
          track.stop();
        });
    } catch (error) {
      console.error(
        "Microphone permission error:",
        error
      );

      talkActiveRef.current =
        false;

      setStatus(
        "🎤 Microphone permission denied"
      );

      return;
    }

    setTimeout(() => {
      if (
        talkActiveRef.current
      ) {
        startListening();
      }
    }, 300);
  };

  /* =====================================================
     STOP AI
     ===================================================== */

  const stopAI = (e) => {
    e.stopPropagation();

    talkActiveRef.current =
      false;

    thinkingRef.current =
      false;

    stopRecognition();
    stopMicrophoneMonitor();
    stopTitanSpeaking();

    setIsThinking(false);

    setMode(null);

    setStatus(
      "Choose Chat or Talk"
    );
  };

  /* =====================================================
     LANGUAGE CHANGE
     ===================================================== */

  const handleLanguageChange =
    (e) => {
      const selected =
        SUPPORTED_LANGUAGES.find(
          (item) =>
            item.geminiCode ===
            e.target.value
        );

      if (!selected) return;

      /*
       * Stop current speech/listening.
       */
      stopRecognition();
      stopMicrophoneMonitor();
      stopTitanSpeaking();

      setLanguage(selected);

      languageRef.current =
        selected;

      setStatus(
        `${selected.name} selected`
      );
    };

  /* =====================================================
     CLEANUP
     ===================================================== */

  useEffect(() => {
    const handleVoicesChanged =
      () => {
        window.speechSynthesis
          ?.getVoices();
      };

    if (
      "speechSynthesis" in
      window
    ) {
      window.speechSynthesis
        .addEventListener(
          "voiceschanged",
          handleVoicesChanged
        );
    }

    return () => {
      talkActiveRef.current =
        false;

      thinkingRef.current =
        false;

      stopRecognition();
      stopMicrophoneMonitor();
      stopTitanSpeaking();

      welcomeAudio.pause();
      welcomeAudio.currentTime = 0;

      if (
        "speechSynthesis" in
        window
      ) {
        window.speechSynthesis
          .removeEventListener(
            "voiceschanged",
            handleVoicesChanged
          );
      }
    };
  }, [welcomeAudio]);

  /* =====================================================
     UI
     ===================================================== */

  return (
    <div
      className="ai-coach"
      onClick={activateRobot}
    >
      {/* =================================================
          CHAT / CONTROLS
          ================================================= */}

      {activated && (
        <div
          className="ai-controls"
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          {/* ===============================
              MAIN MENU
              =============================== */}

          {!mode && (
            <>
              <div className="ai-language">
                <label>
                  🌐 Language
                </label>

                <select
                  value={
                    language.geminiCode
                  }
                  onChange={
                    handleLanguageChange
                  }
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >
                  {SUPPORTED_LANGUAGES.map(
                    (item) => (
                      <option
                        key={
                          item.geminiCode
                        }
                        value={
                          item.geminiCode
                        }
                      >
                        {item.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="ai-status">
                {status}
              </div>

              <div className="ai-buttons">
                <button
                  onClick={startChat}
                >
                  💬 Chat
                </button>

                <button
                  onClick={startTalk}
                >
                  🎤 Talk
                </button>
              </div>
            </>
          )}

          {/* =================================================
              CHAT MODE
              ================================================= */}

          {mode === "chat" && (
            <div className="ai-chat-box">
              <div className="ai-status">
                💬 Titan AI Coach
                <br />

                <small>
                  🌐 {language.name}
                </small>
              </div>

              <div className="ai-messages">
                {messages.map(
                  (
                    message,
                    index
                  ) => (
                    <div
                      key={index}
                      className={
                        message.role ===
                        "user"
                          ? "ai-message user"
                          : "ai-message assistant"
                      }
                    >
                      {message.text}
                    </div>
                  )
                )}

                {isThinking && (
                  <div className="ai-message assistant">
                    🧠 Thinking...
                  </div>
                )}
              </div>

              <form
                onSubmit={
                  sendMessage
                }
              >
                <input
                  value={text}
                  onChange={(e) =>
                    setText(
                      e.target.value
                    )
                  }
                  placeholder={`Ask Titan in ${language.name}...`}
                  disabled={
                    isThinking
                  }
                />

                <button
                  type="submit"
                  disabled={
                    isThinking
                  }
                >
                  ➤
                </button>
              </form>

              <button
                className="ai-close"
                onClick={stopAI}
              >
                Close
              </button>
            </div>
          )}

          {/* =================================================
              TALK MODE
              ================================================= */}

          {mode === "talk" && (
            <div className="ai-talk-box">
              <div className="ai-status">
                {status}
              </div>

              <p>
                🌐 {language.name}
                <br />
                Speak naturally.
                <br />
                Titan will listen
                automatically.
                <br />
                You can interrupt
                Titan when you start
                speaking.
              </p>

              <button
                onClick={() =>
                  startListening()
                }
                disabled={
                  isListening ||
                  isThinking ||
                  isSpeaking
                }
              >
                🎤 Speak
              </button>

              <button
                className="ai-close"
                onClick={stopAI}
              >
                Stop Talk
              </button>
            </div>
          )}
        </div>
      )}

      {/* =================================================
          TITAN 3D ROBOT
          ================================================= */}

      <div className="ai-robot-layer">
        <Canvas
          camera={{
            position: [
              0,
              0.1,
              3.8,
            ],
            fov: 40,
          }}
          gl={{
            alpha: true,
          }}
          style={{
            background:
              "transparent",
          }}
        >
          <ambientLight
            intensity={1.2}
          />

          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
          />

          <pointLight
            position={[0, 2, 2]}
            intensity={5}
            color="#ff6a00"
          />

          <Robot />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload(
  "/models/ai-coach.glb"
);