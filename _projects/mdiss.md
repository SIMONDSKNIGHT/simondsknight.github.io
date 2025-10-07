---
layout: project
title: Masters Dissertation — Data Poisoning Attacks on Whisper
summary: Explored the feasibility of data poisoning attacks on large language models, focusing on inducing hallucinations in Whisper.
year: 2025
stack: [Python, PyTorch, Hugging Face, Whisper, Google Colab]
thumb: /assets/img/UOE.png  
hero:  /assets/img/UOE.png    
gif:   /assets/gif/mdiss.gif        
png: true
links:
  - label: "Dissertation PDF"
    url: "/assets/pdfs/MINF.pdf"  

---



# -- Abstract --

This dissertation investigates the phenomenon of hallucinations in large-scale Auto-
matic Speech Recognition (ASR) systems, with a focus on OpenAI’s Whisper model. It
begins by replicating and extending the findings of Careless Whisper (Koenecke et al.),
verifying that hallucinations in Whisper are a recurring and unpredictable phenomenon,
and classifying their potential harms. It further identifies novel hallucination behaviours
in Whisper-Turbo, including the emergence of fabricated context prompts not previ-
ously documented. Building on these findings, the second half of the work explores
inducing hallucinations in Whisper. More specifically, whether targeted hallucina-
tions conditioned on speaker accent can be introduced through fine-tuning. Although
accent-specific hallucinations were not successfully achieved, the experiments show
that hallucinatory behaviour can be modulated to some degree. The work concludes
that while practical Hallucination inducing data poisoning attacks on ASR systems
remain challenging, they are theoretically plausible and warrant further investigation.
This dissertation contributes experimental methods, technical observations, and new
questions to the growing field of ASR robustness and safety.

## Implementation

- Developed a PyTorch fine-tuning pipeline for Whisper models on bespoke poisoned datasets.  
- Experimented with inducing **hallucinations** — a novel and unexplored poisoning behavior at the time.  
- Balanced dataset curation, training, and evaluation for accent-related adversarial triggers.  
- Structured code for clarity and efficiency to ensure examiners could easily review.  

## Notes

- Achieved **80% grade** for the project.  
- Demonstrated feasibility of targeted hallucination induction via poisoned training data.  
- Detailed Post-mortem analysis of technical and structure of tests and models, with keen analysis of points of improvement for future work.
- Extended understanding of data poisoning threats to very large language models.  
