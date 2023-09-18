const updateFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the update
    const name = document.querySelector('#title').value.trim();
    const post = document.querySelector('#post').value.trim();
    const id = document.querySelector("#blogpost").dataset.indexNumber
    console.log(name)
    console.log(post)
    console.log(id)
   
    if (name && post) {
      // Send a PUT request to the API endpoint
      const response = await fetch(`/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, post }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }

  };

  document
    .querySelector('.update-form')
    .addEventListener('submit', updateFormHandler);
  
