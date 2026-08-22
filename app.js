async function generateVideo() {
    const prompt = document.getElementById('userPrompt').value;
    const duration = document.getElementById('duration').value;
    const language = document.getElementById('language').value;
    const output = document.getElementById('output');
    
    const API_KEY = "AQ.Ab8RN6JESrVYQYiu9_hHzfBmnwRxrDuFlC9_DtSqWXfF9GQ15Q"; 

    if(prompt.trim() === "") {
        alert("कृपया पहले कोई Prompt लिखें!");
        return;
    }

    output.innerText = "⏳ Gemini AI से स्क्रिप्ट जनरेट हो रही है, थोड़ा इंतज़ार करें...";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const systemPrompt = `आप एक एक्सपर्ट वीडियो स्क्रिप्ट राइटर हैं। कृपया नीचे दिए गए टॉपिक पर ${duration} मिनट की वीडियो स्क्रिप्ट ${language} भाषा में लिखें। स्क्रिप्ट को स्पष्ट Scenes और Dialogues में बाँटें:\n\nTopic: ${prompt}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemPrompt }] }]
            })
        });

        const data = await response.json();
        const scriptText = data.candidates[0].content.parts[0].text;
        
        output.innerHTML = `<div style="text-align:left; background:#222; padding:15px; border-radius:8px; white-space:pre-wrap;">🎬 <b>AI Script Generated:</b>\n\n${scriptText}</div>`;
    } catch (error) {
        output.innerText = "❌ कुछ गलती हुई है, फिर से कोशिश करें।";
        console.error(error);
    }
}
