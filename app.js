function generateVideoPlan() {

  const prompt = document.getElementById("prompt").value.trim();
  const duration = document.getElementById("duration").value;
  const language = document.getElementById("language").value;
  const result = document.getElementById("result");

  if (!prompt) {
    result.innerText = "पहले अपना video idea लिखो।";
    return;
  }

  const scenes = Math.max(5, Math.ceil(Number(duration) * 2));

  result.innerText =
`🎬 VIDEO PLAN

Topic:
${prompt}

Duration:
${duration} minute(s)

Language:
${language}

Estimated Scenes:
${scenes}

STATUS

✅ Prompt received
✅ Duration selected
✅ Language selected

⏳ AI script generation
⏳ Scene generation
⏳ Voice generation
⏳ Visual generation
⏳ Video rendering

अगले चरण में हम वास्तविक AI system जोड़ेंगे।`;
}
