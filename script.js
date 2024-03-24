document.addEventListener('DOMContentLoaded', () =>{
  const inputButton = document.getElementById('inputButton');

  inputButton.addEventListener('click', async(e) => {
    e.preventDefault();

    const userInput = document.getElementById('userInput').value;

    try {
      const response = await fetch('http://localhost:3000/processInput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: userInput })
      });
      console.log(response);

      const data = await response.json();

      // Display the response from the server
      console.log(data);
      document.getElementById('output').innerText = data.output;
    } catch (error) {
      console.error('Error:', error);
    }
  });
})