"""
Dịch vụ chuyển văn bản thành giọng đọc tự động (Text-to-Speech)
Sử dụng thư viện edge-tts với giọng đọc bản ngữ chất lượng cao.
- Tiếng Anh: en-GB-SoniaNeural (Anh - Anh chuẩn Cambridge Flyers)
- Tiếng Trung: zh-CN-XiaoxiaoNeural (Phổ thông chuẩn YCT/HSK)
Có cơ chế lưu đệm (cache) để phát nhanh và tiết kiệm tài nguyên.
"""

import asyncio
import hashlib
import os
from pathlib import Path
from typing import Optional
import edge_tts

# Thư mục lưu đệm âm thanh
CACHE_DIR = Path(__file__).parent / "audio_cache"
CACHE_DIR.mkdir(exist_ok=True)

VOICES = {
    "Tiếng Anh": "en-GB-SoniaNeural",
    "English": "en-GB-SoniaNeural",
    "en": "en-GB-SoniaNeural",
    "Tiếng Trung": "zh-CN-XiaoxiaoNeural",
    "Chinese": "zh-CN-XiaoxiaoNeural",
    "zh": "zh-CN-XiaoxiaoNeural"
}

def get_audio_cache_path(text: str, voice: str) -> Path:
    """Tạo đường dẫn file cache duy nhất theo nội dung văn bản và giọng đọc."""
    hash_key = hashlib.md5(f"{voice}_{text.strip()}".encode("utf-8")).hexdigest()
    return CACHE_DIR / f"{hash_key}.mp3"

async def _synthesize_edge_tts(text: str, voice: str, rate: str = "+0%") -> bytes:
    """Gọi edge-tts bất đồng bộ để sinh dữ liệu âm thanh MP3."""
    communicate = edge_tts.Communicate(text=text, voice=voice, rate=rate)
    audio_data = b""
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data += chunk["data"]
    return audio_data

def get_or_create_audio(text: str, language: str = "Tiếng Anh", speed: str = "+0%") -> Optional[str]:
    """
    Lấy đường dẫn file âm thanh MP3 từ cache hoặc tạo mới qua edge-tts.
    Trả về đường dẫn tuyệt đối (str) tới file MP3 để dùng với st.audio(path, format='audio/mp3').
    """
    if not text or not text.strip():
        return None

    voice = VOICES.get(language, "en-GB-SoniaNeural")
    cache_path = get_audio_cache_path(text, voice)

    # Nếu đã có trong cache
    if cache_path.exists() and cache_path.stat().st_size > 0:
        return str(cache_path.resolve())

    # Nếu chưa có, tạo mới bằng edge-tts
    try:
        audio_bytes = asyncio.run(_synthesize_edge_tts(text, voice, speed))
        if audio_bytes and len(audio_bytes) > 0:
            cache_path.write_bytes(audio_bytes)
            return str(cache_path.resolve())
    except Exception as e:
        print(f"[TTS Error] Lỗi khi tạo âm thanh edge-tts: {e}")
        return None

    return None
