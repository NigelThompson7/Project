document.getElementById('inputForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    const userInput = document.getElementById('userInput').value;
  
    try {
      const response = await fetch('http://localhost:3000/processInput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: userInput })
      });
  
      const data = await response.json();
  
      // Display the response from the server
      document.getElementById('output').innerText = data.output;
    } catch (error) {
      console.error('Error:', error);
    }
  });
  