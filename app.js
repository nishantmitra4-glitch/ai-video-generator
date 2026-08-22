async function generateVideo() {
    const prompt = document.getElementById('userPrompt').value;
    const duration = document.getElementById('duration').value;
    const language = document.getElementById('language').value;
    const output = document.getElementById('output');

    if (!prompt.trim()) {
        alert("कृपया पहले कोई Topic लिखें!");
        return;
    }

    output.innerText = "⏳ AI से स्क्रिप्ट जनरेट हो रही है, थोड़ा इंतज़ार करें...";

    const systemPrompt = `आप एक एक्सपर्ट वीडियो स्क्रिप्ट राइटर हैं। कृपया इस टॉपिक पर ${duration} मिनट की वीडियो स्क्रिप्ट ${language} भाषा में लिखें। इसे Scenes और Dialogue में बाँटें:\n\nTopic: ${prompt}`;

    try {
        const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(systemPrompt)}`);
        const scriptText = await response.text();

        if (scriptText && scriptText.length > 10) {
            output.innerText = scriptText;
        } else {
            output.innerText = "❌ AI से रिस्पॉन्स नहीं मिला। फिर से कोशिश करें।";
        }
    } catch (error) {
        output.innerText = "❌ कुछ गलती हुई है, कृपया अपना इंटरनेट चेक करें।";
        console.error(error);
    }
}
