const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwUJHink-ICcm4kzyImBUFrJCmW8UzPc3a0s_Xx81BZybuOgOIIx3c_0MlxVH0rQ1I36w/exec'

export const submitToGoogleSheet = async (data) => {
  try {
    // We use mode: 'no-cors' so Google doesn't block the request from the browser
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(data)
    })
    return true
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error)
    return false
  }
}
