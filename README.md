# Neuro Real Estate Agent

This repository contains the source code and WordPress plugin for **Neuro Real Estate Agent**, an AI-powered real estate assistant that enhances user experience on property websites. It includes:

- A WordPress plugin (AI Cory) with personalization engine, emotion-driven matchmaking, conversational concierge, predictive inventory alerts, and seamless CMS integration.
- A React-based preview and UI for the Buyer Persona Analyzer + MLS search.
- REST endpoints for buyer persona analysis and MLS proxy.

## Features

- **Personalization Engine**: Adjusts property recommendations based on browsing behavior and preferences.
- **Emotion-Driven Matchmaking**: Uses sentiment analysis to match users with properties that fit their lifestyle and emotional needs.
- **Conversational Concierge**: Natural language AI chat to answer questions and assist visitors 24/7.
- **Predictive Inventory Alerts**: Notifies users when matching properties become available.
- **Buyer Persona Analyzer + MLS**: Analyzes an address to predict the most likely buyer persona and fetch MLS comps within a selected radius.

## Usage

- Install the WordPress plugin by uploading the ZIP file in your WP admin.
- Configure your AI and MLS API base URLs and keys under `Settings → AI Cory — Buyer Profiler`.
- Use the shortcodes:
  - `[ai_cory layout="philly"]` for the Philadelphia landing layout.
  - `[ai_cory_profiler]` to embed the Buyer Persona Analyzer.

## Deployment

The repository can be deployed as a static site or Next.js project on Vercel. See `deploy` instructions once code is added.

