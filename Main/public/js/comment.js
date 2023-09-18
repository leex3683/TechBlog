const commentFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the update
    const post = document.querySelector('#comment').value.trim();
    const blogpost_id = document.querySelector("#blogcomment").dataset.indexNumber

    console.log(post)
    console.log(blogpost_id)

   
    if (post) {
      // Send a POST request to the Homeroute
      const response = await fetch(`/comment`, {
        method: 'POST',
        body: JSON.stringify({ post, blogpost_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }

  };

  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
  
