async function generateVideo() {
    const prompt = document.getElementById('userPrompt').value;
    const duration = document.getElementById('duration').value;
    const language = document.getElementById('language').value;
    const output = document.getElementById('output');
    
    const API_KEY = "AQ.Ab8RN6JESrVYQYiu9_hHzfBmnwRxrDuFlC9_DtSqWXfF9GQ15Q"; 

    if (!prompt.trim()) {
        alert("कृपया पहले कोई Topic लिखें!");
        return;
    }

    output.innerText = "⏳ Gemini AI से स्क्रिप्ट जनरेट हो रही है...";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const systemPrompt = `आप एक एक्सपर्ट वीडियो स्क्रिप्ट राइटर हैं। कृपया इस टॉपिक पर ${duration} मिनट की वीडियो स्क्रिप्ट ${language} भाषा में लिखें। इसे Scenes और Dialogue में बाँटें:\n\nTopic: ${prompt}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemPrompt }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            output.innerText = data.candidates[0].content.parts[0].text;
        } else {
            output.innerText = "❌ AI से रिस्पॉन्स नहीं मिला। फिर से कोशिश करें।";
        }
    } catch (error) {
        output.innerText = "❌ एरर आया है, कृपया अपना इंटरनेट या API Key चेक करें।";
        console.error(error);
    }
}
