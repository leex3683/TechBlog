const updateFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the update
    const title = document.querySelector('#title').value.trim();
    const post = document.querySelector('#post').value.trim();
    console.log(title)
    console.log(post)
    // if (title && post) {
    //   // Send a POST request to the API endpoint
    //   const response = await fetch('/api/users/login', {
    //     method: 'POST',
    //     body: JSON.stringify({ title, post }),
    //     headers: { 'Content-Type': 'application/json' },
    //   });
  
    //   if (response.ok) {
    //     // If successful, redirect the browser to the profile page
    //     document.location.replace('/');
    //   } else {
    //     alert(response.statusText);
    //   }
    // }

  };

  document
    .querySelector('.update-form')
    .addEventListener('submit', updateFormHandler);
  
