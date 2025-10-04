---
layout: project
title: Data→Video Encoder
summary: Encrypt any file, pack ciphertext into video frames, mux via FFmpeg to MP4/MOV/MKV, and fully reverse it.
year: 2025
stack: [Electron, React, FastAPI, Python, FFmpeg, AES-GCM/ChaCha20-Poly1305, Argon2id, MP4/MOV/MKV, H.264/HEVC/AV1]
thumb: /assets/img/datavideo-thumb.jpg
hero:  /assets/img/datavideo-hero.jpg
gif:   /assets/gif/datavideo-demo.gif
links:
  - {label: Repo, url: "https://github.com/yourname/data-video-encoder"} # replace
---

## Implementation

- **Encode pipeline:** `ByteSource → AEAD Encryptor → Frame Encoder(strategy) → FFmpeg Muxer → Video`  
  - Streaming chunks; ≤1 frame buffered. GREYSCALE uses 8-bit PGM; pads final frame and records padding.
- **Decode pipeline:** `Demuxer (video→frames) → Frame Decoder (frames→ciphertext) → AEAD Decryptor → plaintext`.  
  - Exact length restored via `effective_len = frames*(W*H) - padding`.
- **Crypto:** One AEAD session per file. Password → Argon2id KEK, wrap random DEK. AAD binds stable manifest fields.
- **Formats/Codecs:** MP4/MOV/MKV with H.264/HEVC/VP9/AV1; lossless/rawvideo option for exact byte preservation.
- **Manifest:** canonical JSON storing source (name/size/SHA-256), `FrameSpec` (format/W/H/fps/strategy), frames, container/codec, padding, created_at, notes. Private `CryptoMeta` (salt, wrapped_dek, nonce, tag, ciphertext_len).

## Project Brief (condensed)

- **Goal:** Store arbitrary data inside video and recover it exactly. Optional upload (YouTube/Vimeo) after full file creation.
- **Inputs (normalized):** `path, password, resolution{426x240…3840x2160}, fps>0, strategy(greyscale|qr), format, container(mp4|mkv|mov), codec(h264|hevc|vp9|av1), notes`. Strings over the wire → server Enums.
- **Core models:** `FrameSpec{format,width,height,encoding,fps}`, Enums for `FrameFormat/EncodingStrategy/Container/Codec`, `Manifest`, `VideoRef`, `CryptoMeta`.
- **Interfaces (ABCs):**
  - `ByteSource.{iter_chunks,size,sha256,name}`
  - `Encryptor/Decryptor.{start,update,finalize}`
  - `FrameEncoder.{add_bytes,finalize}` / `FrameDecoder.{decode_frame,iter_bytes(limit)}`
  - `Muxer.mux(...)` and `Demuxer.demux(...)` (MVP batch); streaming variants optional.
- **MVP concretes:** `FileSource`, AEAD (GCM or ChaCha20-Poly1305), `GreyscaleEncoder/Decoder` (PGM `frame_%05d.pgm`), `FileMuxer` (image2 → video), `FileDemuxer` (video → frames). Example FFmpeg:  
  `ffmpeg -y -framerate {fps} -f image2 -i frame_%05d.pgm -c:v libx264 -pix_fmt yuv420p -r {fps} -movflags +faststart out.mp4`
- **Orchestrator (encode):**
  1) Build `FrameSpec`; stream `ByteSource` → `Encryptor.update()` → `Encoder.add_bytes()`
  2) Append `Encryptor.finalize()` tail → `Encoder.finalize()` (padding, frames)
  3) `Muxer.mux(out_path)` → assemble final `Manifest`.
- **File layout (recommended):**
