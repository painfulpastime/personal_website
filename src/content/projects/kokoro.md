---
title: Kokoro Reader
subtitle: Text in. Speech out. All local.
description: A local text-to-speech reader with a C++ backend, a browser interface, and a focus on the everyday reading experience.
category: Software / Local inference
year: "2026"
order: 1
tags: [C++, sherpa-onnx, Browser interface]
cover: kokoro
---

## A small tool for an everyday problem

Text worth reading comes from everywhere: articles, documentation, notes, and
different applications. I wanted a convenient way to listen to it without making
the source application responsible for reading it aloud.

Kokoro Reader takes pasted English text and generates speech locally. The
browser is the interface; a C++ server connects it to the existing Kokoro speech
model through sherpa-onnx.

## The reading flow

Paste text, preview the paragraph-aware chunks, then read one chunk or listen
through the whole sequence. Previous, next, and stop controls keep navigation
close at hand. Playback speed can change without generating the audio again.

## The interesting engineering decisions

- **Chunking:** preserve readable paragraphs while respecting UTF-8 byte
  boundaries and bounded input sizes.
- **One chunk ahead:** generate the next chunk while the current one plays,
  overlapping synthesis and playback without parallel calls to the shared engine.
- **Session handling:** stop or replace a reading session without letting an
  outdated audio response take over playback.
- **Session caching:** keep generated chunks in browser memory so replaying a
  chunk does not require another synthesis request.

## What runs where

The browser sends text to a C++ HTTP server on the same computer. The server uses
the installed model assets to generate audio, which the browser plays. Inference
does not require a hosted speech API after the local dependencies are installed.

The application integrates Kokoro and sherpa-onnx; it does not train a new speech
model. The current setup targets Windows with Visual Studio, CMake, and Ninja.

## Keeping the scope useful

The current reader accepts up to 4,000 UTF-8 input bytes and splits them into
chunks of up to 500 bytes. It handles pasted English text rather than importing
whole PDFs or managing a document library. Audio caching lasts for the browser
session, rather than acting as permanent storage.

The source repository is currently private. This page describes the project;
it is not a hosted speech service.
