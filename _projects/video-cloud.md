---
layout: project
title: VideoCloud Concept
summary: Encrypts any file, encodes ciphertext into video frames, muxes with FFmpeg to MP4/MOV/MKV, and fully reverses the process; Electron/React UI + FastAPI/Python backend, further expansion to 
year: 2025
stack: [Electron, React, FastAPI, Python, FFmpeg, AES-GCM/ChaCha20-Poly1305, Argon2id, MP4/MOV/MKV, H.264/HEVC/VP9/AV1]
thumb: /assets/img/datavideo-thumb.jpg   # fill in
hero:  /assets/img/datavideo-hero.jpg    # fill in
#gif:   /assets/gif/datavideo.gif         # optional
png: true
links:
  - { label: "Repo", url: "https://github.com/yourname/data-video-encoder" }  # replace
---

# -- Abstract --

Proof-of-concept system for secure data storage **in video**. The backend runs a streaming
pipeline — `ByteSource → AEAD Encryptor → Frame Encoder → FFmpeg Muxer → Video` — to
convert arbitrary files into videos (MP4/MOV/MKV) and a reverse path to recover the original.
Keys are derived via **Argon2id**, encryption via **AES-GCM/ChaCha20-Poly1305**, and payloads
are framed as 8-bit greyscale (PGM) for capacity and determinism (≤1 frame buffered). A canonical
**Manifest** records source metadata, frame spec, padding, container/codec, and crypto lengths.
Electron/React provides the desktop UI; FastAPI/Python orchestrates the pipeline and optional
upload to YouTube/Vimeo (research-only due to platform TOS).

## Implementation

- **Backend (FastAPI/Python):** normalized inputs (path/password/resolution/fps/strategy/container/codec),
  streaming AEAD (`update()/finalize()`), and a pluggable **encoder/muxer registry**.
- **Encode:** chunked `ByteSource` → AEAD → **Greyscale encoder** (PGM; width×height bytes per frame) →
  **FFmpeg** mux (**batch image2** or **pipe/rawvideo**) to MP4/MOV/MKV (H.264/HEVC/VP9/AV1; lossless options).
- **Decode:** FFmpeg demux/`rawvideo gray` → frame decoder (trim padding) → AEAD decrypt → file; verified by **SHA-256**.
- **Security:** password → **Argon2id KEK**, random DEK wrapped; AAD binds stable manifest fields.
- **DX/Testing:** e2e round-trip tests (GiB-scale), manifest I/O, padding math, and codec/format validation.

## Notes

- Showcases **systems design**, **cryptography**, and **media processing** with strict **streaming** constraints.
- Lossless MOV/Matroska via `rawvideo` supported for exact byte preservation; QR+FEC strategy on roadmap for lossy hosts.
- Tech keywords: Electron, React, FastAPI, Python, FFmpeg, AEAD, Argon2id, AES-GCM, ChaCha20-Poly1305,
  image2pipe/rawvideo, H.264/HEVC/VP9/AV1, MP4/MOV/MKV, manifests, registries, streaming I/O.
