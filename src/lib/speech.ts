'use client';

/**
 * Text-to-Speech & Speech-to-Text helper using standard Web Speech API
 * Runs natively in all modern browsers (Chrome, Edge, Safari iOS, macOS, Android)
 */

export function speakText(text: string, lang: 'en' | 'zh' | 'vi' = 'en') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    alert('Trình duyệt của bạn chưa hỗ trợ phát âm thanh trực tiếp.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  if (lang === 'zh') {
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85; // Slightly slower for kids learning Chinese
  } else if (lang === 'en') {
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
  } else {
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
  }

  utterance.pitch = 1.05; // Friendly kid pitch

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function startSpeechRecognition(
  lang: 'en' | 'zh' | 'vi',
  onResult: (transcript: string) => void,
  onError?: (err: any) => void
): { stop: () => void } | null {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert('Trình duyệt chưa hỗ trợ ghi âm trực tiếp bằng giọng nói. Em có thể gõ nội dung vào ô nhé!');
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'zh' ? 'zh-CN' : lang === 'vi' ? 'vi-VN' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      if (onError) onError(event.error);
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch (e) {}
      }
    };
  } catch (err) {
    console.error('Failed to start speech recognition:', err);
    if (onError) onError(err);
    return null;
  }
}
