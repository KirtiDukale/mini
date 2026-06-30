const API_URL = "http://127.0.0.1:8000/chat";

export async function sendToAI(message) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to connect to backend");
    }

    const data = await response.json();

    return data.reply;
  } catch (error) {
    console.error(error);
    return "❌ Backend connection failed.";
  }
}